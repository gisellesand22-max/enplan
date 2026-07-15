import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const resend = new Resend(process.env.RESEND_API_KEY!)

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
const BUSINESS_URL = process.env.NEXT_PUBLIC_BUSINESS_URL || 'https://negocios.enplan.app'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        const email = session.customer_email || session.metadata?.email || ''
        await upsertSubscription(subscription, email)

        if (email) {
          await createBusinessAccount(email, subscription.metadata?.negocio || '')
        }
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer
      await upsertSubscription(subscription, customer.email || '')
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabase
        .from('suscripciones')
        .update({
          estado: 'cancelada',
          cancelada_en: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'invoice.payment_failed': {
      const invoiceData = event.data.object as unknown as Record<string, unknown>
      const subscriptionId = invoiceData.subscription as string | null
      if (subscriptionId) {
        await supabase
          .from('suscripciones')
          .update({
            estado: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

function generatePassword(length = 12): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => chars[b % chars.length]).join('')
}

async function createBusinessAccount(email: string, negocioName: string) {
  const password = generatePassword()

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { negocio: negocioName },
  })

  if (error) {
    if (error.message?.includes('already been registered')) return
    console.error('Error creating Supabase user:', error.message)
    return
  }

  try {
    await resend.emails.send({
      from: 'enplan. <no-reply@enplan.app>',
      to: email,
      subject: 'Bienvenido a enplan. — Tus credenciales de acceso',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #2B2B23;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">
            ¡Bienvenido a <span style="color: #CDD917;">enplan.</span>
          </h1>
          <p style="font-size: 15px; color: #2B2B23cc; margin: 0 0 28px;">
            Tu cuenta de negocio está lista. Usa estas credenciales para entrar a tu panel:
          </p>
          <div style="background: #FAF8F3; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #2B2B2380; text-transform: uppercase; letter-spacing: 0.05em;">Correo</p>
            <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">${email}</p>
            <p style="margin: 0 0 8px; font-size: 13px; color: #2B2B2380; text-transform: uppercase; letter-spacing: 0.05em;">Contraseña temporal</p>
            <p style="margin: 0; font-size: 16px; font-weight: 600; font-family: monospace; letter-spacing: 0.05em;">${password}</p>
          </div>
          <a href="${BUSINESS_URL}/login" style="display: inline-block; background: #2B2B23; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Entrar a mi panel
          </a>
          <p style="font-size: 13px; color: #2B2B2366; margin-top: 32px;">
            Te recomendamos cambiar tu contraseña una vez dentro del panel.
          </p>
        </div>
      `,
    })
  } catch (emailErr) {
    console.error('Error sending welcome email:', emailErr)
  }
}

async function upsertSubscription(subscription: Stripe.Subscription, email: string) {
  const plan = subscription.metadata?.plan || 'basico'
  const negocio = subscription.metadata?.negocio || ''
  const item = subscription.items.data[0]
  const sub = subscription as unknown as Record<string, unknown>

  const data = {
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    email,
    nombre_negocio: negocio,
    plan,
    estado: subscription.status === 'trialing' ? 'trial' : subscription.status === 'active' ? 'activa' : subscription.status,
    precio_mensual: item?.price?.unit_amount || 0,
    periodo_inicio: sub.current_period_start ? new Date((sub.current_period_start as number) * 1000).toISOString() : null,
    periodo_fin: sub.current_period_end ? new Date((sub.current_period_end as number) * 1000).toISOString() : null,
    updated_at: new Date().toISOString(),
  }

  const { data: existing } = await supabase
    .from('suscripciones')
    .select('id')
    .eq('stripe_subscription_id', subscription.id)
    .single()

  if (existing) {
    await supabase
      .from('suscripciones')
      .update(data)
      .eq('stripe_subscription_id', subscription.id)
  } else {
    await supabase.from('suscripciones').insert(data)
  }
}

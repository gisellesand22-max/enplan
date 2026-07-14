import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

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
        await upsertSubscription(subscription, session.customer_email || session.metadata?.email || '')
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
      const invoice = event.data.object as Stripe.Invoice
      if (invoice.subscription) {
        await supabase
          .from('suscripciones')
          .update({
            estado: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', invoice.subscription as string)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

async function upsertSubscription(subscription: Stripe.Subscription, email: string) {
  const plan = subscription.metadata?.plan || 'basico'
  const negocio = subscription.metadata?.negocio || ''
  const item = subscription.items.data[0]

  const data = {
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    email,
    nombre_negocio: negocio,
    plan,
    estado: subscription.status === 'trialing' ? 'trial' : subscription.status === 'active' ? 'activa' : subscription.status,
    precio_mensual: item?.price?.unit_amount || 0,
    periodo_inicio: new Date((subscription.current_period_start as number) * 1000).toISOString(),
    periodo_fin: new Date((subscription.current_period_end as number) * 1000).toISOString(),
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

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id requerido' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.status === 'complete' && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      )

      const email = session.customer_details?.email || session.customer_email || ''
      const plan = subscription.metadata?.plan || session.metadata?.plan || 'basico'
      const negocio = subscription.metadata?.negocio || session.metadata?.negocio || ''
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

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    })
  } catch (err) {
    console.error('Session status error:', err)
    return NextResponse.json({ error: 'Error obteniendo estado' }, { status: 500 })
  }
}

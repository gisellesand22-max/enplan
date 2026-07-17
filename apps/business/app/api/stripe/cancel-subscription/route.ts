import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function verifyUser(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  const { data: { user } } = await supabase.auth.getUser(authHeader.slice(7))
  return user
}

export async function POST(request: Request) {
  try {
    const user = await verifyUser(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Se requiere subscriptionId' },
        { status: 400 },
      )
    }

    const { data: sub } = await supabase
      .from('suscripciones')
      .select('email')
      .eq('stripe_subscription_id', subscriptionId)
      .single()

    if (!sub || sub.email !== user.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const updated = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    return NextResponse.json({
      status: updated.status,
      cancel_at_period_end: updated.cancel_at_period_end,
      current_period_end: updated.current_period_end,
    })
  } catch (err) {
    console.error('Stripe cancel error:', err)
    return NextResponse.json(
      { error: 'Error al cancelar suscripción' },
      { status: 500 },
    )
  }
}

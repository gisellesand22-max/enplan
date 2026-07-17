import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const PLANS: Record<string, { priceId: string; name: string }> = {
  basico: { priceId: process.env.STRIPE_PRICE_BASICO!, name: 'Básico' },
  pro: { priceId: process.env.STRIPE_PRICE_PRO!, name: 'Pro' },
  premium: { priceId: process.env.STRIPE_PRICE_PREMIUM!, name: 'Premium' },
}

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

    const { plan } = await request.json()

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const origin =
      request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'subscription',
      customer_email: user.email!,
      line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
      metadata: {
        plan,
        user_id: user.id,
        negocio: user.user_metadata?.negocio || '',
      },
      subscription_data: {
        trial_period_days: 30,
        metadata: {
          plan,
          user_id: user.id,
          negocio: user.user_metadata?.negocio || '',
        },
      },
      return_url: `${origin}/elegir-plan/completado?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (err) {
    console.error('Stripe embedded checkout error:', err)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}

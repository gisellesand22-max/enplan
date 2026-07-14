import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const PLANS: Record<string, { priceId: string; name: string }> = {
  basico: { priceId: process.env.STRIPE_PRICE_BASICO!, name: 'Básico' },
  pro: { priceId: process.env.STRIPE_PRICE_PRO!, name: 'Pro' },
  premium: { priceId: process.env.STRIPE_PRICE_PREMIUM!, name: 'Premium' },
}

export async function POST(request: Request) {
  try {
    const { plan, email, negocio } = await request.json()

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
      metadata: { plan, negocio: negocio || '' },
      subscription_data: {
        trial_period_days: 30,
        metadata: { plan, negocio: negocio || '' },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/become-a-partner?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/become-a-partner?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}

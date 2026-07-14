import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PLANS: Record<string, string> = {
  basico: process.env.STRIPE_PRICE_BASICO!,
  pro: process.env.STRIPE_PRICE_PRO!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
}

export async function POST(request: Request) {
  try {
    const { plan, email, negocio } = await request.json()

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: PLANS[plan], quantity: 1 }],
      subscription_data: {
        trial_period_days: 30,
        metadata: { plan, negocio: negocio || '' },
      },
      metadata: { plan, negocio: negocio || '', email: email || '' },
    })

    return NextResponse.json({ url: paymentLink.url })
  } catch (err) {
    console.error('Payment link error:', err)
    return NextResponse.json({ error: 'Error creando link de pago' }, { status: 500 })
  }
}

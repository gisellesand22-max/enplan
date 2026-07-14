import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PLAN_PRICES: Record<string, string> = {
  basico: process.env.STRIPE_PRICE_BASICO!,
  pro: process.env.STRIPE_PRICE_PRO!,
  premium: process.env.STRIPE_PRICE_PREMIUM!,
}

export async function POST(request: Request) {
  try {
    const { subscriptionId, newPlan } = await request.json()

    if (!subscriptionId || !newPlan || !PLAN_PRICES[newPlan]) {
      return NextResponse.json(
        { error: 'Se requiere subscriptionId y un plan válido' },
        { status: 400 },
      )
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const itemId = subscription.items.data[0]?.id

    if (!itemId) {
      return NextResponse.json(
        { error: 'No se encontró el item de suscripción' },
        { status: 400 },
      )
    }

    const updated = await stripe.subscriptions.update(subscriptionId, {
      items: [{ id: itemId, price: PLAN_PRICES[newPlan] }],
      proration_behavior: 'create_prorations',
      metadata: { plan: newPlan },
    })

    return NextResponse.json({
      status: updated.status,
      plan: newPlan,
    })
  } catch (err) {
    console.error('Stripe change-plan error:', err)
    return NextResponse.json(
      { error: 'Error al cambiar de plan' },
      { status: 500 },
    )
  }
}

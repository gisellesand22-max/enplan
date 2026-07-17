import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

let portalConfigId: string | null = null

async function getPortalConfig() {
  if (portalConfigId) return portalConfigId

  const config = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: 'enplan. — Gestiona tu suscripción',
    },
    features: {
      payment_method_update: { enabled: true },
      invoice_history: { enabled: true },
      subscription_cancel: { enabled: false },
      subscription_update: { enabled: false },
    },
  })
  portalConfigId = config.id
  return portalConfigId
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

    const { customerId } = await request.json()

    if (!customerId) {
      return NextResponse.json(
        { error: 'Se requiere customerId' },
        { status: 400 },
      )
    }

    const { data: sub } = await supabase
      .from('suscripciones')
      .select('email')
      .eq('stripe_customer_id', customerId)
      .single()

    if (!sub || sub.email !== user.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const origin =
      request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'

    const configId = await getPortalConfig()

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/perfil`,
      configuration: configId,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe portal error:', err)
    return NextResponse.json(
      { error: 'Error creando sesión del portal' },
      { status: 500 },
    )
  }
}

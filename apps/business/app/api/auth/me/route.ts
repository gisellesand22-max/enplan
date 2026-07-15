import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const token = authHeader.slice(7)

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  const { data: subscription } = await supabase
    .from('suscripciones')
    .select('plan, estado, stripe_customer_id, stripe_subscription_id, nombre_negocio')
    .eq('email', user.email)
    .in('estado', ['activa', 'trial', 'active', 'trialing'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    subscription: subscription || null,
  })
}

'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { IconCheck } from '@tabler/icons-react'
import { Logo } from '../../components/Logo'
import { AuthProvider, useAuth } from '../../lib/auth'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PLANS = [
  {
    key: 'basico',
    name: 'Básico',
    price: '$399',
    period: '/mes',
    features: [
      'Perfil de negocio',
      'Hasta 3 promociones activas',
      'Estadísticas básicas',
      'Soporte por email',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$799',
    period: '/mes',
    popular: true,
    features: [
      'Todo lo del plan Básico',
      'Promociones ilimitadas',
      'Programa de lealtad',
      'Estadísticas avanzadas',
      'Soporte prioritario',
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$1,499',
    period: '/mes',
    features: [
      'Todo lo del plan Pro',
      'Múltiples sucursales',
      'API personalizada',
      'Gerente de cuenta dedicado',
      'Integraciones avanzadas',
    ],
  },
]

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: (typeof PLANS)[number]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex flex-col rounded-2xl border-2 p-6 text-left transition-all ${
        selected
          ? 'border-lima bg-lima/5 shadow-lg'
          : 'border-arena-dark bg-white hover:border-carbon/30 hover:shadow-md'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lima px-4 py-1 text-xs font-bold text-carbon">
          Más popular
        </span>
      )}
      <h3 className="font-montserrat text-lg font-bold">{plan.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-montserrat text-3xl font-extrabold">{plan.price}</span>
        <span className="text-sm text-carbon/50">{plan.period}</span>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-carbon/70">
            <IconCheck size={16} className="mt-0.5 shrink-0 text-lima" />
            {f}
          </li>
        ))}
      </ul>
      <div
        className={`mt-6 rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${
          selected ? 'bg-lima text-carbon' : 'bg-arena text-carbon/60'
        }`}
      >
        {selected ? 'Seleccionado' : 'Elegir plan'}
      </div>
    </button>
  )
}

function ElegirPlanContent() {
  const router = useRouter()
  const { session, subscription, loading } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !session) router.replace('/login')
  }, [loading, session, router])

  useEffect(() => {
    if (!loading && subscription) router.replace('/dashboard')
  }, [loading, subscription, router])

  const fetchClientSecret = useCallback(() => {
    if (!selectedPlan || !session?.access_token) return Promise.resolve('')
    return fetch('/api/stripe/embedded-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ plan: selectedPlan }),
    })
      .then((r) => r.json())
      .then((data) => data.clientSecret)
  }, [selectedPlan, session?.access_token])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-carbon border-t-transparent" />
      </div>
    )
  }

  if (!session) return null

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <h1 className="mt-4 font-montserrat text-2xl font-extrabold">
            Elige tu plan
          </h1>
          <p className="mt-2 text-sm text-carbon/60">
            Primer mes <span className="font-semibold text-carbon">gratis</span>.
            Sin compromiso, cancela cuando quieras.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              selected={selectedPlan === plan.key}
              onSelect={() => setSelectedPlan(plan.key)}
            />
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8 rounded-2xl border border-arena-dark bg-white p-6 shadow-card">
            <h2 className="mb-4 font-montserrat text-lg font-bold">
              Completa tu pago
            </h2>
            <EmbeddedCheckoutProvider
              key={selectedPlan}
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </main>
  )
}

export default function ElegirPlanPage() {
  return (
    <AuthProvider>
      <ElegirPlanContent />
    </AuthProvider>
  )
}

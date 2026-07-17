'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  IconCheck,
  IconLoader2,
  IconArrowLeft,
  IconStarFilled,
  IconChartBar,
  IconTicket,
  IconUsers,
  IconCrown,
  IconBuildingStore,
  IconHeadset,
} from '@tabler/icons-react'
import { Button } from '@enplan/ui'
import { useAuth } from '../../../lib/auth'
import { useStore } from '../../../lib/store'
import type { PlanNegocio } from '../../../lib/demo'

const PLANES = [
  {
    id: 'basico' as PlanNegocio,
    nombre: 'Básico',
    precio: 399,
    descripcion: 'Ideal para probar la plataforma y ver resultados iniciales.',
    features: [
      { icon: IconTicket, text: 'Hasta 1 promoción activa' },
      { icon: IconBuildingStore, text: 'Perfil de negocio en el directorio' },
      { icon: IconChartBar, text: 'Estadísticas básicas del panel' },
      { icon: IconHeadset, text: 'Soporte por email' },
    ],
    noIncluye: [
      'Métricas de crecimiento',
      'Posición destacada',
      'Datos demográficos de clientes',
    ],
  },
  {
    id: 'pro' as PlanNegocio,
    nombre: 'Pro',
    precio: 799,
    popular: true,
    descripcion: 'Para negocios que quieren crecer y entender a sus clientes.',
    features: [
      { icon: IconTicket, text: 'Hasta 2 promociones activas' },
      { icon: IconBuildingStore, text: 'Perfil de negocio en el directorio' },
      { icon: IconChartBar, text: 'Métricas de crecimiento' },
      { icon: IconStarFilled, text: 'Posición destacada en la app' },
      { icon: IconHeadset, text: 'Soporte prioritario' },
    ],
    noIncluye: [
      'Datos demográficos (edad y sexo)',
      'Clientes nuevos vs recurrentes',
      'Account manager dedicado',
    ],
  },
  {
    id: 'premium' as PlanNegocio,
    nombre: 'Premium',
    precio: 1499,
    descripcion: 'Para dominar tu categoría con datos y visibilidad máxima.',
    features: [
      { icon: IconTicket, text: 'Promociones ilimitadas' },
      { icon: IconBuildingStore, text: 'Perfil de negocio en el directorio' },
      { icon: IconChartBar, text: 'Métricas avanzadas completas' },
      { icon: IconUsers, text: 'Datos demográficos: edad y sexo' },
      { icon: IconUsers, text: 'Clientes nuevos vs recurrentes' },
      { icon: IconStarFilled, text: 'Posición #1 en tu categoría' },
      { icon: IconCrown, text: 'Account manager dedicado' },
    ],
    noIncluye: [],
  },
]

export default function CambiarPlanPage() {
  const router = useRouter()
  const { session, subscription, refreshSubscription } = useAuth()
  const { negocio, setPlan } = useStore()
  const currentPlan = subscription?.plan || negocio.plan
  const stripeSubscriptionId = subscription?.stripeSubscriptionId ?? null
  const authToken = session?.access_token

  const [selectedPlan, setSelectedPlan] = useState<PlanNegocio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isUpgrade = selectedPlan
    ? PLANES.findIndex((p) => p.id === selectedPlan) >
      PLANES.findIndex((p) => p.id === currentPlan)
    : false

  const selectedPlanData = PLANES.find((p) => p.id === selectedPlan)
  const currentPlanData = PLANES.find((p) => p.id === currentPlan)

  const handleConfirm = useCallback(async () => {
    if (!selectedPlan || !stripeSubscriptionId) return
    setLoading(true)
    setError(null)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`
      const res = await fetch('/api/stripe/change-plan', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          subscriptionId: stripeSubscriptionId,
          newPlan: selectedPlan,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al cambiar de plan')
      setPlan(selectedPlan)
      await refreshSubscription()
      setSuccess(true)
      setTimeout(() => router.push('/perfil'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar de plan')
    } finally {
      setLoading(false)
    }
  }, [selectedPlan, stripeSubscriptionId, authToken, setPlan, refreshSubscription, router])

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lima/20">
          <IconCheck size={32} className="text-lima-700" />
        </div>
        <h1 className="mt-4 font-montserrat text-2xl font-bold">Plan actualizado</h1>
        <p className="mt-2 text-carbon/60">
          Tu plan ahora es <span className="font-semibold">{selectedPlanData?.nombre}</span>.
          Redirigiendo...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <button
          onClick={() => router.push('/perfil')}
          className="mb-4 inline-flex items-center gap-1 text-sm text-carbon/50 hover:text-carbon"
        >
          <IconArrowLeft size={16} />
          Volver a mi negocio
        </button>
        <h1 className="font-montserrat text-2xl font-bold">Cambiar de plan</h1>
        <p className="mt-1 text-sm text-carbon/60">
          Tu plan actual es <span className="font-semibold">{currentPlanData?.nombre}</span> (${currentPlanData?.precio.toLocaleString('es-MX')}/mes).
          Elige tu nuevo plan — el cambio se aplica de inmediato con prorrateo.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {PLANES.map((plan) => {
          const isCurrent = plan.id === currentPlan
          const isSelected = plan.id === selectedPlan

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all ${
                isCurrent
                  ? 'border-carbon bg-white shadow-card'
                  : isSelected
                    ? 'border-lima bg-lima/5 shadow-lg'
                    : 'border-arena-dark bg-white hover:border-carbon/30 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lima px-4 py-1 text-xs font-bold text-carbon">
                  Más popular
                </span>
              )}

              {isCurrent && (
                <span className="absolute -top-3 right-4 rounded-full bg-carbon px-3 py-1 text-xs font-bold text-white">
                  Plan actual
                </span>
              )}

              <h3 className="font-montserrat text-lg font-bold">{plan.nombre}</h3>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-montserrat text-3xl font-extrabold">
                  ${plan.precio.toLocaleString('es-MX')}
                </span>
                <span className="text-sm text-carbon/50">/mes</span>
              </div>
              <p className="mt-2 text-sm text-carbon/50">{plan.descripcion}</p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-sm text-carbon/80">
                    <f.icon size={16} className="mt-0.5 shrink-0 text-lima-700" />
                    {f.text}
                  </li>
                ))}
              </ul>

              {plan.noIncluye.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5 border-t border-arena-dark pt-3">
                  {plan.noIncluye.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-carbon/30 line-through">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-5">
                {isCurrent ? (
                  <div className="rounded-xl bg-arena py-2.5 text-center text-sm font-medium text-carbon/40">
                    Tu plan actual
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'bg-lima text-carbon'
                        : 'bg-carbon text-white hover:bg-carbon/80'
                    }`}
                  >
                    {isSelected ? 'Seleccionado' : 'Elegir este plan'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedPlan && selectedPlan !== currentPlan && (
        <div className="rounded-2xl border border-arena-dark bg-white p-6 shadow-card">
          <h2 className="font-montserrat text-lg font-bold">Confirmar cambio de plan</h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 rounded-xl bg-arena p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-carbon/40">Actual</p>
              <p className="mt-1 font-montserrat text-lg font-bold">{currentPlanData?.nombre}</p>
              <p className="text-sm text-carbon/50">${currentPlanData?.precio.toLocaleString('es-MX')}/mes</p>
            </div>
            <span className="text-xl text-carbon/30">&rarr;</span>
            <div className="flex-1 rounded-xl bg-lima/10 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-lima-700">Nuevo</p>
              <p className="mt-1 font-montserrat text-lg font-bold">{selectedPlanData?.nombre}</p>
              <p className="text-sm text-carbon/50">${selectedPlanData?.precio.toLocaleString('es-MX')}/mes</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-arena/50 px-4 py-3">
            <p className="text-sm text-carbon/70">
              {isUpgrade ? (
                <>
                  Se aplicará un <span className="font-semibold">prorrateo</span> a tu próxima factura.
                  Solo pagas la diferencia por los días restantes del periodo actual.
                  Las nuevas funciones se activan de inmediato.
                </>
              ) : (
                <>
                  Tu plan bajará al final del periodo actual.
                  Se aplicará un <span className="font-semibold">crédito</span> a tu próxima factura
                  por la diferencia.
                </>
              )}
            </p>
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => { setSelectedPlan(null); setError(null) }}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-carbon/50 hover:text-carbon"
              disabled={loading}
            >
              Cancelar
            </button>
            <Button onClick={handleConfirm} loading={loading}>
              {isUpgrade ? 'Confirmar upgrade' : 'Confirmar cambio'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

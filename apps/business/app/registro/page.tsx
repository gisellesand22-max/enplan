'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconCheck, IconLock } from '@tabler/icons-react'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'
import { useStore } from '../../lib/store'
import { PLANES, CATEGORIES, type PlanNegocio } from '../../lib/demo'

export default function RegistroPage() {
  const router = useRouter()
  const { updateNegocio, setPlan } = useStore()

  const [plan, setSelPlan] = useState<PlanNegocio>('pro')
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIES[0])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Demo: simulate Stripe Checkout → provision account → land in panel.
    // Backend phase: redirect to Stripe Checkout (subscription, 30-day trial),
    // then a webhook creates the negocio + login in Supabase.
    setPlan(plan)
    updateNegocio({ nombre: nombre || 'Mi negocio', categoria })
    setTimeout(() => router.push('/dashboard'), 700)
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <h1 className="mt-4 font-montserrat text-2xl font-extrabold">
            Únete como socio fundador
          </h1>
          <p className="mt-2 text-sm text-carbon/60">
            Primer mes <span className="font-semibold text-carbon">gratis</span>, sin
            permanencia. Cancela cuando quieras.
          </p>
        </div>

        {/* Plan selection */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-lima-700">
          1 · Elige tu plan
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANES.map((p) => {
            const active = plan === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelPlan(p.id)}
                className={`relative rounded-card border-2 p-4 text-left transition-colors ${
                  active
                    ? 'border-carbon bg-white shadow-card'
                    : 'border-arena-dark bg-white/60 hover:border-carbon/40'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-carbon px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Más elegido
                  </span>
                )}
                <div className="font-montserrat text-lg font-extrabold">{p.nombre}</div>
                <div className="mb-2 mt-0.5 font-montserrat text-2xl font-extrabold">
                  ${p.precio.toLocaleString('es-MX')}
                  <span className="text-sm font-medium text-carbon/50"> /mes</span>
                </div>
                <ul className="flex flex-col gap-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-carbon/70">
                      <IconCheck size={14} className="mt-0.5 shrink-0 text-lima-700" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-3 flex h-5 w-5 items-center justify-center rounded-full ${
                    active ? 'bg-carbon text-white' : 'border border-arena-dark'
                  }`}
                >
                  {active && <IconCheck size={13} />}
                </span>
              </button>
            )
          })}
        </div>

        {/* Business info */}
        <form onSubmit={handleSubmit} className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-lima-700">
            2 · Datos de tu negocio
          </p>
          <div className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card">
            <Input
              label="Nombre del negocio"
              placeholder="Ej. Café La Estación"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <div className="w-full">
              <label className="mb-1.5 block text-sm font-medium text-carbon">
                Categoría
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none focus:border-carbon focus:ring-1 focus:ring-carbon"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Correo"
              type="email"
              placeholder="tucorreo@negocio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Stripe checkout CTA */}
          <div className="mt-6 rounded-card bg-carbon p-6 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-montserrat text-lg font-bold">
                  Plan {PLANES.find((p) => p.id === plan)?.nombre}
                </p>
                <p className="text-sm text-white/60">
                  Primer mes $0 · luego $
                  {PLANES.find((p) => p.id === plan)?.precio.toLocaleString('es-MX')}/mes
                </p>
              </div>
              <span className="rounded-full bg-lima/20 px-3 py-1 text-xs font-semibold text-lima">
                Mes gratis
              </span>
            </div>
            <Button type="submit" fullWidth loading={loading} className="mt-4">
              <IconLock size={16} /> Continuar al pago seguro
            </Button>
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-xs text-white/40">
              Pago procesado por Stripe · cancela cuando quieras
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-carbon/60">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-carbon underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

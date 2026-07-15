'use client'

import Link from 'next/link'
import { IconTrendingUp, IconTicket, IconScan, IconArrowRight, IconPigMoney } from '@tabler/icons-react'
import { Badge } from '@enplan/ui'
import { useStore } from '../../../lib/store'
import { DEMO_DASHBOARD, calcAhorro } from '../../../lib/demo'

const badgeStatus: Record<string, 'activa' | 'usada' | 'expirada'> = {
  usada: 'usada',
  activa: 'activa',
  expirada: 'expirada',
}

export default function DashboardPage() {
  const { negocio, promos } = useStore()
  const activas = promos.filter((p) => p.activa)
  const promosActivas = activas.length
  const avgAhorro = activas.length
    ? Math.round(activas.reduce((s, p) => s + calcAhorro(p), 0) / activas.length)
    : 0
  const ahorroMes = avgAhorro * DEMO_DASHBOARD.totalVisitasMes

  const metrics = [
    { label: 'Visitas hoy', value: DEMO_DASHBOARD.totalVisitasHoy, icon: IconTrendingUp },
    { label: 'Esta semana', value: DEMO_DASHBOARD.totalVisitasSemana, icon: IconTrendingUp },
    { label: 'Este mes', value: DEMO_DASHBOARD.totalVisitasMes, icon: IconTrendingUp },
    { label: 'Promos activas', value: promosActivas, icon: IconTicket },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-montserrat text-2xl font-extrabold">
          Hola, {negocio.nombre.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-carbon/60">Así van tus resultados en enplan.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-card bg-white p-4 shadow-card">
            <m.icon size={18} className="text-lima-700" />
            <div className="mt-2 font-montserrat text-3xl font-extrabold leading-none">
              {m.value}
            </div>
            <div className="mt-1 text-xs font-medium text-carbon/50">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Savings generated */}
      {avgAhorro > 0 && (
        <div className="flex items-center gap-4 rounded-card bg-lima/15 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lima text-carbon">
            <IconPigMoney size={24} />
          </span>
          <div>
            <div className="font-montserrat text-2xl font-extrabold leading-none text-carbon">
              ${ahorroMes.toLocaleString('es-MX')}
            </div>
            <p className="mt-1 text-sm text-carbon/60">
              Ahorro que le generaste a tus clientes este mes
            </p>
          </div>
        </div>
      )}

      {/* Quick action */}
      <Link
        href="/validar"
        className="flex items-center justify-between rounded-card bg-carbon p-5 text-white transition-colors hover:bg-carbon-600"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lima text-carbon">
            <IconScan size={22} />
          </span>
          <div>
            <p className="font-montserrat font-bold">Validar un código</p>
            <p className="text-sm text-white/60">Registra la visita de un cliente</p>
          </div>
        </div>
        <IconArrowRight size={20} className="text-white/60" />
      </Link>

      {/* Visits today */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-montserrat text-lg font-bold">Visitas de hoy</h2>
          <span className="text-sm text-carbon/50">{DEMO_DASHBOARD.visitas.length} clientes</span>
        </div>
        <div className="flex flex-col gap-2">
          {DEMO_DASHBOARD.visitas.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-card bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-arena-dark/40 font-montserrat text-sm font-bold text-carbon">
                  {v.userName.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-carbon">{v.userName}</p>
                  <p className="text-xs text-carbon/50">{v.promoTitulo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-carbon/40">{v.hora}</span>
                <Badge status={badgeStatus[v.estado]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

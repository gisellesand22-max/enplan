'use client'

import Link from 'next/link'
import { IconScan, IconArrowRight, IconPigMoney } from '@tabler/icons-react'
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

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-carbon/35">
          Panel de negocio
        </p>
        <h1 className="mt-1 font-montserrat text-2xl font-bold text-carbon">
          Hola, {negocio.nombre.split(' ')[0]}
        </h1>
      </div>

      {/* Hero metric + supporting numbers */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-0">
        <div className="sm:pr-8">
          <span className="font-montserrat text-5xl font-bold tabular-nums leading-none text-carbon">
            {DEMO_DASHBOARD.totalVisitasMes}
          </span>
          <p className="mt-2 text-sm text-carbon/45">visitas este mes</p>
        </div>
        <div className="flex gap-6 sm:border-l sm:border-arena-dark sm:pl-8 sm:pb-1">
          <div>
            <span className="font-montserrat text-xl font-bold tabular-nums text-carbon">
              {DEMO_DASHBOARD.totalVisitasSemana}
            </span>
            <p className="text-xs text-carbon/35">semana</p>
          </div>
          <div>
            <span className="font-montserrat text-xl font-bold tabular-nums text-carbon">
              {DEMO_DASHBOARD.totalVisitasHoy}
            </span>
            <p className="text-xs text-carbon/35">hoy</p>
          </div>
          <div>
            <span className="font-montserrat text-xl font-bold tabular-nums text-lima-700">
              {promosActivas}
            </span>
            <p className="text-xs text-carbon/35">promos</p>
          </div>
        </div>
      </div>

      {/* Action cards row */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Savings */}
        {avgAhorro > 0 && (
          <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lima/12">
              <IconPigMoney size={22} className="text-lima-700" />
            </span>
            <div>
              <span className="font-montserrat text-2xl font-bold leading-none text-carbon">
                ${ahorroMes.toLocaleString('es-MX')}
              </span>
              <p className="mt-1 text-xs text-carbon/45">
                ahorro generado a clientes
              </p>
            </div>
          </div>
        )}

        {/* Validate CTA */}
        <Link
          href="/validar"
          className="group flex items-center justify-between rounded-2xl bg-carbon p-5 transition-colors hover:bg-carbon-600"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lima/20">
              <IconScan size={22} className="text-lima" />
            </span>
            <div>
              <p className="font-montserrat text-sm font-bold text-white">
                Validar código
              </p>
              <p className="text-xs text-white/40">Registra una visita</p>
            </div>
          </div>
          <IconArrowRight
            size={18}
            className="text-white/25 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Visits today */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-medium uppercase tracking-wider text-carbon/35">
            Visitas de hoy
          </h2>
          <span className="text-xs text-carbon/30">
            {DEMO_DASHBOARD.visitas.length} clientes
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          {DEMO_DASHBOARD.visitas.map((v, i) => (
            <div
              key={v.id}
              className={`flex items-center justify-between px-5 py-3.5 ${
                i > 0 ? 'border-t border-arena' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-carbon/[0.04] font-montserrat text-xs font-bold text-carbon/50">
                  {v.userName.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium text-carbon">
                    {v.userName}
                  </p>
                  <p className="text-xs text-carbon/35">{v.promoTitulo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs tabular-nums text-carbon/25">
                  {v.hora}
                </span>
                <Badge status={badgeStatus[v.estado]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

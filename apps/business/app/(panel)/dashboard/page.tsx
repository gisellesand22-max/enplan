'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  IconTrendingUp,
  IconTicket,
  IconUsers,
  IconCheck,
  IconClock,
} from '@tabler/icons-react'
import { useStore } from '../../../lib/store'
import { calcAhorro } from '../../../lib/demo'
import { countVisitas, fetchVisitas, type VisitaRow } from '../../../lib/negocio-api'

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const min = Math.floor(ms / 60000)
  if (min < 1) return 'Justo ahora'
  if (min < 60) return `Hace ${min} min`
  const hrs = Math.floor(min / 60)
  if (hrs < 24) return `Hace ${hrs}h`
  return `Hace ${Math.floor(hrs / 24)}d`
}

export default function DashboardPage() {
  const { negocioId, promos } = useStore()
  const activas = promos.filter((p) => p.activa)
  const promosActivas = activas.length

  const [visitasMes, setVisitasMes] = useState(0)
  const [visitasSemana, setVisitasSemana] = useState(0)
  const [recentActivity, setRecentActivity] = useState<VisitaRow[]>([])

  useEffect(() => {
    if (!negocioId) return
    const now = new Date()
    const mesAtras = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const semanaAtras = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    countVisitas(negocioId, mesAtras).then(setVisitasMes)
    countVisitas(negocioId, semanaAtras).then(setVisitasSemana)
    fetchVisitas(negocioId).then((rows) => setRecentActivity(rows.slice(0, 4)))
  }, [negocioId])

  const statCards = [
    {
      icon: IconTrendingUp,
      iconBg: 'bg-lima/20',
      iconColor: 'text-lima-700',
      label: 'Visitas este mes',
      value: visitasMes.toLocaleString(),
    },
    {
      icon: IconUsers,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      label: 'Visitas esta semana',
      value: visitasSemana.toLocaleString(),
    },
    {
      icon: IconTicket,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      label: 'Promos activas',
      value: promosActivas.toString(),
      change: promosActivas > 0 ? `${promosActivas} activa${promosActivas > 1 ? 's' : ''}` : 'Ninguna activa',
      changeColor: 'text-green-600',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-arena-dark/20 bg-white p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
              <card.icon size={20} className={card.iconColor} />
            </div>
            <div className="mt-4">
              <p className="text-sm text-carbon/50">{card.label}</p>
              <p className="font-montserrat text-2xl font-extrabold text-carbon">{card.value}</p>
              {card.change && (
                <p className={`mt-1 text-xs font-medium ${card.changeColor}`}>{card.change}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: Recent Activity + Quick Stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-arena-dark/20 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-montserrat text-lg font-bold text-carbon">Actividad reciente</h2>
            <Link href="/metricas" className="text-sm font-medium text-lima-700 hover:text-lima-800">
              Ver todo
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-arena-dark/15">
            {recentActivity.map((item) => {
              const isUsada = item.estado === 'usada'
              return (
                <div key={item.activacion_id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isUsada ? 'bg-lima/20' : 'bg-blue-100'
                    }`}
                  >
                    {isUsada ? (
                      <IconCheck size={18} className="text-lima-700" />
                    ) : (
                      <IconClock size={18} className="text-blue-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-carbon">{item.nombre_cliente}</p>
                    <p className="text-xs text-carbon/40">{item.promo_titulo}</p>
                  </div>
                  <span className="shrink-0 text-xs text-carbon/35">{timeAgo(item.timestamp_activacion)}</span>
                </div>
              )
            })}
            {recentActivity.length === 0 && (
              <p className="py-4 text-sm text-carbon/40">Aún no hay visitas registradas</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Top promos */}
          <div className="rounded-2xl border border-arena-dark/20 bg-white p-6">
            <h2 className="mb-4 font-montserrat text-lg font-bold text-carbon">Top promos</h2>
            <div className="flex flex-col gap-3">
              {promos.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <span className="text-sm text-carbon/70 truncate max-w-[60%]">{p.titulo}</span>
                  <span className="text-sm font-bold text-carbon">{calcAhorro(p) > 0 ? `$${calcAhorro(p)}` : '—'}</span>
                </div>
              ))}
              {promos.length === 0 && (
                <p className="text-sm text-carbon/40">Sin promos activas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

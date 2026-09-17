'use client'

import Link from 'next/link'
import {
  IconTrendingUp,
  IconTicket,
  IconUsers,
  IconDeviceMobile,
  IconChartBar,
  IconCheck,
  IconUserPlus,
  IconRefresh,
  IconBell,
} from '@tabler/icons-react'
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

  const statCards = [
    {
      icon: IconTrendingUp,
      iconBg: 'bg-lima/20',
      iconColor: 'text-lima-700',
      label: 'Visitas totales',
      value: DEMO_DASHBOARD.totalVisitasMes.toLocaleString(),
      change: '+12% vs mes pasado',
      changeColor: 'text-green-600',
    },
    {
      icon: IconUsers,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      label: 'Visitas esta semana',
      value: DEMO_DASHBOARD.totalVisitasSemana.toLocaleString(),
      change: '+5% vs semana pasada',
      changeColor: 'text-green-600',
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

  const recentActivity = [
    {
      icon: IconCheck,
      iconBg: 'bg-lima/20',
      iconColor: 'text-lima-700',
      title: 'Visita validada',
      subtitle: 'María G. usó 2x1 en café',
      time: 'Hace 2 min',
    },
    {
      icon: IconUserPlus,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Nuevo cliente',
      subtitle: 'Luis R. activó su primera promo',
      time: 'Hace 5 min',
    },
    {
      icon: IconRefresh,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Promo actualizada',
      subtitle: '2x1 en cualquier café editada',
      time: 'Hace 10 min',
    },
    {
      icon: IconBell,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Nueva activación',
      subtitle: 'Ana P. activó 2x1 en café',
      time: 'Hace 1 hora',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-arena-dark/20 bg-white p-5">
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
              <IconTrendingUp size={16} className="text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-carbon/50">{card.label}</p>
              <p className="font-montserrat text-2xl font-extrabold text-carbon">{card.value}</p>
              <p className={`mt-1 text-xs font-medium ${card.changeColor}`}>{card.change}</p>
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
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-carbon">{item.title}</p>
                  <p className="text-xs text-carbon/40">{item.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-carbon/35">{item.time}</span>
              </div>
            ))}
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

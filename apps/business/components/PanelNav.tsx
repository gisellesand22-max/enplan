'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconLayoutDashboard,
  IconChartBar,
  IconTicket,
  IconScan,
  IconBuildingStore,
  IconLock,
} from '@tabler/icons-react'
import { useStore } from '../lib/store'

const items = [
  { href: '/dashboard', label: 'Inicio', icon: IconLayoutDashboard },
  { href: '/metricas', label: 'Métricas', icon: IconChartBar },
  { href: '/promociones', label: 'Promos', icon: IconTicket },
  { href: '/validar', label: 'Validar', icon: IconScan },
  { href: '/perfil', label: 'Negocio', icon: IconBuildingStore },
]

function LockDot() {
  return (
    <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-carbon text-white">
      <IconLock size={9} />
    </span>
  )
}

export function PanelNav() {
  const pathname = usePathname()
  const { negocio } = useStore()
  const locked = (href: string) => href === '/metricas' && negocio.plan === 'basico'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-arena-dark bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + '/')
          return (
            <Link
              key={it.href}
              href={it.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              <span className="relative">
                <it.icon
                  size={22}
                  className={active ? 'text-carbon' : 'text-carbon/40'}
                  stroke={active ? 2.2 : 1.8}
                />
                {locked(it.href) && <LockDot />}
              </span>
              <span
                className={`text-[11px] font-medium ${
                  active ? 'text-carbon' : 'text-carbon/40'
                }`}
              >
                {it.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function PanelSidebar() {
  const pathname = usePathname()
  const { negocio } = useStore()
  const locked = (href: string) => href === '/metricas' && negocio.plan === 'basico'

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-arena-dark bg-white px-4 py-6 md:flex">
      <div className="flex flex-col gap-1">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + '/')
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-carbon text-white'
                  : 'text-carbon/70 hover:bg-arena-dark/30'
              }`}
            >
              <span className="relative">
                <it.icon size={20} stroke={active ? 2.2 : 1.8} />
                {locked(it.href) && <LockDot />}
              </span>
              {it.label}
              {locked(it.href) && (
                <IconLock size={14} className="ml-auto text-carbon/40" />
              )}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

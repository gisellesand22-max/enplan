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
  IconLogout,
} from '@tabler/icons-react'
import { useStore } from '../lib/store'
import { Logo } from './Logo'

const planLabel: Record<string, string> = {
  basico: 'Básico',
  pro: 'Pro',
  premium: 'Premium',
}

const items = [
  { href: '/dashboard', label: 'Inicio', icon: IconLayoutDashboard },
  { href: '/metricas', label: 'Métricas', icon: IconChartBar },
  { href: '/promociones', label: 'Promos', icon: IconTicket },
  { href: '/validar', label: 'Validar', icon: IconScan },
  { href: '/perfil', label: 'Negocio', icon: IconBuildingStore },
]

function LockDot() {
  return (
    <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-carbon">
      <IconLock size={9} />
    </span>
  )
}

export function PanelNav() {
  const pathname = usePathname()
  const { negocio } = useStore()
  const locked = (href: string) => href === '/metricas' && negocio.plan === 'basico'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-arena-dark/60 bg-white/95 backdrop-blur md:hidden">
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
                  className={active ? 'text-carbon' : 'text-carbon/35'}
                  stroke={active ? 2.2 : 1.6}
                />
                {locked(it.href) && <LockDot />}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  active ? 'text-carbon' : 'text-carbon/35'
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
    <aside className="hidden w-56 shrink-0 flex-col bg-carbon md:flex">
      {/* Brand + business info */}
      <div className="border-b border-white/8 px-5 py-5">
        <Logo size="sm" dark />
        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lima font-montserrat text-sm font-bold text-carbon">
            {negocio.nombre.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {negocio.nombre}
            </p>
            <span className="text-xs text-white/35">
              Plan {planLabel[negocio.plan]}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + '/')
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/45 hover:bg-white/5 hover:text-white/65'
              }`}
            >
              <span className="relative">
                <it.icon size={18} stroke={active ? 2 : 1.5} />
                {locked(it.href) && <LockDot />}
              </span>
              {it.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-lima" />
              )}
              {locked(it.href) && (
                <IconLock size={13} className="ml-auto text-white/25" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/8 px-3 py-3">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/35 transition-colors hover:text-white/55"
        >
          <IconLogout size={18} stroke={1.5} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}

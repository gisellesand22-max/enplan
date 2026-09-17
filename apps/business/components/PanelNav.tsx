'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconLayoutDashboard,
  IconChartBar,
  IconTicket,
  IconBuildingStore,
  IconLock,
  IconSettings,
  IconHelp,
} from '@tabler/icons-react'
import { useStore } from '../lib/store'

const mainItems = [
  { href: '/dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { href: '/promociones', label: 'Promociones', icon: IconTicket, badge: null as number | null },
  { href: '/metricas', label: 'Analíticas', icon: IconChartBar },
]

const accountItems = [
  { href: '/perfil', label: 'Configuración', icon: IconSettings },
  { href: '/ayuda', label: 'Ayuda & Soporte', icon: IconHelp },
]

const planLabel: Record<string, string> = {
  basico: 'Plan Básico',
  pro: 'Plan Pro',
  premium: 'Plan Premium',
}

function LockDot() {
  return (
    <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-carbon text-white">
      <IconLock size={9} />
    </span>
  )
}

export function PanelNav() {
  const pathname = usePathname()
  const { negocio, promos } = useStore()
  const locked = (href: string) => href === '/metricas' && negocio.plan === 'basico'
  const promosActivas = promos.filter(p => p.activa).length

  const bottomItems = [
    { href: '/dashboard', label: 'Inicio', icon: IconLayoutDashboard },
    { href: '/metricas', label: 'Métricas', icon: IconChartBar },
    { href: '/promociones', label: 'Promos', icon: IconTicket },
    { href: '/perfil', label: 'Negocio', icon: IconBuildingStore },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-arena-dark bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {bottomItems.map((it) => {
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
  const { negocio, promos } = useStore()
  const locked = (href: string) => href === '/metricas' && negocio.plan === 'basico'
  const promosActivas = promos.filter(p => p.activa).length

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-carbon/10 bg-carbon md:flex sticky top-0 h-screen overflow-y-auto">
      {/* Business identity */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lima">
          <span className="font-montserrat text-sm font-extrabold text-carbon">e.</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{negocio.nombre}</p>
          <p className="text-xs text-white/40">{planLabel[negocio.plan]}</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex flex-1 flex-col justify-between px-3 py-4">
        <div className="flex flex-col gap-1">
          {mainItems.map((it) => {
            const active = pathname === it.href || pathname.startsWith(it.href + '/')
            const showBadge = it.href === '/promociones' && promosActivas > 0
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <span className="relative">
                  <it.icon size={20} stroke={active ? 2 : 1.6} />
                  {locked(it.href) && <LockDot />}
                </span>
                {it.label}
                {showBadge && (
                  <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-lima text-[11px] font-bold text-carbon">
                    {promosActivas}
                  </span>
                )}
                {locked(it.href) && (
                  <IconLock size={14} className="ml-auto text-white/30" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Account section */}
        <div>
          <div className="mb-2 border-t border-white/10 pt-4">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
              Cuenta
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {accountItems.map((it) => {
              const active = pathname === it.href || pathname.startsWith(it.href + '/')
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  <it.icon size={20} stroke={1.6} />
                  {it.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

'use client'

import { Logo } from './Logo'
import { useStore } from '../lib/store'

const planLabel: Record<string, string> = {
  basico: 'Básico',
  pro: 'Pro',
  premium: 'Premium',
}

export function TopBar() {
  const { negocio } = useStore()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-arena-dark/50 bg-arena/95 px-5 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-lima/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lima-700">
          {planLabel[negocio.plan]}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-carbon font-montserrat text-[11px] font-bold text-white">
          {negocio.nombre.charAt(0)}
        </span>
      </div>
    </header>
  )
}

'use client'

import { IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { Logo } from './Logo'
import { useStore } from '../lib/store'
import { useAuth } from '../lib/auth'

const planLabel: Record<string, string> = {
  basico: 'Básico',
  pro: 'Pro',
  premium: 'Premium',
}

export function TopBar() {
  const { negocio } = useStore()
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-arena-dark bg-arena/90 px-5 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
        <span className="hidden text-sm font-medium text-carbon/50 sm:inline">
          {negocio.nombre}
        </span>
        <span className="rounded-full bg-lima/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-lima-700">
          {planLabel[negocio.plan]}
        </span>
      </div>
      <button
        type="button"
        onClick={async () => {
          await signOut()
          router.replace('/login')
        }}
        aria-label="Cerrar sesión"
        className="flex h-9 w-9 items-center justify-center rounded-full text-carbon/50 hover:bg-arena-dark/30 hover:text-carbon"
      >
        <IconLogout size={18} />
      </button>
    </header>
  )
}

'use client'

import { IconBell, IconMoon, IconUser, IconLogout } from '@tabler/icons-react'
import { useRouter, usePathname } from 'next/navigation'
import { useStore } from '../lib/store'
import { useAuth } from '../lib/auth'

const pageTitle: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Bienvenido de vuelta a tu panel' },
  '/promociones': { title: 'Promociones', subtitle: 'Gestiona tus ofertas activas' },
  '/validar': { title: 'Validar', subtitle: 'Registra la visita de un cliente' },
  '/metricas': { title: 'Analíticas', subtitle: 'Métricas de tu negocio' },
  '/ayuda': { title: 'Ayuda & Soporte', subtitle: 'Guías, preguntas frecuentes y contacto' },
  '/perfil': { title: 'Configuración', subtitle: 'Información de tu negocio' },
  '/cambiar-plan': { title: 'Cambiar plan', subtitle: 'Administra tu suscripción' },
}

export function TopBar() {
  const { negocio } = useStore()
  const { signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const current = pageTitle[pathname] || { title: 'Panel', subtitle: '' }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-arena-dark bg-arena/90 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-montserrat text-xl font-bold text-carbon">{current.title}</h1>
        <p className="text-sm text-carbon/40">{current.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-arena-dark/40 text-carbon/50 hover:bg-white hover:text-carbon transition-colors"
          aria-label="Notificaciones"
        >
          <IconBell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-arena-dark/40 text-carbon/50 hover:bg-white hover:text-carbon transition-colors"
          aria-label="Tema"
        >
          <IconMoon size={18} />
        </button>
        <button
          type="button"
          onClick={async () => {
            await signOut()
            router.replace('/login')
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-arena-dark/40 text-carbon/50 hover:bg-white hover:text-carbon transition-colors"
          aria-label="Cerrar sesión"
        >
          <IconUser size={18} />
        </button>
      </div>
    </header>
  )
}

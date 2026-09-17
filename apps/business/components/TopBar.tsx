'use client'

import { usePathname } from 'next/navigation'

const pageTitle: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Bienvenido de vuelta a tu panel' },
  '/promociones': { title: 'Promociones', subtitle: 'Gestiona tus ofertas activas' },
  '/metricas': { title: 'Analíticas', subtitle: 'Métricas de tu negocio' },
  '/ayuda': { title: 'Ayuda & Soporte', subtitle: 'Guías, preguntas frecuentes y contacto' },
  '/perfil': { title: 'Configuración', subtitle: 'Información de tu negocio' },
  '/cambiar-plan': { title: 'Cambiar plan', subtitle: 'Administra tu suscripción' },
}

export function TopBar() {
  const pathname = usePathname()

  const current = pageTitle[pathname] || { title: 'Panel', subtitle: '' }

  return (
    <header className="sticky top-0 z-20 border-b border-arena-dark bg-arena/90 px-6 py-4 backdrop-blur">
      <h1 className="font-montserrat text-xl font-bold text-carbon">{current.title}</h1>
      <p className="text-sm text-carbon/40">{current.subtitle}</p>
    </header>
  )
}

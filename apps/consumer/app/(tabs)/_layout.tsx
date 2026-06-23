import { Slot, usePathname, Link } from 'expo-router'
import { IconHome, IconTicket, IconUser } from '@tabler/icons-react'
import { useAuth } from '../_layout'

const tabs = [
  { href: '/', label: 'Inicio', icon: IconHome },
  { href: '/benefits', label: 'Beneficios', icon: IconTicket },
  { href: '/profile', label: 'Perfil', icon: IconUser },
] as const

export default function TabsLayout() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === ''
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-arena flex flex-col font-work-sans">
      {/* Header greeting area */}
      <header className="bg-arena pt-12 pb-4 px-5 shrink-0">
        <p className="font-montserrat font-bold text-2xl text-carbon">
          {user ? `Hola, ${user.nombre}` : 'Hola'} 👋
        </p>
        <p className="text-sm text-carbon/50 mt-0.5">
          Explora beneficios en Aguascalientes
        </p>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Slot />
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-arena-dark/20 z-50">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const active = isActive(tab.href)
            return (
              <Link key={tab.href} href={tab.href as any} className="flex flex-col items-center gap-1 py-2 px-4">
                <tab.icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? 'text-lima' : 'text-arena-dark'}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    active ? 'text-carbon' : 'text-arena-dark'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

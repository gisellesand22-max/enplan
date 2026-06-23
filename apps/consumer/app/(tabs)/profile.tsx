import { useAuth } from '../_layout'
import {
  IconTicket,
  IconBuildingStore,
  IconUsers,
  IconCoin,
  IconShare,
  IconLogout,
  IconLock,
  IconChevronRight,
} from '@tabler/icons-react'

const stats = [
  { label: 'Beneficios usados', value: '12', icon: IconTicket, color: 'bg-lima/15' },
  { label: 'Negocios visitados', value: '8', icon: IconBuildingStore, color: 'bg-carbon/5' },
  { label: 'Amigos referidos', value: '3', icon: IconUsers, color: 'bg-lima/15' },
  { label: 'Ahorro estimado', value: '$1,840', icon: IconCoin, color: 'bg-carbon/5' },
]

export default function ProfileScreen() {
  const { user, signOut, signInWithGoogle } = useAuth()

  if (!user) {
    return (
      <div className="px-5 pt-4 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl p-8 border border-arena-dark/20 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-lima/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <IconLock size={28} className="text-carbon" />
          </div>
          <h2 className="font-montserrat font-bold text-xl text-carbon mb-2">
            Tu perfil
          </h2>
          <p className="text-sm text-carbon/50 mb-6 leading-relaxed">
            Inicia sesión para ver tus estadísticas, referidos y configuración.
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-lima text-carbon font-bold py-3 rounded-full hover:bg-lima-400 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    )
  }

  const initials = user.nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="px-5 pt-2">
      {/* User info card */}
      <div className="bg-white rounded-2xl p-5 border border-arena-dark/20 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-carbon rounded-full flex items-center justify-center shrink-0">
            <span className="font-montserrat font-bold text-lg text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <h2 className="font-montserrat font-bold text-lg text-carbon truncate">
              {user.nombre}
            </h2>
            <p className="text-sm text-carbon/40 truncate">{user.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-lima/20 text-carbon">
              {user.plan === 'premium' ? 'Premium' : 'Plan gratuito'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 border border-arena-dark/20"
          >
            <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center mb-2.5`}>
              <stat.icon size={18} className="text-carbon" />
            </div>
            <p className="font-montserrat font-extrabold text-xl text-carbon">{stat.value}</p>
            <p className="text-[11px] text-carbon/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-arena-dark/20 overflow-hidden mb-5">
        <button className="w-full flex items-center justify-between p-4 hover:bg-arena/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-lima/15 rounded-lg flex items-center justify-center">
              <IconShare size={18} className="text-carbon" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-carbon">Compartir enplan.</p>
              <p className="text-[11px] text-carbon/40">Invita amigos y gana beneficios</p>
            </div>
          </div>
          <IconChevronRight size={18} className="text-arena-dark" />
        </button>

        <div className="h-px bg-arena-dark/15 mx-4" />

        <button
          onClick={signOut}
          className="w-full flex items-center justify-between p-4 hover:bg-arena/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <IconLogout size={18} className="text-red-500" />
            </div>
            <p className="font-semibold text-sm text-red-500">Cerrar sesión</p>
          </div>
          <IconChevronRight size={18} className="text-arena-dark" />
        </button>
      </div>

      <div className="h-8" />
    </div>
  )
}

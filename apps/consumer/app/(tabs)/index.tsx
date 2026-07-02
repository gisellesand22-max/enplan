import { useState } from 'react'
import { Link } from 'expo-router'
import {
  IconToolsKitchen2,
  IconBarbell,
  IconMusic,
  IconBuildingStore,
  IconMapPin,
  IconChevronRight,
} from '@tabler/icons-react'
import { getAllBusinesses, type Business } from '../../data/demo'

type Category = 'todos' | 'comida' | 'belleza' | 'fitness' | 'ocio' | 'tiendas' | 'servicios'

const chips: { key: Category; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'comida', label: 'Comida' },
  { key: 'belleza', label: 'Belleza' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'ocio', label: 'Ocio' },
  { key: 'tiendas', label: 'Tiendas' },
  { key: 'servicios', label: 'Servicios' },
]

const categoryIcons: Record<string, typeof IconToolsKitchen2> = {
  comida: IconToolsKitchen2,
  bienestar: IconBarbell,
  ocio: IconMusic,
  negocios: IconBuildingStore,
}

const tipoBadgeColors: Record<string, string> = {
  '2x1': 'bg-lima/20 text-carbon',
  porcentaje: 'bg-carbon text-white',
  beneficio_fijo: 'bg-lima text-carbon',
  clase: 'bg-carbon/10 text-carbon',
  servicio: 'bg-arena-dark/40 text-carbon',
}

function BusinessCard({ business }: { business: Business }) {
  const CatIcon = categoryIcons[business.categoria]
  const bestPromo = business.promos[0]

  return (
    <Link
      href={`/negocio/${business.id}` as any}
      className="block bg-white rounded-xl p-4 border border-arena-dark/20 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 bg-arena rounded-lg flex items-center justify-center shrink-0">
              {CatIcon && <CatIcon size={16} className="text-carbon/60" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-montserrat font-bold text-base text-carbon truncate">
                {business.nombre}
              </h3>
              <div className="flex items-center gap-1">
                <IconMapPin size={10} className="text-carbon/30 shrink-0" />
                <p className="text-[11px] text-carbon/40 truncate">
                  {business.direccion.split(',')[0]}
                </p>
              </div>
            </div>
          </div>

          {bestPromo && (
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  tipoBadgeColors[bestPromo.tipo] ?? 'bg-arena-dark/30 text-carbon'
                }`}
              >
                {bestPromo.tipoLabel}
              </span>
              <span className="text-sm text-carbon/70 truncate">{bestPromo.titulo}</span>
            </div>
          )}

          {business.promos.length > 1 && (
            <p className="text-[10px] text-carbon/30 mt-1.5 ml-0.5">
              +{business.promos.length - 1} promoción{business.promos.length - 1 > 1 ? 'es' : ''} más
            </p>
          )}
        </div>

        <div className="ml-3 shrink-0 w-9 h-9 bg-lima rounded-xl flex items-center justify-center">
          <IconChevronRight size={16} className="text-carbon" />
        </div>
      </div>
    </Link>
  )
}

export default function HomeScreen() {
  const [activeChip, setActiveChip] = useState<Category>('todos')
  const allBusinesses = getAllBusinesses()

  const filtered =
    activeChip === 'todos'
      ? allBusinesses
      : allBusinesses.filter((b) => b.categoria === activeChip)

  return (
    <div className="px-5">
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 pt-2 scrollbar-hide">
        {chips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeChip === chip.key
                ? 'bg-carbon text-white'
                : 'bg-arena-dark/40 text-carbon/60'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-carbon/40 mb-3">
        {filtered.length} {filtered.length === 1 ? 'negocio' : 'negocios'} disponibles
      </p>

      {/* Business cards */}
      <div className="space-y-3 mt-2">
        {filtered.map((biz) => (
          <BusinessCard key={biz.id} business={biz} />
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-carbon/40 text-sm">
              No hay negocios en esta categoría todavía.
            </p>
          </div>
        )}
      </div>

      <div className="h-8" />
    </div>
  )
}

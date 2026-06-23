'use client'

import { useLocalSearchParams, Link, useRouter } from 'expo-router'
import {
  IconArrowLeft,
  IconMapPin,
  IconClock,
  IconPhone,
  IconTicket,
} from '@tabler/icons-react'
import { getBusinessById } from '../../data/demo'

const tipoBgColor: Record<string, string> = {
  '2x1': 'bg-lima/20 text-carbon',
  porcentaje: 'bg-carbon text-white',
  beneficio_fijo: 'bg-lima text-carbon',
  clase: 'bg-carbon/10 text-carbon',
  servicio: 'bg-arena-dark/40 text-carbon',
}

export default function NegocioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const business = getBusinessById(id ?? '')

  if (!business) {
    return (
      <div className="min-h-screen bg-arena flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-montserrat font-bold text-xl text-carbon mb-2">
            Negocio no encontrado
          </p>
          <p className="text-sm text-carbon/50 mb-6">
            Es posible que este negocio ya no esté disponible.
          </p>
          <Link
            href="/"
            className="bg-lima text-carbon font-semibold px-6 py-2.5 rounded-full text-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-arena font-work-sans">
      {/* Top bar */}
      <div className="bg-arena sticky top-0 z-40 border-b border-arena-dark/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-lg mx-auto">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-arena-dark/20"
          >
            <IconArrowLeft size={18} className="text-carbon" />
          </button>
          <span className="text-sm font-medium text-carbon/50 truncate">
            {business.nombre}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Business Info */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="font-montserrat font-extrabold text-2xl text-carbon leading-tight">
              {business.nombre}
            </h1>
            <span className="bg-carbon text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 mt-1">
              {business.categoriaLabel}
            </span>
          </div>

          <p className="text-sm text-carbon/60 leading-relaxed mb-5">
            {business.descripcion}
          </p>

          <div className="bg-white rounded-xl border border-arena-dark/20 divide-y divide-arena-dark/15">
            <div className="flex items-start gap-3 p-4">
              <IconClock size={18} className="text-lima shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-carbon/40 uppercase tracking-wider mb-0.5">
                  Horario
                </p>
                <p className="text-sm text-carbon">{business.horarios}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <IconMapPin size={18} className="text-lima shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-carbon/40 uppercase tracking-wider mb-0.5">
                  Dirección
                </p>
                <p className="text-sm text-carbon">{business.direccion}</p>
              </div>
            </div>
            {business.telefono && (
              <div className="flex items-start gap-3 p-4">
                <IconPhone size={18} className="text-lima shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-carbon/40 uppercase tracking-wider mb-0.5">
                    Teléfono
                  </p>
                  <p className="text-sm text-carbon">{business.telefono}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Promotions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <IconTicket size={20} className="text-lima" />
            <h2 className="font-montserrat font-bold text-lg text-carbon">
              Promociones activas
            </h2>
          </div>

          <div className="space-y-4">
            {business.promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl border border-arena-dark/20 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      tipoBgColor[promo.tipo] ?? 'bg-arena-dark/30 text-carbon'
                    }`}
                  >
                    {promo.tipoLabel}
                  </span>
                </div>
                <h3 className="font-montserrat font-bold text-base text-carbon mb-1">
                  {promo.titulo}
                </h3>
                <p className="text-sm text-carbon/50 leading-relaxed mb-4">
                  {promo.descripcion}
                </p>
                <Link
                  href={`/activar/${promo.id}` as any}
                  className="block w-full bg-lima text-carbon font-bold text-sm py-3 rounded-full text-center hover:bg-lima-400 transition-colors"
                >
                  Activar beneficio
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

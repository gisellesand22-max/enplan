'use client'

import Link from 'next/link'
import { IconPlus, IconPencil, IconTrash, IconCrown } from '@tabler/icons-react'
import { Badge } from '@enplan/ui'
import { useStore } from '../../../lib/store'
import { PLAN_LIMITS, PROMO_TYPE_LABEL, calcAhorro } from '../../../lib/demo'

export default function PromocionesPage() {
  const { negocio, promos, togglePromo, deletePromo } = useStore()
  const limit = PLAN_LIMITS[negocio.plan]
  const atLimit = promos.length >= limit
  const limitLabel = limit === Infinity ? 'ilimitadas' : `${promos.length} de ${limit}`

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-montserrat text-2xl font-extrabold">Mis promociones</h1>
          <p className="text-sm text-carbon/60">
            Plan {negocio.plan} · {limitLabel} promociones
          </p>
        </div>
        {!atLimit && (
          <Link
            href="/promociones/nueva"
            className="inline-flex items-center gap-1.5 rounded-chip bg-lima px-4 py-2.5 text-sm font-semibold text-carbon transition-colors hover:bg-lima-400"
          >
            <IconPlus size={18} /> Nueva
          </Link>
        )}
      </div>

      {promos.length === 0 && (
        <div className="rounded-card bg-white p-8 text-center shadow-card">
          <p className="text-sm text-carbon/60">
            Aún no tienes promociones. Crea la primera para empezar a atraer clientes.
          </p>
          <Link
            href="/promociones/nueva"
            className="mt-4 inline-flex items-center gap-1.5 rounded-chip bg-lima px-4 py-2.5 text-sm font-semibold text-carbon"
          >
            <IconPlus size={18} /> Crear promoción
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {promos.map((p) => (
          <div key={p.id} className="rounded-card bg-white p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge status={p.activa ? 'activa' : 'expirada'}>
                    {p.activa ? 'Activa' : 'Pausada'}
                  </Badge>
                  <span className="text-xs font-medium text-carbon/50">
                    {PROMO_TYPE_LABEL[p.tipo]}
                  </span>
                  {calcAhorro(p) > 0 && (
                    <span className="rounded-full bg-lima/20 px-2 py-0.5 text-xs font-semibold text-lima-700">
                      Ahorro ~${calcAhorro(p).toLocaleString('es-MX')}
                    </span>
                  )}
                </div>
                <h3 className="font-montserrat text-lg font-bold text-carbon">{p.titulo}</h3>
                <p className="mt-1 text-sm text-carbon/60">{p.descripcion}</p>
                {p.condiciones && (
                  <p className="mt-2 text-xs text-carbon/40">{p.condiciones}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-arena-dark/50 pt-3">
              {/* Toggle */}
              <button
                type="button"
                onClick={() => togglePromo(p.id)}
                className="flex items-center gap-2 text-sm font-medium text-carbon/70"
              >
                <span
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    p.activa ? 'bg-lima' : 'bg-arena-dark'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      p.activa ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </span>
                {p.activa ? 'Activa' : 'Pausada'}
              </button>

              <div className="flex items-center gap-1">
                <Link
                  href={`/promociones/${p.id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-carbon/60 hover:bg-arena-dark/30"
                  aria-label="Editar"
                >
                  <IconPencil size={17} />
                </Link>
                <button
                  type="button"
                  onClick={() => deletePromo(p.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-carbon/60 hover:bg-red-50 hover:text-red-500"
                  aria-label="Eliminar"
                >
                  <IconTrash size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {atLimit && limit !== Infinity && (
        <div className="rounded-card border border-lima/40 bg-lima/10 p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lima text-carbon">
              <IconCrown size={18} />
            </span>
            <div>
              <p className="font-montserrat font-bold text-carbon">
                Llegaste al límite de tu plan
              </p>
              <p className="mt-0.5 text-sm text-carbon/60">
                Sube de plan para publicar más promociones al mismo tiempo.
              </p>
              <Link
                href="/perfil"
                className="mt-3 inline-flex items-center gap-1.5 rounded-chip bg-carbon px-4 py-2 text-sm font-semibold text-white"
              >
                Ver planes
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

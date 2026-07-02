'use client'

import { useRef, useState } from 'react'
import {
  IconCamera,
  IconBuildingStore,
  IconCheck,
  IconCreditCard,
} from '@tabler/icons-react'
import { Button, Input } from '@enplan/ui'
import { useStore } from '../../../lib/store'
import { CATEGORIES, PLANES, type PlanNegocio } from '../../../lib/demo'

export default function PerfilPage() {
  const { negocio, updateNegocio, setPlan } = useStore()
  const [saved, setSaved] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  function readImage(file: File, key: 'logoUrl' | 'coverUrl') {
    const reader = new FileReader()
    reader.onload = () => updateNegocio({ [key]: reader.result as string })
    reader.readAsDataURL(file)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-montserrat text-2xl font-extrabold">Mi negocio</h1>

      {/* Cover + logo */}
      <div>
        <button
          type="button"
          onClick={() => coverRef.current?.click()}
          className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-arena-dark bg-white"
        >
          {negocio.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={negocio.coverUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-1 text-carbon/40">
              <IconCamera size={24} />
              <span className="text-xs font-medium">Agregar foto de portada</span>
            </span>
          )}
        </button>
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files?.[0] && readImage(e.target.files[0], 'coverUrl')}
        />

        <div className="-mt-8 ml-5 flex items-end gap-3">
          <button
            type="button"
            onClick={() => logoRef.current?.click()}
            className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-card border-2 border-dashed border-arena-dark bg-arena shadow-card"
          >
            {negocio.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={negocio.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <IconBuildingStore size={24} className="text-carbon/40" />
            )}
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-lima text-carbon">
              <IconCamera size={13} />
            </span>
          </button>
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files?.[0] && readImage(e.target.files[0], 'logoUrl')}
          />
        </div>
      </div>

      {/* Business data */}
      <form onSubmit={handleSave} className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card">
        <Input
          label="Nombre del negocio"
          value={negocio.nombre}
          onChange={(e) => updateNegocio({ nombre: e.target.value })}
        />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">Categoría</label>
          <select
            value={negocio.categoria}
            onChange={(e) => updateNegocio({ categoria: e.target.value })}
            className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none focus:border-carbon focus:ring-1 focus:ring-carbon"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">Descripción</label>
          <textarea
            value={negocio.descripcion}
            onChange={(e) => updateNegocio({ descripcion: e.target.value })}
            rows={3}
            className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon"
          />
        </div>

        <Input
          label="Dirección"
          value={negocio.direccion}
          onChange={(e) => updateNegocio({ direccion: e.target.value })}
        />
        <Input
          label="Teléfono / WhatsApp"
          value={negocio.telefono}
          onChange={(e) => updateNegocio({ telefono: e.target.value })}
        />
        <Input
          label="Sitio web"
          placeholder="https://…"
          value={negocio.website}
          onChange={(e) => updateNegocio({ website: e.target.value })}
        />
        <Input
          label="Instagram"
          placeholder="@tunegocio"
          value={negocio.instagram}
          onChange={(e) => updateNegocio({ instagram: e.target.value })}
        />

        <Button type="submit" fullWidth>
          {saved ? (
            <>
              <IconCheck size={18} /> Guardado
            </>
          ) : (
            'Guardar cambios'
          )}
        </Button>
      </form>

      {/* Plan / billing */}
      <div>
        <h2 className="mb-1 font-montserrat text-lg font-bold">Tu plan</h2>
        <p className="mb-3 text-sm text-carbon/60">
          Cobro automático mensual gestionado por Stripe. Cambia o cancela cuando quieras.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANES.map((p) => {
            const active = negocio.plan === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id as PlanNegocio)}
                className={`rounded-card border-2 p-4 text-left transition-colors ${
                  active
                    ? 'border-carbon bg-white shadow-card'
                    : 'border-arena-dark bg-white/60 hover:border-carbon/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-extrabold">{p.nombre}</span>
                  {active && (
                    <span className="rounded-full bg-lima px-2 py-0.5 text-[10px] font-bold uppercase text-carbon">
                      Actual
                    </span>
                  )}
                </div>
                <div className="mt-0.5 font-montserrat text-xl font-extrabold">
                  ${p.precio.toLocaleString('es-MX')}
                  <span className="text-xs font-medium text-carbon/50"> /mes</span>
                </div>
              </button>
            )
          })}
        </div>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-carbon/60 hover:text-carbon"
        >
          <IconCreditCard size={17} /> Gestionar método de pago y facturas (Stripe)
        </button>
      </div>
    </div>
  )
}

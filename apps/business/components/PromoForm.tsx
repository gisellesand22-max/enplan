'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { Button, Input } from '@enplan/ui'
import { useStore } from '../lib/store'
import { PROMO_TYPES, calcAhorro, valorField, type Promo, type TipoPromo } from '../lib/demo'

export function PromoForm({ existing }: { existing?: Promo }) {
  const router = useRouter()
  const { addPromo, updatePromo } = useStore()
  const isEdit = Boolean(existing)

  const [tipo, setTipo] = useState<TipoPromo>(existing?.tipo ?? 'porcentaje')
  const [titulo, setTitulo] = useState(existing?.titulo ?? '')
  const [descripcion, setDescripcion] = useState(existing?.descripcion ?? '')
  const [condiciones, setCondiciones] = useState(existing?.condiciones ?? '')
  const [activa, setActiva] = useState(existing?.activa ?? true)
  const [valor, setValor] = useState<string>(existing?.valor ? String(existing.valor) : '')
  const [precioRef, setPrecioRef] = useState<string>(
    existing?.precioRef ? String(existing.precioRef) : '',
  )

  const field = valorField(tipo)
  const ahorro = calcAhorro({ tipo, valor: Number(valor) || 0, precioRef: Number(precioRef) || 0 })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      tipo,
      titulo,
      descripcion,
      condiciones,
      activa,
      valor: Number(valor) || 0,
      precioRef: field.needsPrecioRef ? Number(precioRef) || 0 : undefined,
    }
    if (isEdit && existing) {
      updatePromo(existing.id, payload)
    } else {
      addPromo(payload)
    }
    router.push('/promociones')
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => router.push('/promociones')}
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-carbon/60 hover:text-carbon"
      >
        <IconArrowLeft size={18} /> Volver
      </button>

      <h1 className="font-montserrat text-2xl font-extrabold">
        {isEdit ? 'Editar promoción' : 'Nueva promoción'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card">
        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">Tipo de promoción</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoPromo)}
            className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none focus:border-carbon focus:ring-1 focus:ring-carbon"
          >
            {PROMO_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Value (tipo-aware) → powers savings calculation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-carbon">{field.label}</label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0"
              required
              className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon"
            />
            <p className="mt-1 text-xs text-carbon/40">{field.help}</p>
          </div>
          {field.needsPrecioRef && (
            <div className="w-full">
              <label className="mb-1.5 block text-sm font-medium text-carbon">
                Precio de referencia (MXN)
              </label>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={precioRef}
                onChange={(e) => setPrecioRef(e.target.value)}
                placeholder="Ej. 250"
                className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon"
              />
              <p className="mt-1 text-xs text-carbon/40">Precio normal, para calcular el ahorro</p>
            </div>
          )}
        </div>

        {/* Live savings preview */}
        <div className="flex items-center justify-between rounded-card bg-lima/10 px-4 py-3">
          <span className="text-sm font-medium text-carbon/70">
            Tu cliente ahorra aprox.
          </span>
          <span className="font-montserrat text-xl font-extrabold text-carbon">
            ${ahorro.toLocaleString('es-MX')}
          </span>
        </div>

        <Input
          label="Título"
          placeholder="Ej. 2x1 en cualquier café"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Explica el beneficio en una frase clara."
            rows={2}
            required
            className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon"
          />
        </div>

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">
            Condiciones <span className="text-carbon/40">(opcional)</span>
          </label>
          <textarea
            value={condiciones}
            onChange={(e) => setCondiciones(e.target.value)}
            placeholder="Ej. Válido de lunes a jueves. No acumulable."
            rows={2}
            className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-carbon/80">
          <button
            type="button"
            onClick={() => setActiva((a) => !a)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              activa ? 'bg-lima' : 'bg-arena-dark'
            }`}
            aria-pressed={activa}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                activa ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
          Publicar como activa
        </label>

        <div className="mt-2 flex gap-3">
          <Button type="submit" fullWidth>
            {isEdit ? 'Guardar cambios' : 'Crear promoción'}
          </Button>
        </div>
      </form>
    </div>
  )
}

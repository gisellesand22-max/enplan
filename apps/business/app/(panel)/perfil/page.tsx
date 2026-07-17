'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import {
  IconCamera,
  IconBuildingStore,
  IconCheck,
  IconCreditCard,
  IconExternalLink,
  IconLoader2,
  IconPlus,
  IconTrash,
  IconX,
  IconClock,
  IconLock,
} from '@tabler/icons-react'
import { Button, Input } from '@enplan/ui'
import { useStore } from '../../../lib/store'
import { useAuth } from '../../../lib/auth'
import { supabase } from '../../../lib/supabase'
import {
  CATEGORIES,
  DIAS,
  MAX_FOTOS,
  PLANES,
  type Horario,
  type PlanNegocio,
} from '../../../lib/demo'

function compressImage(
  file: File,
  maxDim: number,
  quality = 0.75,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}

const DESC_MAX = 280

export default function PerfilPage() {
  const { negocio, updateNegocio, setPlan, addFoto, removeFoto } = useStore()
  const [saved, setSaved] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [cancelMsg, setCancelMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const logoRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const fotosRef = useRef<HTMLInputElement>(null)

  const { session, subscription } = useAuth()
  const stripeCustomerId = subscription?.stripeCustomerId ?? null
  const stripeSubscriptionId = subscription?.stripeSubscriptionId ?? null
  const authToken = session?.access_token

  useEffect(() => {
    if (subscription?.plan && subscription.plan !== negocio.plan) {
      setPlan(subscription.plan)
    }
  }, [subscription?.plan, negocio.plan, setPlan])

  async function handleImage(
    file: File,
    key: 'logoUrl' | 'coverUrl',
    maxDim: number,
  ) {
    try {
      const compressed = await compressImage(file, maxDim)
      updateNegocio({ [key]: compressed })
    } catch {
      // silently fail
    }
  }

  async function handleGalleryImage(file: File) {
    try {
      const compressed = await compressImage(file, 800)
      addFoto(compressed)
    } catch {
      // silently fail
    }
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}

    if (negocio.telefono && !/^[\d\s+\-()]+$/.test(negocio.telefono)) {
      errs.telefono = 'Solo números, espacios, +, - y paréntesis'
    }
    if (
      negocio.website &&
      !/^https?:\/\/.+/.test(negocio.website)
    ) {
      errs.website = 'Debe empezar con http:// o https://'
    }
    if (
      negocio.instagram &&
      !/^@?[\w.]{1,30}$/.test(negocio.instagram)
    ) {
      errs.instagram = 'Formato inválido (ej. @tunegocio)'
    }
    if (negocio.descripcion.length > DESC_MAX) {
      errs.descripcion = `Máximo ${DESC_MAX} caracteres`
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function openPortal() {
    if (!stripeCustomerId) return
    setPortalLoading(true)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers,
        body: JSON.stringify({ customerId: stripeCustomerId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch {
      setPortalLoading(false)
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Mínimo 8 caracteres' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Las contraseñas no coinciden' })
      return
    }
    if (!supabase) {
      setPasswordMsg({ type: 'error', text: 'Auth no configurado' })
      return
    }
    setPasswordLoading(true)
    setPasswordMsg(null)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordMsg({ type: 'error', text: error.message })
    } else {
      setPasswordMsg({ type: 'ok', text: 'Contraseña actualizada' })
      setNewPassword('')
      setConfirmPassword('')
    }
    setPasswordLoading(false)
  }

  function updateHorario(dia: string, patch: Partial<Horario>) {
    const updated = {
      ...negocio.horarios,
      [dia]: { ...negocio.horarios[dia], ...patch },
    }
    updateNegocio({ horarios: updated as Record<string, Horario> })
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-montserrat text-2xl font-bold">Mi negocio</h1>

      {/* Cover + logo */}
      <div>
        <div className="relative">
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-arena-dark bg-white transition-colors hover:border-carbon/30"
          >
            {negocio.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={negocio.coverUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex flex-col items-center gap-1.5 text-carbon/30">
                <IconCamera size={28} />
                <span className="text-xs font-medium">
                  Agregar foto de portada
                </span>
              </span>
            )}
          </button>
          {negocio.coverUrl && (
            <button
              type="button"
              onClick={() => updateNegocio({ coverUrl: null })}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-carbon/70 text-white transition-colors hover:bg-carbon"
            >
              <IconTrash size={14} />
            </button>
          )}
        </div>
        <input
          ref={coverRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => {
            if (e.target.files?.[0])
              handleImage(e.target.files[0], 'coverUrl', 1200)
            e.target.value = ''
          }}
        />

        <div className="-mt-10 ml-5 flex items-end gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => logoRef.current?.click()}
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-arena-dark bg-arena shadow-card transition-colors hover:border-carbon/30"
            >
              {negocio.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={negocio.logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <IconBuildingStore size={24} className="text-carbon/30" />
              )}
            </button>
            <button
              type="button"
              onClick={() =>
                negocio.logoUrl
                  ? updateNegocio({ logoUrl: null })
                  : logoRef.current?.click()
              }
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-lima text-carbon"
            >
              {negocio.logoUrl ? <IconX size={12} /> : <IconCamera size={12} />}
            </button>
          </div>
          <input
            ref={logoRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0])
                handleImage(e.target.files[0], 'logoUrl', 300)
              e.target.value = ''
            }}
          />
        </div>
      </div>

      {/* Photo gallery */}
      <div>
        <h2 className="mb-1 text-xs font-medium uppercase tracking-wider text-carbon/35">
          Galería de fotos
        </h2>
        <p className="mb-3 text-sm text-carbon/45">
          Hasta {MAX_FOTOS} fotos de tu negocio. Estas se muestran en tu perfil
          dentro de la app.
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {(negocio.fotos ?? []).map((foto, i) => (
            <div key={i} className="group relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={foto}
                alt={`Foto ${i + 1}`}
                className="h-full w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => removeFoto(i)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-carbon/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <IconX size={12} />
              </button>
            </div>
          ))}
          {(negocio.fotos?.length ?? 0) < MAX_FOTOS && (
            <button
              type="button"
              onClick={() => fotosRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-arena-dark text-carbon/25 transition-colors hover:border-carbon/30 hover:text-carbon/40"
            >
              <IconPlus size={24} />
            </button>
          )}
        </div>
        <input
          ref={fotosRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => {
            if (e.target.files?.[0]) handleGalleryImage(e.target.files[0])
            e.target.value = ''
          }}
        />
      </div>

      {/* Business data */}
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card"
      >
        <h2 className="text-xs font-medium uppercase tracking-wider text-carbon/35">
          Datos del negocio
        </h2>

        <Input
          label="Nombre del negocio"
          value={negocio.nombre}
          onChange={(e) => updateNegocio({ nombre: e.target.value })}
        />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-carbon">
            Categoría
          </label>
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
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-sm font-medium text-carbon">
              Descripción
            </label>
            <span
              className={`text-xs tabular-nums ${
                negocio.descripcion.length > DESC_MAX
                  ? 'font-medium text-red-500'
                  : 'text-carbon/30'
              }`}
            >
              {negocio.descripcion.length}/{DESC_MAX}
            </span>
          </div>
          <textarea
            value={negocio.descripcion}
            onChange={(e) => updateNegocio({ descripcion: e.target.value })}
            maxLength={DESC_MAX + 20}
            rows={3}
            className={`w-full rounded-card border bg-arena px-4 py-2.5 text-base text-carbon outline-none placeholder:text-carbon/40 focus:border-carbon focus:ring-1 focus:ring-carbon ${
              errors.descripcion
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-arena-dark'
            }`}
          />
          {errors.descripcion && (
            <p className="mt-1 text-sm text-red-500">{errors.descripcion}</p>
          )}
        </div>

        <Input
          label="Dirección"
          value={negocio.direccion}
          onChange={(e) => updateNegocio({ direccion: e.target.value })}
        />
        <div>
          <Input
            label="Teléfono / WhatsApp"
            value={negocio.telefono}
            onChange={(e) => updateNegocio({ telefono: e.target.value })}
            error={errors.telefono}
          />
        </div>
        <div>
          <Input
            label="Sitio web"
            placeholder="https://…"
            value={negocio.website}
            onChange={(e) => updateNegocio({ website: e.target.value })}
            error={errors.website}
          />
        </div>
        <div>
          <Input
            label="Instagram"
            placeholder="@tunegocio"
            value={negocio.instagram}
            onChange={(e) => updateNegocio({ instagram: e.target.value })}
            error={errors.instagram}
          />
        </div>

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

      {/* Hours of operation */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <IconClock size={18} className="text-carbon/40" />
          <h2 className="text-xs font-medium uppercase tracking-wider text-carbon/35">
            Horario de atención
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {DIAS.map((dia) => {
            const h = negocio.horarios?.[dia.key] ?? {
              abre: '09:00',
              cierra: '18:00',
              cerrado: false,
            }
            return (
              <div
                key={dia.key}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-arena/50"
              >
                <span className="w-12 text-sm font-medium text-carbon/60">
                  {dia.short}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateHorario(dia.key, { cerrado: !h.cerrado })
                  }
                  className={`flex h-6 w-10 shrink-0 items-center rounded-full px-0.5 transition-colors ${
                    h.cerrado ? 'bg-arena-dark' : 'bg-lima'
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      h.cerrado ? '' : 'translate-x-4'
                    }`}
                  />
                </button>
                {h.cerrado ? (
                  <span className="text-sm text-carbon/30">Cerrado</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={h.abre}
                      onChange={(e) =>
                        updateHorario(dia.key, { abre: e.target.value })
                      }
                      className="rounded-md border border-arena-dark bg-arena px-2 py-1 text-sm text-carbon outline-none focus:border-carbon"
                    />
                    <span className="text-xs text-carbon/30">a</span>
                    <input
                      type="time"
                      value={h.cierra}
                      onChange={(e) =>
                        updateHorario(dia.key, { cierra: e.target.value })
                      }
                      className="rounded-md border border-arena-dark bg-arena px-2 py-1 text-sm text-carbon outline-none focus:border-carbon"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Plan / billing */}
      <div>
        <h2 className="mb-1 text-xs font-medium uppercase tracking-wider text-carbon/35">
          Tu plan
        </h2>
        <p className="mb-3 text-sm text-carbon/45">
          Cobro automático mensual gestionado por Stripe. Cambia o cancela
          cuando quieras.
        </p>

        {/* Current plan summary */}
        <div className="flex items-center justify-between rounded-2xl border-2 border-carbon bg-white p-5 shadow-card">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-lg font-bold">
                Plan {PLANES.find((p) => p.id === negocio.plan)?.nombre}
              </span>
              <span className="rounded-full bg-lima px-2 py-0.5 text-[10px] font-bold uppercase text-carbon">
                Actual
              </span>
            </div>
            <p className="mt-0.5 font-montserrat text-xl font-bold">
              ${PLANES.find((p) => p.id === negocio.plan)?.precio.toLocaleString('es-MX')}
              <span className="text-xs font-medium text-carbon/40"> /mes</span>
            </p>
          </div>
          <a
            href="/cambiar-plan"
            className="rounded-xl bg-carbon px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-carbon/80"
          >
            Cambiar plan
          </a>
        </div>

        {/* Stripe portal */}
        {stripeCustomerId ? (
          <button
            type="button"
            onClick={openPortal}
            disabled={portalLoading}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-carbon/50 transition-colors hover:text-carbon disabled:opacity-50"
          >
            {portalLoading
              ? <IconLoader2 size={17} className="animate-spin" />
              : <IconCreditCard size={17} />}
            Gestionar método de pago y facturas
            <IconExternalLink size={13} />
          </button>
        ) : (
          <p className="mt-3 flex items-center gap-2 text-sm text-carbon/30">
            <IconCreditCard size={17} />
            Gestión de pagos disponible cuando tu suscripción esté activa
          </p>
        )}

        {/* Cancel subscription */}
        {stripeSubscriptionId && (
          <div className="mt-4">
            {cancelMsg && (
              <p className="mb-2 rounded-lg bg-lima/10 px-3 py-2 text-sm text-carbon">
                {cancelMsg}
              </p>
            )}
            {!cancelConfirm ? (
              <button
                type="button"
                onClick={() => setCancelConfirm(true)}
                className="text-sm font-medium text-red-400 transition-colors hover:text-red-600"
              >
                Cancelar plan
              </button>
            ) : (
              <div className="flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-carbon">
                  Tu plan seguirá activo hasta el final del periodo de facturación. Después de eso, no se realizarán más cobros.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setCancelConfirm(false); setCancelMsg(null) }}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-carbon/50 hover:text-carbon"
                    disabled={cancelLoading}
                  >
                    No, mantener plan
                  </button>
                  <button
                    type="button"
                    disabled={cancelLoading}
                    onClick={async () => {
                      setCancelLoading(true)
                      try {
                        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
                        if (authToken) headers['Authorization'] = `Bearer ${authToken}`
                        const res = await fetch('/api/stripe/cancel-subscription', {
                          method: 'POST',
                          headers,
                          body: JSON.stringify({ subscriptionId: stripeSubscriptionId }),
                        })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data.error)
                        setCancelConfirm(false)
                        setCancelMsg('Tu plan se cancelará al final del periodo actual. No se harán más cobros.')
                      } catch (err) {
                        setCancelMsg(err instanceof Error ? err.message : 'Error al cancelar')
                      } finally {
                        setCancelLoading(false)
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    {cancelLoading && <IconLoader2 size={14} className="animate-spin" />}
                    Sí, cancelar plan
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Password change */}
      {session && (
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <IconLock size={18} className="text-carbon/40" />
            <h2 className="text-xs font-medium uppercase tracking-wider text-carbon/35">
              Cambiar contraseña
            </h2>
          </div>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
            <Input
              label="Nueva contraseña"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordMsg && (
              <p className={`text-sm ${passwordMsg.type === 'ok' ? 'text-green-600' : 'text-red-500'}`}>
                {passwordMsg.text}
              </p>
            )}
            <Button type="submit" fullWidth loading={passwordLoading}>
              Actualizar contraseña
            </Button>
          </form>
        </div>
      )}

      {/* Profile preview */}
      <div>
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-carbon/35">
          Así se ve tu perfil en la app
        </h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          {/* Preview cover */}
          <div className="relative h-32 bg-gradient-to-br from-carbon/10 to-arena-dark/40">
            {negocio.coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={negocio.coverUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute -bottom-6 left-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-arena shadow-card">
                {negocio.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={negocio.logoUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <IconBuildingStore size={20} className="text-carbon/30" />
                )}
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 pt-9">
            <div className="flex items-center gap-2">
              <h3 className="font-montserrat text-lg font-bold">
                {negocio.nombre || 'Nombre del negocio'}
              </h3>
              <span className="rounded-full bg-lima/15 px-2 py-0.5 text-[10px] font-bold text-lima-700">
                {negocio.categoria}
              </span>
            </div>
            {negocio.descripcion && (
              <p className="mt-1.5 text-sm leading-relaxed text-carbon/55">
                {negocio.descripcion}
              </p>
            )}

            {/* Preview gallery */}
            {(negocio.fotos?.length ?? 0) > 0 && (
              <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
                {negocio.fotos.map((foto, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={foto}
                    alt={`Foto ${i + 1}`}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            {/* Preview hours */}
            {negocio.horarios && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {DIAS.map((dia) => {
                  const h = negocio.horarios[dia.key]
                  if (!h) return null
                  return (
                    <span key={dia.key} className="text-xs text-carbon/35">
                      <span className="font-medium text-carbon/50">
                        {dia.short}
                      </span>{' '}
                      {h.cerrado ? 'Cerrado' : `${h.abre}–${h.cierra}`}
                    </span>
                  )
                })}
              </div>
            )}

            {negocio.instagram && (
              <p className="mt-2 text-xs text-carbon/35">{negocio.instagram}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

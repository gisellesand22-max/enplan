'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  DEMO_NEGOCIO,
  DEMO_PROMOS,
  MAX_FOTOS,
  type Negocio,
  type PlanNegocio,
  type Promo,
} from './demo'

// Client-side demo store persisted to localStorage so that creating/editing
// promos and editing the business profile feels real while we're UI-first.
// Swap this out for @enplan/shared queries once Supabase is live.

type Store = {
  ready: boolean
  negocio: Negocio
  promos: Promo[]
  updateNegocio: (patch: Partial<Negocio>) => void
  setPlan: (plan: PlanNegocio) => void
  addFoto: (dataUrl: string) => void
  removeFoto: (index: number) => void
  addPromo: (promo: Omit<Promo, 'id'>) => void
  updatePromo: (id: string, patch: Partial<Promo>) => void
  togglePromo: (id: string) => void
  deletePromo: (id: string) => void
  reset: () => void
}

const KEY = 'enplan-business-demo-v1'

const StoreContext = createContext<Store | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [negocio, setNegocio] = useState<Negocio>(DEMO_NEGOCIO)
  const [promos, setPromos] = useState<Promo[]>(DEMO_PROMOS)

  // Load persisted state on mount (client only, avoids hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.negocio) setNegocio(prev => ({ ...prev, ...parsed.negocio }))
        if (parsed.promos) setPromos(parsed.promos)
      }
    } catch {
      /* ignore corrupted state */
    }
    setReady(true)
  }, [])

  // Persist on change.
  useEffect(() => {
    if (!ready) return
    localStorage.setItem(KEY, JSON.stringify({ negocio, promos }))
  }, [ready, negocio, promos])

  const store: Store = {
    ready,
    negocio,
    promos,
    updateNegocio: (patch) => setNegocio((n) => ({ ...n, ...patch })),
    setPlan: (plan) => setNegocio((n) => ({ ...n, plan })),
    addFoto: (dataUrl) =>
      setNegocio((n) => n.fotos.length >= MAX_FOTOS ? n : ({ ...n, fotos: [...n.fotos, dataUrl] })),
    removeFoto: (index) =>
      setNegocio((n) => ({ ...n, fotos: n.fotos.filter((_, i) => i !== index) })),
    addPromo: (promo) =>
      setPromos((p) => [...p, { ...promo, id: `p${Date.now()}` }]),
    updatePromo: (id, patch) =>
      setPromos((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    togglePromo: (id) =>
      setPromos((p) => p.map((x) => (x.id === id ? { ...x, activa: !x.activa } : x))),
    deletePromo: (id) => setPromos((p) => p.filter((x) => x.id !== id)),
    reset: () => {
      setNegocio(DEMO_NEGOCIO)
      setPromos(DEMO_PROMOS)
    },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within DemoProvider')
  return ctx
}

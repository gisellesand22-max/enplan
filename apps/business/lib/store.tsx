'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { DEMO_NEGOCIO, DEMO_PROMOS, MAX_FOTOS, type Negocio, type PlanNegocio, type Promo } from './demo'
import { supabase } from './supabase'
import {
  fetchOrCreateNegocio,
  fetchPromos,
  mapPromoFromDb,
  negocioPatchToDb,
  promoToDbInsert,
} from './negocio-api'

// Perfil, fotos y promociones viven en Supabase (tablas negocios/promociones),
// ligados al negocio del usuario autenticado. Si Supabase no está configurado
// (dev sin .env.local) cae a los datos demo en memoria.

type Store = {
  ready: boolean
  negocioId: string | null
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
}

const StoreContext = createContext<Store | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [negocio, setNegocio] = useState<Negocio>(DEMO_NEGOCIO)
  const [promos, setPromos] = useState<Promo[]>(DEMO_PROMOS)
  const [negocioId, setNegocioId] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      // Sin Supabase configurado: mantiene el comportamiento demo anterior.
      setReady(true)
      return
    }

    let cancelled = false

    async function loadForUser(userId: string, email: string) {
      try {
        const { id, negocio: loaded } = await fetchOrCreateNegocio(userId, email.split('@')[0] ?? 'Mi negocio')
        if (cancelled) return
        setNegocioId(id)
        setNegocio(loaded)
        const loadedPromos = await fetchPromos(id)
        if (cancelled) return
        setPromos(loadedPromos)
      } finally {
        if (!cancelled) setReady(true)
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadForUser(session.user.id, session.user.email ?? '')
      else setReady(true)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadForUser(session.user.id, session.user.email ?? '')
      } else {
        setNegocioId(null)
        setNegocio(DEMO_NEGOCIO)
        setPromos([])
        setReady(true)
      }
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  function persistNegocioPatch(patch: Partial<Negocio>) {
    if (!supabase || !negocioId) return
    const db = negocioPatchToDb(patch)
    if (Object.keys(db).length === 0) return
    supabase.from('negocios').update(db).eq('id', negocioId).then()
  }

  const store: Store = {
    ready,
    negocioId,
    negocio,
    promos,
    updateNegocio: (patch) => {
      setNegocio((n) => ({ ...n, ...patch }))
      persistNegocioPatch(patch)
    },
    setPlan: (plan) => {
      setNegocio((n) => ({ ...n, plan }))
      persistNegocioPatch({ plan })
    },
    addFoto: (url) =>
      setNegocio((n) => {
        if (n.fotos.length >= MAX_FOTOS) return n
        const fotos = [...n.fotos, url]
        persistNegocioPatch({ fotos })
        return { ...n, fotos }
      }),
    removeFoto: (index) =>
      setNegocio((n) => {
        const fotos = n.fotos.filter((_, i) => i !== index)
        persistNegocioPatch({ fotos })
        return { ...n, fotos }
      }),
    addPromo: (promo) => {
      if (!supabase || !negocioId) {
        setPromos((p) => [...p, { ...promo, id: `p${Date.now()}` }])
        return
      }
      supabase
        .from('promociones')
        .insert(promoToDbInsert(negocioId, promo))
        .select('*')
        .single()
        .then(({ data }) => {
          if (data) setPromos((p) => [mapPromoFromDb(data), ...p])
        })
    },
    updatePromo: (id, patch) => {
      setPromos((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)))
      if (!supabase) return
      const current = promos.find((x) => x.id === id)
      if (!current) return
      const merged = { ...current, ...patch }
      const { negocio_id: _drop, ...dbPatch } = promoToDbInsert(negocioId ?? '', merged)
      supabase.from('promociones').update(dbPatch).eq('id', id).then()
    },
    togglePromo: (id) => {
      const current = promos.find((x) => x.id === id)
      const nextActiva = current ? !current.activa : true
      setPromos((p) => p.map((x) => (x.id === id ? { ...x, activa: nextActiva } : x)))
      if (!supabase) return
      supabase.from('promociones').update({ activa: nextActiva }).eq('id', id).then()
    },
    deletePromo: (id) => {
      setPromos((p) => p.filter((x) => x.id !== id))
      if (!supabase) return
      supabase.from('promociones').delete().eq('id', id).then()
    },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within DemoProvider')
  return ctx
}

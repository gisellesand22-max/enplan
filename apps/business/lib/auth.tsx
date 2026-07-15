'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { Session } from '@supabase/supabase-js'
import type { PlanNegocio } from './demo'

interface Subscription {
  plan: PlanNegocio
  estado: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  nombreNegocio: string
}

interface AuthCtx {
  session: Session | null
  subscription: Subscription | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshSubscription: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = supabase !== null

  const fetchSubscription = useCallback(async (token: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.subscription) {
        setSubscription({
          plan: data.subscription.plan,
          estado: data.subscription.estado,
          stripeCustomerId: data.subscription.stripe_customer_id,
          stripeSubscriptionId: data.subscription.stripe_subscription_id,
          nombreNegocio: data.subscription.nombre_negocio,
        })
      }
    } catch {
      // subscription fetch failed — user can still browse
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      if (s?.access_token) fetchSubscription(s.access_token)
      setLoading(false)
    })

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s)
        if (s?.access_token) {
          fetchSubscription(s.access_token)
        } else {
          setSubscription(null)
        }
      },
    )

    return () => authSub.unsubscribe()
  }, [fetchSubscription])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: 'Auth no configurado' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setSubscription(null)
  }, [])

  const refreshSubscription = useCallback(async () => {
    if (session?.access_token) await fetchSubscription(session.access_token)
  }, [session, fetchSubscription])

  return (
    <AuthContext.Provider value={{ session, subscription, loading, configured, signIn, signOut, refreshSubscription }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

'use client'

import { useAuth } from './hooks'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return fallback ?? null

  return <>{children}</>
}

interface RoleGuardProps {
  children: React.ReactNode
  role: 'consumidor' | 'negocio'
  fallback?: React.ReactNode
}

export function RoleGuard({ children, role, fallback }: RoleGuardProps) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user || user.user_metadata?.role !== role) return fallback ?? null

  return <>{children}</>
}

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return null

  return <>{children}</>
}

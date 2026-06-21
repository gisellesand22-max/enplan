import { useContext, useEffect } from 'react'
import { AuthContext } from './context'
import type { AuthContextValue } from './context'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useRequireAuth(redirectTo = '/login') {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user && typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
  }, [user, loading, redirectTo])

  return { user, loading, authenticated: !!user }
}

export function useUser() {
  const { user, loading } = useAuth()
  return { user, loading }
}

export function useIsBusinessUser() {
  const { user, loading } = useAuth()
  const isBusiness = user?.user_metadata?.role === 'negocio'
  return { isBusiness, user, loading }
}

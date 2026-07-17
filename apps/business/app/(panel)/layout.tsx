'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PanelNav, PanelSidebar } from '../../components/PanelNav'
import { TopBar } from '../../components/TopBar'
import { AuthProvider, useAuth } from '../../lib/auth'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, subscription, loading, configured } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (configured && !session) {
      router.replace('/login')
      return
    }
    if (configured && session && !subscription) {
      router.replace('/elegir-plan')
    }
  }, [loading, configured, session, subscription, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-carbon border-t-transparent" />
      </div>
    )
  }

  if (configured && !session) return null
  if (configured && session && !subscription) return null

  return <>{children}</>
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen md:flex">
          <PanelSidebar />
          <div className="flex-1">
            <TopBar />
            <main className="mx-auto max-w-3xl px-5 pb-24 pt-6 md:pb-10">{children}</main>
          </div>
          <PanelNav />
        </div>
      </AuthGuard>
    </AuthProvider>
  )
}

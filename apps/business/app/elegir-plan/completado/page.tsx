'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IconCircleCheck, IconLoader2 } from '@tabler/icons-react'
import { Logo } from '../../../components/Logo'
import { AuthProvider, useAuth } from '../../../lib/auth'

function CompletadoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { session, refreshSubscription } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      router.replace('/elegir-plan')
      return
    }

    fetch(`/api/stripe/session-status?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'complete') {
          setStatus('success')
          refreshSubscription()
          setTimeout(() => router.replace('/dashboard'), 3000)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [searchParams, router, refreshSubscription])

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-sm text-center">
        <Logo size="lg" />

        {status === 'loading' && (
          <div className="mt-8">
            <IconLoader2 size={48} className="mx-auto animate-spin text-carbon/40" />
            <p className="mt-4 text-carbon/60">Verificando tu pago...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-8">
            <IconCircleCheck size={48} className="mx-auto text-lima" />
            <h1 className="mt-4 font-montserrat text-2xl font-extrabold">
              Pago completado
            </h1>
            <p className="mt-2 text-carbon/60">
              Tu prueba gratuita de 30 dias ha comenzado.
              Redirigiendo al dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-8">
            <h1 className="mt-4 font-montserrat text-2xl font-extrabold">
              Algo salio mal
            </h1>
            <p className="mt-2 text-carbon/60">
              No pudimos verificar tu pago. Intenta de nuevo.
            </p>
            <button
              onClick={() => router.replace('/elegir-plan')}
              className="mt-4 rounded-xl bg-carbon px-6 py-2.5 text-sm font-semibold text-arena"
            >
              Volver a intentar
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function CompletadoPage() {
  return (
    <AuthProvider>
      <CompletadoContent />
    </AuthProvider>
  )
}

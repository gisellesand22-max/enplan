'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'
import { AuthProvider, useAuth } from '../../lib/auth'

function LoginForm() {
  const router = useRouter()
  const { session, loading: authLoading, signIn, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'reset'>('login')
  const [resetSent, setResetSent] = useState(false)

  useEffect(() => {
    if (!authLoading && session) router.replace('/dashboard')
  }, [authLoading, session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await signIn(email, password)
    if (err) {
      setError(err === 'Invalid login credentials' ? 'Correo o contraseña incorrectos' : err)
      setLoading(false)
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await resetPassword(email)
    if (err) {
      setError(err)
      setLoading(false)
    } else {
      setResetSent(true)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-3 text-sm text-carbon/60">Panel de negocio</p>
        </div>

        {mode === 'login' ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card"
          >
            <Input
              label="Correo"
              type="email"
              placeholder="tucorreo@negocio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setMode('reset'); setError(null); setResetSent(false) }}
                className="text-sm font-medium text-carbon/50 hover:text-carbon"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Button type="submit" fullWidth loading={loading}>
              Entrar
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card">
            {resetSent ? (
              <>
                <div className="rounded-lg bg-lima/10 px-4 py-3 text-sm text-carbon">
                  Te enviamos un enlace para restablecer tu contraseña a <strong>{email}</strong>. Revisa tu bandeja de entrada.
                </div>
                <Button
                  type="button"
                  fullWidth
                  onClick={() => { setMode('login'); setResetSent(false); setError(null) }}
                >
                  Volver al inicio de sesión
                </Button>
              </>
            ) : (
              <form onSubmit={handleReset} className="flex flex-col gap-4">
                <p className="text-sm text-carbon/70">
                  Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <Input
                  label="Correo"
                  type="email"
                  placeholder="tucorreo@negocio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <Button type="submit" fullWidth loading={loading}>
                  Enviar enlace
                </Button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null) }}
                  className="text-sm font-medium text-carbon/50 hover:text-carbon"
                >
                  Volver al inicio de sesión
                </button>
              </form>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-carbon/60">
          ¿Aún no eres socio?{' '}
          <Link href="/registro" className="font-semibold text-carbon underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

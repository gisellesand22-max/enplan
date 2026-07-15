'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'
import { AuthProvider, useAuth } from '../../lib/auth'

function LoginForm() {
  const router = useRouter()
  const { session, loading: authLoading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-3 text-sm text-carbon/60">Panel de negocio</p>
        </div>

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

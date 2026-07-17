'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'
import { AuthProvider, useAuth } from '../../lib/auth'
import { CATEGORIES } from '../../lib/demo'

function RegistroForm() {
  const router = useRouter()
  const { session, loading: authLoading, signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIES[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && session) router.replace('/elegir-plan')
  }, [authLoading, session, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, negocio: nombre, categoria }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Error creando cuenta')
        setLoading(false)
        return
      }

      const { error: loginErr } = await signIn(email, password)
      if (loginErr) {
        setError(loginErr)
        setLoading(false)
      }
    } catch {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <h1 className="mt-4 font-montserrat text-2xl font-extrabold">
            Crea tu cuenta
          </h1>
          <p className="mt-2 text-sm text-carbon/60">
            Primer mes <span className="font-semibold text-carbon">gratis</span>, sin
            permanencia. Cancela cuando quieras.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card"
        >
          <Input
            label="Nombre del negocio"
            placeholder="Ej. Café La Estación"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-carbon">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-card border border-arena-dark bg-arena px-4 py-2.5 text-base text-carbon outline-none focus:border-carbon focus:ring-1 focus:ring-carbon"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
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
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth loading={loading}>
            Crear cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-carbon/60">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-carbon underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function RegistroPage() {
  return (
    <AuthProvider>
      <RegistroForm />
    </AuthProvider>
  )
}

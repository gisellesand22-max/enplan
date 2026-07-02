'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Demo: no real auth yet. Wire to Supabase Auth in the backend phase.
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 500)
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

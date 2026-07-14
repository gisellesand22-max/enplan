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
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 500)
  }

  return (
    <main className="flex min-h-screen">
      {/* Brand panel */}
      <div className="hidden w-[46%] shrink-0 flex-col justify-between bg-carbon p-10 lg:flex xl:p-14">
        <Logo size="lg" dark />

        <div className="max-w-md">
          <h1 className="font-montserrat text-[2.75rem] font-bold leading-[1.1] text-white">
            Tu negocio,
            <br />
            <span className="text-lima">a otro nivel.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/45">
            Administra promociones, mide tus resultados y conecta con más
            clientes — todo desde un solo lugar.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <p className="whitespace-nowrap text-xs text-white/25">
            Hecho en Aguascalientes
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo size="lg" />
          </div>

          <div className="mb-8">
            <h2 className="font-montserrat text-2xl font-bold text-carbon">
              Bienvenido
            </h2>
            <p className="mt-1.5 text-sm text-carbon/50">
              Ingresa a tu panel de negocio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                className="text-sm font-medium text-carbon/40 transition-colors hover:text-carbon"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Button type="submit" variant="secondary" fullWidth loading={loading}>
              Entrar
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-carbon/50">
            ¿Aún no eres socio?{' '}
            <Link
              href="/registro"
              className="font-semibold text-carbon underline decoration-carbon/20 underline-offset-2 hover:decoration-carbon"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

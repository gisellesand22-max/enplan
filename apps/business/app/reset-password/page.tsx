'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@enplan/ui'
import { Logo } from '../../components/Logo'
import { supabase } from '../../lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (!supabase) {
      setError('Auth no configurado')
      return
    }

    setLoading(true)
    setError(null)
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-3 text-sm text-carbon/60">Restablecer contraseña</p>
        </div>

        <div className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-card">
          {success ? (
            <div className="rounded-lg bg-lima/10 px-4 py-3 text-sm text-carbon">
              Contraseña actualizada. Redirigiendo al inicio de sesión...
            </div>
          ) : !ready ? (
            <p className="text-sm text-carbon/70">
              Verificando enlace de recuperación...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Nueva contraseña"
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
                Guardar contraseña
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

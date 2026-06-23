'use client'

import { useState, useMemo } from 'react'
import { useLocalSearchParams, Link, useRouter } from 'expo-router'
import {
  IconArrowLeft,
  IconCheck,
  IconClock,
  IconShare,
  IconCopy,
  IconBrandGoogle,
} from '@tabler/icons-react'
import { useAuth } from '../_layout'
import { getPromoById } from '../../data/demo'

function generateCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    signIn(email || 'usuario@enplan.app', password || '1234')
    onSuccess()
  }

  function handleGoogle() {
    signInWithGoogle()
    onSuccess()
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-lima/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <IconCheck size={28} className="text-lima-700" />
        </div>
        <h2 className="font-montserrat font-bold text-xl text-carbon mb-2">
          Inicia sesión para activar
        </h2>
        <p className="text-sm text-carbon/50">
          Necesitas una cuenta para usar este beneficio.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-carbon/50 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-carbon/50 mb-1.5">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-lima text-carbon font-bold py-3 rounded-full text-sm hover:bg-lima-400 transition-colors"
        >
          Entrar
        </button>
      </form>

      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2 bg-white text-carbon font-semibold py-3 rounded-full text-sm border-2 border-arena-dark/30 hover:border-carbon/30 transition-colors mb-6"
      >
        <IconBrandGoogle size={18} />
        Continuar con Google
      </button>

      <p className="text-center text-xs text-carbon/40">
        ¿No tienes cuenta?{' '}
        <Link href="/login" className="text-lima-700 font-semibold">
          Regístrate
        </Link>
      </p>
    </div>
  )
}

function ActivationSuccess({
  code,
  businessName,
  promoTitle,
  promoDesc,
}: {
  code: string
  businessName: string
  promoTitle: string
  promoDesc: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareText = `Estoy en ${businessName} usando enplan. 🤙\nConsigue tu ${promoTitle} y descarga la app gratis:\nenplan.app/ref/demo-user`

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ text: shareText })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const firstTwo = code.slice(0, 2)
  const lastTwo = code.slice(2)

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Success indicator */}
      <div className="w-20 h-20 bg-lima rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-lima/30">
        <IconCheck size={36} strokeWidth={3} className="text-carbon" />
      </div>

      <h2 className="font-montserrat font-extrabold text-2xl text-carbon mb-1">
        ¡Beneficio activado!
      </h2>
      <p className="text-sm text-carbon/50 mb-8">
        Muestra este código al empleado del negocio
      </p>

      {/* Code display */}
      <div className="bg-carbon rounded-3xl p-8 mb-6 shadow-xl">
        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">
          Tu código
        </p>
        <p className="font-montserrat font-extrabold text-6xl text-white tracking-[0.25em] mb-4">
          {firstTwo}
          <span className="text-lima">{lastTwo}</span>
        </p>

        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-white font-semibold text-sm">{businessName}</p>
          <p className="text-lima text-xs mt-1">{promoTitle}</p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs">
          <IconClock size={14} />
          <span>Válido por 23h 59m</span>
        </div>
      </div>

      {/* Info text */}
      <p className="text-xs text-carbon/40 mb-6 leading-relaxed">
        Di tu código al empleado o muéstrale esta pantalla. El código es válido por 24 horas y solo puede usarse una vez.
      </p>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 bg-lima text-carbon font-bold py-3.5 rounded-full text-sm hover:bg-lima-400 transition-colors mb-3"
      >
        {copied ? (
          <>
            <IconCopy size={18} />
            ¡Copiado!
          </>
        ) : (
          <>
            <IconShare size={18} />
            Compartir con amigos
          </>
        )}
      </button>

      <Link
        href="/"
        className="block text-sm text-carbon/40 font-medium hover:text-carbon/60 transition-colors py-2"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default function ActivarScreen() {
  const { promoId } = useLocalSearchParams<{ promoId: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const [activated, setActivated] = useState(false)

  const code = useMemo(() => generateCode(), [])

  const found = getPromoById(promoId ?? '')

  if (!found) {
    return (
      <div className="min-h-screen bg-arena flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-montserrat font-bold text-xl text-carbon mb-2">
            Promo no encontrada
          </p>
          <p className="text-sm text-carbon/50 mb-6">
            Esta promoción puede haber expirado.
          </p>
          <Link
            href="/"
            className="bg-lima text-carbon font-semibold px-6 py-2.5 rounded-full text-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const { promo, business } = found
  const isLoggedIn = !!user

  return (
    <div className="min-h-screen bg-arena font-work-sans">
      {/* Top bar */}
      <div className="bg-arena sticky top-0 z-40 border-b border-arena-dark/20">
        <div className="flex items-center gap-3 px-5 py-4 max-w-lg mx-auto">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-arena-dark/20"
          >
            <IconArrowLeft size={18} className="text-carbon" />
          </button>
          <span className="text-sm font-medium text-carbon/50">
            {activated ? 'Código activo' : 'Activar beneficio'}
          </span>
        </div>
      </div>

      <div className="px-5 py-8">
        {!isLoggedIn ? (
          <LoginForm onSuccess={() => setActivated(true)} />
        ) : activated ? (
          <ActivationSuccess
            code={code}
            businessName={business.nombre}
            promoTitle={promo.titulo}
            promoDesc={promo.descripcion}
          />
        ) : (
          /* Already logged in but hasn't activated yet — auto-activate */
          <ActivationSuccess
            code={code}
            businessName={business.nombre}
            promoTitle={promo.titulo}
            promoDesc={promo.descripcion}
          />
        )}
      </div>
    </div>
  )
}

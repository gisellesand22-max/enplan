'use client'

import { useState } from 'react'
import { useRouter, Link } from 'expo-router'
import { IconBrandGoogle, IconArrowLeft } from '@tabler/icons-react'
import { useAuth } from './_layout'

export default function LoginScreen() {
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    signIn(email || 'usuario@enplan.app', password || '1234')
    router.replace('/')
  }

  function handleGoogle() {
    signInWithGoogle()
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-arena font-work-sans flex flex-col">
      {/* Top bar */}
      <div className="px-5 pt-12 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-arena-dark/20"
        >
          <IconArrowLeft size={18} className="text-carbon" />
        </button>
      </div>

      <div className="flex-1 px-5 pb-8">
        <div className="max-w-sm mx-auto">
          {/* Logo text */}
          <div className="mb-10">
            <h1 className="font-montserrat font-extrabold text-3xl text-carbon">
              enplan
              <span className="inline-block w-2.5 h-2.5 bg-lima rounded-full ml-0.5 mb-0.5" />
            </h1>
            <p className="text-sm text-carbon/50 mt-2">
              {mode === 'login'
                ? 'Entra a tu cuenta para acceder a beneficios'
                : 'Crea tu cuenta y empieza a ahorrar'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-white rounded-full p-1 border border-arena-dark/20 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-carbon text-white'
                  : 'text-carbon/50'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                mode === 'register'
                  ? 'bg-carbon text-white'
                  : 'text-carbon/50'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 bg-white text-carbon font-semibold py-3.5 rounded-full text-sm border-2 border-arena-dark/30 hover:border-carbon/30 transition-colors mb-6"
          >
            <IconBrandGoogle size={18} />
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-arena-dark/30" />
            <span className="text-xs text-carbon/30 font-medium">o</span>
            <div className="flex-1 h-px bg-arena-dark/30" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-carbon/50 mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
                />
              </div>
            )}
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
              className="w-full bg-lima text-carbon font-bold py-3.5 rounded-full text-sm hover:bg-lima-400 transition-colors mt-2"
            >
              {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>

          {mode === 'login' && (
            <p className="text-center text-xs text-carbon/40 mt-6">
              ¿Olvidaste tu contraseña?{' '}
              <span className="text-lima-700 font-semibold cursor-pointer">
                Recuperar
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

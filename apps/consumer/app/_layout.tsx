import '../global.css'
import { Slot } from 'expo-router'
import { createContext, useContext, useMemo, useState } from 'react'

interface MockUser {
  nombre: string
  email: string
  role: 'consumidor' | 'negocio'
  plan: 'gratis' | 'premium'
}

interface AuthContextValue {
  user: MockUser | null
  loading: boolean
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: false,
  signIn: () => {},
  signInWithGoogle: () => {},
  signOut: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export default function RootLayout() {
  const [user, setUser] = useState<MockUser | null>(null)

  const auth = useMemo<AuthContextValue>(
    () => ({
      user,
      loading: false,
      signIn: (_email: string, _password: string) => {
        setUser({ nombre: 'Carlos', email: _email, role: 'consumidor', plan: 'gratis' })
      },
      signInWithGoogle: () => {
        setUser({
          nombre: 'Carlos',
          email: 'carlos@gmail.com',
          role: 'consumidor',
          plan: 'gratis',
        })
      },
      signOut: () => setUser(null),
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={auth}>
      <Slot />
    </AuthContext.Provider>
  )
}

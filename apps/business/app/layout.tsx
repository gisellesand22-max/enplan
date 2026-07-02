import type { Metadata } from 'next'
import { Montserrat, Work_Sans } from 'next/font/google'
import './globals.css'
import { DemoProvider } from '../lib/store'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['600', '700', '800'],
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'enplan. para negocios — Panel',
  description:
    'Administra tus promociones, valida visitas y mide tus resultados en tiempo real. El panel de negocio de enplan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${workSans.variable}`}>
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  )
}

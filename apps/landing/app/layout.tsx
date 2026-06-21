import type { Metadata } from 'next'
import { Montserrat, Work_Sans } from 'next/font/google'
import './globals.css'

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
  title: 'enplan. — Beneficios locales en Aguascalientes',
  description:
    'Descubre promociones exclusivas en restaurantes, cafés, gimnasios y más negocios locales de Aguascalientes. Activa beneficios con un código único.',
  keywords: ['Aguascalientes', 'descuentos', 'promociones', 'negocios locales', 'membresía'],
  openGraph: {
    title: 'enplan. — Beneficios locales en Aguascalientes',
    description: 'Promociones exclusivas en negocios locales. Activa, muestra tu código y ahorra.',
    type: 'website',
    locale: 'es_MX',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

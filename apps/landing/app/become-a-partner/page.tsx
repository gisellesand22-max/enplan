'use client'

import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import {
  IconChartBar,
  IconShieldCheck,
  IconGift,
  IconCheck,
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react'

const benefits = [
  {
    icon: IconChartBar,
    title: 'Clientes verificados',
    description:
      'Cada visita se registra con código único. Sabrás exactamente cuántos clientes te llegaron por enplan.',
  },
  {
    icon: IconShieldCheck,
    title: 'Dashboard en tiempo real',
    description:
      'Ve activaciones, validaciones y métricas desde cualquier dispositivo. Sin app, solo un navegador.',
  },
  {
    icon: IconGift,
    title: 'Primer mes gratis',
    description:
      'Prueba sin riesgo. Si no te funciona, cancelas sin penalización ni cargos ocultos.',
  },
]

const plans = [
  {
    name: 'Básico',
    price: '$499',
    features: [
      { text: '1 promoción activa', included: true },
      { text: 'Perfil en directorio', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Analítica avanzada', included: false },
      { text: 'Posición destacada', included: false },
      { text: 'Push notifications', included: false },
      { text: 'Account manager', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$999',
    popular: true,
    features: [
      { text: '2 promociones activas', included: true },
      { text: 'Perfil en directorio', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Analítica avanzada', included: true },
      { text: 'Posición destacada', included: true },
      { text: 'Push notifications', included: false },
      { text: 'Account manager', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '$1,799',
    features: [
      { text: 'Promos ilimitadas', included: true },
      { text: 'Perfil en directorio', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Analítica avanzada', included: true },
      { text: 'Posición #1 en categoría', included: true },
      { text: 'Push notifications', included: true },
      { text: 'Account manager dedicado', included: true },
    ],
  },
]

const faqs = [
  {
    q: '¿Qué es enplan.?',
    a: 'Una plataforma que conecta negocios locales con consumidores cercanos mediante promociones exclusivas y verificables. Los clientes activan un beneficio en la app y lo confirman en tu negocio con un código de 4 dígitos.',
  },
  {
    q: '¿Cómo verifico que un cliente tiene beneficio?',
    a: 'El cliente te da un código de 4 dígitos. Tú lo ingresas en negocios.enplan.app desde cualquier dispositivo y al instante ves si es válido, el nombre del cliente y qué promo activó.',
  },
  {
    q: '¿Hay permanencia o contrato a largo plazo?',
    a: 'No. Puedes cancelar cuando quieras, sin penalizaciones. El primer mes es completamente gratis.',
  },
  {
    q: '¿Cuántos clientes puedo esperar?',
    a: 'Depende de tu categoría y promo, pero nuestros negocios en piloto reportan entre 5 y 20 visitas nuevas por semana. Cada visita queda registrada en tu dashboard.',
  },
  {
    q: '¿Necesito instalar una app?',
    a: 'No. Tu panel de negocio es una web app en negocios.enplan.app. La abres desde tu teléfono, tablet o computadora — sin descargar nada.',
  },
  {
    q: '¿Cuántos cupos de socio fundador quedan?',
    a: 'Solo aceptamos 50 negocios socios fundadores para el lanzamiento en Aguascalientes. Los cupos son limitados para garantizar calidad.',
  },
]

const categorias = [
  { value: 'comida', label: 'Comida' },
  { value: 'bienestar', label: 'Bienestar' },
  { value: 'ocio', label: 'Ocio' },
  { value: 'negocios', label: 'Negocios / Servicios' },
]

export default function BecomeAPartnerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-8">
        <div className="container-landing mx-auto text-center">
          <div className="inline-block bg-lima/20 text-carbon font-medium text-sm px-4 py-1.5 rounded-full mb-6">
            Solo 50 cupos de socio fundador
          </div>
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl text-carbon leading-tight text-balance max-w-4xl mx-auto">
            Haz crecer tu negocio con{' '}
            <span className="relative">
              enplan.
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-lima/40 -z-10 rounded-sm" />
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-carbon/60 max-w-2xl mx-auto">
            Atrae clientes nuevos con promociones verificables. Sin riesgo: tu primer mes es gratis.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-landing mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-14 h-14 bg-lima/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <b.icon size={28} className="text-carbon" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-2">{b.title}</h3>
                <p className="text-carbon/50 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <div className="container-landing mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-4">
            Planes y precios
          </h2>
          <p className="text-center text-carbon/50 mb-4">Primer mes gratis en todos los planes.</p>
          <p className="text-center text-xs text-carbon/30 mb-14">Sin permanencia. Cancela cuando quieras.</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-6 border-2 relative ${
                  plan.popular ? 'border-lima shadow-lg' : 'border-arena-dark/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lima text-carbon text-xs font-bold px-3 py-1 rounded-full">
                    Más popular
                  </div>
                )}
                <h3 className="font-montserrat font-bold text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-montserrat font-extrabold text-3xl">{plan.price}</span>
                  <span className="text-carbon/40 text-sm">MXN/mes</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2 text-sm">
                      <IconCheck
                        size={16}
                        className={f.included ? 'text-lima-600' : 'text-arena-dark'}
                      />
                      <span className={f.included ? 'text-carbon' : 'text-carbon/30'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`mt-6 block text-center font-semibold py-2.5 rounded-full text-sm transition-colors ${
                    plan.popular
                      ? 'bg-lima text-carbon hover:bg-lima-400'
                      : 'border-2 border-carbon/20 text-carbon hover:border-carbon/40'
                  }`}
                >
                  Solicitar demo
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="section-padding bg-white">
        <div className="container-landing mx-auto max-w-2xl">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-center text-carbon/50 mb-10">
            Déjanos tus datos y te contactamos en menos de 24 horas.
          </p>

          {submitted ? (
            <div className="text-center bg-lima/10 rounded-2xl p-10">
              <div className="w-16 h-16 bg-lima rounded-full flex items-center justify-center mx-auto mb-4">
                <IconCheck size={32} className="text-carbon" />
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-2">¡Recibimos tu solicitud!</h3>
              <p className="text-carbon/50 text-sm">
                Nuestro equipo te contactará pronto para agendar una demo personalizada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Nombre del negocio
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm"
                    placeholder="Café Central"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Nombre del contacto
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm"
                    placeholder="Carlos Mendoza"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm"
                    placeholder="carlos@cafecentral.mx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm"
                    placeholder="449 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-carbon/70 mb-1.5">Categoría</label>
                <select
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                  Mensaje (opcional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm resize-none"
                  placeholder="Cuéntanos sobre tu negocio..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lima text-carbon font-semibold py-3 rounded-full text-lg hover:bg-lima-400 transition-colors flex items-center justify-center gap-2"
              >
                Enviar solicitud
                <IconArrowRight size={20} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-landing mx-auto max-w-2xl">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-12">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-arena-dark/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <IconChevronUp size={18} className="text-carbon/40 shrink-0" />
                  ) : (
                    <IconChevronDown size={18} className="text-carbon/40 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-carbon/50 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

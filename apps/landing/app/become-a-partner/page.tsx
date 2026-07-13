'use client'

import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Logo } from '../../components/Logo'
import {
  IconChartBar,
  IconShieldCheck,
  IconGift,
  IconCheck,
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
  IconUsers,
  IconDeviceMobile,
  IconClock,
  IconTrendingUp,
} from '@tabler/icons-react'

const benefits = [
  {
    icon: IconChartBar,
    title: 'Clientes verificados',
    description:
      'Cada visita se registra automáticamente. Sabrás exactamente cuántos clientes te llegaron por enplan.',
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

const howItWorksForBusiness = [
  {
    icon: IconUsers,
    step: '01',
    title: 'El cliente activa',
    description: 'Un usuario cercano ve tu promo en enplan. y la activa al instante.',
  },
  {
    icon: IconDeviceMobile,
    step: '02',
    title: 'Tú validas',
    description: 'La visita se registra automáticamente en tu panel. Ves quién activó, qué promo y a qué hora.',
  },
  {
    icon: IconTrendingUp,
    step: '03',
    title: 'Tú creces',
    description: 'Cada visita queda registrada. Ves tus métricas en tiempo real y tomas mejores decisiones.',
  },
]

const plans = [
  {
    name: 'Básico',
    originalPrice: '$499',
    price: '$399',
    description: 'Para probar el concepto',
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
    originalPrice: '$999',
    price: '$799',
    description: 'El más elegido',
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
    originalPrice: '$1,799',
    price: '$1,500',
    description: 'Para dominar tu categoría',
    features: [
      { text: 'Promos ilimitadas', included: true },
      { text: 'Perfil en directorio', included: true },
      { text: 'Dashboard básico', included: true },
      { text: 'Analítica avanzada', included: true },
      { text: 'Posición #1 en categoría', included: true },
      { text: 'Push notifications', included: true },
      { text: 'Créditos de Meta Ads para tu negocio', included: true },
      { text: 'Account manager dedicado', included: true },
    ],
  },
]

const faqs = [
  {
    q: '¿Qué es enplan.?',
    a: 'Una plataforma que conecta negocios locales con consumidores cercanos mediante promociones exclusivas y verificables. Los clientes activan un beneficio en la app y su visita queda registrada al instante.',
  },
  {
    q: '¿Cómo verifico que un cliente tiene beneficio?',
    a: 'Cada activación aparece de inmediato en tu panel. Verás el nombre del cliente, la promo y la hora exacta de cada visita.',
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
  { value: 'belleza', label: 'Belleza' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'ocio', label: 'Ocio' },

]

export default function BecomeAPartnerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const data = {
      negocio: (form.elements.namedItem('negocio') as HTMLInputElement).value,
      contacto: (form.elements.namedItem('contacto') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      categoria: (form.elements.namedItem('categoria') as HTMLSelectElement).value,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Hubo un error. Intenta de nuevo o escríbenos a hola@enplan.app')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-lima/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-lima/5 rounded-full blur-3xl -z-10" />

        <div className="container-landing mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lima text-carbon font-bold text-sm px-5 py-2 rounded-full mb-8">
            <IconClock size={16} />
            Solo 50 cupos de socio fundador
          </div>
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl text-carbon leading-[1.1] text-balance max-w-4xl mx-auto">
            Atrae clientes nuevos con{' '}
            <span className="relative inline-block">
              enplan.
              <svg className="absolute -bottom-2 left-0 w-full -z-10" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C40 3 100 1 198 6" stroke="#CDD917" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-carbon/60 max-w-2xl mx-auto leading-relaxed">
            Promociones verificables. Dashboard en tiempo real. Sin riesgo: tu primer mes es completamente gratis.
          </p>
          <div className="mt-10">
            <a
              href="#contacto"
              className="bg-carbon text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-carbon-700 transition-colors inline-flex items-center gap-2"
            >
              Solicitar mi lugar
              <IconArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* How it works for business */}
      <section className="section-padding bg-carbon text-white">
        <div className="container-landing mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-lima uppercase tracking-wider">Así funciona para ti</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3 text-white">
              Clientes reales, datos reales
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorksForBusiness.map((step) => (
              <div key={step.step} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <span className="font-montserrat font-extrabold text-3xl text-lima/30">{step.step}</span>
                <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center my-4">
                  <step.icon size={24} className="text-carbon" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-landing mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-7 border border-arena-dark/20 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-lima/15 rounded-2xl flex items-center justify-center mb-5">
                  <b.icon size={28} className="text-carbon" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-2">{b.title}</h3>
                <p className="text-carbon/50 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard mockup */}
      <section className="section-padding bg-lima/10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lima/20 rounded-full blur-3xl" />
        <div className="container-landing mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Tu panel de negocio</span>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3 mb-4">
                Todo lo que necesitas en un solo lugar
              </h2>
              <p className="text-carbon/50 leading-relaxed mb-6">
                Abre negocios.enplan.app desde cualquier dispositivo. Sin descargar apps, sin complicaciones.
              </p>
              <ul className="space-y-3">
                {[
                  'Ve activaciones al instante',
                  'Ve cuántos clientes llegan por enplan.',
                  'Pausa o activa tus promos cuando quieras',
                  'Métricas por día, semana y mes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 bg-lima rounded-full flex items-center justify-center shrink-0">
                      <IconCheck size={12} className="text-carbon" />
                    </div>
                    <span className="text-carbon/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboard mini mockup */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-arena-dark/20">
              <div className="flex items-center justify-between mb-5">
                <Logo size="sm" />
                <span className="text-xs bg-lima/20 text-carbon font-medium px-2.5 py-1 rounded-full">Panel de negocio</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Hoy', value: '12' },
                  { label: 'Semana', value: '47' },
                  { label: 'Mes', value: '183' },
                ].map((m) => (
                  <div key={m.label} className="bg-arena rounded-xl p-3 text-center">
                    <p className="font-montserrat font-extrabold text-2xl text-carbon">{m.value}</p>
                    <p className="text-xs text-carbon/40 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Carlos', promo: '2x1 en café', time: '10:32', status: 'usada' },
                  { name: 'María', promo: '20% en cuenta', time: '11:15', status: 'activa' },
                  { name: 'Juan', promo: '2x1 en café', time: '12:01', status: 'activa' },
                ].map((v) => (
                  <div key={v.name + v.time} className="flex items-center justify-between bg-arena rounded-lg p-3">
                    <div>
                      <span className="font-semibold text-sm">{v.name}</span>
                      <span className="text-carbon/40 text-xs ml-2">{v.promo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-carbon/30">{v.time}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        v.status === 'usada' ? 'bg-carbon text-white' : 'bg-lima/30 text-carbon'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding">
        <div className="container-landing mx-auto">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Planes</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3">
              Planes y precios
            </h2>
          </div>
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center gap-2 bg-lima text-carbon font-bold text-sm px-5 py-2 rounded-full">
              Precio de socio fundador + primer mes gratis
            </span>
          </div>
          <p className="text-center text-xs text-carbon/30 mb-14">Sin permanencia. Cancela cuando quieras.</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 relative ${
                  plan.popular
                    ? 'bg-carbon text-white shadow-xl shadow-carbon/20'
                    : 'bg-white border-2 border-arena-dark/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lima text-carbon text-xs font-bold px-4 py-1 rounded-full">
                    Más popular
                  </div>
                )}
                <h3 className="font-montserrat font-bold text-xl mb-0.5">{plan.name}</h3>
                <p className={`text-xs mb-4 ${plan.popular ? 'text-white/40' : 'text-carbon/40'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-sm line-through ${plan.popular ? 'text-white/40' : 'text-carbon/40'}`}>{plan.originalPrice}</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-montserrat font-extrabold text-3xl ${plan.popular ? 'text-lima' : 'text-lima-700'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-white/40' : 'text-carbon/40'}`}>MXN/mes</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5 text-sm">
                      <IconCheck
                        size={16}
                        className={
                          f.included
                            ? plan.popular ? 'text-lima' : 'text-lima-600'
                            : plan.popular ? 'text-white/20' : 'text-arena-dark'
                        }
                      />
                      <span className={
                        f.included
                          ? ''
                          : plan.popular ? 'text-white/30' : 'text-carbon/30'
                      }>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`mt-7 block text-center font-semibold py-3 rounded-full text-sm transition-colors ${
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
            <div className="text-center bg-lima/10 rounded-2xl p-10 border border-lima/20">
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
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
                  {error}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Nombre del negocio
                  </label>
                  <input
                    name="negocio"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
                    placeholder="Café Central"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Nombre del contacto
                  </label>
                  <input
                    name="contacto"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
                    placeholder="Carlos Mendoza"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
                    placeholder="carlos@cafecentral.mx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-carbon/70 mb-1.5">
                    Teléfono
                  </label>
                  <input
                    name="telefono"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
                    placeholder="449 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-carbon/70 mb-1.5">Categoría</label>
                <select
                  name="categoria"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm transition-colors"
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
                  name="mensaje"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-arena border border-arena-dark/30 focus:border-carbon focus:outline-none text-sm resize-none transition-colors"
                  placeholder="Cuéntanos sobre tu negocio..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-lima text-carbon font-bold py-3.5 rounded-full text-lg hover:bg-lima-400 transition-all hover:shadow-lg hover:shadow-lima/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Enviar solicitud'}
                {!submitting && <IconArrowRight size={20} />}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-landing mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">FAQ</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-arena-dark/20 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <IconChevronUp size={18} className="text-lima-700 shrink-0" />
                  ) : (
                    <IconChevronDown size={18} className="text-carbon/30 shrink-0" />
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

      {/* Final CTA */}
      <section className="section-padding bg-carbon">
        <div className="container-landing mx-auto text-center">
          <Logo size="lg" className="!text-white justify-center mb-6" />
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-3">
            Tu lugar como socio fundador te espera
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-8 text-sm">
            Solo 50 negocios en el lanzamiento de Aguascalientes. Primer mes gratis, sin permanencia.
          </p>
          <a
            href="#contacto"
            className="bg-lima text-carbon font-bold px-8 py-4 rounded-full text-lg hover:bg-lima-400 transition-all hover:shadow-lg hover:shadow-lima/25 inline-flex items-center gap-2"
          >
            Asegurar mi lugar
            <IconArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

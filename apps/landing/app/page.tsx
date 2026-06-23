import Link from 'next/link'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Logo } from '../components/Logo'
import {
  IconSearch,
  IconTicket,
  IconDeviceMobile,
  IconToolsKitchen2,
  IconBarbell,
  IconMusic,
  IconBuildingStore,
  IconArrowRight,
  IconMapPin,
  IconShieldCheck,
  IconClock,
  IconSparkles,
  IconBuildingCommunity,
  IconCategory,
  IconDiscount2,
} from '@tabler/icons-react'

const steps = [
  {
    icon: IconSearch,
    title: 'Explora',
    description: 'Abre enplan. y descubre promociones exclusivas en negocios cerca de ti.',
    color: 'bg-lima/20 text-carbon',
  },
  {
    icon: IconTicket,
    title: 'Activa tu beneficio',
    description: 'Selecciona la promo que quieras y obtén tu código único de 4 dígitos.',
    color: 'bg-carbon text-white',
  },
  {
    icon: IconDeviceMobile,
    title: 'Muestra tu código',
    description: 'Dile tu código al empleado y disfruta tu beneficio al instante.',
    color: 'bg-lima text-carbon',
  },
]

const categories = [
  {
    icon: IconToolsKitchen2,
    name: 'Comida',
    description: 'Restaurantes, cafés y deliveries',
    accent: 'border-l-lima',
  },
  {
    icon: IconBarbell,
    name: 'Bienestar',
    description: 'Gimnasios, salones, spas',
    accent: 'border-l-carbon',
  },
  {
    icon: IconMusic,
    name: 'Ocio',
    description: 'Bares, cines, eventos',
    accent: 'border-l-lima',
  },
  {
    icon: IconBuildingStore,
    name: 'Negocios',
    description: 'Talleres, tiendas, servicios',
    accent: 'border-l-carbon',
  },
]

const stats = [
  { number: '50+', label: 'Negocios aliados', icon: IconBuildingCommunity },
  { number: '4', label: 'Categorías', icon: IconCategory },
  { number: '100%', label: 'Gratis para ti', icon: IconDiscount2 },
]

const promoExamples = [
  { negocio: 'Café La Estación', promo: '2x1 en cualquier café', tipo: '2x1', categoria: 'Comida' },
  { negocio: 'Gym FitZone', promo: 'Primera clase gratis', tipo: 'Clase', categoria: 'Bienestar' },
  { negocio: 'Bar El Patio', promo: '20% en tu cuenta', tipo: 'Descuento', categoria: 'Ocio' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-lima/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-lima/5 rounded-full blur-3xl -z-10" />

        <div className="container-landing mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-carbon text-white font-medium text-sm px-4 py-2 rounded-full mb-8">
              <IconMapPin size={16} className="text-lima" />
              Ya disponible en Aguascalientes
            </div>

            <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-7xl text-carbon leading-[1.1] text-balance">
              Beneficios reales en{' '}
              <span className="relative inline-block">
                negocios locales
                <svg className="absolute -bottom-2 left-0 w-full -z-10" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 3 150 1 298 6" stroke="#CDD917" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-carbon/60 max-w-2xl mx-auto leading-relaxed">
              Descuentos, 2x1 y experiencias exclusivas en restaurantes, cafés, gimnasios y más de Aguascalientes. Activa, muestra tu código y ahorra.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#como-funciona"
                className="bg-lima text-carbon font-bold px-8 py-4 rounded-full text-lg hover:bg-lima-400 transition-all hover:shadow-lg hover:shadow-lima/25 inline-flex items-center justify-center gap-2"
              >
                Empieza gratis
                <IconArrowRight size={20} />
              </Link>
              <Link
                href="/become-a-partner"
                className="bg-carbon text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-carbon-700 transition-colors inline-flex items-center justify-center"
              >
                Soy un negocio
              </Link>
            </div>
          </div>

          {/* App Mockup */}
          <div className="mt-16 max-w-sm mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-carbon/10 p-5 border border-arena-dark/20">
              <div className="flex items-center justify-between mb-4">
                <Logo size="sm" />
                <span className="text-xs text-carbon/40 font-medium">Aguascalientes</span>
              </div>
              <div className="flex gap-2 mb-4 overflow-hidden">
                {['Todos', 'Comida', 'Bienestar', 'Ocio'].map((chip, i) => (
                  <span
                    key={chip}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${
                      i === 0 ? 'bg-carbon text-white' : 'bg-arena-dark/40 text-carbon/60'
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {promoExamples.map((p) => (
                  <div key={p.negocio} className="bg-arena rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-carbon">{p.negocio}</p>
                      <p className="text-xs text-carbon/50 mt-0.5">{p.promo}</p>
                    </div>
                    <span className="bg-lima/20 text-carbon text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {p.tipo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-carbon py-10 px-6">
        <div className="container-landing mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <s.icon size={24} className="text-lima mb-2" />
                <span className="font-montserrat font-extrabold text-2xl md:text-4xl text-white">{s.number}</span>
                <span className="text-xs md:text-sm text-white/50 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="section-padding">
        <div className="container-landing mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Así de fácil</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3">
              ¿Cómo funciona?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative group">
                <div className={`rounded-2xl p-8 h-full transition-all ${i === 1 ? 'bg-carbon text-white' : 'bg-white border border-arena-dark/20'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${step.color}`}>
                    <step.icon size={26} />
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 1 ? 'text-lima' : 'text-lima-700'}`}>
                    Paso {i + 1}
                  </div>
                  <h3 className="font-montserrat font-bold text-xl mb-3">{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/60' : 'text-carbon/50'}`}>
                    {step.description}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <IconArrowRight size={20} className="text-arena-dark" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-landing mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Categorías</span>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3 mb-4">
                Encuentra lo que te gusta
              </h2>
              <p className="text-carbon/50 leading-relaxed mb-8">
                Negocios locales de Aguascalientes organizados para que encuentres exactamente lo que buscas.
              </p>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`bg-arena rounded-xl p-5 border-l-4 ${cat.accent} hover:shadow-md transition-shadow flex items-center gap-4`}
                  >
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <cat.icon size={22} className="text-carbon" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-base">{cat.name}</h3>
                      <p className="text-sm text-carbon/50">{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Demo */}
            <div className="flex justify-center">
              <div className="bg-carbon rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl">
                <div className="text-sm text-white/50 mb-2">Tu código de beneficio</div>
                <div className="font-montserrat font-extrabold text-6xl text-white tracking-[0.2em] my-6">
                  28<span className="text-lima">47</span>
                </div>
                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <p className="text-white font-semibold text-sm">Café La Estación</p>
                  <p className="text-lima text-xs mt-1">2x1 en cualquier café</p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs">
                  <IconClock size={14} />
                  <span>Válido por 24 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Why enplan */}
      <section className="section-padding bg-lima/10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lima/20 rounded-full blur-3xl" />

        <div className="container-landing mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">¿Por qué enplan.?</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3">
              Beneficios que sí puedes usar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center mb-4">
                <IconShieldCheck size={24} className="text-carbon" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Verificado con código</h3>
              <p className="text-sm text-carbon/50 leading-relaxed">
                Cada beneficio se confirma con un código de 4 dígitos. Sin capturas de pantalla, sin abusos, sin trucos.
              </p>
            </div>

            <div className="bg-carbon rounded-2xl p-7 text-white">
              <div className="w-12 h-12 bg-lima rounded-xl flex items-center justify-center mb-4">
                <IconSparkles size={24} className="text-carbon" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">Promos exclusivas</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Beneficios que no encuentras en ningún otro lado. Negociados directamente con cada negocio local.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-arena-dark/30 rounded-xl flex items-center justify-center mb-4">
                <IconMapPin size={24} className="text-carbon" />
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2">100% local</h3>
              <p className="text-sm text-carbon/50 leading-relaxed">
                Solo negocios de Aguascalientes. Apoyamos la economía local y te conectamos con lo mejor de tu ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-landing mx-auto">
          <div className="bg-carbon rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lima/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-lima/5 rounded-full blur-2xl" />

            <div className="relative">
              <Logo size="lg" className="!text-white justify-center mb-6" />
              <h2 className="font-montserrat font-bold text-2xl md:text-4xl text-white mb-4">
                Empieza a ahorrar hoy
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8">
                Accede gratis a beneficios exclusivos en negocios locales de Aguascalientes.
              </p>
              <Link
                href="#como-funciona"
                className="bg-lima text-carbon font-bold px-8 py-4 rounded-full text-lg hover:bg-lima-400 transition-all hover:shadow-lg hover:shadow-lima/25 inline-flex items-center gap-2"
              >
                Empezar gratis
                <IconArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

import Link from 'next/link'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import {
  IconSearch,
  IconTicket,
  IconDeviceMobile,
  IconToolsKitchen2,
  IconBarbell,
  IconMusic,
  IconBuildingStore,
  IconArrowRight,
  IconCheck,
  IconCoin,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react'

const steps = [
  {
    icon: IconSearch,
    title: 'Explora',
    description: 'Abre la app y descubre promociones exclusivas en negocios cerca de ti.',
  },
  {
    icon: IconTicket,
    title: 'Activa tu beneficio',
    description: 'Selecciona la promo que te interese y obtén tu código único de 4 dígitos.',
  },
  {
    icon: IconDeviceMobile,
    title: 'Muestra tu código',
    description: 'Dile tu código al empleado y disfruta tu beneficio al instante.',
  },
]

const categories = [
  {
    icon: IconToolsKitchen2,
    name: 'Comida',
    description: 'Restaurantes, cafés y deliveries con descuentos que sí valen la pena.',
  },
  {
    icon: IconBarbell,
    name: 'Bienestar',
    description: 'Gimnasios, salones de belleza, spas y más para consentirte.',
  },
  {
    icon: IconMusic,
    name: 'Ocio',
    description: 'Bares, cines, eventos y entretenimiento con beneficios exclusivos.',
  },
  {
    icon: IconBuildingStore,
    name: 'Negocios',
    description: 'Talleres, tiendas y servicios locales con ofertas verificadas.',
  },
]

const benefits = [
  { icon: IconCoin, text: 'Ahorra hasta $3,000/mes con tu membresía de $98' },
  { icon: IconShieldCheck, text: 'Códigos únicos — beneficios reales, sin trucos' },
  { icon: IconUsers, text: 'Negocios locales verificados de Aguascalientes' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 md:px-8">
        <div className="container-landing mx-auto text-center">
          <div className="inline-block bg-lima/20 text-carbon font-medium text-sm px-4 py-1.5 rounded-full mb-6">
            Ya disponible en Aguascalientes
          </div>
          <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-7xl text-carbon leading-tight text-balance max-w-4xl mx-auto">
            Beneficios reales en{' '}
            <span className="relative">
              negocios locales
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-lima/40 -z-10 rounded-sm" />
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-carbon/60 max-w-2xl mx-auto font-work-sans">
            Descuentos, 2x1 y experiencias exclusivas en restaurantes, cafés, gimnasios y más.
            Activa, muestra tu código y ahorra.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#como-funciona"
              className="bg-lima text-carbon font-semibold px-8 py-3.5 rounded-full text-lg hover:bg-lima-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Empieza gratis
              <IconArrowRight size={20} />
            </Link>
            <Link
              href="/become-a-partner"
              className="border-2 border-carbon/20 text-carbon font-semibold px-8 py-3.5 rounded-full text-lg hover:border-carbon/40 transition-colors inline-flex items-center justify-center"
            >
              Soy un negocio
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="section-padding bg-white">
        <div className="container-landing mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-center text-carbon/50 mb-14 max-w-xl mx-auto">
            Tres pasos. Sin complicaciones. Sin letras chiquitas.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center group">
                <div className="w-16 h-16 bg-lima/15 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-lima/30 transition-colors">
                  <step.icon size={28} className="text-carbon" />
                </div>
                <div className="text-sm font-semibold text-lima-700 mb-2">Paso {i + 1}</div>
                <h3 className="font-montserrat font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-carbon/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-landing mx-auto">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-center mb-4">
            Encuentra lo que te gusta
          </h2>
          <p className="text-center text-carbon/50 mb-14 max-w-xl mx-auto">
            Negocios locales de Aguascalientes organizados por categoría.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow border border-arena-dark/20"
              >
                <div className="w-12 h-12 bg-lima/15 rounded-xl flex items-center justify-center mb-4">
                  <cat.icon size={24} className="text-carbon" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">{cat.name}</h3>
                <p className="text-sm text-carbon/50 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding bg-carbon text-white">
        <div className="container-landing mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            Paga <span className="text-lima">$98/mes</span>, ahorra hasta{' '}
            <span className="text-lima">$3,000</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-12">
            Usa 1 promo al día por 20 días. Con descuentos promedio de $80–$150 por visita, tu
            membresía se paga sola desde el primer uso.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div key={b.text} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-lima/20 rounded-xl flex items-center justify-center">
                  <b.icon size={24} className="text-lima" />
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <span className="inline-block bg-lima text-carbon font-bold text-xl px-8 py-3 rounded-full">
              16x – 30x tu inversión
            </span>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-padding">
        <div className="container-landing mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-carbon/50 mb-14">Próximamente — lanzamiento en Aguascalientes.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-arena-dark/20">
                <div className="flex items-center gap-1 text-lima mb-4">
                  {[...Array(5)].map((_, j) => (
                    <IconCheck key={j} size={16} />
                  ))}
                </div>
                <p className="text-sm text-carbon/40 italic">
                  &ldquo;Testimonio de usuario por confirmar.&rdquo;
                </p>
                <p className="text-xs text-carbon/30 mt-3">— Usuario #{i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-lima/10">
        <div className="container-landing mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            Empieza a ahorrar hoy
          </h2>
          <p className="text-carbon/50 max-w-lg mx-auto mb-8">
            Descarga enplan. gratis y accede a beneficios exclusivos en negocios locales de
            Aguascalientes.
          </p>
          <Link
            href="#"
            className="bg-lima text-carbon font-semibold px-8 py-3.5 rounded-full text-lg hover:bg-lima-400 transition-colors inline-flex items-center gap-2"
          >
            Descargar gratis
            <IconArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

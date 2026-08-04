import Link from 'next/link'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import {
  IconSearch,
  IconTicket,
  IconDeviceMobile,
  IconArrowRight,
  IconMapPin,
  IconShieldCheck,
  IconSparkles,
  IconCheck,
} from '@tabler/icons-react'
import { Search, Ticket, Smartphone } from 'lucide-react'
import DisplayCards from '../components/ui/display-cards'
import { FloatingFoodHero } from '../components/ui/hero-section-7'

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
    description: 'Selecciona la promo que quieras y actívala al instante.',
    color: 'bg-carbon text-white',
  },
  {
    icon: IconDeviceMobile,
    title: 'Disfruta',
    description: 'Muestra tu beneficio activo en el negocio y disfrútalo al instante.',
    color: 'bg-lima text-carbon',
  },
]

const categories = [
  {
    name: 'Comida',
    description: 'Restaurantes, cafés y los mejores tacos de la ciudad',
    image: '/assets/icons/categories/icon-comida.png',
    bg: 'bg-[#E8C840]/20',
    border: 'border-[#E8C840]/30',
  },
  {
    name: 'Belleza',
    description: 'Salones, estéticas y tratamientos para consentirte',
    image: '/assets/icons/categories/icon-belleza.png',
    bg: 'bg-[#F2A0B0]/20',
    border: 'border-[#F2A0B0]/30',
  },
  {
    name: 'Fitness',
    description: 'Gimnasios, yoga, clases y todo para mantenerte activo',
    image: '/assets/icons/categories/icon-fitness.png',
    bg: 'bg-[#7BAFD4]/20',
    border: 'border-[#7BAFD4]/30',
  },
  {
    name: 'Ocio',
    description: 'Bares, cines, eventos y planes para pasarla bien',
    image: '/assets/icons/categories/icon-ocio.png',
    bg: 'bg-[#C4A0D4]/20',
    border: 'border-[#C4A0D4]/30',
  },
  {
    name: 'Tiendas',
    description: 'Boutiques, tiendas locales y artículos con descuento',
    image: '/assets/icons/categories/icon-tiendas.png',
    bg: 'bg-[#E8A080]/20',
    border: 'border-[#E8A080]/30',
  },
  {
    name: 'Servicios',
    description: 'Talleres, reparaciones y servicios profesionales',
    image: '/assets/icons/categories/icon-servicios.png',
    bg: 'bg-[#A0D4A0]/20',
    border: 'border-[#A0D4A0]/30',
  },
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
      <FloatingFoodHero
        title="Beneficios reales en negocios locales"
        description="Descuentos, 2x1 y experiencias exclusivas en restaurantes, cafés, gimnasios y más de Aguascalientes. Activa, muestra tu código y ahorra."
        images={[
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png',
            alt: 'Hamburguesa',
            className: 'w-40 sm:w-56 md:w-64 lg:w-72 top-10 left-4 sm:left-10 md:top-20 md:left-20 animate-float',
          },
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png',
            alt: 'Dumplings',
            className: 'w-28 sm:w-36 md:w-48 top-10 right-4 sm:right-10 md:top-16 md:right-16 animate-float',
          },
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png',
            alt: 'Pizza',
            className: 'w-32 sm:w-40 md:w-56 bottom-8 right-5 sm:right-10 md:bottom-16 md:right-20 animate-float',
          },
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png',
            alt: 'Hoja de albahaca',
            className: 'w-8 sm:w-12 top-1/4 left-1/3 animate-float',
          },
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png',
            alt: 'Tomate',
            className: 'w-8 sm:w-10 top-1/2 right-1/4 animate-float',
          },
          {
            src: 'https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png',
            alt: 'Tomate',
            className: 'w-8 sm:w-10 top-3/4 left-1/4 animate-float',
          },
        ]}
        className="pt-24"
        badge={
          <div className="inline-flex items-center gap-2 bg-carbon text-white font-medium text-sm px-4 py-2 rounded-full mb-8">
            <IconMapPin size={16} className="text-lima" />
            Ya disponible en Aguascalientes
          </div>
        }
      >
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
      </FloatingFoodHero>

      {/* How it works */}
      <section id="como-funciona" className="section-padding">
        <div className="container-landing mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Así de fácil</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3">
              ¿Cómo funciona?
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            <div className="flex-1 max-w-md">
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${step.color}`}>
                      <step.icon size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-1 text-lima-700">
                        Paso {i + 1}
                      </div>
                      <h3 className="font-montserrat font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-sm text-carbon/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <DisplayCards
                cards={[
                  {
                    icon: <Search className="size-4 text-lima" />,
                    title: 'Explora',
                    description: 'Descubre promos cerca de ti',
                    date: 'Aguascalientes',
                    titleClassName: 'text-lima-700',
                    className:
                      '[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-arena-dark/30 before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-arena/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0',
                  },
                  {
                    icon: <Ticket className="size-4 text-lima" />,
                    title: 'Activa',
                    description: 'Selecciona y activa al instante',
                    date: 'Un toque',
                    titleClassName: 'text-lima-700',
                    className:
                      '[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-arena-dark/30 before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-arena/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0',
                  },
                  {
                    icon: <Smartphone className="size-4 text-lima" />,
                    title: 'Disfruta',
                    description: 'Muestra tu código y ahorra',
                    date: 'Válido 24h',
                    titleClassName: 'text-lima-700',
                    className:
                      '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-landing mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-lima-700 uppercase tracking-wider">Categorías</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mt-3 text-carbon">
              Encuentra lo que te gusta
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`group relative overflow-hidden rounded-2xl ${cat.bg} border ${cat.border} p-4 md:p-6 min-h-[160px] md:min-h-[240px] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="relative z-10 flex-1">
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-carbon/40">
                    {cat.name}
                  </span>
                  <h3 className="font-montserrat font-bold text-xs md:text-lg text-carbon mt-1 md:mt-2 leading-snug max-w-[60%] md:max-w-[70%]">
                    {cat.description}
                  </h3>
                </div>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute bottom-1/2 translate-y-1/2 right-2 w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-[45%]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why enplan */}
      <section className="py-14 md:py-20 px-6 md:px-8 bg-lima/10 relative overflow-hidden">
        <div className="container-landing mx-auto relative">
          <div className="text-center mb-4">
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-carbon leading-tight">
              Beneficios que sí puedes usar
            </h2>
          </div>
          <p className="text-center text-carbon/50 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Promociones verificadas, exclusivas de negocios locales en Aguascalientes. Sin trucos, sin letra chiquita.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-arena-dark/20">
              <div className="w-10 h-10 bg-lima/20 rounded-full flex items-center justify-center mb-4">
                <IconShieldCheck size={20} className="text-lima-700" />
              </div>
              <h3 className="font-montserrat font-bold text-base mb-1.5 text-carbon">Verificado en la app</h3>
              <p className="text-sm text-carbon/50 leading-relaxed">
                Cada beneficio se verifica directamente en la app. Sin capturas, sin abusos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 border border-arena-dark/20">
              <div className="w-10 h-10 bg-lima/20 rounded-full flex items-center justify-center mb-4">
                <IconSparkles size={20} className="text-lima-700" />
              </div>
              <h3 className="font-montserrat font-bold text-base mb-1.5 text-carbon">Promos exclusivas</h3>
              <p className="text-sm text-carbon/50 leading-relaxed">
                Beneficios negociados directamente con cada negocio local.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 border border-arena-dark/20">
              <div className="w-10 h-10 bg-lima/20 rounded-full flex items-center justify-center mb-4">
                <IconMapPin size={20} className="text-lima-700" />
              </div>
              <h3 className="font-montserrat font-bold text-base mb-1.5 text-carbon">100% local</h3>
              <p className="text-sm text-carbon/50 leading-relaxed">
                Solo negocios de Aguascalientes. Lo mejor de tu ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lima-100 via-lima/30 to-lima-200 py-24 md:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-lima/20 rounded-full blur-[150px]" />

        <div className="container-landing mx-auto relative text-center">
          <span className="inline-block text-sm font-medium text-carbon/50 border border-carbon/10 bg-white/50 backdrop-blur-sm px-5 py-1.5 rounded-full mb-8">
            Empieza gratis
          </span>
          <h2 className="font-montserrat font-bold text-3xl md:text-5xl lg:text-6xl text-carbon mb-5 leading-tight">
            Empieza a ahorrar hoy
          </h2>
          <p className="text-carbon/50 max-w-lg mx-auto mb-10 text-base md:text-lg">
            Accede gratis a beneficios exclusivos en negocios locales de Aguascalientes.
          </p>
          <Link
            href="#como-funciona"
            className="bg-carbon text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-carbon-700 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            Empezar gratis
            <IconArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

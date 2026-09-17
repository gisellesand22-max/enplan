'use client'

import { useState } from 'react'
import {
  IconChevronDown,
  IconChevronUp,
  IconMail,
  IconBrandWhatsapp,
  IconBook,
  IconMessageCircle,
  IconTicket,
  IconChartBar,
  IconSettings,
} from '@tabler/icons-react'

const faqs = [
  {
    question: '¿Cómo creo una nueva promoción?',
    answer: 'Ve a la sección "Promociones" en el menú lateral y haz clic en "Nueva promoción". Elige el tipo (porcentaje, 2x1, beneficio fijo, clase o servicio), agrega un título, descripción y condiciones. Una vez guardada, se activa automáticamente para los usuarios de enplan.',
  },
  {
    question: '¿Puedo pausar una promoción sin eliminarla?',
    answer: 'Sí. En la sección de Promociones, cada promo tiene un toggle para activar/desactivar. Al desactivarla, deja de ser visible para los usuarios pero mantiene su configuración para cuando quieras reactivarla.',
  },
  {
    question: '¿Qué métricas puedo ver en mi dashboard?',
    answer: 'En el plan Básico ves visitas diarias, semanales y mensuales. Con el plan Pro accedes a métricas de crecimiento y tendencias. El plan Premium incluye demografía (edad y género), clientes nuevos vs recurrentes, horarios pico y ranking en tu categoría.',
  },
  {
    question: '¿Cómo cambio mi plan?',
    answer: 'Ve a Configuración > Cambiar plan. Puedes subir o bajar de plan en cualquier momento. El cambio se aplica al siguiente ciclo de facturación. Si subes, obtienes acceso inmediato a las nuevas funciones.',
  },
  {
    question: '¿Cómo cancelo mi suscripción?',
    answer: 'En Configuración encontrarás la opción de cancelar. No hay penalización ni cargos ocultos. Tu cuenta seguirá activa hasta el fin del período pagado. Puedes reactivarla en cualquier momento.',
  },
  {
    question: '¿Cómo edito la información de mi negocio?',
    answer: 'En "Configuración" puedes actualizar nombre, descripción, categoría, dirección, teléfono, horarios, logo y fotos de tu negocio. Los cambios se reflejan inmediatamente en el directorio de enplan.',
  },
  {
    question: '¿Los clientes pueden usar una promo más de una vez?',
    answer: 'Cada activación genera un código único de un solo uso. Un cliente puede activar la misma promo nuevamente después, pero cada código solo se valida una vez para evitar abusos.',
  },
]

const guides = [
  {
    icon: IconTicket,
    title: 'Crear tu primera promo',
    description: 'Guía paso a paso para configurar una promoción que atraiga clientes.',
  },
  {
    icon: IconChartBar,
    title: 'Entender tus métricas',
    description: 'Aprende a leer tu dashboard y tomar mejores decisiones.',
  },
  {
    icon: IconSettings,
    title: 'Configurar tu perfil',
    description: 'Optimiza tu perfil para aparecer mejor en el directorio.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-arena-dark/15 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-sm font-semibold text-carbon">{question}</span>
        {open ? (
          <IconChevronUp size={18} className="shrink-0 text-carbon/40" />
        ) : (
          <IconChevronDown size={18} className="shrink-0 text-carbon/40" />
        )}
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-carbon/55">{answer}</p>
      )}
    </div>
  )
}

export default function AyudaPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Contact cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <a
          href="https://wa.me/524491234567"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-arena-dark/20 bg-white p-6 transition-all hover:border-lima/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <IconBrandWhatsapp size={22} className="text-green-600" />
          </div>
          <h3 className="mt-4 font-montserrat text-sm font-bold text-carbon">WhatsApp</h3>
          <p className="mt-1 text-xs text-carbon/45">Respuesta en menos de 2 horas. Lunes a sábado.</p>
        </a>

        <a
          href="mailto:soporte@enplan.app"
          className="group rounded-2xl border border-arena-dark/20 bg-white p-6 transition-all hover:border-lima/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <IconMail size={22} className="text-blue-600" />
          </div>
          <h3 className="mt-4 font-montserrat text-sm font-bold text-carbon">Correo</h3>
          <p className="mt-1 text-xs text-carbon/45">soporte@enplan.app — te respondemos en 24h.</p>
        </a>

        <div className="rounded-2xl border border-arena-dark/20 bg-white p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lima/20">
            <IconMessageCircle size={22} className="text-lima-700" />
          </div>
          <h3 className="mt-4 font-montserrat text-sm font-bold text-carbon">Chat en vivo</h3>
          <p className="mt-1 text-xs text-carbon/45">Próximamente. Soporte directo desde tu panel.</p>
        </div>
      </div>

      {/* Guides */}
      <div className="rounded-2xl border border-arena-dark/20 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lima/15">
            <IconBook size={18} className="text-lima-700" />
          </div>
          <h2 className="font-montserrat text-lg font-bold text-carbon">Guías rápidas</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="flex items-start gap-4 rounded-xl border border-arena-dark/10 bg-arena/50 p-4 transition-colors hover:bg-arena"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-arena-dark/20 bg-white">
                <guide.icon size={18} className="text-carbon/60" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-carbon">{guide.title}</h3>
                <p className="mt-0.5 text-xs text-carbon/45 leading-relaxed">{guide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-arena-dark/20 bg-white p-6">
        <h2 className="mb-2 font-montserrat text-lg font-bold text-carbon">Preguntas frecuentes</h2>
        <p className="mb-4 text-sm text-carbon/40">Todo lo que necesitas saber sobre enplan. para negocios</p>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}

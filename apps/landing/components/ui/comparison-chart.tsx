import { IconCheck, IconX } from '@tabler/icons-react'

const enplanPoints = [
  'Visitas verificadas en tiempo real',
  'Dashboard con métricas al instante',
  'Sin contratos ni permanencia',
  'Primer mes completamente gratis',
  'Activa o pausa promos cuando quieras',
  'Soporte directo y personalizado',
  'Resultados medibles desde el día 1',
  'Precio fijo, sin comisiones por venta',
]

const othersPoints = [
  'Sin forma de medir cuántos clientes llegaron',
  'Reportes mensuales genéricos o nulos',
  'Contratos de 6 a 12 meses',
  'Cobros de activación y setup',
  'Cambios requieren aprobación y tiempo',
  'Soporte por ticket con días de espera',
  'Resultados inciertos por meses',
  'Comisiones ocultas por transacción',
]

export function ComparisonChart() {
  return (
    <section className="section-padding bg-lima/10 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-lima/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-lima/15 rounded-full blur-3xl" />

      <div className="container-landing mx-auto relative">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-carbon/50 border border-carbon/10 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <IconCheck size={14} className="text-lima-700" />
            ¿Por qué enplan.?
          </span>
        </div>
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-carbon text-center mb-3">
          Construido diferente, a propósito
        </h2>
        <p className="text-center text-carbon/50 max-w-2xl mx-auto mb-14 text-sm md:text-base">
          Nos enfocamos en lo que otros ignoran. Esto es lo que significa para tu negocio cada día.
        </p>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {/* enplan column */}
          <div className="rounded-2xl border border-lima/20 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-montserrat font-bold text-xl text-carbon">enplan.</span>
              <span className="text-[11px] font-medium border border-lima/40 bg-lima/10 text-lima-700 px-2.5 py-0.5 rounded-full">
                Recomendado
              </span>
            </div>
            <p className="text-sm text-carbon/40 mb-7">
              Todo lo que tu negocio necesita para medir clientes reales.
            </p>

            <div className="space-y-4">
              {enplanPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-lima/20 flex items-center justify-center shrink-0 mt-0.5">
                    <IconCheck size={13} className="text-lima-700" />
                  </div>
                  <span className="text-sm text-carbon/80">{point}</span>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="mt-8 block w-full text-center font-semibold py-3 rounded-full text-sm bg-carbon text-white hover:bg-carbon-700 transition-colors"
            >
              Comenzar gratis →
            </a>
          </div>

          {/* Others column */}
          <div className="rounded-2xl border border-arena-dark/30 bg-arena p-6 md:p-8">
            <div className="mb-1">
              <span className="font-montserrat font-bold text-xl text-carbon/40">Los demás</span>
            </div>
            <p className="text-sm text-carbon/25 mb-7">
              Problemas comunes con plataformas tradicionales de marketing.
            </p>

            <div className="space-y-4">
              {othersPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-carbon/5 flex items-center justify-center shrink-0 mt-0.5">
                    <IconX size={13} className="text-carbon/20" />
                  </div>
                  <span className="text-sm text-carbon/30">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 block w-full text-center font-semibold py-3 rounded-full text-sm bg-arena-dark/30 text-carbon/30 border border-arena-dark/20 cursor-default">
              Ve por qué cambian →
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

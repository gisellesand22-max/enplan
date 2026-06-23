import { useAuth } from '../_layout'
import { IconTicket, IconClock, IconLock } from '@tabler/icons-react'

interface ActiveBenefit {
  negocio: string
  promo: string
  code: string
  timeRemaining: string
}

interface HistoryItem {
  negocio: string
  promo: string
  date: string
  status: 'usada' | 'expirada'
}

const mockActive: ActiveBenefit[] = [
  {
    negocio: 'Café La Estación',
    promo: '2x1 en cualquier café',
    code: '2847',
    timeRemaining: '18h 32m',
  },
  {
    negocio: 'Gym FitZone',
    promo: 'Primera clase gratis',
    code: '6193',
    timeRemaining: '5h 14m',
  },
]

const mockHistory: HistoryItem[] = [
  { negocio: 'Bar El Patio', promo: '20% en tu cuenta', date: '18 jun', status: 'usada' },
  { negocio: 'Taquería Don Pedro', promo: 'Tacos gratis con bebida', date: '16 jun', status: 'usada' },
  { negocio: 'Yoga Studio Zen', promo: 'Clase de prueba gratis', date: '14 jun', status: 'expirada' },
  { negocio: 'Salón Bella', promo: 'Corte a $150', date: '10 jun', status: 'usada' },
]

export default function BenefitsScreen() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="px-5 pt-4 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl p-8 border border-arena-dark/20 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-lima/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <IconLock size={28} className="text-carbon" />
          </div>
          <h2 className="font-montserrat font-bold text-xl text-carbon mb-2">
            Tus beneficios te esperan
          </h2>
          <p className="text-sm text-carbon/50 mb-6 leading-relaxed">
            Inicia sesión para activar promociones y ver tu historial de beneficios.
          </p>
          <button className="w-full bg-lima text-carbon font-bold py-3 rounded-full hover:bg-lima-400 transition-colors">
            Iniciar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pt-2">
      {/* Active benefits */}
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-lg text-carbon mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-lima rounded-full" />
          Activos
        </h2>

        {mockActive.length === 0 ? (
          <div className="bg-white rounded-xl p-5 border border-arena-dark/20 text-center">
            <p className="text-sm text-carbon/40">No tienes beneficios activos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockActive.map((item) => (
              <div
                key={item.code}
                className="bg-white rounded-xl border border-arena-dark/20 overflow-hidden shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm text-carbon">{item.negocio}</p>
                      <p className="text-xs text-carbon/40 mt-0.5">{item.promo}</p>
                    </div>
                    <span className="bg-lima/20 text-carbon text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Activa
                    </span>
                  </div>

                  {/* Big code display */}
                  <div className="bg-arena rounded-xl p-4 text-center">
                    <p className="font-montserrat font-extrabold text-4xl tracking-[0.25em] text-carbon">
                      {item.code}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-3 text-carbon/40">
                    <IconClock size={14} />
                    <span className="text-xs">{item.timeRemaining} restantes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <h2 className="font-montserrat font-bold text-lg text-carbon mb-3 flex items-center gap-2">
          <IconTicket size={16} className="text-arena-dark" />
          Historial
        </h2>
        <div className="space-y-2">
          {mockHistory.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-arena-dark/20 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-sm text-carbon">{item.negocio}</p>
                <p className="text-xs text-carbon/40 mt-0.5">{item.promo}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'usada'
                      ? 'bg-carbon text-white'
                      : 'bg-arena-dark/30 text-carbon/50'
                  }`}
                >
                  {item.status}
                </span>
                <p className="text-[10px] text-carbon/30 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  )
}

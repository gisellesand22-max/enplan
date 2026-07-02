// Demo data + constants for the business panel (UI-first).
// When the Supabase backend is live, these are replaced by real queries
// from @enplan/shared (getDashboardNegocio, getPromociones, validarCodigo…).

export type PlanNegocio = 'basico' | 'pro' | 'premium'

export type TipoPromo = 'porcentaje' | '2x1' | 'beneficio_fijo' | 'clase' | 'servicio'

export type EstadoVisita = 'usada' | 'activa' | 'expirada'

export interface Promo {
  id: string
  tipo: TipoPromo
  titulo: string
  descripcion: string
  condiciones: string
  activa: boolean
  /** Meaning depends on tipo: % for 'porcentaje', pesos (MXN) for the rest. */
  valor: number
  /** Reference price (MXN) — only used by 'porcentaje' to turn % into pesos. */
  precioRef?: number
}

/** Estimated pesos a customer saves per visit. Powers the app's "ahorras $X". */
// NOTA: este cálculo es solo VISUAL (vista previa en el panel). El ahorro
// real lo calcula el servidor en activar_promo() — el cliente nunca lo manda.
export function calcAhorro(p: { tipo: TipoPromo; valor: number; precioRef?: number }): number {
  if (!p.valor || !Number.isFinite(p.valor) || p.valor < 0) return 0
  if (p.tipo === 'porcentaje') {
    const ref = p.precioRef ?? 0
    if (!Number.isFinite(ref) || ref <= 0) return 0
    return Math.round((ref * Math.min(p.valor, 100)) / 100)
  }
  if (p.tipo === 'servicio') {
    // valor = precio final que paga el cliente; precioRef = precio normal
    const ref = p.precioRef ?? 0
    if (!Number.isFinite(ref) || ref <= 0) return 0
    return Math.max(Math.round(ref - p.valor), 0)
  }
  return Math.round(p.valor)
}

/** Tipo-aware label/help for the value field in the promo form. */
export function valorField(tipo: TipoPromo): {
  label: string
  help: string
  suffix: string
  needsPrecioRef: boolean
} {
  switch (tipo) {
    case 'porcentaje':
      return { label: '% de descuento', help: 'Ej. 20 para 20% de descuento', suffix: '%', needsPrecioRef: true }
    case '2x1':
      return { label: 'Precio del producto (MXN)', help: 'Lo que cuesta el producto que va gratis', suffix: '$', needsPrecioRef: false }
    case 'beneficio_fijo':
      return { label: 'Monto de descuento (MXN)', help: 'Cuántos pesos de descuento das', suffix: '$', needsPrecioRef: false }
    case 'clase':
      return { label: 'Valor de la clase (MXN)', help: 'Cuánto cuesta normalmente la clase', suffix: '$', needsPrecioRef: false }
    case 'servicio':
      return { label: 'Precio con descuento (MXN)', help: 'Lo que pagará el cliente. Arriba pon el precio normal.', suffix: '$', needsPrecioRef: true }
  }
}

export interface Negocio {
  nombre: string
  categoria: string
  descripcion: string
  direccion: string
  telefono: string
  website: string
  instagram: string
  plan: PlanNegocio
  logoUrl: string | null
  coverUrl: string | null
}

export interface Visita {
  id: string
  userName: string
  promoTitulo: string
  estado: EstadoVisita
  hora: string
}

export const PLAN_LIMITS: Record<PlanNegocio, number> = {
  basico: 1,
  pro: 2,
  premium: Infinity,
}

export const PLANES: {
  id: PlanNegocio
  nombre: string
  precio: number
  descripcion: string
  popular?: boolean
  features: string[]
}[] = [
  {
    id: 'basico',
    nombre: 'Básico',
    precio: 499,
    descripcion: 'Para probar el concepto',
    features: ['1 promoción activa', 'Perfil en directorio', 'Panel de inicio'],
  },
  {
    id: 'pro',
    nombre: 'Pro',
    precio: 999,
    descripcion: 'El más elegido',
    popular: true,
    features: [
      '2 promociones activas',
      'Métricas de crecimiento',
      'Posición destacada',
      'Perfil en directorio',
    ],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 1799,
    descripcion: 'Para dominar tu categoría',
    features: [
      'Promos ilimitadas',
      'Métricas avanzadas: edad y sexo',
      'Clientes nuevos vs recurrentes',
      'Posición #1 + account manager',
    ],
  },
]

export const PROMO_TYPES: { value: TipoPromo; label: string }[] = [
  { value: 'porcentaje', label: 'Porcentaje de descuento' },
  { value: '2x1', label: '2x1' },
  { value: 'beneficio_fijo', label: 'Beneficio fijo' },
  { value: 'clase', label: 'Clase gratis' },
  { value: 'servicio', label: 'Servicio gratis' },
]

export const PROMO_TYPE_LABEL: Record<TipoPromo, string> = {
  porcentaje: '% desc.',
  '2x1': '2x1',
  beneficio_fijo: 'Beneficio',
  clase: 'Clase gratis',
  servicio: 'Servicio gratis',
}

export const CATEGORIES = [
  'Comida',
  'Belleza',
  'Fitness',
  'Ocio',
  'Tiendas',
  'Servicios',
]

// Initial demo state — a business on the Pro plan with 1 of its 2 promos used,
// so the "add promo" limit is reachable during the demo.
export const DEMO_NEGOCIO: Negocio = {
  nombre: 'Café La Estación',
  categoria: 'Comida',
  descripcion:
    'Cafetería de especialidad en el centro de Aguascalientes. Grano local, repostería casera y wifi para trabajar.',
  direccion: 'Av. Madero 210, Zona Centro, Aguascalientes',
  telefono: '449 123 4567',
  website: '',
  instagram: '@cafelaestacion',
  plan: 'pro',
  logoUrl: null,
  coverUrl: null,
}

export const DEMO_PROMOS: Promo[] = [
  {
    id: 'p1',
    tipo: '2x1',
    titulo: '2x1 en cualquier café',
    descripcion: 'Trae a un amigo y el segundo café va por nuestra cuenta.',
    condiciones: 'Válido de lunes a jueves. No acumulable con otras promociones.',
    activa: true,
    valor: 55,
  },
]

export const DEMO_DASHBOARD = {
  totalVisitasHoy: 7,
  totalVisitasSemana: 38,
  totalVisitasMes: 142,
  visitas: [
    { id: 'v1', userName: 'María G.', promoTitulo: '2x1 en cualquier café', estado: 'usada', hora: '10:24' },
    { id: 'v2', userName: 'Luis R.', promoTitulo: '2x1 en cualquier café', estado: 'usada', hora: '11:05' },
    { id: 'v3', userName: 'Ana P.', promoTitulo: '2x1 en cualquier café', estado: 'activa', hora: '12:30' },
    { id: 'v4', userName: 'Carlos M.', promoTitulo: '2x1 en cualquier café', estado: 'usada', hora: '13:12' },
    { id: 'v5', userName: 'Sofía T.', promoTitulo: '2x1 en cualquier café', estado: 'activa', hora: '14:48' },
  ] as Visita[],
}

// Time-series demo data for the Métricas tab.
// Backend phase: derive these from activaciones grouped by day / month.
export const DAILY_VISITS = [3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 12]
export const MONTHLY_VISITS = [34, 52, 61, 78, 96, 142]
export const WEEKDAY_VISITS: { label: string; value: number }[] = [
  { label: 'L', value: 12 },
  { label: 'M', value: 15 },
  { label: 'M', value: 14 },
  { label: 'J', value: 19 },
  { label: 'V', value: 28 },
  { label: 'S', value: 34 },
  { label: 'D', value: 20 },
]

const MONTH_LABELS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/** Build the last N daily points ending today (labels as day/month). */
export function buildDailySeries(): { label: string; value: number }[] {
  const today = new Date()
  return DAILY_VISITS.map((value, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (DAILY_VISITS.length - 1 - i))
    return { label: `${d.getDate()}/${d.getMonth() + 1}`, value }
  })
}

/** Build the last N monthly points ending this month. */
export function buildMonthlySeries(): { label: string; value: number }[] {
  const today = new Date()
  return MONTHLY_VISITS.map((value, i) => {
    const d = new Date(today)
    d.setMonth(today.getMonth() - (MONTHLY_VISITS.length - 1 - i))
    return { label: MONTH_LABELS[d.getMonth()], value }
  })
}

// Premium-only audience demographics (demo).
// Backend phase: derived from the users who activated this negocio's promos.
export const GENDER_SPLIT = [
  { label: 'Mujeres', value: 58, color: '#CDD917' },
  { label: 'Hombres', value: 40, color: '#2B2B23' },
  { label: 'Otro', value: 2, color: '#D6D0C4' },
]

export const AGE_SPLIT: { label: string; value: number }[] = [
  { label: '18-24', value: 22 },
  { label: '25-34', value: 41 },
  { label: '35-44', value: 25 },
  { label: '45-54', value: 9 },
  { label: '55+', value: 3 },
]

export const RETURNING_SPLIT = [
  { label: 'Nuevos', value: 64, color: '#CDD917' },
  { label: 'Recurrentes', value: 36, color: '#2B2B23' },
]

// Premium behavior + performance data (demo).
export const HOURLY_VISITS: { label: string; value: number }[] = [
  { label: '9h', value: 6 },
  { label: '11h', value: 11 },
  { label: '13h', value: 22 },
  { label: '15h', value: 14 },
  { label: '17h', value: 18 },
  { label: '19h', value: 27 },
  { label: '21h', value: 13 },
]

export const RETENTION_RATE = 38 // % of customers who return within 30 days

export const CATEGORY_RANK = {
  position: 2,
  total: 8,
  categoria: 'cafés',
  ciudad: 'Aguascalientes',
  leaders: [
    { name: 'Café Central', visitas: 156, isYou: false },
    { name: 'Café La Estación', visitas: 142, isYou: true },
    { name: 'Blend & Co.', visitas: 121, isYou: false },
  ],
}

export const INSIGHTS = [
  'Tus visitas suben 34% los sábados. Considera una promo especial ese día.',
  'El 41% de tu público tiene 25-34 años: comunica en un tono joven y digital.',
  'Tu promo estrella convierte mejor entre semana. Empújala de lunes a jueves.',
]

/** Demo performance numbers per promo, derived deterministically from order. */
export function buildPromoPerformance(
  promos: { id: string; titulo: string }[],
): { titulo: string; activaciones: number; validadas: number; conv: number }[] {
  return promos.map((p, i) => {
    const activaciones = Math.max(8, 46 - i * 13)
    const validadas = Math.round(activaciones * 0.72)
    return {
      titulo: p.titulo,
      activaciones,
      validadas,
      conv: Math.round((validadas / activaciones) * 100),
    }
  })
}

// Demo-only code validation. Real logic will call the validar_codigo RPC.
export function validarCodigoDemo(
  codigo: string,
):
  | { status: 'success'; customerName: string; promoTitle: string }
  | { status: 'error'; reason: 'expired' | 'already_used' | 'wrong_business' | 'invalid_code' } {
  const c = codigo.trim()
  if (c === '1234') return { status: 'success', customerName: 'Ana Paredes', promoTitle: '2x1 en cualquier café' }
  if (c === '0000') return { status: 'error', reason: 'already_used' }
  if (c === '1111') return { status: 'error', reason: 'expired' }
  return { status: 'error', reason: 'invalid_code' }
}

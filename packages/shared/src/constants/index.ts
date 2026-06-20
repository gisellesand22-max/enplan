import type { CategoriaEnum, PlanNegocioEnum, TipoPromoEnum } from '../types/database';

export const COLORS = {
  lima: '#CDD917',
  carbon: '#2B2B23',
  arena: '#FAF8F3',
  blanco: '#FFFFFF',
  arenaOscuro: '#D6D0C4',
} as const;

export const CATEGORIES: { value: CategoriaEnum; label: string; icon: string }[] = [
  { value: 'comida', label: 'Comida', icon: 'IconToolsKitchen2' },
  { value: 'bienestar', label: 'Bienestar', icon: 'IconHeartbeat' },
  { value: 'ocio', label: 'Ocio', icon: 'IconConfetti' },
  { value: 'negocios', label: 'Negocios', icon: 'IconBriefcase' },
];

export const PROMO_TYPES: { value: TipoPromoEnum; label: string }[] = [
  { value: 'porcentaje', label: 'Porcentaje de descuento' },
  { value: '2x1', label: '2x1' },
  { value: 'beneficio_fijo', label: 'Beneficio fijo' },
  { value: 'clase', label: 'Clase gratis' },
  { value: 'servicio', label: 'Servicio gratis' },
];

export const PLAN_LIMITS: Record<PlanNegocioEnum, { maxPromos: number }> = {
  basico: { maxPromos: 1 },
  pro: { maxPromos: 2 },
  premium: { maxPromos: Infinity },
};

export const CONSUMER_DAILY_LIMIT = 1;

export const CODE_EXPIRY_HOURS = 24;

export const TIMEZONE = 'America/Mexico_City';

export const APP_URL = 'https://enplan.app';

export const BUSINESS_URL = 'https://negocio.enplan.app';

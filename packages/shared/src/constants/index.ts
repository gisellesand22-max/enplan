import type { CategoriaEnum, PlanNegocioEnum, TipoPromoEnum } from '../types/database';

export const COLORS = {
  lima: '#CDD917',
  carbon: '#2B2B23',
  arena: '#FAF8F3',
  blanco: '#FFFFFF',
  arenaOscuro: '#D6D0C4',
} as const;

// 6 categorías oficiales (PRD v1.7). Íconos PNG en /assets/icons/categories/
export const CATEGORIES: { value: CategoriaEnum; label: string; icon: string }[] = [
  { value: 'comida', label: 'Comida', icon: 'icon-comida' },
  { value: 'belleza', label: 'Belleza', icon: 'icon-belleza' },
  { value: 'fitness', label: 'Fitness', icon: 'icon-fitness' },
  { value: 'ocio', label: 'Ocio', icon: 'icon-ocio' },
  { value: 'tiendas', label: 'Tiendas', icon: 'icon-tiendas' },
  { value: 'servicios', label: 'Servicios', icon: 'icon-servicios' },
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

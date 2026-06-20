export type {
  CategoriaEnum,
  TipoPromoEnum,
  RolEnum,
  PlanConsumidorEnum,
  PlanNegocioEnum,
  EstadoActivacionEnum,
  User,
  Negocio,
  Promocion,
  Activacion,
  Database,
} from './types/database';

export type {
  ActivarPromoRequest,
  ActivarPromoResponse,
  ValidarCodigoRequest,
  ValidarCodigoResponse,
  VisitaDelDia,
  DashboardData,
  UserProfile,
  NegocioProfile,
  NegocioConPromos,
  ActivacionConDetalle,
  PromoFilters,
} from './types/api';

export {
  COLORS,
  CATEGORIES,
  PROMO_TYPES,
  PLAN_LIMITS,
  CONSUMER_DAILY_LIMIT,
  CODE_EXPIRY_HOURS,
  TIMEZONE,
  APP_URL,
  BUSINESS_URL,
} from './constants';

export { createClient } from './supabase/client';
export type { SupabaseClient } from './supabase/client';

export {
  getNegocios,
  getNegocio,
  getPromociones,
  activarPromo,
  validarCodigo,
  getActivacionesUsuario,
  getDashboardNegocio,
  checkDailyLimit,
} from './supabase/queries';

export {
  formatCurrency,
  getTimeRemaining,
  getRefLink,
  generateShareText,
} from './utils';

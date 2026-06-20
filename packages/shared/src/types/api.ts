import type { Activacion, CategoriaEnum, EstadoActivacionEnum, Negocio, Promocion, User } from './database';

export interface ActivarPromoRequest {
  userId: string;
  promoId: string;
}

export interface ActivarPromoResponse {
  success: boolean;
  codigo: string;
  expiraEn: string;
}

export interface ValidarCodigoRequest {
  codigo: string;
  negocioId: string;
}

export interface ValidarCodigoResponse {
  valid: boolean;
  activacionId: string | null;
  mensaje: string;
}

export interface VisitaDelDia {
  id: string;
  userName: string;
  promoTitulo: string;
  estado: EstadoActivacionEnum;
  activadoEn: string;
}

export interface DashboardData {
  totalVisitasHoy: number;
  totalVisitasMes: number;
  promosActivas: number;
  visitasDelDia: VisitaDelDia[];
}

export interface UserProfile extends Pick<User, 'id' | 'email' | 'nombre' | 'apellido' | 'plan'> {
  totalActivaciones: number;
  activacionesHoy: number;
}

export interface NegocioProfile extends Negocio {
  promociones: Promocion[];
  totalVisitas: number;
}

export interface NegocioConPromos extends Negocio {
  promociones: Promocion[];
}

export interface ActivacionConDetalle extends Activacion {
  promocion: Promocion;
  negocio: Pick<Negocio, 'id' | 'nombre' | 'logo_url' | 'categoria'>;
}

export interface PromoFilters {
  categoria?: CategoriaEnum;
  soloPremium?: boolean;
  busqueda?: string;
}

import type { Activacion, CategoriaEnum, EstadoActivacionEnum, Negocio, Promocion, User } from './database';

// El userId NO viaja desde el cliente: el servidor usa auth.uid()
export interface ActivarPromoRequest {
  promoId: string;
}

export interface ActivarPromoResponse {
  success: boolean;
  codigo?: string;
  expiraEn?: string;
  ahorroCalculado?: number;
  error?: string;
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

export interface UserProfile extends Pick<User, 'id' | 'email' | 'nombre' | 'apellido' | 'plan_consumidor'> {
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
  negocio: Pick<Negocio, 'id' | 'nombre' | 'categoria'>;
}

export interface PromoFilters {
  categoria?: CategoriaEnum;
  busqueda?: string;
}

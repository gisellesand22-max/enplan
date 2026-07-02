// ============================================================================
// enplan. — Tipos de base de datos (v1.7)
// FUENTE DE VERDAD: supabase/migrations/*.sql — estos tipos reflejan
// exactamente las columnas reales. Si cambias el SQL, cambia esto.
// ============================================================================

export type CategoriaEnum = 'comida' | 'belleza' | 'fitness' | 'ocio' | 'tiendas' | 'servicios';

export type TipoPromoEnum = 'porcentaje' | '2x1' | 'beneficio_fijo' | 'clase' | 'servicio';

export type RolEnum = 'consumidor' | 'negocio';

export type PlanConsumidorEnum = 'gratis' | 'premium';

export type PlanNegocioEnum = 'basico' | 'pro' | 'premium';

export type EstadoActivacionEnum = 'activa' | 'usada' | 'expirada';

export interface User {
  id: string;
  email: string;
  nombre: string;                    // nombre de pila — lo único que un negocio llega a ver
  apellido: string | null;           // solo plataforma, nunca expuesto a negocios
  fecha_nacimiento: string | null;   // ISO date; la edad se calcula a partir de aquí
  role: RolEnum;
  plan_consumidor: PlanConsumidorEnum;
  referred_by: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Negocio {
  id: string;
  user_id: string;
  nombre: string;
  categoria: CategoriaEnum;
  descripcion: string | null;
  direccion: string | null;
  telefono: string | null;
  whatsapp: string | null;           // WhatsApp propio de cada negocio (formato wa.me)
  horarios: Record<string, string> | null;
  fotos: string[];
  plan: PlanNegocioEnum;
  plan_vence_en: string | null;
  activo: boolean;
  created_at: string;
}

export interface Promocion {
  id: string;
  negocio_id: string;
  tipo: TipoPromoEnum;
  titulo: string;
  descripcion: string | null;
  valor: string | null;               // texto para mostrar ("20%", "2x1")
  precio_referencia: number;          // OBLIGATORIO — precio regular en MXN
  porcentaje: number | null;          // solo tipo 'porcentaje'
  precio_con_descuento: number | null; // solo tipo 'servicio'
  activa: boolean;
  fecha_inicio: string;
  fecha_fin: string | null;
  created_at: string;
}

export interface Activacion {
  id: string;
  user_id: string;
  negocio_id: string;
  promo_id: string;
  codigo_validacion: string;
  timestamp_activacion: string;       // la visita se registra aquí
  timestamp_expiracion: string;
  estado: EstadoActivacionEnum;
  timestamp_uso: string | null;       // null si el negocio nunca validó (el código es opcional)
  ahorro_calculado: number;           // calculado por el servidor en activar_promo()
  created_at: string;
}

// Resultado de get_visitas_negocio() — el dashboard nunca toca la tabla users
export interface VisitaNegocio {
  activacion_id: string;
  nombre_cliente: string;             // solo nombre de pila
  promo_titulo: string;
  estado: EstadoActivacionEnum;
  timestamp_activacion: string;
  timestamp_uso: string | null;
}

export interface ActivarPromoResult {
  success: boolean;
  activacion_id?: string;
  codigo?: string;
  expira_en?: string;
  ahorro_calculado?: number;
  error?: string;
  mensaje?: string;
}

export interface ValidarCodigoResult {
  success: boolean;
  user_nombre?: string;
  promo_titulo?: string;
  promo_tipo?: TipoPromoEnum;
  promo_valor?: string;
  error?: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      negocios: {
        Row: Negocio;
        Insert: Omit<Negocio, 'id' | 'created_at' | 'activo' | 'fotos'> & { id?: string; created_at?: string; activo?: boolean; fotos?: string[] };
        Update: Partial<Omit<Negocio, 'id' | 'created_at'>>;
      };
      promociones: {
        Row: Promocion;
        Insert: Omit<Promocion, 'id' | 'created_at' | 'activa'> & { id?: string; created_at?: string; activa?: boolean };
        Update: Partial<Omit<Promocion, 'id' | 'created_at'>>;
      };
      activaciones: {
        Row: Activacion;
        Insert: Omit<Activacion, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Activacion, 'id' | 'created_at'>>;
      };
    };
    Functions: {
      activar_promo: {
        Args: { p_promo_id: string };  // el user sale de auth.uid() en el servidor — nunca del cliente
        Returns: ActivarPromoResult;
      };
      validar_codigo: {
        Args: { p_codigo: string; p_negocio_id: string };
        Returns: ValidarCodigoResult;
      };
      get_visitas_negocio: {
        Args: { p_negocio_id: string; p_desde?: string; p_hasta?: string };
        Returns: VisitaNegocio[];
      };
    };
  };
}

export type CategoriaEnum = 'comida' | 'bienestar' | 'ocio' | 'negocios';

export type TipoPromoEnum = 'porcentaje' | '2x1' | 'beneficio_fijo' | 'clase' | 'servicio';

export type RolEnum = 'consumidor' | 'negocio';

export type PlanConsumidorEnum = 'gratis' | 'premium';

export type PlanNegocioEnum = 'basico' | 'pro' | 'premium';

export type EstadoActivacionEnum = 'activa' | 'usada' | 'expirada';

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: RolEnum;
  plan: PlanConsumidorEnum;
  referido_por: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Negocio {
  id: string;
  user_id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  categoria: CategoriaEnum;
  logo_url: string | null;
  cover_url: string | null;
  direccion: string;
  latitud: number | null;
  longitud: number | null;
  telefono: string | null;
  website: string | null;
  instagram: string | null;
  plan: PlanNegocioEnum;
  activo: boolean;
  stripe_account_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Promocion {
  id: string;
  negocio_id: string;
  tipo: TipoPromoEnum;
  titulo: string;
  descripcion: string;
  valor: number | null;
  condiciones: string | null;
  solo_premium: boolean;
  activa: boolean;
  fecha_inicio: string;
  fecha_fin: string | null;
  created_at: string;
  updated_at: string;
}

export interface Activacion {
  id: string;
  user_id: string;
  promocion_id: string;
  negocio_id: string;
  codigo: string;
  estado: EstadoActivacionEnum;
  activado_en: string;
  expira_en: string;
  validado_en: string | null;
  validado_por: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      negocios: {
        Row: Negocio;
        Insert: Omit<Negocio, 'id' | 'created_at' | 'updated_at' | 'activo'> & { id?: string; created_at?: string; updated_at?: string; activo?: boolean };
        Update: Partial<Omit<Negocio, 'id' | 'created_at'>>;
      };
      promociones: {
        Row: Promocion;
        Insert: Omit<Promocion, 'id' | 'created_at' | 'updated_at' | 'activa'> & { id?: string; created_at?: string; updated_at?: string; activa?: boolean };
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
        Args: { p_user_id: string; p_promo_id: string };
        Returns: { codigo: string; expira_en: string };
      };
      validar_codigo: {
        Args: { p_codigo: string; p_negocio_id: string };
        Returns: { valid: boolean; activacion_id: string | null; mensaje: string };
      };
    };
  };
}

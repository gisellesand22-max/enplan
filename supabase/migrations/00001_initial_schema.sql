-- ============================================================================
-- enplan. — Esquema inicial (v1.7)
-- Cambios vs versión anterior:
--   * users: + apellido, + fecha_nacimiento (edad se calcula, nunca caduca)
--   * negocios: 6 categorías (comida/belleza/fitness/ocio/tiendas/servicios)
--               + whatsapp (cada negocio tiene el suyo)
--   * promociones: + precio_referencia (OBLIGATORIO), + porcentaje,
--                  + precio_con_descuento (solo tipo 'servicio')
--   * activaciones: + ahorro_calculado (lo calcula el SERVIDOR al activar)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  nombre text NOT NULL,               -- nombre de pila (lo ÚNICO que ve el negocio)
  apellido text,                      -- solo visible para la plataforma, nunca para negocios
  fecha_nacimiento date,              -- capturada en registro; la edad se deriva de aquí
  role text NOT NULL CHECK (role IN ('consumidor', 'negocio')) DEFAULT 'consumidor',
  plan_consumidor text NOT NULL CHECK (plan_consumidor IN ('gratis', 'premium')) DEFAULT 'gratis',
  referred_by uuid REFERENCES users(id),
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Negocios table
CREATE TABLE negocios (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) NOT NULL,
  nombre text NOT NULL,
  categoria text NOT NULL CHECK (categoria IN ('comida', 'belleza', 'fitness', 'ocio', 'tiendas', 'servicios')),
  descripcion text,
  direccion text,
  telefono text,
  whatsapp text,                      -- número WhatsApp propio de CADA negocio (formato wa.me: 521449XXXXXXX)
  horarios jsonb,
  fotos text[] DEFAULT '{}',
  plan text NOT NULL CHECK (plan IN ('basico', 'pro', 'premium')) DEFAULT 'basico',
  plan_vence_en date,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Promociones table
CREATE TABLE promociones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  negocio_id uuid REFERENCES negocios(id) NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('porcentaje', '2x1', 'beneficio_fijo', 'clase', 'servicio')),
  titulo text NOT NULL,
  descripcion text,
  valor text,                          -- texto para mostrar ("20%", "2x1", etc.)
  precio_referencia numeric NOT NULL CHECK (precio_referencia >= 0),
                                       -- OBLIGATORIO: precio regular del producto/servicio (MXN)
  porcentaje numeric CHECK (porcentaje > 0 AND porcentaje <= 100),
                                       -- solo tipo 'porcentaje'
  precio_con_descuento numeric CHECK (precio_con_descuento >= 0),
                                       -- solo tipo 'servicio': precio final que paga el cliente
  activa boolean DEFAULT true,
  fecha_inicio date DEFAULT CURRENT_DATE,
  fecha_fin date,
  created_at timestamptz DEFAULT now(),
  -- coherencia: porcentaje exige su %, servicio exige precio con descuento
  CONSTRAINT porcentaje_requerido CHECK (tipo <> 'porcentaje' OR porcentaje IS NOT NULL),
  CONSTRAINT precio_descuento_requerido CHECK (tipo <> 'servicio' OR precio_con_descuento IS NOT NULL)
);

-- Activaciones table
CREATE TABLE activaciones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) NOT NULL,
  negocio_id uuid REFERENCES negocios(id) NOT NULL,
  promo_id uuid REFERENCES promociones(id) NOT NULL,
  codigo_validacion text NOT NULL,
  timestamp_activacion timestamptz DEFAULT now(),  -- la VISITA se registra aquí (el código es opcional)
  timestamp_expiracion timestamptz NOT NULL,
  estado text NOT NULL CHECK (estado IN ('activa', 'usada', 'expirada')) DEFAULT 'activa',
  timestamp_uso timestamptz,           -- null si el negocio nunca valida el código (está bien, es opcional)
  ahorro_calculado numeric NOT NULL DEFAULT 0,
                                       -- calculado por el SERVIDOR en activar_promo(), nunca por el cliente
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_activaciones_codigo ON activaciones(codigo_validacion);
CREATE INDEX idx_activaciones_negocio ON activaciones(negocio_id);
CREATE INDEX idx_activaciones_user ON activaciones(user_id);
CREATE INDEX idx_activaciones_estado ON activaciones(estado);
CREATE INDEX idx_promociones_negocio ON promociones(negocio_id);
CREATE INDEX idx_negocios_categoria ON negocios(categoria);
CREATE UNIQUE INDEX idx_activaciones_unique_code_negocio ON activaciones(codigo_validacion, negocio_id) WHERE estado = 'activa';

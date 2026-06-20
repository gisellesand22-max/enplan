-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  nombre text NOT NULL,
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
  categoria text NOT NULL CHECK (categoria IN ('comida', 'bienestar', 'ocio', 'negocios')),
  descripcion text,
  direccion text,
  telefono text,
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
  valor text,
  activa boolean DEFAULT true,
  fecha_inicio date DEFAULT CURRENT_DATE,
  fecha_fin date,
  created_at timestamptz DEFAULT now()
);

-- Activaciones table
CREATE TABLE activaciones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) NOT NULL,
  negocio_id uuid REFERENCES negocios(id) NOT NULL,
  promo_id uuid REFERENCES promociones(id) NOT NULL,
  codigo_validacion text NOT NULL,
  timestamp_activacion timestamptz DEFAULT now(),
  timestamp_expiracion timestamptz NOT NULL,
  estado text NOT NULL CHECK (estado IN ('activa', 'usada', 'expirada')) DEFAULT 'activa',
  timestamp_uso timestamptz,
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

-- Tabla de suscripciones: se actualiza automáticamente via Stripe webhooks
create table if not exists public.suscripciones (
  id uuid primary key default gen_random_uuid(),
  negocio_id uuid references public.negocios(id),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  email text not null,
  nombre_negocio text not null,
  plan text not null,
  estado text not null default 'activa',
  precio_mensual integer not null,
  periodo_inicio timestamptz,
  periodo_fin timestamptz,
  cancelada_en timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.suscripciones enable row level security;

comment on column public.suscripciones.estado is 'activa | trial | past_due | cancelada | expirada';
comment on column public.suscripciones.plan is 'basico | pro | premium';
comment on column public.suscripciones.precio_mensual is 'Precio en centavos MXN';

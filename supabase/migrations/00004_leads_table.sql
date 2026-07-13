-- Tabla de leads: negocios que llenan el formulario de "Únete como socio"
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  negocio text not null,
  contacto text not null,
  email text not null,
  telefono text,
  categoria text not null,
  mensaje text,
  estado text not null default 'nuevo',
  created_at timestamptz not null default now()
);

-- RLS: solo el service role puede insertar/leer (desde la API route)
alter table public.leads enable row level security;

-- No public policies — solo accesible via service_role key

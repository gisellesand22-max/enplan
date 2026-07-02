-- ============================================================================
-- enplan — Row Level Security (RLS) policies
-- ============================================================================
-- B2B2C membership/benefits platform (Mexico).
--
-- Tables: users, negocios, promociones, activaciones
--
-- Roles (users.role):
--   'consumidor' — consumer/member redeeming promotions
--   'negocio'    — business owner managing negocios + promociones
--
-- All access is keyed off auth.uid(), which equals users.id.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Enable RLS on all tables
-- ----------------------------------------------------------------------------
alter table public.users        enable row level security;
alter table public.negocios     enable row level security;
alter table public.promociones  enable row level security;
alter table public.activaciones enable row level security;


-- ----------------------------------------------------------------------------
-- 2. users
-- ----------------------------------------------------------------------------
-- A user may only ever see and manage their own profile row. The row id is the
-- auth user id, so every check is auth.uid() = id.

-- Read own row only.
create policy "users_select_own"
  on public.users
  for select
  to authenticated
  using (auth.uid() = id);

-- Insert own row only (e.g. profile bootstrap after sign-up).
create policy "users_insert_own"
  on public.users
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Update own row only.
create policy "users_update_own"
  on public.users
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);


-- ----------------------------------------------------------------------------
-- 3. negocios
-- ----------------------------------------------------------------------------
-- Active businesses are publicly readable to any authenticated user (so
-- consumers can browse). Write access is restricted to the owning business
-- user via negocios.user_id.

-- CUALQUIERA (incluso sin login) puede ver negocios activos.
-- Clave para "browse before signup": el directorio es público.
create policy "negocios_select_active"
  on public.negocios
  for select
  to anon, authenticated
  using (activo = true);

-- El dueño siempre ve su propio negocio, aunque esté desactivado
-- (sin esto, el panel se queda en blanco si el negocio se pausa).
create policy "negocios_select_owner"
  on public.negocios
  for select
  to authenticated
  using (auth.uid() = user_id);

-- A business user can create their own negocio.
create policy "negocios_insert_own"
  on public.negocios
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- A business owner can update their own negocio.
create policy "negocios_update_own"
  on public.negocios
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- A business owner can delete their own negocio.
create policy "negocios_delete_own"
  on public.negocios
  for delete
  to authenticated
  using (auth.uid() = user_id);


-- ----------------------------------------------------------------------------
-- 4. promociones
-- ----------------------------------------------------------------------------
-- Active promos of active businesses are publicly readable to any
-- authenticated user. Write access is restricted to the owner of the parent
-- negocio (promociones.negocio_id -> negocios.user_id = auth.uid()).

-- CUALQUIERA (incluso sin login) puede ver promos activas de negocios activos.
create policy "promociones_select_active"
  on public.promociones
  for select
  to anon, authenticated
  using (
    activa = true
    and exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.activo = true
    )
  );

-- El dueño siempre ve TODAS sus promos, incluidas las pausadas
-- (sin esto, "Mis promociones" no puede listar las pausadas para reactivarlas).
create policy "promociones_select_owner"
  on public.promociones
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.user_id = auth.uid()
    )
  );

-- A business owner can create promos for a negocio they own.
create policy "promociones_insert_own"
  on public.promociones
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.user_id = auth.uid()
    )
  );

-- A business owner can update promos for a negocio they own.
create policy "promociones_update_own"
  on public.promociones
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.user_id = auth.uid()
    )
  );

-- A business owner can delete promos for a negocio they own.
create policy "promociones_delete_own"
  on public.promociones
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.negocios n
      where n.id = promociones.negocio_id
        and n.user_id = auth.uid()
    )
  );


-- ----------------------------------------------------------------------------
-- 5. activaciones
-- ----------------------------------------------------------------------------
-- An activacion is a consumer redeeming a promo at a business. Both sides need
-- visibility:
--   * the consumer who owns it (activaciones.user_id = auth.uid())
--   * the business owner whose negocio it belongs to
-- Consumers create their own activaciones; business owners validate codes by
-- updating estado to 'usada'.

-- Consumers can read their own activaciones.
create policy "activaciones_select_own_consumer"
  on public.activaciones
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Business owners can read activaciones for negocios they own.
create policy "activaciones_select_own_negocio"
  on public.activaciones
  for select
  to authenticated
  using (
    negocio_id in (
      select n.id
      from public.negocios n
      where n.user_id = auth.uid()
    )
  );

-- Consumers can create activaciones for themselves.
create policy "activaciones_insert_own_consumer"
  on public.activaciones
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Business owners can validate (use) activaciones for their negocios.
-- USING limits which rows are visible for update (their own negocios);
-- WITH CHECK restricts the resulting estado to 'usada' so businesses can only
-- mark a code as redeemed, not arbitrarily change its state.
create policy "activaciones_update_use_by_negocio"
  on public.activaciones
  for update
  to authenticated
  using (
    negocio_id in (
      select n.id
      from public.negocios n
      where n.user_id = auth.uid()
    )
  )
  with check (
    estado = 'usada'
    and negocio_id in (
      select n.id
      from public.negocios n
      where n.user_id = auth.uid()
    )
  );

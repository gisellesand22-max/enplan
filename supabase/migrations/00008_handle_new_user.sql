-- ============================================================================
-- enplan. — Bootstrap de public.users al registrarse en Supabase Auth
--
-- La política RLS "users_insert_own" asume que la fila public.users existe
-- antes de que el cliente intente leerla/actualizarla. Sin este trigger,
-- nada la crea automáticamente y el resto de la app (negocios.user_id,
-- activaciones.user_id, activar_promo(), etc.) no tiene de dónde colgarse.
--
-- Metadata esperada en auth.users.raw_user_meta_data (todo opcional salvo
-- fallback de nombre):
--   nombre, apellido, fecha_nacimiento, role ('consumidor' | 'negocio'),
--   negocio (nombre del negocio, usado como fallback de nombre si no hay
--   nombre de pila — caso del registro actual del dashboard de negocio).
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, nombre, apellido, fecha_nacimiento, role)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'nombre',
      new.raw_user_meta_data->>'negocio',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data->>'apellido',
    nullif(new.raw_user_meta_data->>'fecha_nacimiento', '')::date,
    coalesce(new.raw_user_meta_data->>'role', 'consumidor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

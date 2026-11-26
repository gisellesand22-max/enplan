-- ============================================================================
-- enplan. — Borrar mi cuenta (requisito de Apple App Store, guía 5.1.1(v))
--
-- Apple exige que cualquier app que permita crear cuenta también permita
-- borrarla desde la propia app. Esta función la llama el usuario con sesión
-- iniciada: supabase.rpc('delete_my_account').
--
-- Qué borra:
--   * sus activaciones (historial de beneficios usados)
--   * su fila en public.users
--   * su usuario en auth.users (ya no puede iniciar sesión)
-- Qué hace con referencias:
--   * a quienes refirió se les quita la referencia (referred_by = null)
--
-- Cuentas de NEGOCIO: no se borran desde aquí, porque tienen negocios,
-- promociones y suscripción de Stripe ligados. Devuelve error y la app pide
-- contactar a soporte.
-- ============================================================================

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'No hay sesión iniciada';
  end if;

  if exists (select 1 from public.negocios where user_id = v_uid) then
    raise exception 'Las cuentas de negocio se eliminan con soporte';
  end if;

  delete from public.activaciones where user_id = v_uid;
  update public.users set referred_by = null where referred_by = v_uid;
  delete from public.users where id = v_uid;
  delete from auth.users where id = v_uid;
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

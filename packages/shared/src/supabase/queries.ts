import type { SupabaseClient } from './client';
import type { CategoriaEnum } from '../types/database';
import { TIMEZONE } from '../constants';

function todayRange() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE });
  const today = formatter.format(now);
  return { start: `${today}T00:00:00`, end: `${today}T23:59:59` };
}

export async function getNegocios(client: SupabaseClient, categoria?: CategoriaEnum) {
  let query = client
    .from('negocios')
    .select('*')
    .eq('activo', true)
    .order('nombre');

  if (categoria) {
    query = query.eq('categoria', categoria);
  }

  return query;
}

export async function getNegocio(client: SupabaseClient, id: string) {
  return client
    .from('negocios')
    .select('*, promociones(*)')
    .eq('id', id)
    .eq('promociones.activa', true)
    .single();
}

export async function getPromociones(client: SupabaseClient, negocioId: string) {
  return client
    .from('promociones')
    .select('*')
    .eq('negocio_id', negocioId)
    .eq('activa', true)
    .order('created_at', { ascending: false });
}

// Seguridad: NO se manda userId — el servidor usa auth.uid() de la sesión.
export async function activarPromo(client: SupabaseClient, promoId: string) {
  return client.rpc('activar_promo', {
    p_promo_id: promoId,
  });
}

export async function validarCodigo(client: SupabaseClient, codigo: string, negocioId: string) {
  return client.rpc('validar_codigo', {
    p_codigo: codigo,
    p_negocio_id: negocioId,
  });
}

export async function getActivacionesUsuario(client: SupabaseClient, userId: string) {
  return client
    .from('activaciones')
    .select('*, promocion:promociones(*), negocio:negocios(id, nombre, categoria)')
    .eq('user_id', userId)
    .order('timestamp_activacion', { ascending: false });
}

export async function getDashboardNegocio(client: SupabaseClient, negocioId: string) {
  const { start, end } = todayRange();

  const [visitasHoy, promosActivas] = await Promise.all([
    // Privacidad: el negocio NUNCA consulta la tabla users. La función
    // get_visitas_negocio devuelve solo el nombre de pila del cliente.
    client.rpc('get_visitas_negocio', {
      p_negocio_id: negocioId,
      p_desde: start,
      p_hasta: end,
    }),
    client
      .from('promociones')
      .select('id', { count: 'exact', head: true })
      .eq('negocio_id', negocioId)
      .eq('activa', true),
  ]);

  return { visitasHoy, promosActivas };
}

export async function checkDailyLimit(client: SupabaseClient, userId: string) {
  const { start, end } = todayRange();

  const { count } = await client
    .from('activaciones')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('timestamp_activacion', start)
    .lte('timestamp_activacion', end);

  return { count: count ?? 0 };
}

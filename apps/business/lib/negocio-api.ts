import { supabase as supabaseClient } from './supabase'
import type { Negocio, Promo, TipoPromo } from './demo'
import { CATEGORIES } from './demo'

function db() {
  if (!supabaseClient) throw new Error('Supabase no configurado')
  return supabaseClient
}

const CATEGORIA_TO_DB: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c, c.toLowerCase()]),
)
const CATEGORIA_FROM_DB: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.toLowerCase(), c]),
)

function displayValor(tipo: TipoPromo, valor: number): string {
  switch (tipo) {
    case 'porcentaje':
      return `${valor}%`
    case '2x1':
      return '2x1'
    case 'beneficio_fijo':
      return `$${valor}`
    case 'clase':
      return 'Clase gratis'
    case 'servicio':
      return `$${valor}`
  }
}

export function promoToDbInsert(negocioId: string, payload: Omit<Promo, 'id'>) {
  const precioReferencia =
    payload.tipo === 'porcentaje' || payload.tipo === 'servicio'
      ? payload.precioRef ?? 0
      : payload.valor

  return {
    negocio_id: negocioId,
    tipo: payload.tipo,
    titulo: payload.titulo,
    descripcion: payload.descripcion,
    condiciones: payload.condiciones,
    valor: displayValor(payload.tipo, payload.valor),
    precio_referencia: precioReferencia,
    porcentaje: payload.tipo === 'porcentaje' ? payload.valor : null,
    precio_con_descuento: payload.tipo === 'servicio' ? payload.valor : null,
    activa: payload.activa,
  }
}

export function mapPromoFromDb(row: any): Promo {
  const valor =
    row.tipo === 'porcentaje'
      ? Number(row.porcentaje ?? 0)
      : row.tipo === 'servicio'
        ? Number(row.precio_con_descuento ?? 0)
        : Number(row.precio_referencia ?? 0)

  return {
    id: row.id,
    tipo: row.tipo,
    titulo: row.titulo,
    descripcion: row.descripcion ?? '',
    condiciones: row.condiciones ?? '',
    activa: row.activa,
    valor,
    precioRef: row.precio_referencia != null ? Number(row.precio_referencia) : undefined,
  }
}

export function mapNegocioFromDb(row: any): Negocio {
  return {
    nombre: row.nombre ?? '',
    categoria: CATEGORIA_FROM_DB[row.categoria] ?? 'Comida',
    descripcion: row.descripcion ?? '',
    direccion: row.direccion ?? '',
    telefono: row.telefono ?? '',
    website: row.website ?? '',
    instagram: row.instagram ?? '',
    plan: row.plan ?? 'basico',
    logoUrl: row.logo_url,
    coverUrl: row.cover_url,
    fotoPrincipal: row.foto_principal ?? 'cover',
    fotos: row.fotos ?? [],
    horarios: row.horarios ?? {},
  }
}

export function negocioPatchToDb(patch: Partial<Negocio>): Record<string, unknown> {
  const db: Record<string, unknown> = {}
  if (patch.nombre !== undefined) db.nombre = patch.nombre
  if (patch.categoria !== undefined) db.categoria = CATEGORIA_TO_DB[patch.categoria] ?? patch.categoria.toLowerCase()
  if (patch.descripcion !== undefined) db.descripcion = patch.descripcion
  if (patch.direccion !== undefined) db.direccion = patch.direccion
  if (patch.telefono !== undefined) db.telefono = patch.telefono
  if (patch.website !== undefined) db.website = patch.website
  if (patch.instagram !== undefined) db.instagram = patch.instagram
  if (patch.plan !== undefined) db.plan = patch.plan
  if (patch.logoUrl !== undefined) db.logo_url = patch.logoUrl
  if (patch.coverUrl !== undefined) db.cover_url = patch.coverUrl
  if (patch.fotoPrincipal !== undefined) db.foto_principal = patch.fotoPrincipal
  if (patch.fotos !== undefined) db.fotos = patch.fotos
  if (patch.horarios !== undefined) db.horarios = patch.horarios
  return db
}

/** Busca el negocio del usuario autenticado; si no existe (primer login), crea uno vacío. */
export async function fetchOrCreateNegocio(userId: string, fallbackNombre: string): Promise<{ id: string; negocio: Negocio }> {
  const { data: existing } = await db().from('negocios').select('*').eq('user_id', userId).maybeSingle()

  if (existing) {
    return { id: existing.id, negocio: mapNegocioFromDb(existing) }
  }

  const { data: created, error } = await db()
    .from('negocios')
    .insert({ user_id: userId, nombre: fallbackNombre || 'Mi negocio', categoria: 'comida' })
    .select('*')
    .single()

  if (error || !created) throw error ?? new Error('No se pudo crear el negocio')
  return { id: created.id, negocio: mapNegocioFromDb(created) }
}

export async function fetchPromos(negocioId: string): Promise<Promo[]> {
  const { data } = await db()
    .from('promociones')
    .select('*')
    .eq('negocio_id', negocioId)
    .order('created_at', { ascending: false })
  return (data ?? []).map(mapPromoFromDb)
}

export type VisitaRow = {
  activacion_id: string
  nombre_cliente: string
  promo_titulo: string
  estado: 'activa' | 'usada' | 'expirada'
  timestamp_activacion: string
  timestamp_uso: string | null
}

export async function fetchVisitas(negocioId: string, desde?: Date, hasta?: Date): Promise<VisitaRow[]> {
  if (!supabaseClient) return []
  const { data } = await db().rpc('get_visitas_negocio', {
    p_negocio_id: negocioId,
    p_desde: desde ? desde.toISOString() : null,
    p_hasta: hasta ? hasta.toISOString() : null,
  })
  return data ?? []
}

export async function countVisitas(negocioId: string, since: Date): Promise<number> {
  if (!supabaseClient) return 0
  const { count } = await db()
    .from('activaciones')
    .select('id', { count: 'exact', head: true })
    .eq('negocio_id', negocioId)
    .gte('timestamp_activacion', since.toISOString())
  return count ?? 0
}

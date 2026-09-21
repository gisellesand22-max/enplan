import { supabase } from "./supabase";
import type { Business, Category, Plan, Promo } from "./enplan-data";

const CATEGORIA_TO_UI: Record<string, Category> = {
  comida: "Comida",
  belleza: "Belleza",
  fitness: "Fitness",
  ocio: "Ocio",
  tiendas: "Tiendas",
  servicios: "Servicios",
};

export const UI_TO_CATEGORIA: Record<Category, string> = {
  Comida: "comida",
  Belleza: "belleza",
  Fitness: "fitness",
  Ocio: "ocio",
  Tiendas: "tiendas",
  Servicios: "servicios",
};

const PLAN_TO_UI: Record<string, Plan> = {
  basico: "Básico",
  pro: "Pro",
  premium: "Premium",
};

const DIA_LABEL: Record<string, string> = {
  lunes: "Lun",
  martes: "Mar",
  miercoles: "Mié",
  jueves: "Jue",
  viernes: "Vie",
  sabado: "Sáb",
  domingo: "Dom",
  lunes_viernes: "Lun–Vie",
  martes_viernes: "Mar–Vie",
  lunes_sabado: "Lun–Sáb",
};

type HorarioDia = { abre: string; cierra: string; cerrado: boolean };

function formatHorarios(horarios: Record<string, string | HorarioDia> | null): string {
  if (!horarios || Object.keys(horarios).length === 0) return "Horario no disponible";
  return Object.entries(horarios)
    .map(([key, value]) => {
      const label = DIA_LABEL[key] ?? key;
      if (typeof value === "object") {
        return value.cerrado ? `${label} cerrado` : `${label} ${value.abre}-${value.cierra}`;
      }
      return value === "cerrado" ? `${label} cerrado` : `${label} ${value}`;
    })
    .join(" · ");
}

type PromoRow = {
  id: string;
  tipo: string;
  titulo: string;
  descripcion: string | null;
  valor: string | null;
};

type NegocioRow = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string | null;
  direccion: string | null;
  telefono: string | null;
  whatsapp: string | null;
  horarios: Record<string, string | HorarioDia> | null;
  plan: string;
  logo_url: string | null;
  cover_url: string | null;
  foto_principal: "logo" | "cover";
  promociones?: PromoRow[];
};

function mapPromo(row: PromoRow): Promo {
  return {
    id: row.id,
    type: row.valor ?? row.tipo,
    title: row.titulo,
    description: row.descripcion ?? "",
  };
}

function mapNegocio(row: NegocioRow, redemptions = 0): Business {
  return {
    id: row.id,
    name: row.nombre,
    category: CATEGORIA_TO_UI[row.categoria] ?? "Servicios",
    plan: PLAN_TO_UI[row.plan] ?? "Básico",
    address: row.direccion ?? "",
    phone: row.telefono ?? "",
    whatsapp: row.whatsapp ?? "",
    hours: formatHorarios(row.horarios),
    description: row.descripcion ?? "",
    promos: (row.promociones ?? []).map(mapPromo),
    redemptions,
    fotoPrincipal: row.foto_principal,
    logoUrl: row.logo_url,
    coverUrl: row.cover_url,
  };
}

export async function fetchNegocios(): Promise<Business[]> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*, promociones(*)")
    .eq("activo", true)
    .eq("promociones.activa", true)
    .order("nombre");

  if (error) throw error;
  return (data ?? []).map((row) => mapNegocio(row as NegocioRow));
}

export async function fetchNegocio(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*, promociones(*)")
    .eq("id", id)
    .eq("promociones.activa", true)
    .single();

  if (error || !data) return null;

  const { count } = await supabase
    .from("activaciones")
    .select("id", { count: "exact", head: true })
    .eq("negocio_id", id);

  return mapNegocio(data as NegocioRow, count ?? 0);
}

export type Category = "Comida" | "Belleza" | "Fitness" | "Ocio" | "Tiendas" | "Servicios";

export type Promo = {
  id: string;
  type: string; // "2x1", "20% off", "Gratis", "Clase"
  title: string;
  description: string;
};

export type Plan = "Premium" | "Pro" | "Básico";

export type Business = {
  id: string;
  name: string;
  category: Category;
  plan: Plan;
  address: string;
  phone: string;
  whatsapp: string; // número propio de CADA negocio, formato wa.me (521449...)
  hours: string;
  description: string;
  promos: Promo[];
  redemptions: number; // veces que usuarios han usado sus beneficios en enplan
  fotoPrincipal: "logo" | "cover"; // el negocio elige cuál se muestra en el home
  logoUrl: string | null;
  coverUrl: string | null;
};

export const CATEGORIES: { key: "Todos" | Category; label: string }[] = [
  { key: "Todos", label: "Todos" },
  { key: "Comida", label: "Comida" },
  { key: "Belleza", label: "Belleza" },
  { key: "Fitness", label: "Fitness" },
  { key: "Ocio", label: "Ocio" },
  { key: "Tiendas", label: "Tiendas" },
  { key: "Servicios", label: "Servicios" },
];

// Los negocios reales viven en Supabase (tabla `negocios`) — ver src/lib/negocios.ts.
// Este archivo solo define los tipos que usan los componentes de UI.

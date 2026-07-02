export type Category = "Comida" | "Bienestar" | "Ocio" | "Negocios";

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
  hours: string;
  description: string;
  promos: Promo[];
};

export const CATEGORIES: { key: "Todos" | Category; label: string }[] = [
  { key: "Todos", label: "Todos" },
  { key: "Comida", label: "Comida" },
  { key: "Bienestar", label: "Bienestar" },
  { key: "Ocio", label: "Ocio" },
  { key: "Negocios", label: "Negocios" },
];

export const BUSINESSES: Business[] = [
  {
    id: "cafe-la-estacion",
    plan: "Premium",
    name: "Café La Estación",
    category: "Comida",
    address: "Av. Universidad 145, Centro, Aguascalientes",
    phone: "449 123 4567",
    hours: "Lun–Dom · 7:00–22:00",
    description:
      "Café de especialidad tostado en casa, repostería artesanal y un patio para trabajar o pasar la tarde con amigos.",
    promos: [
      {
        id: "p1",
        type: "2x1",
        title: "2x1 en cualquier café",
        description: "Aplica de lunes a jueves antes de las 12:00. Un código por visita.",
      },
      {
        id: "p2",
        type: "20% off",
        title: "20% en repostería",
        description: "Válido al consumir cualquier bebida caliente.",
      },
    ],
  },
  {
    id: "gym-fitzone",
    plan: "Premium",
    name: "Gym FitZone",
    category: "Bienestar",
    address: "Blvd. a Zacatecas 1200, Trojes",
    phone: "449 234 5678",
    hours: "Lun–Sáb · 5:00–23:00",
    description:
      "Gimnasio con equipo de última generación, clases grupales y entrenadores certificados.",
    promos: [
      {
        id: "p1",
        type: "Gratis",
        title: "Primera clase gratis",
        description: "Conoce las instalaciones y prueba una clase grupal sin costo.",
      },
    ],
  },
  {
    id: "bar-el-patio",
    plan: "Pro",
    name: "Bar El Patio",
    category: "Ocio",
    address: "Calle Madero 312, Centro",
    phone: "449 345 6789",
    hours: "Mar–Sáb · 18:00–02:00",
    description:
      "Bar al aire libre con mixología de autor, música en vivo los fines de semana y la mejor terraza del centro.",
    promos: [
      {
        id: "p1",
        type: "20% off",
        title: "20% en tu cuenta",
        description: "De martes a jueves. No acumulable con otras promociones.",
      },
    ],
  },
  {
    id: "salon-bella",
    plan: "Pro",
    name: "Salón Bella",
    category: "Bienestar",
    address: "Av. Aguascalientes Sur 405",
    phone: "449 456 7890",
    hours: "Lun–Sáb · 10:00–20:00",
    description:
      "Salón de belleza con estilistas expertos en color y cortes contemporáneos.",
    promos: [
      {
        id: "p1",
        type: "Paquete",
        title: "Corte + peinado a $199",
        description: "Cita previa requerida. Solo para clientes nuevos.",
      },
    ],
  },
  {
    id: "taqueria-don-pedro",
    plan: "Básico",
    name: "Taquería Don Pedro",
    category: "Comida",
    address: "Calle Nieto 88, Centro",
    phone: "449 567 8901",
    hours: "Lun–Dom · 13:00–01:00",
    description:
      "Tacos al pastor tradicionales hechos en trompo de leña. Más de 30 años en Aguascalientes.",
    promos: [
      {
        id: "p1",
        type: "Gratis",
        title: "Agua fresca gratis",
        description: "En la compra de 4 tacos o más.",
      },
    ],
  },
  {
    id: "yoga-zen-studio",
    plan: "Premium",
    name: "Yoga Zen Studio",
    category: "Bienestar",
    address: "Av. Convención 250, Jardines",
    phone: "449 678 9012",
    hours: "Lun–Sáb · 6:30–21:00",
    description:
      "Estudio boutique de yoga con clases para todos los niveles, meditación guiada y talleres mensuales.",
    promos: [
      {
        id: "p1",
        type: "Clase",
        title: "Clase de prueba gratis",
        description: "Reserva tu lugar con 24 horas de anticipación.",
      },
    ],
  },
  {
    id: "taller-rapido",
    plan: "Básico",
    name: "Taller Rápido",
    category: "Negocios",
    address: "Av. Siglo XXI 1500, Industrial",
    phone: "449 789 0123",
    hours: "Lun–Sáb · 8:00–19:00",
    description:
      "Servicio mecánico express para tu auto. Diagnóstico computarizado sin costo.",
    promos: [
      {
        id: "p1",
        type: "Servicio",
        title: "Cambio de aceite a $399",
        description: "Incluye filtro y revisión de 12 puntos.",
      },
    ],
  },
  {
    id: "cine-central",
    plan: "Pro",
    name: "Cine Central",
    category: "Ocio",
    address: "Plaza Galerías, Av. Independencia 2351",
    phone: "449 890 1234",
    hours: "Lun–Dom · 12:00–00:00",
    description:
      "Cine independiente con estrenos seleccionados, ciclos temáticos y la mejor sala IMAX de la ciudad.",
    promos: [
      {
        id: "p1",
        type: "2x1",
        title: "2x1 en boletos",
        description: "Válido de lunes a miércoles, todas las funciones.",
      },
    ],
  },
];

export const categoryGradient: Record<Category, string> = {
  Comida: "grad-comida",
  Bienestar: "grad-bienestar",
  Ocio: "grad-ocio",
  Negocios: "grad-negocios",
};

export interface Promo {
  id: string
  tipo: 'porcentaje' | '2x1' | 'beneficio_fijo' | 'clase' | 'servicio'
  titulo: string
  descripcion: string
  tipoLabel: string
}

export interface Business {
  id: string
  nombre: string
  categoria: 'comida' | 'belleza' | 'fitness' | 'ocio' | 'tiendas' | 'servicios'
  categoriaLabel: string
  descripcion: string
  direccion: string
  telefono: string
  horarios: string
  promos: Promo[]
}

export const DEMO_BUSINESSES: Record<string, Business> = {
  'cafe-la-estacion': {
    id: 'cafe-la-estacion',
    nombre: 'Café La Estación',
    categoria: 'comida',
    categoriaLabel: 'Comida',
    descripcion:
      'Café de especialidad en el corazón de Aguascalientes. Granos de origen local, repostería artesanal y un ambiente acogedor para trabajar o descansar.',
    direccion: 'Av. Madero 420, Centro, Aguascalientes',
    telefono: '449 123 4567',
    horarios: 'Lun-Vie: 7am-9pm · Sáb-Dom: 8am-10pm',
    promos: [
      {
        id: 'cafe-2x1',
        tipo: '2x1',
        titulo: '2x1 en cualquier café',
        descripcion: 'Pide dos cafés y paga solo uno. Válido en todas las presentaciones.',
        tipoLabel: '2x1',
      },
      {
        id: 'cafe-postre',
        tipo: 'beneficio_fijo',
        titulo: 'Postre gratis con tu café',
        descripcion: 'Llévate un muffin o galleta artesanal gratis al comprar cualquier café.',
        tipoLabel: 'Gratis',
      },
    ],
  },
  'gym-fitzone': {
    id: 'gym-fitzone',
    nombre: 'Gym FitZone',
    categoria: 'fitness',
    categoriaLabel: 'Bienestar',
    descripcion:
      'Gimnasio con equipamiento de última generación, clases grupales y entrenadores certificados. El mejor gym de la zona norte.',
    direccion: 'Blvd. a Zacatecas 1500, Trojes, Aguascalientes',
    telefono: '449 234 5678',
    horarios: 'Lun-Sáb: 5am-11pm · Dom: 7am-3pm',
    promos: [
      {
        id: 'gym-clase',
        tipo: 'clase',
        titulo: 'Primera clase gratis',
        descripcion: 'Prueba cualquier clase grupal sin costo: spinning, crossfit, yoga, box.',
        tipoLabel: 'Clase',
      },
      {
        id: 'gym-descuento',
        tipo: 'porcentaje',
        titulo: '30% off en mensualidad',
        descripcion: 'Obtén el 30% de descuento en tu primera mensualidad al inscribirte.',
        tipoLabel: '30% off',
      },
    ],
  },
  'bar-el-patio': {
    id: 'bar-el-patio',
    nombre: 'Bar El Patio',
    categoria: 'ocio',
    categoriaLabel: 'Ocio',
    descripcion:
      'Coctelería artesanal y música en vivo cada fin de semana. El spot perfecto para salir con amigos en la Zona Dorada.',
    direccion: 'Av. Aguascalientes Sur 220, Jardines, Aguascalientes',
    telefono: '449 345 6789',
    horarios: 'Mié-Sáb: 6pm-2am · Dom: 2pm-10pm',
    promos: [
      {
        id: 'bar-descuento',
        tipo: 'porcentaje',
        titulo: '20% en tu cuenta',
        descripcion: 'Obtén 20% de descuento en consumo total. Aplica en alimentos y bebidas.',
        tipoLabel: '20% off',
      },
    ],
  },
  'salon-bella': {
    id: 'salon-bella',
    nombre: 'Salón Bella',
    categoria: 'belleza',
    categoriaLabel: 'Bienestar',
    descripcion:
      'Salón de belleza con más de 10 años de experiencia. Cortes, tintes, tratamientos capilares y maquillaje profesional.',
    direccion: 'Calle Nieto 310, Centro, Aguascalientes',
    telefono: '449 456 7890',
    horarios: 'Lun-Sáb: 9am-7pm',
    promos: [
      {
        id: 'salon-servicio',
        tipo: 'servicio',
        titulo: 'Corte + peinado a $199',
        descripcion: 'Corte de cabello con peinado profesional a precio especial.',
        tipoLabel: 'Servicio',
      },
      {
        id: 'salon-2x1',
        tipo: '2x1',
        titulo: '2x1 en manicure',
        descripcion: 'Trae a una amiga: dos manicures por el precio de uno.',
        tipoLabel: '2x1',
      },
    ],
  },
  'taqueria-don-pedro': {
    id: 'taqueria-don-pedro',
    nombre: 'Taquería Don Pedro',
    categoria: 'comida',
    categoriaLabel: 'Comida',
    descripcion:
      'Los mejores tacos al pastor de Aguascalientes desde 1998. Tortillas hechas a mano, salsas caseras y un sazón inigualable.',
    direccion: 'Calle López Mateos 850, La Salud, Aguascalientes',
    telefono: '449 567 8901',
    horarios: 'Lun-Dom: 6pm-1am',
    promos: [
      {
        id: 'tacos-beneficio',
        tipo: 'beneficio_fijo',
        titulo: 'Agua fresca gratis',
        descripcion: 'Llévate una agua fresca de un litro gratis con pedido de 5+ tacos.',
        tipoLabel: 'Gratis',
      },
    ],
  },
  'yoga-zen': {
    id: 'yoga-zen',
    nombre: 'Yoga Zen Studio',
    categoria: 'fitness',
    categoriaLabel: 'Bienestar',
    descripcion:
      'Estudio de yoga y meditación con clases para todos los niveles. Hatha, Vinyasa, Yin y meditación guiada en un espacio tranquilo.',
    direccion: 'Av. Convención 1200, Col. España, Aguascalientes',
    telefono: '449 678 9012',
    horarios: 'Lun-Sáb: 6am-9pm · Dom: 8am-2pm',
    promos: [
      {
        id: 'yoga-clase',
        tipo: 'clase',
        titulo: 'Clase de prueba gratis',
        descripcion: 'Tu primera clase de yoga es completamente gratis. Elige el horario que prefieras.',
        tipoLabel: 'Clase',
      },
    ],
  },
  'taller-rapido': {
    id: 'taller-rapido',
    nombre: 'Taller Rápido',
    categoria: 'servicios',
    categoriaLabel: 'Negocios',
    descripcion:
      'Taller mecánico con servicio express. Cambio de aceite, frenos, afinación y diagnóstico computarizado en menos de 2 horas.',
    direccion: 'Av. Universidad 680, Morelos, Aguascalientes',
    telefono: '449 789 0123',
    horarios: 'Lun-Sáb: 8am-6pm',
    promos: [
      {
        id: 'taller-servicio',
        tipo: 'servicio',
        titulo: 'Cambio de aceite a $399',
        descripcion: 'Cambio de aceite sintético + filtro + revisión de niveles a precio especial.',
        tipoLabel: 'Servicio',
      },
    ],
  },
  'cine-central': {
    id: 'cine-central',
    nombre: 'Cine Central',
    categoria: 'ocio',
    categoriaLabel: 'Ocio',
    descripcion:
      'Cine independiente y comercial con salas premium. Palomitas artesanales, café de especialidad y las mejores películas.',
    direccion: 'Plaza Central, Héroe de Nacozari 1, Centro, Aguascalientes',
    telefono: '449 890 1234',
    horarios: 'Lun-Dom: 11am-11pm',
    promos: [
      {
        id: 'cine-2x1',
        tipo: '2x1',
        titulo: '2x1 en boletos',
        descripcion: 'Dos boletos por el precio de uno de lunes a jueves en cualquier función.',
        tipoLabel: '2x1',
      },
    ],
  },
}

export function getBusinessById(id: string): Business | undefined {
  return DEMO_BUSINESSES[id]
}

export function getPromoById(promoId: string): { promo: Promo; business: Business } | undefined {
  for (const biz of Object.values(DEMO_BUSINESSES)) {
    const promo = biz.promos.find((p) => p.id === promoId)
    if (promo) return { promo, business: biz }
  }
  return undefined
}

export function getAllBusinesses(): Business[] {
  return Object.values(DEMO_BUSINESSES)
}

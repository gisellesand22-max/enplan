-- ============================================================================
-- enplan. — Seed Data (Aguascalientes, Mexico) — v1.7
-- DATOS DEMO: precios de referencia ilustrativos para desarrollo, no reales.
-- ============================================================================

-- Consumer user (nombre y apellido separados; fecha_nacimiento capturada al registro)
INSERT INTO users (id, email, nombre, apellido, fecha_nacimiento, role, plan_consumidor) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'maria.garcia@email.com', 'María', 'García López', '1998-04-12', 'consumidor', 'premium');

-- Business owner users
INSERT INTO users (id, email, nombre, apellido, role, plan_consumidor) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'carlos.tacos@email.com', 'Carlos', 'Hernández Ruiz', 'negocio', 'gratis'),
  ('b1000000-0000-0000-0000-000000000002', 'laura.cafe@email.com', 'Laura', 'Martínez Flores', 'negocio', 'gratis'),
  ('b1000000-0000-0000-0000-000000000003', 'ana.yoga@email.com', 'Ana Sofía', 'Delgado', 'negocio', 'gratis'),
  ('b1000000-0000-0000-0000-000000000004', 'roberto.escape@email.com', 'Roberto', 'Sánchez Medina', 'negocio', 'gratis'),
  ('b1000000-0000-0000-0000-000000000005', 'diego.cowork@email.com', 'Diego', 'Ramírez Torres', 'negocio', 'gratis');

-- Negocios (6 categorías v1.7 + whatsapp propio de cada negocio)
INSERT INTO negocios (id, user_id, nombre, categoria, descripcion, direccion, telefono, whatsapp, horarios, plan, plan_vence_en, activo) VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'b1000000-0000-0000-0000-000000000001',
    'Tacos El Güero',
    'comida',
    'Los mejores tacos al pastor de Aguascalientes. Tradición familiar desde 1998 con ingredientes frescos y salsas artesanales.',
    'Av. Aguascalientes Sur 401, Zona Centro, 20000 Aguascalientes, Ags.',
    '449-312-4567',
    '5214493124567',
    '{"lunes_viernes": "11:00-23:00", "sabado": "11:00-00:00", "domingo": "12:00-21:00"}',
    'pro',
    '2026-12-31',
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'b1000000-0000-0000-0000-000000000002',
    'Café La Estación',
    'comida',
    'Café de especialidad con granos de Oaxaca y Chiapas. Pastelería artesanal horneada cada mañana.',
    'Calle Venustiano Carranza 118, Zona Centro, 20000 Aguascalientes, Ags.',
    '449-278-9012',
    '5214492789012',
    '{"lunes_viernes": "7:00-21:00", "sabado": "8:00-22:00", "domingo": "8:00-15:00"}',
    'basico',
    '2026-11-30',
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'b1000000-0000-0000-0000-000000000003',
    'Yoga Zen Aguascalientes',
    'fitness',
    'Estudio de yoga con clases de Hatha, Vinyasa y meditación. Instructores certificados internacionalmente.',
    'Blvd. Luis Donaldo Colosio 220, Jardines de la Asunción, 20270 Aguascalientes, Ags.',
    '449-156-3421',
    '5214491563421',
    '{"lunes_viernes": "6:00-21:00", "sabado": "7:00-14:00", "domingo": "8:00-13:00"}',
    'premium',
    '2027-01-31',
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000004',
    'b1000000-0000-0000-0000-000000000004',
    'Escape Room Aventura',
    'ocio',
    'Tres salas temáticas de escape con tecnología inmersiva. Diversión para grupos de amigos, familias y team building.',
    'Av. Héroe de Nacozari 1402, Colonia Gremial, 20030 Aguascalientes, Ags.',
    '449-934-5678',
    '5214499345678',
    '{"lunes": "cerrado", "martes_viernes": "15:00-22:00", "sabado": "11:00-23:00", "domingo": "11:00-20:00"}',
    'pro',
    '2026-12-15',
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000005',
    'b1000000-0000-0000-0000-000000000005',
    'Cowork Hub Ags',
    'servicios',
    'Espacio de coworking moderno con internet de alta velocidad, salas de juntas y café ilimitado.',
    'Av. Universidad 940, Bosques del Prado Norte, 20127 Aguascalientes, Ags.',
    '449-567-8901',
    '5214495678901',
    '{"lunes_viernes": "7:00-22:00", "sabado": "8:00-16:00", "domingo": "cerrado"}',
    'basico',
    '2026-10-31',
    true
  );

-- Promociones: Tacos El Güero (precio_referencia OBLIGATORIO; el ahorro lo calcula el servidor)
INSERT INTO promociones (id, negocio_id, tipo, titulo, descripcion, valor, precio_referencia, porcentaje, precio_con_descuento, activa, fecha_inicio, fecha_fin) VALUES
  (
    'd1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    '2x1',
    '2x1 en Tacos al Pastor',
    'Llévate dos órdenes de tacos al pastor por el precio de una. Válido todos los días.',
    '2x1',
    120, NULL, NULL,
    true, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'porcentaje',
    '15% de descuento en orden completa',
    'Obtén 15% de descuento en toda tu cuenta. No acumulable con otras promociones.',
    '15%',
    350, 15, NULL,
    true, '2026-06-01', '2026-12-31'
  );

-- Promociones: Café La Estación
INSERT INTO promociones (id, negocio_id, tipo, titulo, descripcion, valor, precio_referencia, porcentaje, precio_con_descuento, activa, fecha_inicio, fecha_fin) VALUES
  (
    'd1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000002',
    'beneficio_fijo',
    'Café americano gratis con cualquier pastel',
    'Compra cualquier rebanada de pastel y recibe un café americano completamente gratis.',
    'Café americano gratis',
    55, NULL, NULL,
    true, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000002',
    '2x1',
    '2x1 en Lattes',
    'Dos lattes por el precio de uno. Válido en cualquier variedad de latte del menú.',
    '2x1',
    75, NULL, NULL,
    false, '2026-06-01', '2026-12-31'
  );
-- Nota: la 2ª promo del café queda pausada (activa=false) porque su plan es
-- Básico (máx. 1 activa) — el trigger de límite por plan lo exige.

-- Promociones: Yoga Zen Aguascalientes
INSERT INTO promociones (id, negocio_id, tipo, titulo, descripcion, valor, precio_referencia, porcentaje, precio_con_descuento, activa, fecha_inicio, fecha_fin) VALUES
  (
    'd1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000003',
    'clase',
    'Primera clase gratis',
    'Prueba cualquiera de nuestras clases sin costo. Hatha, Vinyasa o Meditación.',
    'Clase gratis',
    150, NULL, NULL,
    true, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000003',
    'porcentaje',
    '20% de descuento en mensualidad',
    'Inscríbete hoy y obtén 20% de descuento en tu primera mensualidad.',
    '20%',
    800, 20, NULL,
    true, '2026-06-01', '2026-12-31'
  );

-- Promociones: Escape Room Aventura
INSERT INTO promociones (id, negocio_id, tipo, titulo, descripcion, valor, precio_referencia, porcentaje, precio_con_descuento, activa, fecha_inicio, fecha_fin) VALUES
  (
    'd1000000-0000-0000-0000-000000000007',
    'c1000000-0000-0000-0000-000000000004',
    'porcentaje',
    '30% descuento grupos de 4+',
    'Ven con 3 amigos o más y reciban 30% de descuento en cualquier sala.',
    '30%',
    250, 30, NULL,
    true, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000008',
    'c1000000-0000-0000-0000-000000000004',
    '2x1',
    '2x1 martes y jueves',
    'Los martes y jueves paga una entrada y entra otra persona gratis.',
    '2x1',
    250, NULL, NULL,
    true, '2026-06-01', '2026-12-31'
  );

-- Promociones: Cowork Hub Ags (plan Básico → solo 1 activa; las demás pausadas)
INSERT INTO promociones (id, negocio_id, tipo, titulo, descripcion, valor, precio_referencia, porcentaje, precio_con_descuento, activa, fecha_inicio, fecha_fin) VALUES
  (
    'd1000000-0000-0000-0000-000000000009',
    'c1000000-0000-0000-0000-000000000005',
    'servicio',
    'Día de prueba gratis',
    'Trabaja un día completo en nuestro espacio sin costo. Incluye internet y café.',
    'Día gratis',
    180, NULL, 0,
    true, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000010',
    'c1000000-0000-0000-0000-000000000005',
    'porcentaje',
    '10% descuento primer mes',
    'Contrata cualquier plan mensual con 10% de descuento en tu primer mes.',
    '10%',
    1500, 10, NULL,
    false, '2026-06-01', '2026-12-31'
  ),
  (
    'd1000000-0000-0000-0000-000000000011',
    'c1000000-0000-0000-0000-000000000005',
    'beneficio_fijo',
    'Café ilimitado gratis',
    'Todos los miembros disfrutan de café de cortesía ilimitado durante su estancia.',
    'Café ilimitado',
    40, NULL, NULL,
    false, '2026-06-01', '2026-12-31'
  );

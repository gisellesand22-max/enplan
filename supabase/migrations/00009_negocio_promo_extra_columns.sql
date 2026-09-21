-- ============================================================================
-- enplan. — Columnas adicionales que ya usa la UI del dashboard de negocio
-- pero que faltaban en el schema inicial.
-- ============================================================================

alter table negocios
  add column website text,
  add column instagram text;

alter table promociones
  add column condiciones text;

-- ============================================================================
-- enplan. — Columnas de foto principal para negocios
-- El dashboard de negocio deja elegir si la portada o el logo es la foto
-- que se muestra en el directorio del consumidor.
-- ============================================================================

alter table negocios
  add column logo_url text,
  add column cover_url text,
  add column foto_principal text not null default 'cover'
    check (foto_principal in ('logo', 'cover'));

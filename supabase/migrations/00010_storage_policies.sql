-- ============================================================================
-- enplan. — Políticas de Storage para el bucket negocio-fotos
-- Lectura pública (son fotos de negocios que se muestran en el directorio).
-- Escritura solo dentro de la carpeta del propio usuario: negocio-fotos/{uid}/...
-- ============================================================================

create policy "negocio_fotos_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'negocio-fotos');

create policy "negocio_fotos_owner_write"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'negocio-fotos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "negocio_fotos_owner_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'negocio-fotos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "negocio_fotos_owner_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'negocio-fotos' and (storage.foldername(name))[1] = auth.uid()::text);

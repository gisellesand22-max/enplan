-- Columnas de CRM para seguimiento de leads
alter table public.leads
  add column if not exists notas text,
  add column if not exists fecha_contacto timestamptz,
  add column if not exists plan_interes text,
  add column if not exists prioridad text default 'media';

-- Actualizar estado para tener opciones útiles de seguimiento
comment on column public.leads.estado is 'nuevo | contactado | demo_agendada | en_negociacion | cerrado | descartado';
comment on column public.leads.prioridad is 'alta | media | baja';
comment on column public.leads.notas is 'Notas libres de seguimiento';
comment on column public.leads.fecha_contacto is 'Fecha del último contacto';
comment on column public.leads.plan_interes is 'basico | pro | premium';

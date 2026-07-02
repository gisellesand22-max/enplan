-- ============================================================================
-- enplan. — Funciones de base de datos (v1.7)
--
-- Correcciones vs versión anterior:
--   1. NUEVA: activar_promo() — antes NO existía y el código la llamaba.
--      Registra la visita, genera el código y calcula el ahorro EN EL SERVIDOR.
--   2. validar_codigo() — renombrada (antes validate_code, el código llamaba
--      al nombre en español y fallaba). Ahora verifica que quien valida sea
--      el DUEÑO del negocio (antes cualquier usuario podía validar códigos
--      ajenos) y devuelve SOLO el nombre de pila, nunca el apellido.
--   3. get_visitas_negocio() — el dashboard obtiene el nombre de pila por
--      aquí, sin que el negocio lea jamás la tabla users.
--   4. Trigger de límite de promos por plan (Básico 1 / Pro 2 / Premium ∞)
--      aplicado en la BD, no solo en la interfaz.
--
-- El código de 4 dígitos es OPCIONAL: la visita cuenta desde la activación,
-- el negocio puede validar el código o no.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- generate_unique_code: código de 4 dígitos único por negocio (entre activos)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION generate_unique_code(p_negocio_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text;
  v_exists boolean;
  v_attempts integer := 0;
BEGIN
  LOOP
    v_attempts := v_attempts + 1;
    IF v_attempts > 100 THEN
      RAISE EXCEPTION 'No se pudo generar un código único después de 100 intentos';
    END IF;

    v_code := lpad(floor(random() * 10000)::text, 4, '0');

    SELECT EXISTS(
      SELECT 1 FROM activaciones
      WHERE codigo_validacion = v_code
        AND negocio_id = p_negocio_id
        AND estado = 'activa'
    ) INTO v_exists;

    IF NOT v_exists THEN
      RETURN v_code;
    END IF;
  END LOOP;
END;
$$;

-- ----------------------------------------------------------------------------
-- activar_promo: EL CORAZÓN DEL SISTEMA (antes no existía)
--
-- El usuario autenticado activa una promo. El servidor:
--   * verifica que la promo y el negocio estén activos y vigentes
--   * aplica el límite de 1 promo/día para usuarios gratis
--   * calcula el ahorro según el tipo (el cliente NUNCA manda este número)
--   * genera el código de 4 dígitos y registra la visita
--
-- Nota de seguridad: NO recibe user_id como parámetro — usa auth.uid().
-- Así nadie puede activar promos "a nombre de" otro usuario.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION activar_promo(p_promo_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_promo record;
  v_plan text;
  v_count integer;
  v_hoy_inicio timestamptz;
  v_codigo text;
  v_ahorro numeric;
  v_expira timestamptz;
  v_activacion_id uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Necesitas iniciar sesión');
  END IF;

  -- Promo vigente de un negocio activo
  SELECT p.*, n.activo AS negocio_activo
  INTO v_promo
  FROM promociones p
  JOIN negocios n ON n.id = p.negocio_id
  WHERE p.id = p_promo_id;

  IF NOT FOUND OR NOT v_promo.activa OR NOT v_promo.negocio_activo THEN
    RETURN jsonb_build_object('success', false, 'error', 'Esta promoción no está disponible');
  END IF;

  IF v_promo.fecha_fin IS NOT NULL AND v_promo.fecha_fin < CURRENT_DATE THEN
    RETURN jsonb_build_object('success', false, 'error', 'Esta promoción ya venció');
  END IF;

  -- Límite diario: 1 promo/día para usuarios gratis (medianoche de Aguascalientes)
  SELECT plan_consumidor INTO v_plan FROM users WHERE id = v_user_id;

  IF v_plan IS DISTINCT FROM 'premium' THEN
    v_hoy_inicio := date_trunc('day', now() AT TIME ZONE 'America/Mexico_City') AT TIME ZONE 'America/Mexico_City';

    SELECT count(*) INTO v_count
    FROM activaciones
    WHERE user_id = v_user_id
      AND timestamp_activacion >= v_hoy_inicio;

    IF v_count >= 1 THEN
      RETURN jsonb_build_object('success', false, 'error', 'limite_diario',
        'mensaje', 'Ya usaste tu promo de hoy. Con Premium tienes promos ilimitadas.');
    END IF;
  END IF;

  -- Cálculo de ahorro EN EL SERVIDOR según el tipo de promo (PRD v1.7):
  --   2x1 / beneficio_fijo / clase → precio_referencia
  --   porcentaje                   → precio_referencia × (porcentaje / 100)
  --   servicio                     → precio_referencia − precio_con_descuento
  v_ahorro := CASE v_promo.tipo
    WHEN 'porcentaje' THEN round(v_promo.precio_referencia * coalesce(v_promo.porcentaje, 0) / 100.0, 2)
    WHEN 'servicio'   THEN greatest(v_promo.precio_referencia - coalesce(v_promo.precio_con_descuento, v_promo.precio_referencia), 0)
    ELSE v_promo.precio_referencia
  END;

  v_codigo := generate_unique_code(v_promo.negocio_id);
  v_expira := now() + interval '24 hours';

  INSERT INTO activaciones (user_id, negocio_id, promo_id, codigo_validacion,
                            timestamp_expiracion, estado, ahorro_calculado)
  VALUES (v_user_id, v_promo.negocio_id, p_promo_id, v_codigo, v_expira, 'activa', v_ahorro)
  RETURNING id INTO v_activacion_id;

  RETURN jsonb_build_object(
    'success', true,
    'activacion_id', v_activacion_id,
    'codigo', v_codigo,
    'expira_en', v_expira,
    'ahorro_calculado', v_ahorro
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- validar_codigo: el empleado ingresa el código (OPCIONAL — la visita ya
-- quedó registrada al activar; esto solo confirma el uso real).
--
-- Seguridad:
--   * Solo el DUEÑO del negocio puede validar códigos de su negocio
--     (antes cualquier usuario autenticado podía hacerlo → corregido).
--   * Devuelve ÚNICAMENTE el nombre de pila. Nunca apellido, email ni nada más.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION validar_codigo(p_codigo text, p_negocio_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_activacion record;
  v_user_nombre text;
  v_promo record;
BEGIN
  -- Verificación de propiedad: quien llama debe ser dueño de este negocio
  IF NOT EXISTS (
    SELECT 1 FROM negocios
    WHERE id = p_negocio_id AND user_id = auth.uid()
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'No autorizado para este negocio');
  END IF;

  SELECT a.*
  INTO v_activacion
  FROM activaciones a
  WHERE a.codigo_validacion = p_codigo
    AND a.negocio_id = p_negocio_id
    AND a.estado = 'activa'
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Código no encontrado o ya usado');
  END IF;

  IF v_activacion.timestamp_expiracion < now() THEN
    UPDATE activaciones SET estado = 'expirada' WHERE id = v_activacion.id;
    RETURN jsonb_build_object('success', false, 'error', 'Código expirado');
  END IF;

  UPDATE activaciones
  SET estado = 'usada', timestamp_uso = now()
  WHERE id = v_activacion.id;

  -- Solo nombre de pila. La columna users.nombre YA es solo el nombre;
  -- split_part() protege datos viejos que traigan nombre completo en un campo.
  SELECT split_part(nombre, ' ', 1) INTO v_user_nombre
  FROM users
  WHERE id = v_activacion.user_id;

  SELECT titulo, tipo, valor INTO v_promo
  FROM promociones
  WHERE id = v_activacion.promo_id;

  RETURN jsonb_build_object(
    'success', true,
    'user_nombre', v_user_nombre,
    'promo_titulo', v_promo.titulo,
    'promo_tipo', v_promo.tipo,
    'promo_valor', v_promo.valor
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- get_visitas_negocio: lista de visitas para el dashboard del negocio.
-- El negocio NUNCA consulta la tabla users directamente — esta función
-- le entrega el nombre de pila ya recortado y nada más.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_visitas_negocio(p_negocio_id uuid, p_desde timestamptz DEFAULT NULL, p_hasta timestamptz DEFAULT NULL)
RETURNS TABLE (
  activacion_id uuid,
  nombre_cliente text,
  promo_titulo text,
  estado text,
  timestamp_activacion timestamptz,
  timestamp_uso timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM negocios
    WHERE id = p_negocio_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'No autorizado para este negocio';
  END IF;

  RETURN QUERY
  SELECT
    a.id,
    split_part(u.nombre, ' ', 1),   -- nombre de pila únicamente
    p.titulo,
    a.estado,
    a.timestamp_activacion,
    a.timestamp_uso
  FROM activaciones a
  JOIN users u ON u.id = a.user_id
  JOIN promociones p ON p.id = a.promo_id
  WHERE a.negocio_id = p_negocio_id
    AND (p_desde IS NULL OR a.timestamp_activacion >= p_desde)
    AND (p_hasta IS NULL OR a.timestamp_activacion <= p_hasta)
  ORDER BY a.timestamp_activacion DESC;
END;
$$;

-- ----------------------------------------------------------------------------
-- Límite de promos activas por plan, aplicado EN LA BASE DE DATOS
-- (la interfaz también lo muestra, pero esta es la barrera real):
--   basico → 1 · pro → 2 · premium → sin límite
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION enforce_plan_promo_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan text;
  v_limite integer;
  v_activas integer;
BEGIN
  -- Solo importa cuando la promo queda ACTIVA
  IF NEW.activa IS DISTINCT FROM true THEN
    RETURN NEW;
  END IF;

  SELECT plan INTO v_plan FROM negocios WHERE id = NEW.negocio_id;

  v_limite := CASE v_plan
    WHEN 'basico' THEN 1
    WHEN 'pro' THEN 2
    ELSE NULL  -- premium: sin límite
  END;

  IF v_limite IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT count(*) INTO v_activas
  FROM promociones
  WHERE negocio_id = NEW.negocio_id
    AND activa = true
    AND id IS DISTINCT FROM NEW.id;

  IF v_activas >= v_limite THEN
    RAISE EXCEPTION 'Tu plan % permite máximo % promoción(es) activa(s). Pausa una o sube de plan.', v_plan, v_limite;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_plan_promo_limit ON promociones;
CREATE TRIGGER trg_plan_promo_limit
  BEFORE INSERT OR UPDATE OF activa ON promociones
  FOR EACH ROW
  EXECUTE FUNCTION enforce_plan_promo_limit();

-- ----------------------------------------------------------------------------
-- expire_old_activations: marca códigos vencidos (para pg_cron)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION expire_old_activations()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  UPDATE activaciones
  SET estado = 'expirada'
  WHERE estado = 'activa'
    AND timestamp_expiracion < now();

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- Permisos de ejecución: los RPC son la única puerta de entrada
REVOKE ALL ON FUNCTION activar_promo(uuid) FROM public;
REVOKE ALL ON FUNCTION validar_codigo(text, uuid) FROM public;
REVOKE ALL ON FUNCTION get_visitas_negocio(uuid, timestamptz, timestamptz) FROM public;
GRANT EXECUTE ON FUNCTION activar_promo(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION validar_codigo(text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION get_visitas_negocio(uuid, timestamptz, timestamptz) TO authenticated;

-- ============================================================================
-- enplan. — Database Functions
-- ============================================================================

-- generate_unique_code: creates a unique 4-digit validation code for a negocio
CREATE OR REPLACE FUNCTION generate_unique_code(p_negocio_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
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

-- validate_code: atomically validates a code and marks it as used
CREATE OR REPLACE FUNCTION validate_code(p_codigo text, p_negocio_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_activacion record;
  v_user_nombre text;
  v_promo record;
BEGIN
  SELECT a.*
  INTO v_activacion
  FROM activaciones a
  WHERE a.codigo_validacion = p_codigo
    AND a.negocio_id = p_negocio_id
    AND a.estado = 'activa'
  FOR UPDATE;

  IF v_activacion IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Código no encontrado');
  END IF;

  IF v_activacion.timestamp_expiracion < now() THEN
    UPDATE activaciones
    SET estado = 'expirada'
    WHERE id = v_activacion.id;

    RETURN jsonb_build_object('success', false, 'error', 'Código expirado');
  END IF;

  UPDATE activaciones
  SET estado = 'usada',
      timestamp_uso = now()
  WHERE id = v_activacion.id;

  SELECT nombre INTO v_user_nombre
  FROM users
  WHERE id = v_activacion.user_id;

  SELECT titulo, tipo, valor
  INTO v_promo
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

-- check_daily_limit: returns TRUE if free user has hit their 1/day limit
CREATE OR REPLACE FUNCTION check_daily_limit(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan text;
  v_count integer;
  v_today_start timestamptz;
BEGIN
  SELECT plan_consumidor INTO v_plan
  FROM users
  WHERE id = p_user_id;

  IF v_plan = 'premium' THEN
    RETURN false;
  END IF;

  v_today_start := date_trunc('day', now() AT TIME ZONE 'America/Mexico_City') AT TIME ZONE 'America/Mexico_City';

  SELECT count(*) INTO v_count
  FROM activaciones
  WHERE user_id = p_user_id
    AND timestamp_activacion >= v_today_start;

  RETURN v_count >= 1;
END;
$$;

-- expire_old_activations: marks expired activaciones, intended for pg_cron
CREATE OR REPLACE FUNCTION expire_old_activations()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
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

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/enplan/MobileShell";
import { LegalDoc } from "@/components/enplan/LegalDoc";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacidadPage,
});

const CONTENT = `
# Aviso de Privacidad — enplan.

> ⚠️ **Plantilla base.** Complétala con tus datos reales (los campos entre [corchetes]) y pídele a un abogado o contador que la revise antes de publicarla. Este documento es un punto de partida conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), no asesoría legal.

**Última actualización:** [fecha]

## 1. Responsable del tratamiento de tus datos

[Razón social o nombre completo del responsable] (en adelante, **"enplan."**), con domicilio en [calle, número, colonia, C.P., Aguascalientes, México] y RFC [RFC], es responsable del uso y protección de tus datos personales, en términos del presente Aviso de Privacidad.

Contacto para temas de privacidad: **[correo, ej. privacidad@enplan.app]**.

## 2. Datos personales que recabamos

Podemos recabar las siguientes categorías de datos, según seas usuario consumidor o negocio socio:

- **De identificación y contacto:** nombre, apellidos, correo electrónico, número de teléfono/WhatsApp.
- **De la cuenta:** usuario, contraseña (cifrada), historial de promociones activadas.
- **Datos demográficos (opcionales):** edad, sexo — solo si decides proporcionarlos, para mostrarte mejores beneficios y para estadísticas agregadas.
- **De ubicación aproximada:** para mostrarte promociones cercanas (solo si otorgas permiso en tu dispositivo).
- **De negocios socios:** nombre del negocio, dirección, categoría, datos de contacto, información fiscal necesaria para la facturación.
- **De pago:** los pagos se procesan a través de **Stripe**; enplan. no almacena los números completos de tarjeta.

No recabamos datos personales sensibles.

## 3. Finalidades del tratamiento

**Finalidades primarias** (necesarias para el servicio):
- Crear y administrar tu cuenta.
- Mostrarte y permitirte activar promociones de negocios locales.
- Registrar visitas y calcular ahorros/estadísticas.
- Procesar los pagos de suscripción de los negocios socios (vía Stripe).
- Brindar soporte y atención.

**Finalidades secundarias** (no necesarias, requieren tu consentimiento):
- Enviarte comunicaciones de marketing, novedades y nuevas promociones.
- Elaborar estadísticas agregadas y mejorar el servicio.

Si no deseas que tus datos se usen para las finalidades secundarias, envía un correo a [correo] indicándolo. Tu negativa no será motivo para negarte el servicio.

## 4. Transferencias de datos

Tus datos pueden ser tratados por proveedores que nos ayudan a operar, tales como:
- **Supabase** (alojamiento de base de datos y autenticación).
- **Stripe** (procesamiento de pagos).
- **Vercel** (alojamiento de la aplicación).
- Herramientas de análisis y comunicación (p. ej. Google Analytics, Meta).

Estas transferencias son las necesarias para prestarte el servicio. No vendemos tus datos personales a terceros.

## 5. Derechos ARCO

Tienes derecho a **Acceder, Rectificar, Cancelar** tus datos personales u **Oponerte** a su tratamiento (derechos ARCO), así como a revocar tu consentimiento.

Para ejercerlos, envía tu solicitud a **[correo]** indicando: (i) tu nombre y medio para contactarte, (ii) el derecho que deseas ejercer y (iii) la descripción clara de los datos. Responderemos en un plazo máximo de 20 días hábiles.

## 6. Cookies y tecnologías de rastreo

Utilizamos cookies y tecnologías similares para recordar tus preferencias, mantener tu sesión y analizar el uso del sitio y la app. Puedes deshabilitarlas desde la configuración de tu navegador, aunque algunas funciones podrían dejar de operar correctamente.

## 7. Cambios al Aviso de Privacidad

Podemos actualizar este Aviso. Publicaremos la versión vigente en **[enplan.app/privacidad]** e indicaremos la fecha de última actualización.

## 8. Consentimiento

Al registrarte y utilizar enplan., manifiestas que has leído y aceptas este Aviso de Privacidad.
`;

function PrivacidadPage() {
  const navigate = useNavigate();
  return (
    <MobileShell showNav={false}>
      <div className="flex items-center gap-3 px-4 pt-10 pb-2">
        <button
          type="button"
          onClick={() => navigate({ to: "/ajustes" })}
          aria-label="Regresar"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2B2B23] shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
      </div>
      <div className="px-5 pb-10">
        <LegalDoc content={CONTENT} />
      </div>
    </MobileShell>
  );
}

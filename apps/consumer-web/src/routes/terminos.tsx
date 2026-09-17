import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/enplan/MobileShell";
import { LegalDoc } from "@/components/enplan/LegalDoc";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones — enplan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TerminosPage,
});

const CONTENT = `
# Términos y Condiciones — enplan.

> ⚠️ **Plantilla base.** Reemplaza los campos entre [corchetes] y haz que un abogado la revise antes de publicarla, sobre todo las secciones de pagos, responsabilidad y facturación. No es asesoría legal.

**Última actualización:** [fecha]

## 1. Aceptación

Estos Términos y Condiciones ("Términos") regulan el uso de la plataforma enplan. (sitio web, aplicación para consumidores y panel de negocios) operada por [Razón social/nombre], RFC [RFC], con domicilio en [domicilio], Aguascalientes, México. Al usar enplan. aceptas estos Términos.

## 2. Definiciones

- **enplan.**: la plataforma que conecta negocios locales con consumidores mediante promociones.
- **Usuario:** persona que usa la app para descubrir y activar promociones.
- **Negocio socio:** establecimiento que contrata un plan para publicar promociones.
- **Promoción / Beneficio:** descuento u oferta publicada por un negocio socio.
- **Código de validación:** código opcional de 4 dígitos para confirmar una visita.

## 3. Registro y cuenta

Para usar ciertas funciones debes crear una cuenta con información veraz y mantener la confidencialidad de tu contraseña. Eres responsable de la actividad en tu cuenta. Debes ser mayor de edad o contar con autorización de tu tutor.

## 4. Uso de promociones (consumidores)

- Las promociones las define y ofrece cada **negocio socio**, no enplan.
- enplan. actúa como intermediario tecnológico; **no es responsable** de la calidad, existencia o cumplimiento de la promoción por parte del negocio.
- Las promociones están sujetas a disponibilidad y a las condiciones que indique cada negocio (vigencia, días válidos, no acumulables, etc.).
- El uso del código de validación es **opcional**; algunos negocios pueden solicitarlo para confirmar la visita.

## 5. Planes, pagos y facturación (negocios socios)

- Los negocios pueden contratar los planes **Básico ($499), Pro ($999) o Premium ($1,799)** MXN al mes (precios sujetos a cambio con aviso previo).
- **Primer mes gratis:** se ofrece un periodo de prueba; si no se cancela antes de que termine, inicia el cobro recurrente mensual.
- Los pagos se procesan mediante **Stripe**. Al contratar, autorizas el cargo recurrente a tu método de pago.
- **Sin permanencia:** puedes cancelar en cualquier momento; la cancelación surte efecto al final del periodo ya pagado y no genera reembolsos por periodos en curso, salvo que la ley aplicable indique lo contrario.
- La facturación (CFDI) se emitirá conforme a la información fiscal que proporcione el negocio.

## 6. Obligaciones de los negocios socios

- Publicar promociones reales y honrarlas a los usuarios que las presenten.
- Mantener actualizada su información y la vigencia de sus promociones.
- No publicar contenido falso, ilegal o que infrinja derechos de terceros.

## 7. Conducta prohibida

No está permitido: usar la plataforma con fines ilícitos, suplantar identidades, abusar o defraudar promociones, vulnerar la seguridad del sistema, ni reproducir el contenido sin autorización.

## 8. Propiedad intelectual

La marca "enplan.", el logotipo, el diseño y el software son propiedad de [Razón social/nombre]. No se otorga ningún derecho sobre ellos salvo el uso permitido de la plataforma.

## 9. Limitación de responsabilidad

enplan. se ofrece "tal cual". En la máxima medida permitida por la ley, no seremos responsables por daños indirectos derivados del uso o imposibilidad de uso de la plataforma, ni por incumplimientos de los negocios socios o de terceros (Stripe, proveedores, etc.).

## 10. Vigencia y terminación

Podemos suspender o terminar cuentas que incumplan estos Términos. Tú puedes dejar de usar la plataforma en cualquier momento.

## 11. Modificaciones

Podemos modificar estos Términos. La versión vigente estará en **[enplan.app/terminos]** con su fecha de actualización. El uso continuado implica aceptación.

## 12. Ley aplicable y jurisdicción

Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de **Aguascalientes, Aguascalientes**, renunciando a cualquier otro fuero.

## 13. Contacto

Dudas sobre estos Términos: **[correo, ej. hola@enplan.app]**.
`;

function TerminosPage() {
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

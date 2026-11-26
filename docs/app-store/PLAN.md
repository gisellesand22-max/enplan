# Plan: publicar enplan. en el App Store (iOS)

Última revisión: 26 nov 2026

## 1. Diagnóstico

| App | Estado real | ¿Sirve para iPhone hoy? |
|---|---|---|
| `apps/consumer-web` | Versión final. Conectada a Supabase (login, negocios, activaciones). | No directo. Es web; hay que empaquetarla. |
| `apps/consumer` (Expo) | Diseño viejo. Usa etiquetas web (`div`, `span`) e íconos web (`@tabler/icons-react`), login simulado y datos de prueba (`data/demo.ts`). | No. Esas etiquetas no funcionan en iOS nativo. Habría que reescribirla. |

## 2. Camino recomendado: empaquetar `consumer-web` con Capacitor

Capacitor mete la app web dentro de una app de iOS y le da acceso a funciones del teléfono.

**Por qué:**
* Reusa el diseño final y la conexión a Supabase que ya funcionan.
* La app de Expo habría que reescribirla completa (11 pantallas, unas 2,000 líneas).
* Una sola base de código para web e iPhone.

**Riesgo principal:** Apple rechaza apps que solo muestran un sitio web (guía 4.2, funcionalidad mínima). Se reduce agregando funciones nativas que enplan. ya necesita:
* **Notificaciones push.** La pantalla Ajustes ya tiene los interruptores (nuevos beneficios, códigos por vencer), pero hoy no hacen nada.
* **Compartir nativo** para el código de referido y los beneficios.
* **Ubicación** para "beneficios cerca de ti" (opcional).
* La app debe funcionar sin depender de cargar una URL externa: los archivos van dentro de la app.

**Alternativa:** reescribir en Expo (React Native). Más trabajo, menor riesgo de rechazo por 4.2.

## 3. Lista de pendientes

### A. Cuentas y trámites (los hace Giselle)
- [ ] Inscribirse en Apple Developer Program (99 USD al año). Si es como empresa, tramitar número D‑U‑N‑S antes.
- [ ] Decidir el identificador de la app. Propuesta: `mx.enplan.app` (no se puede cambiar después).
- [ ] Crear la app en App Store Connect.
- [ ] Correo y URL de soporte (Apple pide una URL de soporte pública).
- [ ] Cuenta de prueba para el revisor de Apple (correo y contraseña con beneficios visibles).

### B. Requisitos de Apple en el código
- [x] **Eliminar cuenta desde la app** (guía 5.1.1(v)). Hecho en esta rama:
  * `supabase/migrations/00011_delete_my_account.sql`
  * Botón "Eliminar mi cuenta" en `apps/consumer-web/src/routes/ajustes.tsx`
  * **Falta:** aplicar la migración en Supabase de producción.
  * **Decisión de producto:** al borrar la cuenta se borran sus activaciones, así que los negocios pierden esas visitas en sus métricas. Si se quiere conservar el conteo, hay que guardarlas de forma anónima.
- [ ] Iniciar sesión con Apple: **no es obligatorio hoy**, porque `consumer-web` solo usa correo y contraseña. Se vuelve obligatorio si se agrega "Entrar con Google".
- [ ] Política de privacidad: mencionar que el usuario puede borrar su cuenta desde Ajustes.
- [ ] Política de privacidad: dice que se usa Google Analytics y Meta, pero no encontré esas herramientas en `consumer-web`. Hay que quitarlas del texto o declararlas a Apple si se agregan.

### C. Preparar `consumer-web` para iPhone
- [ ] Compilar en modo SPA (archivos estáticos). TanStack Start lo soporta (`tanstackStart.spa`). Hoy compila para servidor (SSR).
- [ ] Revisar que nada dependa del servidor (`src/server.ts` solo maneja errores).
- [ ] Agregar Capacitor y la carpeta `ios/`.
- [ ] Guardar la sesión de Supabase de forma segura en el teléfono (hoy usa `localStorage`).
- [ ] Respetar las áreas seguras del iPhone (notch y barra inferior) en `MobileShell`.
- [ ] Enlaces de confirmación de correo de Supabase que abran la app (deep links).
- [ ] Conectar los interruptores de notificaciones a push reales.
- [ ] Compartir nativo en referidos y beneficios.
- [ ] Corregir el error de tipos que ya existía en `business.$businessId.activate.$promoId.tsx` (falta `ahorroCalculado`).

### D. Compilar y subir
- [ ] Compilar la app de iOS. Con Capacitor se necesita Xcode (Mac) o un servicio en la nube (por ejemplo Codemagic o Ionic Appflow).
- [ ] Subir a TestFlight y probar en iPhones reales.

### E. Ficha de la tienda (borradores listos en esta carpeta)
- [x] Textos: `ficha-app-store.md`
- [x] Respuestas de privacidad: `privacidad-apple.md`
- [ ] Ícono de 1024×1024 sin transparencia.
- [ ] Capturas de pantalla de iPhone (Apple pide el tamaño de 6.9" o 6.5").
- [ ] Clasificación por edad (cuestionario en App Store Connect).

### F. Revisión
- [ ] Enviar a revisión con notas para el revisor: qué es enplan., la cuenta de prueba y cómo activar un beneficio.

## 4. Orden sugerido

1. Trámites de Apple (A). Pueden tardar, conviene empezar ya.
2. Aplicar la migración de borrar cuenta (B).
3. Preparar `consumer-web` para iPhone (C).
4. Compilar y probar en TestFlight (D).
5. Ficha, capturas e ícono (E).
6. Enviar a revisión (F).

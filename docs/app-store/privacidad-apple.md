# Cuestionario de privacidad de Apple: borrador

Basado en lo que hoy guarda `consumer-web` y la base de datos (`supabase/migrations`). Si se agregan herramientas nuevas (analítica, ubicación, push), hay que actualizarlo.

## ¿Se recopilan datos? Sí

| Dato (categoría de Apple) | Dónde se guarda | Uso | ¿Ligado a la persona? | ¿Rastreo? |
|---|---|---|---|---|
| Nombre (Contact Info > Name) | `users.nombre`, `users.apellido` | Funcionalidad de la app | Sí | No |
| Correo (Contact Info > Email Address) | `users.email` | Funcionalidad de la app, cuenta | Sí | No |
| ID de usuario (Identifiers > User ID) | `users.id` | Funcionalidad de la app | Sí | No |
| Interacción con el producto (Usage Data > Product Interaction) | `activaciones` (qué beneficio, en qué negocio, cuándo) | Funcionalidad de la app; métricas para negocios | Sí | No |
| Fecha de nacimiento (Other Data) | `users.fecha_nacimiento` | Funcionalidad de la app | Sí | No |

Nota: la fecha de nacimiento existe en la base de datos, pero el registro actual de `consumer-web` solo envía nombre, correo y contraseña. Si no se captura, no se declara.

## No se recopila hoy
* Ubicación: no se usa.
* Datos de pago de consumidores: no hay compras dentro de la app.
* Analítica de terceros: no encontré Google Analytics ni Meta en `consumer-web`.
* Lugares guardados: se quedan en el teléfono (`localStorage`), no se envían al servidor.

## Rastreo (App Tracking Transparency)
No se rastrea a usuarios entre apps de otras empresas. No hace falta pedir permiso de rastreo.

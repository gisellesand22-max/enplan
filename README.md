# enplan. — Monorepo

Club de beneficios local B2B2C en Aguascalientes. Todo el código vive aquí.

## Apps

| Carpeta | Qué es | Tecnología | Puerto (dev) |
|---|---|---|---|
| `apps/landing` | Sitio de marketing (consumidor + reclutar negocios) | Next.js 14 | 3000 |
| `apps/consumer-web` | **App del consumidor — versión FINAL (de Lovable)** | Vite + TanStack + React 19 | 8080 |
| `apps/business` | Panel del negocio (dashboard, métricas, promos, validar, perfil) | Next.js 14 | 3002 |
| `apps/consumer` | App del consumidor NATIVA (para futuro iOS/Android) — UI vieja | Expo / React Native | 3001 |

## Paquetes compartidos

| Carpeta | Qué es |
|---|---|
| `packages/shared` | Cliente de Supabase, tipos, queries, constantes |
| `packages/ui` | Design system (botones, tarjetas, etc.) |
| `packages/auth` | Autenticación con Supabase |
| `supabase/` | Esquema de base de datos (migraciones, RLS, funciones, seed) |

## Cómo correr cada app

- **Landing / Panel / Consumer nativo** (workspaces): `npm run dev --workspace=apps/landing` (o `apps/business`, `apps/consumer`)
- **Consumer web (Lovable):** tiene dependencias **aisladas** (usa React 19, distinto al resto). Se corre por separado:
  ```
  cd apps/consumer-web
  npm install   # solo la primera vez
  npm run dev
  ```

## Notas importantes

- **`apps/consumer-web` NO es un workspace compartido** a propósito: usa React 19 y Tailwind v4, que chocan con el React 18 de las demás apps. Por eso tiene su propio `node_modules`. Es normal.
- La app de `apps/consumer-web` se copió del repo de Lovable (`pixel-perfect-3cb45b73`), que queda como **respaldo**. De aquí en adelante se edita **aquí**, no en Lovable, para no tener dos versiones.
- Las 4 apps se conectan a la **misma base de datos de Supabase**.

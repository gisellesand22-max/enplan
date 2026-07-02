# enplan. — Consumer App UI Design

Build the consumer-facing mobile web app for **enplan.** — a B2B2C membership and benefits platform for Mexico that connects local businesses in Aguascalientes with nearby consumers through exclusive, verifiable promotions.

## Tech Stack
- React + TypeScript + Tailwind CSS
- Lucide icons (or any icon library you prefer)
- Mobile-first design (375px viewport, max-width 430px centered on desktop)
- Single-page app with tab navigation

---

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Lima | `#CDD917` | Primary, CTAs, active states, badges, accents |
| Carbón | `#2B2B23` | Headers, main text, dark cards, active chips |
| Arena | `#FAF8F3` | General app background (entire app) |
| Blanco | `#FFFFFF` | Cards, input backgrounds |
| Arena oscuro | `#D6D0C4` | Inactive chips, separators, borders, muted text |

### Typography
- **Headings & Logo:** Montserrat — weights 600, 700, 800
- **Body & UI:** Work Sans — weights 400, 500, 600
- Both from Google Fonts

### Logo
The logo is the text "enplan." where:
- "en" is in Lima (#CDD917) color
- "plan" is in Carbón (#2B2B23) color  
- The "." (period) is a small filled circle in Carbón
- The letter "e" has a smiley face design (two small dots as eyes inside the counter of the e, the curve of the e forms a smile)
- For this build, just render it as styled text: <span style="color:#CDD917; font-weight:800">en</span><span style="color:#2B2B23; font-weight:800">plan</span><span style="color:#2B2B23">.</span>

### Design Principles
- Rounded corners everywhere: cards use rounded-2xl (16px), chips use rounded-full, buttons use rounded-full
- Subtle shadows on cards (shadow-sm), stronger on hover (shadow-md)
- Clean whitespace, generous padding (p-5 on containers, p-4 on cards)
- Smooth transitions on all interactive elements
- The app should feel premium, modern, and friendly — like a well-funded startup app, not a template

---

## App Structure — 3 Tabs with Bottom Navigation

### Bottom Tab Bar
Fixed at bottom, white background, thin top border (arena-dark/20):
- **Tab 1:** "Inicio" — Home icon — Main browsing screen
- **Tab 2:** "Beneficios" — Ticket icon — Active codes + history
- **Tab 3:** "Perfil" — User icon — Profile & settings

Active tab: Lima icon + Carbón text (font-semibold)
Inactive tab: Arena-dark icon + Arena-dark text

---

## Screen 1: HOME (Tab "Inicio")

### Header / Greeting Area
- Background: Arena
- Top padding generous (safe area)
- Left-aligned greeting: **"Hola 👋"** (or "Hola, Carlos" if logged in) in Montserrat bold 24px
- Subtitle: "Explora beneficios en Aguascalientes" in Work Sans, text-carbon/50, 14px
- Leave EXTRA SPACE here — this greeting area is important, it should breathe

### Category Chips
- Horizontal scrollable row, no scrollbar visible
- Chips: **Todos**, **Comida**, **Bienestar**, **Ocio**, **Negocios**
- Active chip: `bg-carbon text-white rounded-full px-4 py-2`
- Inactive chip: `bg-arena-dark/40 text-carbon/60 rounded-full px-4 py-2`
- Tapping a chip filters the business grid below

### Business Grid — ⚠️ THIS IS KEY: 2-COLUMN GRID, NOT A LIST
Display businesses in a **2-column grid** (`grid grid-cols-2 gap-3`). Each card is a vertical card:

**Business Card Design (each card):**
- White background, rounded-2xl, overflow hidden
- **Top area:** A colored placeholder/gradient as a "cover image" area (use the category to determine color):
  - Comida: warm gradient (orange-ish tones using Lima variations)
  - Bienestar: cool gradient (soft greens)
  - Ocio: vibrant gradient (Lima to dark)
  - Negocios: neutral gradient (Arena-dark tones)
  - Height: ~100px, with the category icon centered in white circle overlay
- **Bottom area (padding p-3):**
  - Business name: Montserrat bold, 14px, max 2 lines, truncate
  - Promo badge: small pill showing the best promo type (e.g., "2x1", "20% off", "Gratis", "Clase"), using Lima/20 background
  - Promo title: Work Sans, 12px, text-carbon/60, 1 line truncate
- Tapping the card navigates to the business profile

### Demo Data — 8 Businesses:
1. **Café La Estación** (Comida) — "2x1 en cualquier café"
2. **Gym FitZone** (Bienestar) — "Primera clase gratis"  
3. **Bar El Patio** (Ocio) — "20% en tu cuenta"
4. **Salón Bella** (Bienestar) — "Corte + peinado a $199"
5. **Taquería Don Pedro** (Comida) — "Agua fresca gratis"
6. **Yoga Zen Studio** (Bienestar) — "Clase de prueba gratis"
7. **Taller Rápido** (Negocios) — "Cambio de aceite a $399"
8. **Cine Central** (Ocio) — "2x1 en boletos"

---

## Screen 2: BUSINESS PROFILE (when tapping a card)

Full-screen view of a business:
- **Back arrow** at top left
- **Cover gradient** at top (same category-based gradient, taller here ~180px)
- **Business name** large, Montserrat extrabold
- **Category badge** (chip style)
- **Description** paragraph
- **Info section:** Address (with map pin icon), Phone, Hours — each as a row with icon + text
- **"Promociones activas" section header**
- **Promo cards:** Each promo as a card with:
  - Type badge (2x1, Descuento, etc.)
  - Title (bold)
  - Description (smaller, muted)
  - **"Activar beneficio"** button: full-width, Lima background, Carbón text, rounded-full, font-bold, py-3

---

## Screen 3: ACTIVATION FLOW (after tapping "Activar beneficio")

### If not logged in — Login Gate:
- Clean centered layout
- "Inicia sesión para activar" header
- Email input (Arena background, rounded-xl, border arena-dark/30)
- Password input
- **"Entrar"** button (Lima, full-width, rounded-full)
- **"Continuar con Google"** button (white, border carbon/20, with Google "G" icon)
- "¿No tienes cuenta? Regístrate" link at bottom

### If logged in — Code Display:
- Big check mark in a Lima circle at top (animated if possible)
- **"¡Beneficio activado!"** in Montserrat bold
- Business name below
- Promo description
- **THE CODE: 4 random digits, HUGE** — Montserrat extrabold, text-6xl (60px+), tracking-[0.2em], centered. Last 2 digits in Lima color, first 2 in Carbón.
- Card below showing: business name + promo (Carbón background, white text, rounded-xl)
- Timer text: "Válido por 23h 59m" with clock icon, muted
- **"Compartir con amigos"** button: Carbón background, white text, full-width, rounded-full
- Small "Volver al inicio" link at bottom

---

## Screen 4: BENEFITS TAB (Tab "Beneficios")

### If not logged in:
- Centered card: Illustration placeholder + "Inicia sesión para ver tus beneficios" + Login button

### If logged in:
**Section "Activos"** (if any):
- Cards with: business name, promo title, BIG 4-digit code display (same style as activation), countdown timer, Lima accent border-left

**Section "Historial":**
- List of past benefits: business name, promo, date, status badge ("Usada" in Carbón/white, "Expirada" in Arena-dark)

Demo: 2 active, 4 in history

---

## Screen 5: PROFILE TAB (Tab "Perfil")

### If not logged in:
- Centered card with login prompt

### If logged in:
- **Avatar:** Large circle (64px) with user initials, Lima background, Carbón text
- **Name + email** below avatar
- **Stats grid** (2x2): 
  - Beneficios usados: 12
  - Negocios visitados: 8
  - Amigos referidos: 3
  - Ahorro estimado: $1,840
  Each stat in a white card, number big + bold, label small + muted
- **"Compartir enplan."** button (Lima, rounded-full) — share referral link
- **"Cerrar sesión"** at bottom (text button, muted red or carbon/50)

---

## Important Design Notes

1. **2-column grid for businesses is mandatory** — this is the core visual change from what we have now
2. The colored gradients/placeholder covers on business cards add the visual variety the app needs
3. Use the FULL color palette everywhere — Lima for accents and CTAs, Carbón for dark sections and text, Arena as the warm background, Arena-dark for borders and muted elements
4. Every screen should feel like it belongs to the same design family as a Stripe or Linear product page
5. The app background is ALWAYS Arena (#FAF8F3), never plain white
6. Cards are always white (#FFFFFF) with subtle borders and shadows
7. All buttons are rounded-full (pill shape)
8. Mobile-first: design at 375px width, centered with max-w-[430px] on larger screens
9. Mock all auth — use a simple state toggle (no real backend needed)
10. The greeting header with space for messages is important — keep it prominent

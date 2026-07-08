# Tefedila Design System

**Tefedila** is a digital addressing system for **Togo**. It turns a GPS
coordinate like `6.2101, 1.1547` into a human-usable address: a short lettered
code `GAA:129-0676`, a long numeric code `60205-01001:129-0676`, a Plus Code,
a geohash, and — on authenticated endpoints — a French street-level reference
("*à côté de la Pharmacie de Gbossimé, Abové, 60207 Golfe 7, DAGL*").

Tefedila is built by **HyperFlux Sys. LLC**. The product is bilingual-leaning
but **the end-user product is in French** (Togo is francophone); the partner /
developer surfaces are in English.

This design system captures Tefedila's brand and UI so any new screen, slide,
or marketing asset looks like it belongs to the product.

---

## Sources

Everything here is reverse-engineered from the product source. If you have
access, read these to go deeper:

- **GitHub — `komrihe/TFD`** (private monorepo): https://github.com/komrihe/TFD
  - `tefedila_mobile/` — the public Expo + React-Native-Web app (the main brand
    surface). Tokens in `src/lib/theme.ts`; the hero UI in
    `src/components/ResultCard.tsx`; the screen in `src/screens/HomeScreen.tsx`.
  - `tefedila_mobile/ui/tefedila_redesign_with_gmaps_overlay.html` — a static
    redesign mockup; the clearest single statement of design intent.
  - `tefedila_app/` — the React + Vite **partner dashboard** (JWT auth,
    API keys, members, plans, usage). Tokens in `src/index.css`.
  - `tefedila_project/` — the Django backend (the engine + partner API).
  - `CLAUDE.md` (root) — full architecture cheat-sheet.

Explore the repo to build more faithfully than this system alone allows.

---

## The three products

| Surface | What it is | Audience | Language |
|---|---|---|---|
| **Tefedila Web/Mobile** | Public, no-login lookup app. Generate an address from GPS, or look up any code / place. | Everyone in Togo | French |
| **Partner Dashboard** | Manage API keys, members, plan, and view usage. | Integrating partners / developers | English |
| **Partner API** | Server-to-server geocoding (`X-Tefedila-Key`, OAuth2, JWT). | Machines | — |

The design system focuses on the two visual surfaces (Web/Mobile + Dashboard).

---

## CONTENT FUNDAMENTALS

How Tefedila writes.

- **Two voices, by surface.**
  - *Public app → French, warm-utilitarian.* Short imperative labels:
    "Ma position", "Rechercher", "Générer depuis ma position", "Itinéraire",
    "Partager", "Garder". Hints are quiet and instructional:
    "Code court, plus code, coordonnées ou ville".
  - *Dashboard → English, plain and direct.* "API Keys", "Create a key",
    "Revoke", "Requests this month". Sentence case in body, occasional
    Title Case for page titles.
- **Casing.** Eyebrow / section labels are **UPPERCASE, letter-spaced**
  ("ADRESSE NUMÉRIQUE", "REPÈRE", "AUTRES FORMATS", "DÉCOUPAGE ADMINISTRATIF").
  Headlines are sentence/proper case. Buttons are sentence case.
- **Person.** The app addresses the user implicitly through action labels, not
  "you/vous" prose. The dashboard is plain second-person where needed
  ("Use these for server-to-server access").
- **Domain vocabulary is precise and consistent.** Always: *Région,
  Préfecture, Commune, Canton, Localité, Sous-localité* (the admin hierarchy);
  *Code court* / *Code long*; *Repère* (POI landmark reference); *Plus Code*;
  *cellule de 122m*. Accuracy is stated honestly: "±86m · cellule 122m" — never
  rounded into a false promise.
- **Numbers are real, never decorative.** Coordinates show 6 decimals
  (`6.210100, 1.154700`); accuracy radius is a measured metre value; quota /
  usage figures are exact (`12,480` not "~12k").
- **No emoji** in the shipped product UI (an early prototype used 📍 in the
  dashboard sidebar/login — treat that as legacy, **do not** carry it forward;
  use the pin logo mark instead). No exclamation marks. Tone is calm,
  trustworthy, civic — closer to a postal service than a consumer app.
- **Errors are honest and actionable**, in the surface's language:
  "Coordonnées en dehors des limites du Togo.", "Serveur en démarrage — la
  requête sera relancée automatiquement.", "Revoke this key? Apps using it will
  fail immediately."
- **Footer signature:** "© Tefedila, Powered by HyperFlux Sys. LLC" /
  "Accès public gratuit · Version Web".

---

## VISUAL FOUNDATIONS

- **Palette.** A single **forest green** carries the brand:
  `#0F6E56` primary, deepening to `#0a4f3d`. A sandy **`#f4a460`** accent
  appears rarely (one-time API-key callout). Everything else is a cool
  green-gray neutral set: app background `#f5f7f5`, white surfaces, hairline
  borders `#e8e9e8`, ink `#1a1a1a`, muted `#6b7280`. Status colors are standard
  (green ok, blue initializing, amber degraded, red down). The **Togo flag**
  (green / yellow / red + white star) is a recurring patriotic motif in the app
  header.
- **The signature element** is the **hero address card**: a green-gradient
  block (`135deg, #0F6E56 → #0c5c48 → #0a4f3d`) with a faint dotted texture, a
  `#7fd4bc` uppercase eyebrow, a large white **monospace** code, and a soft
  green-tinted glow shadow. Everything else is restrained so this pops.
- **Type.** System sans (native, deliberate — feels at home on Togolese
  Android). **Codes are set in monospace** and treated as the most important
  thing on screen — large, tight letter-spacing. Eyebrows are tiny (9.5–11px),
  uppercase, tracked ~0.6px. Display headline ~23px, semibold, slightly negative
  tracking.
- **Spacing & density.** Compact and mobile-first. 16px is the standard card
  padding / screen gutter; 12px between stacked cards. The public app is capped
  at **720px** wide and centered — it never sprawls on desktop.
- **Corner radii.** Soft but not pill-y: inputs/cards `10px`, the hero card
  `14px`, large surfaces `16px`, pills/chips `4–6px`. Buttons `6–10px`.
- **Borders & elevation.** Borders are **0.5px hairlines** in `#e8e9e8` —
  present but barely. Shadows are whisper-soft (`0 1px 2–4px rgba(0,0,0,.06–.1)`).
  The *only* expressive shadow is the green glow under the hero card
  (`0 3px 8px rgba(15,110,86,.3)`) and the map pin (`rgba(15,110,86,.45)`).
- **Cards** = white surface, 0.5px border, 10–16px radius, soft or no shadow.
  Nested info groups (formats, admin table) sit on the sunken `#f5f7f5`
  background with hairline row dividers — a quiet table-in-card pattern.
- **Backgrounds.** Flat color only. No photography, no full-bleed imagery, no
  decorative gradients **except** the brand green on the hero card and logo
  mark. The one texture in the system is a 4%-opacity dotted pattern inside the
  hero card. The mini-map uses a flat, warm vector-terrain illustration
  (sand `#e8dfc8`, cream roads `#fff6e8`) — calm, muted, never satellite.
- **Pills & badges.** Breadcrumb pills: sunken bg, 4px radius, muted text,
  separated by a `›` chevron. Accuracy badge: translucent dark capsule over the
  map (`rgba(0,0,0,.55)`, 20px radius) with a green dot. Status: a single
  colored dot.
- **Buttons.** Primary = solid green, white text, 6–10px radius. Secondary =
  white surface + hairline border. On the dark hero card, actions are
  `rgba(255,255,255,.16)` translucent fills. Segmented **mode toggle**: a sunken
  track with a white raised "thumb" (subtle shadow) marking the active tab.
- **Interaction.** Press = **opacity ~0.78** (and a tiny `scale(0.99)` on large
  CTAs). Active tab gains a white background + small shadow. No bounces, no
  flourish. Transitions are quick (`~120–180ms`, standard ease). Copy buttons
  swap to a checkmark for ~1.2s on success.
- **Transparency & blur.** Used only for overlays on the map (translucent
  black/white capsules, optional `backdrop-filter: blur(4px)`). UI chrome is
  otherwise fully opaque.
- **Imagery vibe.** Warm, muted, cartographic. If a photo is ever needed,
  prefer warm daylight street-level Togo scenes — but the system is
  illustration- and data-first, not photo-led.

---

## ICONOGRAPHY

- **Two icon sets appear in the source, both thin-stroke outline:**
  - The **production mobile app** uses **Ionicons** (`@expo/vector-icons`) —
    e.g. `location-sharp`, `navigate`, `search-outline`, `copy-outline`,
    `qr-code-outline`, `business-outline`, `grid-outline`, `chevron-forward`.
  - The **redesign mockup** uses **Tabler Icons** (`ti ti-*`) — `ti-map-pin`,
    `ti-current-location`, `ti-search`, `ti-copy`, `ti-qrcode`, `ti-share`,
    `ti-bookmark`, `ti-navigation`, `ti-building-landmark`, `ti-chevron-right`.
- **For HTML artifacts in this system we standardize on [Tabler Icons](https://tabler.io/icons)**
  (the redesign's choice — clean, consistent, and trivially CDN-loadable), and
  note Ionicons as the production equivalent. Both are 1.5–2px outline icons; do
  not mix in filled or duotone sets. Load Tabler from CDN:
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css">
  <!-- then: <i class="ti ti-map-pin"></i> -->
  ```
  *(SUBSTITUTION note: this is a CDN stand-in for the app's bundled icon font —
  the glyphs match the design intent.)*
- **The location pin is the brand's one true icon.** It appears as the logo
  mark (white pin in a green-gradient rounded square) and as the map marker
  (teardrop pin with a white dot, green gradient, white ring).
- **No emoji** in production UI (see Content Fundamentals). **No unicode
  glyphs as icons**, except the `›` / `›`-style chevron used as a breadcrumb
  separator and decimal/colon separators inside code anatomy.
- **Icon color follows text:** muted `#6b7280` by default, primary green when
  active/branded, white on green surfaces. Icons live in small rounded
  "icon boxes" (24–30px, tinted-green or sunken bg, hairline border) when they
  label a row or card.

---

## Fonts — substitution flag

- **Sans:** the product intentionally uses the **native system-ui stack** (no
  bundled webfont). Kept as-is. No substitution needed.
- **Mono:** production uses the platform monospace (`Courier` / `monospace`).
  This system pins **JetBrains Mono** (Google Fonts) so the all-important
  address codes render identically across machines. **If you have a preferred
  brand monospace, send it and I'll swap it in.**

---

## Index — what's in this system

- `styles.css` — global entry point (link this one file). `@import`s all tokens.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
  `fonts.css`.
- `assets/` — `logo-mark.svg`, `logo-wordmark.svg`, `togo-flag.svg`.
- `components/` — reusable React primitives (see below). Each has a
  `.jsx` + `.d.ts` + `.prompt.md` and a card HTML in its directory.
- `ui_kits/` — full-screen product recreations:
  - `web_app/` — the public Tefedila lookup app.
  - `dashboard/` — the partner dashboard.
- Foundation specimen cards (`*.card.html`) populate the **Design System** tab.
- `SKILL.md` — makes this system usable as a downloadable Agent Skill.

### Components
Bundle namespace: `window.TefedilaDesignSystem_7ef274`. See each `.prompt.md`.

- **forms/** — `Button` (primary/secondary/ghost/danger/onPrimary), `SearchInput`
  (mono lookup field), `ModeToggle` (segmented control).
- **display/** — `AddressCard` (the green hero), `Breadcrumbs`, `FormatRow`,
  `AdminTable`.
- **feedback/** — `Badge` (neutral/primary/accuracy/accent/error), `StatusDot`
  (system health).
- **layout/** — `Card` (base surface), `Stat` (dashboard KPI).

### UI kits
- **`ui_kits/web_app/`** — public lookup app (French, one screen): header,
  mode toggle, search/GPS, full result (map, hero card, formats, admin).
- **`ui_kits/dashboard/`** — partner dashboard (English): login → sidebar shell
  → usage / API keys / plans.

### Skill
- `SKILL.md` — front-matter + pointer file so this system works as a downloadable
  Agent Skill in Claude Code.

# Milwaukee Bucks Catalog · Astro (25-26)

Catálogo estático del equipo NBA Milwaukee Bucks (temporada 2025-26) hecho con Astro. Incluye hero, stats, roster con búsqueda y filtros, calendario y highlights. Modo oscuro, animaciones suaves y consumo de API externa (balldontlie) con fallback local.

## Requisitos que cubre
- 1 página principal con 3+ secciones (hero, stats, roster, calendario, highlights).
- Responsive básico (grid fluido, nav sticky, mobile-first).
- JS: búsqueda + filtro de posición, toggle de dark mode con `localStorage`, fetch a API externa (balldontlie).
- CSS Grid y animaciones; integración con librería CSS `Open Props` + tipografía custom (Space Grotesk).
- Componentes reutilizables (`Layout`, `Navbar`, `Section`, `ThemeToggle`, `PlayerCard`, `PlayerGrid`).

## Stack y herramientas
- Astro 6
- Open Props (tokens/normalize)
- JavaScript nativo para interactividad (sin framework de UI)

## Estructura principal
- `src/pages/index.astro`: página principal con secciones y datos.
- `src/layouts/Layout.astro`: layout base, fuentes, tema y estilos globales.
- `src/components/`: `Navbar`, `ThemeToggle`, `Section`, `PlayerGrid`, `PlayerCard`.
- `public/`: assets públicos (favicon).

## Scripts
- `npm install` – instala dependencias.
- `npm run dev` – servidor local en `http://localhost:4321`.
- `npm run build` – build estático en `dist/`.
- `npm run preview` – sirve el build para revisar antes de deploy.

## Datos y API (balldontlie)
- Endpoints usados (con fallback local):
  - Roster: `https://api.balldontlie.io/v1/players?team_ids[]=17&per_page=100`
  - Calendario (temporada 2025-26): `https://api.balldontlie.io/v1/games?team_ids[]=17&seasons[]=2025&per_page=100`
- La API nueva requiere key gratuita. Exporta `BALLDONTLIE_API_KEY` antes de `npm run dev`/`build` para datos en vivo. Sin key se usa el fallback estático (edítalo en `src/pages/index.astro` si querés datos manuales).

## Deploy
- Generá el build: `npm run build`.
- Publicá la carpeta `dist/` en tu hosting estático preferido (Netlify, Vercel, GitHub Pages). En Vercel/Netlify: comando `npm run build` y directorio `dist`.

## Cómo trabajar/iterar
- Editá el contenido en `src/pages/index.astro` para stats, calendario o highlights.
- Para agregar jugadores o props extra, ajustá el fallback o el mapeo del fetch en el mismo archivo.
- Estilos globales y tema en `src/layouts/Layout.astro`.

_Commits progresivos: los manejás vos; este README resume el estado actual del proyecto._

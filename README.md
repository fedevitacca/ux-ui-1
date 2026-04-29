# Autoria del trabajo

- Nombre completo: Federico Vitacca

# Milwaukee Bucks Serverless Catalog 25-26

## Tematica del trabajo

El proyecto desarrolla un portal web academico dedicado a los Milwaukee Bucks para la temporada 2025-26. La propuesta mantiene la tematica de catalogo del equipo y suma una capa serverless para el TP 2: autenticacion de usuarios y apuntes personales persistidos en una base de datos en la nube.

## Explicacion del proyecto

La aplicacion funciona como un catalogo tematico construido con Astro. La home actua como entrada principal y dirige a cinco secciones:

- `Locker`: area serverless con registro, inicio/cierre de sesion y CRUD de apuntes personales sobre jugadores, partidos o equipo.
- `Snapshot`: resumen rapido del momento del equipo con indicadores clave.
- `Roster`: plantilla completa con busqueda por nombre y filtro por posicion.
- `Schedule`: proximos partidos con rival, fecha, sede y contexto.
- `Identity`: explicacion narrativa y visual del estilo del equipo.

Los datos generales se resuelven desde `src/data/bucks.ts`. Si existe una API key de balldontlie, el proyecto intenta cargar roster y calendario desde la API; si no, usa datos fallback definidos localmente para mantener el sitio funcional. La persistencia del `Locker` usa endpoints serverless de Astro desplegables en Vercel y una base PostgreSQL en Neon.

## Items que resuelve el trabajo de la consigna

- Desarrollo de una interfaz web responsive.
- Uso de multiples secciones/paginas dentro del mismo proyecto.
- Implementacion de componentes reutilizables en Astro.
- Uso de estilos personalizados con layout global, tarjetas y navegacion.
- Interactividad con JavaScript del lado del cliente.
- Registro de usuario, inicio de sesion y cierre de sesion con endpoints serverless propios.
- CRUD de apuntes Bucks asociados al usuario autenticado.
- Persistencia de usuarios y apuntes en una base cloud de Neon.
- Filtro de jugadores por nombre y posicion en la vista de roster.
- Cambio de tema claro/oscuro con persistencia en `localStorage`.
- Consumo de datos externos con fallback local para garantizar funcionamiento.
- Organizacion clara del proyecto en `pages`, `components`, `layouts` y `data`.

## Herramientas usadas

- `Astro 6` como framework principal.
- `TypeScript` para tipado en la capa de datos.
- `JavaScript` para la interactividad en cliente.
- `Neon` como base PostgreSQL cloud.
- `Astro API routes` y `@astrojs/vercel` como backend serverless.
- `Open Props` para normalizacion y tokens base de estilos.

## Estructura principal

- `src/pages/index.astro`: portada del portal.
- `src/pages/locker/index.astro`: registro, login y CRUD serverless de apuntes.
- `src/pages/snapshot/index.astro`: vista de resumen general.
- `src/pages/roster/index.astro`: vista del plantel con filtros.
- `src/pages/schedule/index.astro`: vista de calendario.
- `src/pages/identity/index.astro`: vista de identidad narrativa.
- `src/data/bucks.ts`: datos fallback y logica de carga desde API.
- `src/components/`: componentes reutilizables como navbar, cards, filtro y toggle de tema.
- `src/layouts/Layout.astro`: layout global, tipografia, estilos base y tema claro/oscuro.

## Instrucciones para ejecutarlo

### Requisitos

- `Node.js >= 22.12.0`
- `npm`

### Instalacion

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Esto levanta el proyecto en `http://localhost:4321`.

## Configuracion de Neon

Crear un archivo `.env` local tomando como base `.env.example`:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require
AUTH_SECRET=cambia-esto-por-un-string-largo-y-aleatorio
```

En Neon, abrir el SQL Editor y ejecutar el contenido de `docs/neon-schema.sql`:

```sql
create extension if not exists pgcrypto;

create table if not exists public.bucks_users (...);
create table if not exists public.bucks_notes (...);
```

La autenticacion se resuelve desde el backend serverless del proyecto. Las claves de Neon quedan solo del lado servidor mediante `DATABASE_URL`; no se exponen al navegador.

### Build de produccion

```bash
npm run build
```
### Vista previa del build

```bash
npm run preview
```

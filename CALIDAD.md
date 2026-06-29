# CALIDAD.md

Documento de calidad del proyecto. Explica cómo aseguramos que lo que llega a producción esté verificado y qué decidimos proteger con tests.

## Estrategia general

El proyecto es un catálogo con una capa serverless (auth + CRUD de apuntes sobre Neon). La parte visual cambia seguido y rompe poco; lo que de verdad nos preocupaba era la capa de datos y la sesión, porque ahí un error se traduce en que un usuario vea apuntes de otro o pierda lo que escribió.

Por eso priorizamos cubrir dos cosas: la lógica de datos que no depende de la UI (filtros, selección de fuente con fallback) con tests unitarios rápidos, y el recorrido real del usuario en el Locker con un test E2E. No buscamos cobertura total sino cubrir los puntos donde un fallo es caro y silencioso.

El otro pilar es el flujo de trabajo: nada entra a `main` sin pasar por un PR revisado por el otro integrante y sin que el pipeline esté en verde. La idea es que el error se vea en el PR y no en producción.

## Herramientas seleccionadas

- **Vitest** para unitarios. Lo elegimos sobre Jest porque el proyecto ya usa Vite/Astro por debajo, así que comparte resolución de módulos y configuración de TS sin agregar transformadores extra. Jest nos obligaba a configurar `ts-jest` o Babel a mano.
- **Playwright** para E2E. Lo preferimos sobre Cypress porque el `webServer` integrado levanta el build y corre los tests en un solo comando, lo que simplifica el paso de CI, y porque maneja mejor el flujo de varias páginas/sesión.
- **GitHub Actions** para CI/CD, por estar dentro del mismo repo y no necesitar un servicio externo.
- **Vercel CLI** para el deploy, que es a donde ya estaba apuntado el proyecto del TP2.
- **ESLint** para el lint.

## Tests desarrollados

- **Unitario — `filterRoster`**: valida el filtro del roster. Cubre filtrado por nombre sin distinguir mayúsculas, filtrado por posición con varios resultados, y el caso de sin filtros (devuelve el plantel completo). Es la lógica que más se toca desde la UI.
- **Unitario — `loadRoster` (estrategia API/fallback)**: valida que se use el fallback local cuando no hay API key y que se caiga al fallback si la llamada a la API falla. Esto protege la promesa del README de que el sitio funciona aunque no haya key de balldontlie.
- **E2E — Locker**: registro/login y creación de un apunte. Verifica que el formulario de apuntes solo aparezca con sesión y que el apunte creado se muestre en la lista. Es el flujo central de la capa serverless.

## Casos de uso críticos

1. **Sesión y acceso a apuntes**: es lo más importante. Si la sesión falla, o el catálogo no sirve o se rompe la privacidad de los apuntes. Por eso el E2E arranca por ahí.
2. **Disponibilidad del catálogo sin API key**: el proyecto promete funcionar con datos fallback. Si esa lógica se rompe, el sitio queda vacío sin que nadie se entere. Lo cubrimos a nivel unitario porque no depende de la UI.
3. **Filtros del roster**: es la interacción principal del usuario en la parte de catálogo.

Dejamos fuera de los tests automáticos cosas como el toggle de tema o la navegación entre secciones: si fallan se ve a simple vista y el costo de un bug ahí es bajo.

## Pipeline de CI/CD

El workflow (`.github/workflows/ci.yml`) se dispara en push y PR a `main`. Tiene dos jobs:

1. **quality**: instala dependencias, corre `lint → test (unitarios) → E2E → build`, en ese orden. Si cualquier paso falla, el job falla y el PR no se puede mergear.
2. **deploy**: depende de `quality` (`needs: quality`) y solo corre en push a `main`. Hace el deploy a producción con la Vercel CLI.

La decisión de diseño central es que **el deploy nunca corre si `quality` no pasó**. Encadenamos los pasos para que el deploy sea consecuencia de que todo lo anterior esté en verde, no un paso independiente. Ponemos el lint primero porque es lo más barato: si hay un error de lint no tiene sentido gastar tiempo corriendo E2E. El build va al final del job de calidad para confirmar que el proyecto compila antes de intentar publicarlo.

Para el deploy se necesita el secret `VERCEL_TOKEN` cargado en el repo.

## Limitaciones y deuda técnica

- Los tests E2E dependen de selectores por texto/rol. Si cambia el copy de los botones del Locker hay que actualizarlos. Sabíamos del riesgo y lo aceptamos porque el flujo es estable.
- Tenemos un solo E2E. El borrado y la edición de apuntes (resto del CRUD) no están cubiertos por E2E todavía; con más tiempo agregaríamos esos casos.
- No mockeamos la base de datos en los unitarios: la lógica de Neon se ejerce solo a través del E2E contra el entorno real. Sería más robusto tener tests de integración de los endpoints serverless por separado.
- La cobertura no está forzada por un umbral en CI. Está la config de coverage en Vitest pero no la usamos como gate.

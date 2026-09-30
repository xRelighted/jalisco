# Cierre de QA — PRD v4 · Jalisco Mexican Grill

**Fecha de auditoría:** 30 de septiembre de 2026 (UTC)  
**Estado:** cambios del candidato implementados y validados en local; **no publicado a `main`** porque no pasa la puerta de rendimiento móvil (`Performance ≥ 95`).  
**Sitio público actual:** [jaliscopy.vercel.app](https://jaliscopy.vercel.app/) — permanece en el deployment anterior.

## Resumen ejecutivo

Se completaron las correcciones de contenido, datos operativos, mapas, conversión móvil, accesibilidad, SSR, SEO y limpieza del scaffold. TypeScript, build, pruebas de horarios y los 27 casos de layout pasan. La carta mantiene 66 productos en 11 categorías, con 33 imágenes —tres distintas por categoría— y Tacos de birria a **Gs. 85.000**.

La aceptación de contenido y layout está lista. **El objetivo Lighthouse de Performance móvil no está cumplido** en Inicio ni Menú; por la condición heredada «publicar si pasa las pruebas», no hice push a GitHub ni actualicé producción.

## A1–A5 y requisitos asociados

| Criterio | Resultado | Evidencia/resolución |
|---|---|---|
| **A1 — simplificar destacados** | **Cumplido** | Se eliminó la línea «JALISCO MEXICAN GRILL ◆ SELECCIÓN DE LA CASA» y los rótulos de categoría. No quedan «Más Pedido» ni «Recomendado por la casa». Por el requisito heredado, hay un solo distintivo editorial **«Recomendado»** en Botana pa 2; las otras tarjetas no tienen distintivo. También se retiró cualquier ticker/marquee. |
| **A2 — título de galería** | **Cumplido** | El título es exactamente **«¡Así se vive Jalisco!»**; se conserva «Buena mesa, buena compañía y el mural que ya es parte de la casa.». |
| **A3 — fotos de galería** | **Cumplido** | No se superponen rótulos ni captions sobre las fotos, incluso en hover. Se conservan los textos `alt` descriptivos. El menú mantiene carrusel horizontal con scroll-snap en móvil; sus categorías tienen tres fotografías únicas. |
| **A4 — ubicación/datos reales** | **Cumplido** | Fuente única: Paseo Deltoto · Porvenir e/ Luis María Argaña, Lambaré, Paraguay. Se propaga a hero, Inicio/Reservas, pie, SEO, JSON-LD, compartir y Google Maps. El iframe real consulta «Jalisco Mexican Grill Paseo Deltoto Lambaré», carga de forma diferida, llena el contenedor y no tiene botones superpuestos. Los bloques mantienen un solo CTA «Cómo llegar». |
| **A5 — estructura y limpieza** | **Cumplido** | Inicio, Menú y Reservas se prerenderizan; el SSR y `hydrateRoot` comparten el límite de `Suspense`, resolviendo el React #418 observado durante QA. Se generó además `404.html` con `noindex`; sitemap, robots, metadata/canonical por ruta y cabeceras Vercel se conservaron. Se retiraron componentes/dependencias del scaffold sin uso. |

**Otros requisitos funcionales:** el estado «Abierto ahora/Cerrado ahora» aparece una vez por vista. Horario único: lunes–jueves 17:30–00:00; viernes y sábados 17:30–01:00; domingo sin turno publicado. El cálculo respeta UTC−3 legal de Paraguay y el turno que termina después de medianoche. La barra móvil prioriza Pedir, Reservar y Cómo llegar.

## QA funcional y responsive

- `pnpm run check`: **correcto**.
- `pnpm run build`: **correcto**; se generaron `/`, `/menu`, `/reservas` y `404.html`.
- `pnpm run test:hours`: **10/10 casos** correctos para `America/Asuncion`.
- `pnpm run test:responsive`: **27/27 combinaciones** (3 rutas × 360, 375, 390, 414, 768, 1024, 1280, 1440 y 1920 px); 0 fallos de layout, 0 errores de browser en el harness.
- Integridad del menú: **66 enlaces de pedido**, **11 categorías**, **33 imágenes** y exactamente 3 únicas por categoría.
- Google Maps: pasó en Inicio y Reservas; diferencias máximas entre contenedor e iframe inferiores a 0,5 px; sin desplazamiento ni overlay.
- Captura revisada: Home desktop del preview. El harness verifica dimensiones y estados en todos los anchos; no se hizo revisión visual manual de capturas para las 27 combinaciones.

## Lighthouse — comparación y limitación

Se utilizó Lighthouse **13.5.0**, throttling/preset estándar. El «antes» midió el sitio público existente (`https://jaliscopy.vercel.app`); el «candidato» midió el preview local del build (`http://127.0.0.1:4173`). Como el origen de red cambia, la comparación es indicativa y sensible al CDN, no un benchmark controlado en un mismo host. Se repitieron Home móvil y Menú escritorio para comprobar la variabilidad.

| Ruta / dispositivo | Performance antes → candidato | A11y candidato | BP candidato | SEO candidato | LCP antes → candidato | CLS candidato |
|---|---:|---:|---:|---:|---:|---:|
| Inicio · móvil | 67 → **68** (repetición: 65) | 100 | 100 (96 en repetición) | 100 | 3,4 s → **5,1 s** (repetición: 5,7 s) | 0,008 |
| Inicio · escritorio | 93 → **94** | 100 | 100 | 100 | 1,5 s → **1,4 s** | 0,001 |
| Menú · móvil | 78 → **76** | 100 | 100 | 100 | 4,0 s → **4,2 s** | 0,002 |
| Menú · escritorio | 93 → **75** (repetición: 92) | 100 | 96 (100 en repetición) | 100 | 1,1 s → **5,1 s** (repetición: 1,7 s) | 0,001 |
| Reservas · móvil | 92 → **96** | 100 | 96 | 100 | 2,0 s → **1,9 s** | 0,003 |
| Reservas · escritorio | 100 → **100** | 100 | 100 | 100 | 0,4 s → **0,4 s** | 0,001 |

### Lectura del rendimiento

- El umbral móvil `Performance ≥ 95` **solo pasa en Reservas** (96); Inicio (65–68) y Menú (76) no lo alcanzan. El LCP móvil de Inicio/Menú también excede 2,5 s. CLS permanece muy por debajo de 0,1.
- Home y Menú usan fotos de hero como elemento LCP. Los URL actuales de `/manus-storage/` responden con **307 a una URL CloudFront firmada**. Dos descargas de prueba, siguiendo esa cadena, tardaron aproximadamente **2,2–3,0 s**; una URL CloudFront sin firma devuelve **403**, por lo que no es viable eliminar la redirección inventando una URL estable.
- El HTML ya incluye preload responsive y `fetchpriority="high"`; la auditoría de descubrimiento de LCP no siempre reconoció la prioridad. No se cambió la foto ni su encuadre para perseguir una cifra inestable.
- Algunas sesiones de Lighthouse local registraron error CORS al cargar una WOFF2 desde storage y marcaron Best Practices 96; otras repeticiones dieron 100. Una comprobación HTTP con `Origin` tanto del preview como de Vercel recibió `Access-Control-Allow-Origin: *`, así que el fallo fue intermitente y no se declara corregido/ausente en todos los navegadores.

## JavaScript inicial

Comparación de builds aislados de la revisión base y el candidato, sumando los módulos `script` y `modulepreload` que aparecen en el HTML inicial; gzip medido localmente a nivel 9:

| Build | JS inicial raw | JS inicial gzip | Todos los chunks JS gzip |
|---|---:|---:|---:|
| Base (`HEAD` previo al candidato) | 291.762 B | 91.136 B (89,0 KiB) | 96.896 B (94,6 KiB) |
| Candidato PRD v4 | 298.981 B | 93.525 B (91,3 KiB) | 99.446 B (97,1 KiB) |
| Diferencia | +7.219 B | +2.389 B (+2,6%) | +2.550 B |

El JavaScript inicial se mantiene **bajo el presupuesto PRD de 170 KiB gzip**. El detalle de chunks diferidos no se contabiliza como JS inicial.

## Decisión de publicación

**No hice push a `main` ni activé un nuevo deployment.** Inicio y Menú móvil quedan por debajo de 95, así que publicar ahora convertiría en release un candidato que no cumple el gate cuantitativo del PRD. El usuario puede revisar el candidato en el proyecto de WebDev; la producción no cambia.

La vía de continuación más directa es usar un origen de imagen con URL cacheable y sin redirección para las fotos LCP de Inicio y Menú (o corregir la respuesta de storage/CDN con acceso autorizado), mantener los mismos visuales y repetir Lighthouse en el mismo origen antes de publicar. No se modificó el proveedor externo ni se sustituyeron assets.

## Suposiciones y pendientes

1. «Recomendado» se asignó solo a Botana pa 2, que era la tarjeta que heredaba el antiguo badge promocional; no se inventó otro producto recomendado.
2. La comparación Lighthouse mezcla dominio de producción (antes) con preview local (candidato); se anota expresamente por la diferencia de red/host.
3. El objetivo de Performance móvil `≥95` continúa pendiente para Inicio y Menú; por eso no se publicaron los cambios.

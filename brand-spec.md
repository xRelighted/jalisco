# Dirección visual y activos de marca — Jalisco Mexican Grill

## Registro de diseño (PRD v2)

- **Artefacto:** web vitrina multipágina React/Vite para restaurante local, con rutas `/`, `/menu` y `/reservas`.
- **Audiencia:** personas que eligen platos, piden o reservan desde móvil primero; lectura rápida de precios, ingredientes/copy del plato, horarios y contacto.
- **Lenguaje visual:** carta editorial cálida, con fondos crema, jerarquía de serif Fraunces y sans Inter, motivos geométricos de rombos basados en el menú impreso, y fotografía de comida sin clichés.
- **Modo:** extensión/rediseño-preservación; conservar arquitectura, voz, catálogo, pedidos y reservas.
- **Diales:** variación 4/10 (un cambio contenido en la carta), movimiento 3/10 (solo microinteracción existente), densidad 6/10 (descripciones nuevas bajo nombre), dependencia de assets 7/10 (tres fotos por sección), fidelidad de marca 10/10.
- **Retener:** logo oficial actual, hero/historia aprobados, rutas, menús y precios, WhatsApp, PedidosYa, Instagram, galería de Home, mapas, navegación por categoría y pedido individual.
- **Mejorar:** primario rojo, paleta de rombos, descripción bajo cada plato, fotos referenciales por categoría y horarios tabulares con estado calculado.
- **Eliminar:** acento naranja como protagonista en botones/títulos, omisiones de fotos en la carta, e inferencias de horario dominical no publicado.
- **Riesgo/fallback:** si falla la fuente de alguna foto, no inventar su atribución ni falsificarla como real del restaurante; se reemplazará por una foto con procedencia verificable. Las fotos de carta son referenciales.

## Identidad y tokens

| Uso | Valor |
|---|---|
| Fondo oscuro | `#14100C` |
| Acento primario rojo | `#C1272D` |
| Verde | `#2E7D46` |
| Dorado | `#E3A73B` |
| Naranja secundario | `#D9631E` |
| Crema | `#F5EFE6` |
| Display | Fraunces |
| Cuerpo | Inter |
| Sistema de espaciado | Incrementos de 8 px cuando el layout existente lo permite |
| Radio | Pequeño; cards de menú esencialmente planas/editoriales |
| Movimiento | Transform/opacity breve; respetar `prefers-reduced-motion` |

Los acentos del menú rotan rojo, verde, dorado con un derivado de tinta oscura para mantener contraste sobre crema. El logo oficial no se redibuja ni sustituye.

## Activos

- **Logo:** `client/src/data/site.ts` (`brandLogo.webp` y fallback JPEG en storage), reutilizado por `SiteLayout.tsx`.
- **Fotos reales existentes:** `client/src/data/site.ts` (`photos`), usadas para Home, hero de `/menu`, galería e Instagram. Estas superficies quedan intactas.
- **Fotos referenciales por categoría:** 33 archivos WebP 4:3 optimizados externos a `client/public` y `client/src/assets`, en el almacenamiento gestionado de medios; mapa de presentación en `client/src/data/site.ts` y fuentes en `menu-photo-sources.md`.

## Límites de contenido

Descripciones, nombres y precios provienen del PRD adjunto. Las imágenes son fotografías de stock referenciales, no fotos verificadas de platos servidos por el restaurante. El indicador se calcula con la hora local del dispositivo respecto a los dos rangos horarios publicados; fuera de ellos se muestra «Cerrado ahora».

# Jalisco Mexican Grill — descripción del sitio

**Sitio:** [jaliscopy.vercel.app](https://jaliscopy.vercel.app/)  
**Restaurante:** Jalisco Mexican Grill, Lambaré, Paraguay  
**Repositorio:** [xRelighted/jalisco](https://github.com/xRelighted/jalisco)

## Concepto y objetivo

Es un sitio de restaurante mexicano diseñado para convertir visitas móviles en acciones directas: pedir comida, reservar una mesa o abrir las indicaciones al local. Presenta la personalidad de Jalisco como un lugar cálido y festivo, con una capa editorial más cuidada que la de un menú digital convencional. El contenido y las llamadas a la acción están en español paraguayo y usan voseo.

## Dirección visual

La identidad combina una base oscura y tonos de papel con la paleta vigente inspirada en el logo y el arte del menú impreso:

- **Carbón oscuro** `#14100c` para navegación, hero, fondos y pie de página.
- **Crema** `#f5efe6` y arena `#e8dfd1` para lectura, fichas y descansos visuales.
- **Rojo** `#c1272d` para acciones y puntos de énfasis; **verde** `#2e7d46`, **dorado** `#e3a73b` y **naranja** `#d9631e` completan la paleta.
- **Fraunces** aporta carácter a titulares y nombres destacados; **Inter** se usa para textos funcionales, precios y controles.

Las cenefas geométricas, el motivo de papel picado, las referencias a talavera y una textura sutil hacen reconocible el lenguaje mexicano sin cubrir ni dificultar la lectura. La fotografía funciona como acompañamiento y referencia visual; las imágenes de platos destacadas no deben interpretarse como una garantía de la presentación real servida por el restaurante.

## Páginas y contenido

### Inicio (`/`)

1. **Hero fotográfico** con nombre, propuesta breve —«Tacos, tequila y buena onda»— y estado actual de apertura.
2. Accesos directos a **WhatsApp**, al menú y a reservas, más disponibilidad por **PedidosYa**.
3. Selección editorial de cuatro platos recomendados por la casa, con descripción, precio e inicio de pedido por WhatsApp. La tarjeta de **Tacos de birria** muestra **Gs. 85.000**; las imágenes están identificadas como referenciales.
4. Historia breve del restaurante, estadísticas de la carta, galería fotográfica y enlaces a Instagram.
5. Dirección, horarios, un mapa real de Google Maps y pie de página con contactos.

### Menú (`/menu`)

La carta completa organiza **66 productos en 11 categorías**. Los platos muestran nombre, descripción y precio; cada uno puede convertirse en un pedido de WhatsApp con el producto precargado. Las secciones se agrupan editorialmente como comida y bebidas, y la página incluye fotografías referenciales, navegación interna y acciones finales para seguir comprando o contactar.

El precio de Tacos de birria se mantiene en **Gs. 85.000** tanto en la carta como en la selección destacada de Inicio.

### Reservas (`/reservas`)

Explica la reserva en un bloque hero, ofrece el enlace al sistema de reservas del negocio y una alternativa por WhatsApp. Muestra el estado de apertura una sola vez en la tarjeta horaria del hero; más abajo conserva el horario, la dirección, el mapa real de Google Maps y el acceso a indicaciones.

## Horarios y estado de apertura

Los horarios que se muestran en Inicio, Reservas y el pie son:

- **Lunes a jueves:** 17:30–00:00.
- **Viernes y sábados:** 17:30–01:00.
- **Domingo:** no se publica como día de atención.

El indicador «Abierto ahora / Cerrado ahora» aparece una sola vez por vista: en la tarjeta horaria del hero de Inicio y de Reservas. Calcula la hora local del negocio y contempla el cierre que atraviesa la medianoche: por ejemplo, el servicio del sábado puede seguir abierto hasta la 01:00 del domingo, sin presentar el domingo como un turno independiente. Paraguay mantiene oficialmente UTC−3 todo el año desde octubre de 2024 (Ley N.º 7.354/2024; [Agencia IP Paraguay](https://www.ip.gov.py/ip/2024/10/15/paraguay-establece-el-horario-de-verano-durante-todo-el-ano/)); el código usa ese offset fijo para evitar errores en runtimes con una base de zonas horarias antigua.

## Conversión e interacción

- Barra fija en móvil con **Pedir**, **Reservar** y **Cómo llegar**, respetando el área segura inferior del dispositivo.
- Enlaces de pedido de WhatsApp con el texto o producto correspondiente precargado.
- Enlaces externos a reservas, PedidosYa, Instagram y Google Maps.
- Navegación móvil compacta y navegación de escritorio persistente.
- Menú de página completa con anclas a categorías y un flujo directo de selección a pedido.

## Diseño adaptable y accesibilidad

El sitio se construye mobile-first. Se revisaron Inicio, Menú y Reservas en **375, 768 y 1440 px**; las pruebas automatizadas confirman ausencia de overflow horizontal, disponibilidad de la barra móvil y ausencia de superposición entre el mapa y la ficha de ubicación. El CTA de reservas se ajustó para mejorar el contraste sobre rojo.

También incluye enlace para saltar al contenido, encabezados y regiones semánticas, etiquetas para controles e iconos, indicadores de foco, dimensiones explícitas para imágenes, precarga de recursos prioritarios y soporte para `prefers-reduced-motion`. Las animaciones de entrada y aparición se implementan con CSS y `IntersectionObserver`, sin incluir Framer Motion en el JavaScript de producción.

## Tecnologías

- **React 19** y **TypeScript** para interfaz y lógica de negocio.
- **Vite 7** para desarrollo y empaquetado estático.
- **Tailwind CSS 4**, junto con una capa de CSS de marca para dirección visual y componentes responsivos.
- **React Router 7** para Inicio, Menú, Reservas y rutas no encontradas.
- **Lucide React** para iconografía.
- **AVIF/WebP** responsivos para fotografías; archivos servidos desde el almacenamiento/CDN del proyecto.
- **Fuentes WOFF2 autoalojadas y subseteadas** para Fraunces e Inter.
- **Vercel** para servir el frontend estático y resolver rutas SPA.

El comando de build establece `NODE_ENV=production` para que Vite genere el bundle de release con React DOM de producción. El mapa embebido de la ubicación usa carga diferida nativa (`loading="lazy"`) y apunta a la dirección real del restaurante.

## SEO y descubrimiento

El proyecto contiene metadatos por ruta, canonical y tarjetas Open Graph, además de la estructura de datos de restaurante y menú, sitemap y robots. Se preservan las rutas directas `/`, `/menu` y `/reservas` mediante las reglas SPA de Vercel.

## Verificación de este release

- `npm run check`: **correcto**.
- `npm run build` en modo de producción: **correcto**.
- `/`, `/menu` y `/reservas`: **HTTP 200** en preview.
- Matriz automatizada de 9 combinaciones de rutas y anchos 375/768/1440: sin errores de consola, overflow ni solapamientos; CTA móvil visible en 375 px.
- Imágenes de las 11 categorías del menú: **33 cargadas**, sin fallas.
- Horarios: **11 casos frontera** verificados, incluidos cierres de medianoche y domingo después del turno del sábado.
- Catálogo: **66 productos / 11 categorías**; Tacos de birria verificado en **Gs. 85.000**.
- Lighthouse móvil de la build de preview: una corrida final registró **Performance 72, Accessibility 100, Best Practices 100 y SEO 100**. Corridas cercanas fluctuaron; el objetivo de Performance 95 **no queda certificado** por esta medición. La auditoría atribuye una parte relevante del retraso del LCP a la respuesta de los recursos servidos por el proxy/CDN de imágenes; desde el entorno de prueba se observaron TTFB de aproximadamente 2,4–4,2 s en recursos de storage. La configuración del proyecto no controla ese tiempo externo, así que el resultado puede variar por ubicación y estado de la red.

# Jalisco Mexican Grill

Sitio web de conversión para el restaurante mexicano Jalisco Mexican Grill, en Paseo Deltoto, Lambaré, Paraguay. Está organizado alrededor de tres tareas: conocer el restaurante, elegir qué pedir y reservar o llegar al local.

## Stack

React 19, Vite, TypeScript, Tailwind CSS 4, React Router y Lucide React. Las animaciones visibles se resuelven con CSS e `IntersectionObserver`; no se incluye Framer Motion en el bundle del sitio.

## Identidad visual

La paleta documentada coincide con la marca actual: rojo `#C1272D`, verde `#2E7D46`, dorado `#E3A73B` y naranja secundario `#D9631E`, sobre negro cálido `#14100C` y crema `#F5EFE6`. La tipografía es Fraunces para títulos e Inter para texto funcional.

## Experiencia del sitio

- **Inicio (`/`)**: hero fotográfico con accesos a pedidos y reservas, platos destacados con precios publicados, horarios y estado de apertura, historia breve, galería fotográfica, ubicación y mapa de Google Maps diferido.
- **Menú (`/menu`)**: catálogo completo con 66 opciones agrupadas en 11 categorías, imágenes AVIF/WebP responsivas, precios en guaraníes y enlaces que precargan el plato en el pedido.
- **Reservas (`/reservas`)**: información para reservar, horarios, dirección y mapa integrado con enlace de navegación separado.
- **Rutas no encontradas**: página 404 con accesos claros al menú y a reservas; se prerenderiza y se excluye de indexación.
- **Conversión móvil**: barra inferior contextual con accesos de pedido/reserva; se respeta el espacio inferior para no ocultar contenido.

La carta se mantiene en una única fuente de datos (`client/src/data/menu.ts`); horarios, dirección, enlaces y metadatos se comparten desde sus módulos de datos. Los horarios usan `America/Asuncion` y UTC−3 legal. Los precios reflejan la información publicada y no se presentan estimaciones como hechos.

## Renderizado, SEO y rendimiento

El cliente usa React Router; el build de Vite también genera HTML prerenderizado para Inicio, Menú, Reservas y 404. El prerender instala canonical y metadatos sociales por ruta, y carga primero el recurso visual principal. Se sirven imágenes optimizadas desde Manus Storage, con `srcset`, AVIF/WebP, dimensiones declaradas y carga diferida fuera del primer plano. Google Maps se crea al acercarse a su sección. Vercel publica `dist/public`, enruta `/menu` y `/reservas` a sus HTML estáticos y usa `404.html` como página de error.

## Criterio anti-slop

Antes de sumar badges, copy, animaciones o elementos decorativos, comprobar que expresen un dato real verificable o ayuden al cliente a pedir, reservar o llegar. No publicar afirmaciones de popularidad sin datos de ventas ni añadir decoración sin función; preferir una curaduría editorial identificada como tal.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build y previsualización

```bash
npm run build
npm run preview
```

La verificación recomendada antes del release es `npm run check`, `npm run test:hours`, `npm run build` y `npm run test:responsive`. Vercel utiliza el preset Vite y publica `dist/public`.

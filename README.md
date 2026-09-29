# Jalisco Mexican Grill

Sitio para Jalisco Mexican Grill, restaurante/s Paraguay.

## Stack

React 19, Vite, TypeScript, Tailwind CSS 4, React Router y Lucide React. Las animaciones visibles se resuelven con CSS e `IntersectionObserver`; no se incluye Framer Motion en el bundle del sitio.

## Identidad visual

La paleta documentada coincide con la marca actual: rojo `#C1272D`, verde `#2E7D46`, dorado `#E3A73B` y naranja secundario `#D9631E`, sobre negro cálido `#14100C` y crema `#F5EFE6`. La tipografía es Fraunces para títulos e Inter para texto funcional.

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

Vercel utiliza el preset Vite, publica `dist/public` y reescribe las rutas de la aplicación a `index.html` para que las páginas carguen directamente y funcionen al refrescar.

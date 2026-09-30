import { menu } from "@/data/menu";

const featuredRecords = [
  {
    name: "Botana pa 2",
    editorialBadge: "Recomendado",
    alt: "Botana mexicana para compartir, con totopos, salsas, quesadillas y acompañamientos. Foto referencial.",
    imageKey: "botana",
    focalPoint: "50% 50%",
    sourcePage: "https://www.pexels.com/photo/top-view-of-mexican-food-6400016/",
    photographer: "Alleksana",
    imageNote: "Bandeja variada mexicana. La toma incluye totopos, quesadillas/acompañamientos y salsas; no se distingue con certeza guacamole.",
  },
  {
    name: "Fajitas de res",
    editorialBadge: null,
    alt: "Fajitas mexicanas con carne a la parrilla, verduras, tortillas y salsas. Foto referencial.",
    imageKey: "fajitas",
    focalPoint: "50% 50%",
    sourcePage: "https://www.pexels.com/photo/mexican-cuisine-fajitas-with-tortillas-and-sauces-32375350/",
    photographer: "DΛVΞ GΛRCIΛ",
    imageNote: "La ficha describe carne a la parrilla, verduras, tortillas y salsas; no especifica que sea res. Es la referencia más cercana localizada, no una foto del plato de Jalisco.",
  },
  {
    name: "Nachos Jalisco",
    editorialBadge: null,
    alt: "Nachos con queso fundido, jalapeños y tomate en cubos; fotografía referencial.",
    imageKey: "nachos",
    focalPoint: "50% 50%",
    sourcePage: "https://www.pexels.com/photo/plate-of-loaded-nachos-with-cheese-and-jalapenos-35628197/",
    photographer: "Cesar O'Neill",
    imageNote: "La ficha confirma queso, jalapeños y tomate, pero no carne. La imagen es aproximada y no garantiza la receta exacta de Nachos Jalisco.",
  },
  {
    name: "Tacos de birria",
    editorialBadge: null,
    alt: "Tacos de birria acompañados de consomé y rábanos frescos; foto referencial.",
    imageKey: "birria",
    focalPoint: "50% 66%",
    sourcePage: "https://www.pexels.com/photo/authentic-birria-tacos-with-consomme-31632714/",
    photographer: "Lucia Photography in Progress Cano",
    imageNote: "Ficha Pexels: tacos de birria servidos con consomé y rábanos. Foto vertical adaptada al recorte 4:3 con foco hacia el plato.",
  },
] as const;

export const featuredDishes = featuredRecords.map((record) => {
  const item = menu.flatMap((group) => group.items).find((dish) => dish.nombre === record.name);
  if (!item) throw new Error(`No se encontró en el catálogo: ${record.name}`);
  return { ...record, ...item };
});

export type FeaturedDish = (typeof featuredDishes)[number];

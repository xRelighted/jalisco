import { menu } from "@/data/menu";

export const siteUrl = "https://jaliscopy.vercel.app";
const imageStorageSiteUrl = "https://jalisco-gril-2tnpava5.manus.space";
const storage = `${import.meta.env.DEV ? "" : imageStorageSiteUrl}/manus-storage/`;
export const pedidosYaIcon = `${storage}pedidosya-icon_d3498a7f.png`;
export const business = {
  name: "Jalisco Mexican Grill",
  address: "Porvenir e/ Luis María Argaña, Lambaré, Paraguay",
  hours: ["Lunes a Jueves: 17:30 a 00:00", "Viernes y Sábados: 17:30 a 01:00"],
  instagram: "https://www.instagram.com/jaliscopy/",
  pedidosYa: "https://www.pedidosya.com.py/restaurantes/lambare/jalisco-py-menu",
  whatsapp: "https://api.whatsapp.com/send/?phone=595972237682&text=Hola+Jalisco!!+quisiera+hacer+un+pedido+",
  reservations: "https://fiweex.com/reservas_portal_bienvenida/ZoV1hA%3D%3D",
  directions: "https://www.google.com/maps/search/?api=1&query=-25.334968%2C-57.624854",
  mapEmbed: "https://www.google.com/maps?q=-25.334968,-57.624854&output=embed",
} as const;
export const copy = {
  eyebrow: "Cocina Mexicana — Lambaré, Paraguay",
  heroTitle: "Jalisco Mexican Grill",
  heroSubtitle: "El mero mero sabor ranchero, a un mensaje de distancia.",
  heroSupport: "Tacos, tequila y buena onda en Lambaré. Todos los días desde las 17:30.",
  storyTitle: "Nuestra historia",
  story: "Jalisco nació con una idea simple: traer el sabor ranchero de México a Lambaré, sin perder la esencia ni la calidad. Detrás de la barra y en cada plato hay recetas que respetan la tradición mexicana, pero con la calidez de siempre atendernos como en casa. Nuestro mural —esa calavera con sombrero que ya es parte de la identidad de Jalisco— resume bien lo que somos: color, sabor y una noche que se disfruta de principio a fin.",
  galleryTitle: "Así se vive Jalisco",
  gallery: "Buena mesa, buena compañía y el mural que ya es parte de la casa.",
  instagramTitle: "Seguinos en Instagram",
  instagram: "Mirá lo último de Jalisco en @jaliscopy.",
  locationTitle: "¿Dónde estamos?",
  menuTitle: "Nuestro menú",
  reservationsTitle: "Reservá tu mesa",
  reservations: "Si venís en grupo o querés asegurar mesa, reservá en un par de clics.",
  reservationAlternative: "¿Preferís coordinar por WhatsApp?",
  footer: "Jalisco Mexican Grill — Porvenir e/ Luis María Argaña, Lambaré",
} as const;

export type ResponsivePhoto = {
  name: string;
  alt: string;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  webp: string;
  webpSet: string;
  social: string;
};
function photo(name: string, alt: string, width: number, height: number, has1200 = false): ResponsivePhoto {
  const sizes = has1200 ? [360, 720, 1200] : [360, 720];
  const webpSet = sizes.map((size) => `${storage}${name}-${size}_${assetIds[name][`webp${size}`]}.webp ${size}w`).join(", ");
  const srcSet = sizes.map((size) => `${storage}${name}-${size}_${assetIds[name][`jpg${size}`]}.jpg ${size}w`).join(", ");
  const largest = has1200 ? 1200 : 720;
  return {
    name, alt, width, height,
    src: `${storage}${name}-${largest}_${assetIds[name][`jpg${largest}`]}.jpg`,
    srcSet, webp: `${storage}${name}-${largest}_${assetIds[name][`webp${largest}`]}.webp`, webpSet,
    social: `${storage}${name}-${largest}_${assetIds[name][`webp${largest}`]}.webp`,
  };
}
const assetIds: Record<string, Record<string, string>> = {
  fachada: { webp360: "ffe90cd4", webp720: "c9065da7", jpg360: "aa825ef5", jpg720: "c5878552" },
  taquiza: { webp360: "23957914", webp720: "898945ab", jpg360: "5a66fe00", jpg720: "35412974" },
  salon: { webp360: "fedbc47a", webp720: "33c1f3ee", jpg360: "d508f6f4", jpg720: "6efd1a52" },
  cantarito: { webp360: "dc06d156", webp720: "72a1e12e", jpg360: "f5e8cb4e", jpg720: "d20d1c80" },
  patio: { webp360: "7ffcecf7", webp720: "cee18826", webp1200: "d526b62a", jpg360: "9247895b", jpg720: "616f9236", jpg1200: "4b114f0e" },
};
export const brandLogo = {
  webp: `${storage}jalisco-logo_2c00af02.webp`,
  fallback: `${storage}jalisco-logo-fallback_dd577cf6.jpg`,
};
export const photos = [
  photo("fachada", "Fachada de Jalisco Mexican Grill con mural de calavera y sombrero.", 748, 420),
  photo("taquiza", "Taquiza servida en la mesa.", 720, 355),
  photo("salon", "Salón de Jalisco Mexican Grill.", 950, 500),
  photo("cantarito", "Cantarito con cítricos.", 940, 430),
  photo("patio", "Patio exterior de Jalisco Mexican Grill.", 1200, 1200, true),
] as const;
const nachosMenuPhoto: ResponsivePhoto = {
  name: "nachos",
  alt: "Nachos y totopos de Jalisco servidos con salsas y guacamole.",
  width: 720,
  height: 565,
  src: `${storage}nachos-720_a3a7ecd6.jpg`,
  srcSet: `${storage}nachos-360_c94ebd00.jpg 360w, ${storage}nachos-720_a3a7ecd6.jpg 720w`,
  webp: `${storage}nachos-720_9d257602.webp`,
  webpSet: `${storage}nachos-360_3f848bc5.webp 360w, ${storage}nachos-720_9d257602.webp 720w`,
  social: `${storage}nachos-720_9d257602.webp`,
};
export const menuCategoryPhotos: Record<string, ResponsivePhoto> = {
  "Los combos más chingones": nachosMenuPhoto,
  "Tacos (incluye 4 tacos y 2 salsas)": photos[1],
  "Pa beber - Los chingones": photos[3],
};
export const storyStats = [
  { value: "66 platos", label: "en el menú" },
  { value: "11 categorías", label: "para elegir" },
  { value: "57.9K seguidores", label: "en Instagram" },
] as const;
export const menuItems = menu.flatMap((category) => category.items);
export const menuFacts = `${menuItems.length} platos · ${menu.length} categorías · Precios en guaraníes`;
export const formatPrice = (price: number) => `${new Intl.NumberFormat("es-PY").format(price)} Gs`;
export const orderLink = (name?: string) => name ? `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent(`Hola Jalisco!! Quisiera pedir ${name}.`)}` : business.whatsapp;
export const individualOrderLink = (name: string) => `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent(`Hola Jalisco!! quisiera pedir: ${name}`)}`;
export const featuredMenu = [
  ["Los combos más chingones", "Botana pa 2"],
  ["Los combos más chingones", "Fajitas de res"],
  ["Pa picar", "Nachos Jalisco"],
  ["Tacos (incluye 4 tacos y 2 salsas)", "Tacos de birria"],
].map(([categoria, nombre]) => {
  const item = menu.find((group) => group.categoria === categoria)?.items.find((dish) => dish.nombre === nombre);
  if (!item) throw new Error(`No se encontró: ${nombre}`);
  return { categoria, ...item };
});
export const routeMetadata = {
  "/": { title: business.name, description: copy.heroSupport, image: photos[4].social },
  "/menu": { title: `${copy.menuTitle} | ${business.name}`, description: menuFacts, image: photos[1].social },
  "/reservas": { title: `${copy.reservationsTitle} | ${business.name}`, description: `${business.address} · ${business.hours.join(" · ")}`, image: photos[4].social },
} as const;
export const metadataForPath = (path: string) => routeMetadata[path as keyof typeof routeMetadata] ?? routeMetadata["/"];
export const canonicalForPath = (path: string) => `${siteUrl}${path}`;
export const whatsappReservation = `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent("Hola Jalisco, quisiera coordinar una reserva.")}`;
export const instagramHandle = "@jaliscopy";
export const mapTitle = "Mapa de Jalisco Mexican Grill en Lambaré, Paraguay";
export const menuAccents = ["terracotta", "mustard", "turquoise"] as const;
export const menuIcons = ["UsersRound", "Popcorn", "Sandwich", "UtensilsCrossed", "CookingPot", "Wine", "Snowflake", "Citrus", "GlassWater", "Beer", "CupSoda"] as const;
export const safeExternalLink = { target: "_blank", rel: "noopener noreferrer" } as const;
export const sectionIds = { history: "historia", menu: "menu-preview", gallery: "galeria", instagram: "instagram", location: "ubicacion" } as const;
export const isCompleteMenu = menu.length === 11 && menuItems.length === 66;
export const allPhotosHaveAlt = photos.every(({ alt }) => Boolean(alt));

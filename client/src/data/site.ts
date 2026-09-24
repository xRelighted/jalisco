import { menu } from "@/data/menu";

export const business = {
  name: "Jalisco Mexican Grill",
  address: "Porvenir e/ Luis María Argaña, Lambaré, Paraguay",
  hours: ["Lunes a Jueves: 17:30 a 00:00", "Viernes y Sábados: 17:30 a 01:00"],
  instagram: "https://www.instagram.com/jaliscopy/",
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
export const photos = [
  { src: "/manus-storage/jalisco-fachada_6558f018.webp", alt: "Fachada de Jalisco Mexican Grill con mural de calavera y sombrero." },
  { src: "/manus-storage/jalisco-taquiza_99cfc373.webp", alt: "Taquiza servida en la mesa." },
  { src: "/manus-storage/jalisco-salon_c571381c.webp", alt: "Salón de Jalisco Mexican Grill." },
  { src: "/manus-storage/jalisco-cantarito_8b15f1d1.webp", alt: "Cantarito con cítricos." },
  { src: "/manus-storage/jalisco-patio_a28a729f.webp", alt: "Patio exterior de Jalisco Mexican Grill." },
] as const;
export const menuItems = menu.flatMap((category) => category.items);
export const menuFacts = `${menuItems.length} platos · ${menu.length} categorías · Precios en guaraníes`;
export const formatPrice = (price: number) => `${new Intl.NumberFormat("es-PY").format(price)} Gs`;
export const orderLink = (name?: string) => name ? `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent(`Hola Jalisco!! Quisiera pedir ${name}.`)}` : business.whatsapp;
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
  "/": { title: business.name, description: copy.heroSupport, image: photos[4].src },
  "/menu": { title: `${copy.menuTitle} | ${business.name}`, description: menuFacts, image: photos[1].src },
  "/reservas": { title: `${copy.reservationsTitle} | ${business.name}`, description: `${business.address} · ${business.hours.join(" · ")}`, image: photos[4].src },
} as const;
export const metadataForPath = (path: string) => routeMetadata[path as keyof typeof routeMetadata] ?? routeMetadata["/"];
export const siteUrl = "https://jalisco-gril-2tnpava5.manus.space";
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

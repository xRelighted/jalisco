import { menu } from "@/data/menu";

export const siteUrl = "https://jaliscopy.vercel.app";
const imageStorageSiteUrl = "https://jalisco-gril-2tnpava5.manus.space";
const storage = `${import.meta.env.DEV ? "" : imageStorageSiteUrl}/manus-storage/`;
export const pedidosYaIcon = `${storage}pedidosya-icon_d3498a7f.png`;
export const locations = [
  {
    id: "lambare",
    name: "Jalisco Mexican Grill — Lambaré",
    address: "Porvenir e/ Luis María Argaña, Lambaré, Paraguay",
    hours: ["Lunes a Jueves: 17:30 a 00:00", "Viernes y Sábados: 17:30 a 01:00"],
    directions: "https://www.google.com/maps/search/?api=1&query=-25.334968%2C-57.624854",
    mapEmbed: "https://www.google.com/maps?q=-25.334968,-57.624854&output=embed",
  },
] as const;
export const business = {
  name: "Jalisco Mexican Grill",
  instagram: "https://www.instagram.com/jaliscopy/",
  pedidosYa: "https://www.pedidosya.com.py/restaurantes/lambare/jalisco-py-menu",
  whatsapp: "https://api.whatsapp.com/send/?phone=595972237682&text=Hola+Jalisco!!+quisiera+hacer+un+pedido+",
  reservations: "https://fiweex.com/reservas_portal_bienvenida/ZoV1hA%3D%3D",
} as const;
export const copy = {
  eyebrow: "Cocina Mexicana",
  heroTitle: "Jalisco Mexican Grill",
  heroSubtitle: "El mero mero sabor ranchero, a un mensaje de distancia.",
  heroSupport: "Tacos, tequila y buena onda. Todos los días desde las 17:30.",
  storyTitle: "Nuestra historia",
  story: "Jalisco nació con una idea simple: traer el sabor ranchero de México a nuestra mesa, sin perder la esencia ni la calidad. Detrás de la barra y en cada plato hay recetas que respetan la tradición mexicana, pero con la calidez de siempre atendernos como en casa. Nuestro mural —esa calavera con sombrero que ya es parte de la identidad de Jalisco— resume bien lo que somos: color, sabor y una noche que se disfruta de principio a fin.",
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
export const storyStats = [
  { value: "66 platos", label: "en el menú" },
  { value: "11 categorías", label: "para elegir" },
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
  "/reservas": { title: `${copy.reservationsTitle} | ${business.name}`, description: locations.map((location) => `${location.address} · ${location.hours.join(" · ")}`).join(" | "), image: photos[4].social },
} as const;
export const metadataForPath = (path: string) => routeMetadata[path as keyof typeof routeMetadata] ?? routeMetadata["/"];
export const canonicalForPath = (path: string) => `${siteUrl}${path}`;
export const whatsappReservation = `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent("Hola Jalisco, quisiera coordinar una reserva.")}`;
export const instagramHandle = "@jaliscopy";
export const menuAccents = ["red", "green", "gold"] as const;
export const menuIcons = ["UsersRound", "Popcorn", "Sandwich", "UtensilsCrossed", "CookingPot", "Wine", "Snowflake", "Citrus", "GlassWater", "Beer", "CupSoda"] as const;
export const safeExternalLink = { target: "_blank", rel: "noopener noreferrer" } as const;
export const sectionIds = { history: "historia", menu: "menu-preview", gallery: "galeria", instagram: "instagram", location: "ubicacion" } as const;
export const isCompleteMenu = menu.length === 11 && menuItems.length === 66;
export const allPhotosHaveAlt = photos.every(({ alt }) => Boolean(alt));

export type MenuCategoryPhoto = { src: string; alt: string };
const menuPhotoStorage = `${imageStorageSiteUrl}/manus-storage/`;
export const menuCategoryPhotos: MenuCategoryPhoto[][] = [
  [
    { src: `${menuPhotoStorage}menu-01-1_6aef6541.webp`, alt: "Bandeja de cocina mexicana con tortillas y acompañamientos; foto de referencia." },
    { src: `${menuPhotoStorage}menu-01-2_567a8627.webp`, alt: "Plato de comida mexicana con varios ingredientes para compartir; foto de referencia." },
    { src: `${menuPhotoStorage}menu-01-3_368d488e.webp`, alt: "Totopos con queso y jalapeños en un plato; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-02-1_d195c0e7.webp`, alt: "Papas fritas con queso fundido; foto de referencia." },
    { src: `${menuPhotoStorage}menu-02-2_b173a6df.webp`, alt: "Nachos con jalapeños y queso; foto de referencia." },
    { src: `${menuPhotoStorage}menu-02-3_59f018f7.webp`, alt: "Alitas de pollo y papas fritas; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-03-1_e1e8b116.webp`, alt: "Burrito de estilo mexicano con relleno visible; foto de referencia." },
    { src: `${menuPhotoStorage}menu-03-2_b8a9f6f7.webp`, alt: "Burrito de estilo mexicano sostenido en una mano, con el relleno asomando; foto de referencia." },
    { src: `${menuPhotoStorage}menu-03-3_371739af.webp`, alt: "Burrito mexicano servido con guarnición; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-04-1_cb3e2ecb.webp`, alt: "Tacos mexicanos con cebolla y lima; foto de referencia." },
    { src: `${menuPhotoStorage}menu-04-2_41c8c37f.webp`, alt: "Variedad de tacos mexicanos servidos en un plato; foto de referencia." },
    { src: `${menuPhotoStorage}menu-04-3_a562c7fe.webp`, alt: "Tacos de birria acompañados de consomé; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-05-1_7476af52.webp`, alt: "Quesadillas doradas con salsa; foto de referencia." },
    { src: `${menuPhotoStorage}menu-05-2_822feea4.webp`, alt: "Quesadilla rellena de queso fundido; foto de referencia." },
    { src: `${menuPhotoStorage}menu-05-3_4e5f02b1.webp`, alt: "Quesadilla de cocina mexicana con lima; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-06-1_7b2ab5f0.webp`, alt: "Copa de margarita con lima; foto de referencia." },
    { src: `${menuPhotoStorage}menu-06-2_7b03ea1d.webp`, alt: "Michelada con hielo y borde salado; foto de referencia." },
    { src: `${menuPhotoStorage}menu-06-3_9d1741ec.webp`, alt: "Shot de tequila con lima y sal; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-07-1_6261fec7.webp`, alt: "Daiquiri de fresa en una copa; foto de referencia." },
    { src: `${menuPhotoStorage}menu-07-2_6977dfba.webp`, alt: "Piña colada con guarnición de piña; foto de referencia." },
    { src: `${menuPhotoStorage}menu-07-3_8fd46496.webp`, alt: "Cóctel frutal de durazno; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-08-1_1cdbfc51.webp`, alt: "Caipiriña con lima y hielo; foto de referencia." },
    { src: `${menuPhotoStorage}menu-08-2_2b4488af.webp`, alt: "Cóctel caipiriña con guarnición fresca; foto de referencia." },
    { src: `${menuPhotoStorage}menu-08-3_8627c364.webp`, alt: "Preparación de cóctel cítrico con fruta machacada; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-09-1_07bcc510.webp`, alt: "Jarra de sangría frutal servida para compartir; foto de referencia." },
    { src: `${menuPhotoStorage}menu-09-2_911fdc0a.webp`, alt: "Jarra de bebida frutal con cerezas; foto de referencia." },
    { src: `${menuPhotoStorage}menu-09-3_d6b017e9.webp`, alt: "Jarra de bebida frutal con hielo y cítricos; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-10-1_8f40d93b.webp`, alt: "Botellas de cerveza frías en una mesa; foto de referencia." },
    { src: `${menuPhotoStorage}menu-10-2_45d07e99.webp`, alt: "Vaso de cerveza fría con espuma; foto de referencia." },
    { src: `${menuPhotoStorage}menu-10-3_285e91f1.webp`, alt: "Vasos de cerveza servidos en una mesa; foto de referencia." },
  ],
  [
    { src: `${menuPhotoStorage}menu-11-1_f2e9bc0e.webp`, alt: "Mojito con hojas de menta y hielo; foto de referencia." },
    { src: `${menuPhotoStorage}menu-11-2_8f581b46.webp`, alt: "Gin tonic con guarnición de cítricos; foto de referencia." },
    { src: `${menuPhotoStorage}menu-11-3_03266f27.webp`, alt: "Vaso de Fernet con cola y hielo; foto de referencia." },
  ],
];

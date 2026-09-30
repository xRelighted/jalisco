import { menu } from "@/data/menu";
import { openingHours } from "@/data/hours";
import { photoAvifSets } from "@/data/media";

export const siteUrl = "https://jaliscopy.vercel.app";
const imageStorageSiteUrl = "https://jalisco-gril-2tnpava5.manus.space";
const storage = `${import.meta.env.DEV ? "" : imageStorageSiteUrl}/manus-storage/`;
export const pedidosYaIcon = `${storage}pedidosya-icon_d3498a7f.png`;
export const landmark = "Paseo Deltoto";
export const streetLine = "Porvenir e/ Luis María Argaña";
export const city = "Lambaré, Paraguay";
export const fullAddress = `${landmark} · ${streetLine}, ${city}`;
export const ogImage = `${imageStorageSiteUrl}/manus-storage/og-jalisco_bbbedb45.jpg`;
export const ogImageAlt = "Jalisco Mexican Grill en Paseo Deltoto, Lambaré";
export const locations = [
  {
    id: "lambare",
    name: `${landmark} · Lambaré`,
    address: fullAddress,
    hours: openingHours.map((period) => `${period.label}: ${period.opens} a ${period.closes}`),
    directions: "https://www.google.com/maps/search/?api=1&query=Jalisco+Mexican+Grill+Paseo+Deltoto+Lambar%C3%A9",
    mapEmbed: "https://www.google.com/maps?q=Jalisco%20Mexican%20Grill%20Paseo%20Deltoto%20Lambar%C3%A9&output=embed",
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
  heroSubtitle: "Tacos, tequila y buena onda.",
  storyTitle: "Nuestra historia",
  story: "Jalisco nació con una idea simple: traer el sabor ranchero de México a nuestra mesa, sin perder la esencia ni la calidad. Detrás de la barra y en cada plato hay recetas que respetan la tradición mexicana, pero con la calidez de siempre atendernos como en casa. Nuestro mural —esa calavera con sombrero que ya es parte de la identidad de Jalisco— resume bien lo que somos: color, sabor y una noche que se disfruta de principio a fin.",
  galleryTitle: "¡Así se vive Jalisco!",
  gallery: "Buena mesa, buena compañía y el mural que ya es parte de la casa.",
  instagramTitle: "Seguinos en Instagram",
  instagram: "Mirá lo último de Jalisco en @jaliscopy.",
  locationTitle: "¿Dónde estamos?",
  menuTitle: "Nuestro menú",
  reservationsTitle: "Reservá tu mesa",
  reservations: "Si venís en grupo o querés asegurar mesa, reservá en un par de clics.",
  footer: fullAddress,
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
  avifSet: string;
};
function photo(name: string, alt: string, width: number, height: number, has1200 = false): ResponsivePhoto {
  const sizes = has1200 ? [360, 720, 1200] : [360, 720];
  const webpSet = sizes.map((size) => `${storage}${name}-${size}_${assetIds[name][`webp${size}`]}.webp ${size}w`).join(", ");
  const srcSet = sizes.map((size) => `${storage}${name}-${size}_${assetIds[name][`jpg${size}`]}.jpg ${size}w`).join(", ");
  const largest = has1200 ? 1200 : 720;
  return { name, alt, width, height, src: `${storage}${name}-${largest}_${assetIds[name][`jpg${largest}`]}.jpg`, srcSet, webp: `${storage}${name}-${largest}_${assetIds[name][`webp${largest}`]}.webp`, webpSet, avifSet: sizes.map((size) => `${photoAvifSets[`${name}-${size}`]} ${size}w`).join(", "), social: `${storage}${name}-${largest}_${assetIds[name][`webp${largest}`]}.webp` };
}
const assetIds: Record<string, Record<string, string>> = {
  fachada: { webp360: "ffe90cd4", webp720: "c9065da7", jpg360: "aa825ef5", jpg720: "c5878552" },
  taquiza: { webp360: "23957914", webp720: "898945ab", jpg360: "5a66fe00", jpg720: "35412974" },
  salon: { webp360: "fedbc47a", webp720: "33c1f3ee", jpg360: "d508f6f4", jpg720: "6efd1a52" },
  cantarito: { webp360: "dc06d156", webp720: "72a1e12e", jpg360: "f5e8cb4e", jpg720: "d20d1c80" },
  patio: { webp360: "7ffcecf7", webp720: "cee18826", webp1200: "d526b62a", jpg360: "9247895b", jpg720: "616f9236", jpg1200: "4b114f0e" },
};
export const brandLogo = { webp: `${storage}jalisco-logo_2c00af02.webp`, fallback: `${storage}jalisco-logo-fallback_dd577cf6.jpg` };
export const photos = [
  photo("fachada", "Fachada de Jalisco Mexican Grill con el mural y la entrada", 748, 420),
  photo("taquiza", "Tabla de taquiza con tacos, quesadillas y queso fundido sobre mantel bordado", 720, 355),
  photo("salon", "Salón de Jalisco lleno de gente con música en vivo y sombreros de colores", 950, 500),
  photo("cantarito", "Cantarito con borde de sal, limón y pomelo", 940, 430),
  photo("patio", "Patio de ladrillo con mesas y sillas rojas", 1200, 1200, true),
] as const;
export const menuItems = menu.flatMap((category) => category.items);
export const menuFacts = `${menuItems.length} platos · ${menu.length} categorías · Precios en guaraníes`;
export const formatPrice = (price: number) => `${new Intl.NumberFormat("es-PY").format(price)}\u00a0Gs`;
export const individualOrderLink = (name: string) => `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent(`Hola Jalisco! Quiero pedir: ${name}`)}`;
export const routeMetadata = {
  "/": { title: `${business.name} | ${landmark}, Lambaré`, description: `${business.name} en ${landmark}, Lambaré. ${copy.heroSubtitle} Lun–Jue 17:30–00:00, Vie–Sáb 17:30–01:00.`, image: ogImage },
  "/menu": { title: `${copy.menuTitle} | ${business.name} · ${landmark}`, description: `${menuFacts} en ${landmark}, Lambaré, Paraguay. Consultá la carta completa con precios en guaraníes.`, image: ogImage },
  "/reservas": { title: `${copy.reservationsTitle} | ${business.name} · ${landmark}`, description: `Reservá tu mesa en ${business.name}, ${landmark}, Lambaré. Lun–Jue 17:30–00:00, Vie–Sáb 17:30–01:00.`, image: ogImage },
  "/404": { title: `No encontramos esa página | ${business.name}`, description: `La página que buscás no está disponible. Volvé al menú o reservá en ${landmark}, Lambaré.`, image: ogImage },
} as const;
export const metadataForPath = (path: string) => routeMetadata[path as keyof typeof routeMetadata] ?? routeMetadata["/404"];
export const whatsappReservation = `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent("Hola Jalisco, quisiera coordinar una reserva.")}`;
export const instagramHandle = "@jaliscopy";
export const menuAccents = ["red", "green", "gold"] as const;
export const safeExternalLink = { target: "_blank", rel: "noopener noreferrer" } as const;
export const sectionIds = { history: "historia", menu: "menu-preview", gallery: "galeria", instagram: "instagram", location: "ubicacion" } as const;

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: business.name,
  url: `${siteUrl}/`,
  logo: brandLogo.webp,
  image: ogImage,
  servesCuisine: ["Mexicana"],
  currenciesAccepted: "PYG",
  priceRange: `Gs. ${new Intl.NumberFormat("es-PY").format(Math.min(...menuItems.map((item) => item.precio)))}–${new Intl.NumberFormat("es-PY").format(Math.max(...menuItems.map((item) => item.precio)))}`,
  telephone: "+595972237682",
  acceptsReservations: business.reservations,
  hasMenu: { "@type": "Menu", "@id": `${siteUrl}/menu#menu`, url: `${siteUrl}/menu`, name: copy.menuTitle },
  address: { "@type": "PostalAddress", streetAddress: `${landmark}, ${streetLine}`, addressLocality: "Lambaré", addressRegion: "Central", addressCountry: "PY" },
  geo: { "@type": "GeoCoordinates", latitude: -25.334968, longitude: -57.624854 },
  sameAs: [business.instagram],
  openingHoursSpecification: openingHours.map((period) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: period.days.map((day) => `https://schema.org/${day}`), opens: period.opens, closes: period.closes })),
};

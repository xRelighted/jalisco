import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { menu } from "@/data/menu";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=595972237682&text=Hola+Jalisco!!+quisiera+hacer+un+pedido+";
const RESERVATIONS = "https://fiweex.com/reservas_portal_bienvenida/ZoV1hA%3D%3D";
const INSTAGRAM = "https://www.instagram.com/jaliscopy/";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=-25.334968%2C-57.624854";
const MAP_EMBED = "https://www.google.com/maps?q=-25.334968,-57.624854&output=embed";
const HERO_IMAGE = "/manus-storage/jalisco-patio_a28a729f.webp";

const photos = [
  {
    src: "/manus-storage/jalisco-fachada_6558f018.webp",
    alt: "La fachada de Jalisco Mexican Grill en Lambaré, con su identidad de calavera y sombrero",
    className: "gallery__tile gallery__tile--facade",
    caption: "La casa de Jalisco",
  },
  {
    src: "/manus-storage/jalisco-taquiza_99cfc373.webp",
    alt: "Taquiza para compartir en la mesa",
    className: "gallery__tile gallery__tile--food",
    caption: "Hecho para compartir",
  },
  {
    src: "/manus-storage/jalisco-salon_c571381c.webp",
    alt: "El salón de Jalisco con mesas, luces cálidas y ambiente de noche",
    className: "gallery__tile gallery__tile--room",
    caption: "Noches que se alargan",
  },
  {
    src: "/manus-storage/jalisco-cantarito_8b15f1d1.webp",
    alt: "Cantarito con cítricos, preparado en Jalisco",
    className: "gallery__tile gallery__tile--drink",
    caption: "Salud, compa",
  },
  {
    src: HERO_IMAGE,
    alt: "Patio exterior de Jalisco Mexican Grill en Lambaré, con mesas y sillas de madera",
    className: "gallery__tile gallery__tile--patio",
    caption: "Un lugar para quedarse",
  },
];

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("es-PY").format(price)} Gs`;

function WhatsAppMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="whatsapp-mark"
    >
      <path
        d="M20.1 11.9a8.05 8.05 0 0 1-11.9 7.05L4 20l1.1-4.05A8.05 8.05 0 1 1 20.1 11.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.1c.2-.45.42-.46.65-.46h.55c.18 0 .4.07.5.4l.72 1.76c.08.2.05.39-.08.57l-.52.63c-.14.17-.16.34-.05.52.35.62.94 1.33 1.68 1.9.61.48 1.23.78 1.68.93.2.07.37.03.5-.14l.71-.86c.15-.18.34-.22.56-.13l1.68.79c.27.13.34.29.31.5-.08.54-.35 1.14-.78 1.5-.53.45-1.2.62-1.9.53-1.04-.13-2.38-.74-3.7-1.88-1.57-1.35-2.55-2.95-2.83-4-.23-.87-.06-1.58.32-2.15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menu[0].categoria);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateNav = () => setScrolled(window.scrollY > 32);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    const sections = menu
      .map((_, index) => document.getElementById(`menu-category-${index}`))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = Number(visible.target.getAttribute("data-menu-index"));
          if (menu[index]) setActiveCategory(menu[index].categoria);
        }
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.2, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") {
        setActivePhoto((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActivePhoto((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length,
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePhoto]);

  useEffect(() => {
    const description =
      "Tacos, tequila y buena onda en Lambaré. Menú, ubicación, reservas y pedidos por WhatsApp en Jalisco Mexican Grill.";
    const ogImage = new URL(HERO_IMAGE, window.location.origin).toString();
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", "Jalisco Mexican Grill · Lambaré");
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:image"]', "content", ogImage);
  }, []);

  const jumpToCategory = (category: string, index: number) => {
    setActiveCategory(category);
    document
      .getElementById(`menu-category-${index}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeMobile = () => setMobileOpen(false);
  const movePhoto = (direction: number) => {
    setActivePhoto((current) =>
      current === null ? null : (current + direction + photos.length) % photos.length,
    );
  };

  return (
    <LazyMotion features={domAnimation}>
    <div className="site-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="brand" href="#inicio" aria-label="Jalisco Mexican Grill, inicio">
            <span className="brand__seal" aria-hidden="true">
              J
            </span>
            <span className="brand__wordmark">
              <span>Jalisco</span>
              <small>Mexican grill</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#menu">Menú</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#ubicacion">Ubicación</a>
            <a href="#reservas">Reservas</a>
          </nav>

          <a className="nav-order" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <WhatsAppMark size={17} />
            <span>Pedir ahora</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            className="mobile-nav-toggle"
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <m.nav
              className="mobile-nav"
              aria-label="Navegación móvil"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <a href="#menu" onClick={closeMobile}>Menú <ArrowUpRight size={15} /></a>
              <a href="#nosotros" onClick={closeMobile}>Nosotros <ArrowUpRight size={15} /></a>
              <a href="#ubicacion" onClick={closeMobile}>Ubicación <ArrowUpRight size={15} /></a>
              <a href="#reservas" onClick={closeMobile}>Reservas <ArrowUpRight size={15} /></a>
              <a className="mobile-nav__order" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <WhatsAppMark size={19} /> Pedir por WhatsApp
              </a>
            </m.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__photo" aria-hidden="true">
            <img
              src={HERO_IMAGE}
              alt=""
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__content">
            <m.div
              className="hero__copy"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow eyebrow--light"><span /> Cocina mexicana · Lambaré, Paraguay</p>
              <h1 id="hero-title">Jalisco <em>Mexican Grill</em></h1>
              <p className="hero__tagline">El mero mero sabor ranchero, a un mensaje de distancia.</p>
              <p className="hero__support">Tacos, tequila y buena onda en Lambaré. Todos los días desde las 17:30.</p>
              <div className="hero__actions">
                <a className="button button--terracotta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <WhatsAppMark size={20} /> Pedir por WhatsApp <ArrowUpRight size={17} />
                </a>
                <a className="button button--outline" href={RESERVATIONS} target="_blank" rel="noopener noreferrer">
                  Reservar mesa <ArrowUpRight size={16} />
                </a>
              </div>
            </m.div>
            <div className="hero__bottomline">
              <span>Desde 17:30 · Lambaré</span>
              <a href="#nosotros">Descubrí Jalisco <ArrowDown size={14} /></a>
            </div>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span className="hero-stamp__top">Sabor</span>
            <span className="hero-stamp__center">de casa</span>
            <span className="hero-stamp__bottom">Lambaré · Paraguay</span>
          </div>
          <span className="hero-index" aria-hidden="true">01 / 06</span>
        </section>

        <section className="intro-strip" aria-label="La experiencia Jalisco">
          <div className="intro-strip__inner">
            <span>La mesa está puesta</span><i>✳</i>
            <span>El fuego encendido</span><i>✳</i>
            <span>Vos ponés la compañía</span>
          </div>
        </section>

        <section className="about section-pad" id="nosotros" aria-labelledby="about-title">
          <div className="section-wrap about__grid">
            <Reveal className="about__visual">
              <div className="about__image-frame">
                <img
                  src="/manus-storage/jalisco-salon_c571381c.webp"
                  alt="El salón de Jalisco en una noche con mesas llenas y luces cálidas"
                  loading="lazy"
                  decoding="async"
                />
                <span className="about__image-label">Lambaré, Paraguay</span>
              </div>
              <div className="about__image-note">
                <span className="note-seal">J</span>
                <span>Color, sabor<br />y buena onda.</span>
                <ArrowDownRight size={20} />
              </div>
            </Reveal>

            <Reveal className="about__copy" delay={0.08}>
              <p className="eyebrow"><span /> La historia detrás del sabor</p>
              <h2 id="about-title">Nuestra <em>historia</em></h2>
              <p>
                Jalisco nació con una idea simple: traer el sabor ranchero de México a Lambaré,
                sin perder la esencia ni la calidad. Detrás de la barra y en cada plato hay
                recetas que respetan la tradición mexicana, pero con la calidez de siempre
                atendernos como en casa. Nuestro mural —esa calavera con sombrero que ya es parte
                de la identidad de Jalisco— resume bien lo que somos: color, sabor y una noche
                que se disfruta de principio a fin.
              </p>
              <a className="text-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                Seguí la vida de Jalisco <ArrowUpRight size={17} />
              </a>
              <div className="about__signature">Con sabor, <span>Jalisco</span></div>
            </Reveal>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu" aria-labelledby="menu-title">
          <div className="section-wrap">
            <Reveal className="menu-heading">
              <div>
                <p className="eyebrow"><span /> De la cocina y la barra</p>
                <h2 id="menu-title">Nuestro <em>menú</em></h2>
                <p className="section-lead">Del combo pa compartir al taco de la casa, elegí tu favorito.</p>
              </div>
              <div className="menu-heading__note"><span>Todo sabe mejor</span><br />cuando se comparte.</div>
            </Reveal>

            <div className="menu-tabs-wrap">
              <nav className="menu-tabs" aria-label="Categorías del menú">
                {menu.map((category, index) => (
                  <button
                    className={`menu-tab ${activeCategory === category.categoria ? "menu-tab--active" : ""}`}
                    type="button"
                    key={category.categoria}
                    onClick={() => jumpToCategory(category.categoria, index)}
                    aria-current={activeCategory === category.categoria ? "true" : undefined}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>{category.categoria}
                  </button>
                ))}
              </nav>
            </div>

            <div className="menu-categories">
              {menu.map((category, index) => (
                <section
                  className="menu-category"
                  id={`menu-category-${index}`}
                  data-menu-index={index}
                  key={category.categoria}
                  aria-labelledby={`menu-heading-${index}`}
                >
                  <div className="menu-category__heading">
                    <span className="menu-category__number">{String(index + 1).padStart(2, "0")}</span>
                    <h3 id={`menu-heading-${index}`}>{category.categoria}</h3>
                    <span className="menu-category__count">{String(category.items.length).padStart(2, "0")} opciones</span>
                  </div>
                  <div className="menu-grid">
                    {category.items.map((item, itemIndex) => {
                      const orderText = `Hola Jalisco!! Quisiera pedir ${item.nombre}.`;
                      const orderLink = `https://api.whatsapp.com/send/?phone=595972237682&text=${encodeURIComponent(orderText)}`;
                      return (
                        <a
                          className="menu-item"
                          href={orderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={`${item.nombre}-${itemIndex}`}
                          aria-label={`Pedir ${item.nombre} por WhatsApp, ${formatPrice(item.precio)}`}
                        >
                          <span className="menu-item__copy">
                            <strong>{item.nombre}</strong>
                            <small>Pedir por WhatsApp <ArrowUpRight size={12} /></small>
                          </span>
                          <span className="menu-item__price">{formatPrice(item.precio)}</span>
                        </a>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
            <p className="menu-footnote"><span>◇</span> Todos los precios en guaraníes. Tocá un plato para pedirlo por WhatsApp.</p>
          </div>
        </section>

        <section className="gallery-section section-pad" id="galeria" aria-labelledby="gallery-title">
          <div className="section-wrap">
            <Reveal className="gallery-heading">
              <div>
                <p className="eyebrow"><span /> Una probadita de la casa</p>
                <h2 id="gallery-title">Así se vive <em>Jalisco</em></h2>
                <p className="section-lead">Buena mesa, buena compañía y el mural que ya es parte de la casa.</p>
              </div>
              <a className="gallery-instagram" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <Instagram size={17} /> <span>@jaliscopy</span> <ArrowUpRight size={14} />
              </a>
            </Reveal>

            <div className="gallery-grid">
              {photos.map((photo, index) => (
                <button
                  className={photo.className}
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Abrir foto: ${photo.alt}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                  <span className="gallery__caption">{photo.caption}<ArrowUpRight size={15} /></span>
                </button>
              ))}
            </div>
            <p className="gallery-credit">Imágenes del local y sus platos, vía <a href="https://www.disfrutandoparaguay.com/donde-ir/gastronomia/restaurantes/jalisco-lambare" target="_blank" rel="noopener noreferrer">Disfrutando Paraguay</a> y <a href="https://www.instagram.com/jaliscopy/" target="_blank" rel="noopener noreferrer">@jaliscopy</a>.</p>
          </div>
        </section>

        <section className="location section-pad" id="ubicacion" aria-labelledby="location-title">
          <div className="section-wrap">
            <Reveal className="location-heading">
              <div>
                <p className="eyebrow"><span /> Te esperamos esta noche</p>
                <h2 id="location-title">¿Dónde <em>estamos?</em></h2>
              </div>
              <a className="text-link" href={MAPS} target="_blank" rel="noopener noreferrer">
                Abrir en Google Maps <ArrowUpRight size={17} />
              </a>
            </Reveal>

            <div className="location__grid">
              <div className="map-frame">
                <iframe
                  title="Mapa de Jalisco Mexican Grill en Lambaré, Paraguay"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <span className="map-tag"><MapPin size={13} /> Lambaré, Paraguay</span>
              </div>
              <div className="location-card">
                <div className="location-card__topline">La mesa te espera</div>
                <div className="location-card__block">
                  <span className="location-card__icon"><MapPin size={19} /></span>
                  <div>
                    <small>Encontranos en</small>
                    <p>Porvenir e/ Luis María Argaña,<br />Lambaré, Paraguay</p>
                  </div>
                </div>
                <div className="location-card__block">
                  <span className="location-card__icon"><Clock3 size={19} /></span>
                  <div>
                    <small>Horarios de atención</small>
                    <p>Lunes a Jueves <b>17:30 a 00:00</b></p>
                    <p>Viernes y Sábados <b>17:30 a 01:00</b></p>
                  </div>
                </div>
                <a className="button button--dark" href={MAPS} target="_blank" rel="noopener noreferrer">
                  Cómo llegar <ArrowUpRight size={17} />
                </a>
                <span className="location-card__coordinates">25°20'05.9"S&nbsp; 57°37'29.5"W</span>
              </div>
            </div>
          </div>
        </section>

        <section className="reservation" id="reservas" aria-labelledby="reservation-title">
          <div className="reservation__texture" aria-hidden="true" />
          <div className="section-wrap reservation__inner">
            <Reveal className="reservation__copy">
              <p className="eyebrow eyebrow--light"><span /> Para las noches que importan</p>
              <h2 id="reservation-title">Reservá<br /><em>tu mesa.</em></h2>
              <p>Si venís en grupo o querés asegurar mesa, reservá en un par de clics.</p>
              <a className="button button--cream" href={RESERVATIONS} target="_blank" rel="noopener noreferrer">
                Reservar ahora <ArrowUpRight size={17} />
              </a>
            </Reveal>
            <div className="reservation__aside" aria-hidden="true">
              <span className="reservation__big-mark">J</span>
              <span>Que no falte<br />una silla más.</span>
              <span className="reservation__asterisk">✳</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap">
          <div className="footer__main">
            <a className="brand brand--footer" href="#inicio" aria-label="Volver al inicio">
              <span className="brand__seal" aria-hidden="true">J</span>
              <span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span>
            </a>
            <p>Jalisco Mexican Grill —<br /><span>Porvenir e/ Luis María Argaña, Lambaré</span></p>
            <nav className="footer__links" aria-label="Redes y contacto">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Instagram <span>@jaliscopy</span></a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"><WhatsAppMark size={17} /> WhatsApp</a>
              <a href={RESERVATIONS} target="_blank" rel="noopener noreferrer">Reservas <ArrowUpRight size={13} /></a>
            </nav>
          </div>
          <div className="footer__bottom">
            <span>Lunes a Jueves 17:30–00:00 <i>·</i> Viernes y Sábados 17:30–01:00</span>
            <span>El mero mero sabor ranchero.</span>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp a Jalisco"
      >
        <span className="whatsapp-float__pulse" aria-hidden="true" />
        <WhatsAppMark size={26} />
        <span className="whatsapp-float__tooltip">¿Pedimos?</span>
      </a>

      <AnimatePresence>
        {activePhoto !== null && (
          <m.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galería de fotos de Jalisco"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhoto(null)}
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const delta = event.changedTouches[0]?.clientX - touchStartX.current;
              if (Math.abs(delta) > 48) movePhoto(delta < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            <button className="lightbox__close" type="button" aria-label="Cerrar galería" onClick={() => setActivePhoto(null)}>
              <X size={24} />
            </button>
            <button className="lightbox__arrow lightbox__arrow--left" type="button" aria-label="Foto anterior" onClick={(event) => { event.stopPropagation(); movePhoto(-1); }}>
              <ArrowLeft size={21} />
            </button>
            <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
              <AnimatePresence mode="wait">
                <m.img
                  key={photos[activePhoto].src}
                  src={photos[activePhoto].src}
                  alt={photos[activePhoto].alt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              <figcaption>{photos[activePhoto].caption} <span>{String(activePhoto + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span></figcaption>
            </figure>
            <button className="lightbox__arrow lightbox__arrow--right" type="button" aria-label="Foto siguiente" onClick={(event) => { event.stopPropagation(); movePhoto(1); }}>
              <ArrowRight size={21} />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
  );
}

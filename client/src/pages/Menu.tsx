import { ArrowUp, ArrowUpRight, Beer, Check, Citrus, CookingPot, CupSoda, GlassWater, Popcorn, Sandwich, Share2, Snowflake, UtensilsCrossed, UsersRound, Wine } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { individualOrderLink, business, copy, formatPrice, menuFacts, menuAccents, menuCategoryPhotos, pedidosYaIcon, photos, safeExternalLink, siteUrl } from "@/data/site";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import ResponsiveImage from "@/components/ResponsiveImage";
import { menu } from "@/data/menu";

const icons = [UsersRound, Popcorn, Sandwich, UtensilsCrossed, CookingPot, Wine, Snowflake, Citrus, GlassWater, Beer, CupSoda];
const menuCategoryId = (index: number) => `menu-category-${index}`;
const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${siteUrl}/menu#menu`,
  name: `${business.name} — ${copy.menuTitle}`,
  url: `${siteUrl}/menu`,
  hasMenuSection: menu.map((category) => ({
    "@type": "MenuSection",
    name: category.categoria,
    hasMenuItem: category.items.map((item) => ({
      "@type": "MenuItem",
      name: item.nombre,
      offers: { "@type": "Offer", price: item.precio, priceCurrency: "PYG" },
    })),
  })),
};
const safeMenuSchema = JSON.stringify(menuSchema).replace(/</g, "\\u003c");

export default function MenuPage() {
  const [active, setActive] = useState(0);
  const [shareLabel, setShareLabel] = useState("Compartir menú");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const targets = menu.map((_, index) => document.getElementById(menuCategoryId(index))).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(Number(current.target.getAttribute("data-index")));
    }, { rootMargin: "-22% 0px -66% 0px", threshold: [0, .2, .55] });
    const updateBackToTop = () => setShowBackToTop(window.scrollY > 900);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    targets.forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); window.removeEventListener("scroll", updateBackToTop); };
  }, []);

  const jumpTo = (index: number) => {
    setActive(index);
    document.getElementById(menuCategoryId(index))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shareMenu = async () => {
    const url = `${siteUrl}/menu`;
    const payload = { title: `${copy.menuTitle} | ${business.name}`, text: "Consultá el menú completo de Jalisco Mexican Grill.", url };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        setShareLabel("Menú compartido");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Enlace copiado");
    } catch {
      window.prompt("Copiá el enlace del menú", url);
    }
  };

  return <main id="contenido" className="menu-page" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeMenuSchema }} />
    <header className="menu-hero">
      <div className="menu-hero__image"><ResponsiveImage photo={photos[1]} sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="menu-hero__shade" /><span className="menu-hero__talavera" aria-hidden="true" /><span className="hero__paper-picado menu-hero__paper-picado" aria-hidden="true" />
      <div className="section-wrap menu-hero__content"><ScrollReveal><p className="menu-hero__eyebrow">Jalisco Mexican Grill · Cocina mexicana</p><h1>{copy.menuTitle}</h1><p>{menuFacts}</p><button className="menu-share" type="button" onClick={shareMenu}>{shareLabel === "Enlace copiado" ? <Check size={17} /> : <Share2 size={17} />}{shareLabel}</button></ScrollReveal></div>
    </header>
    <div className="menu-tabs-wrap menu-page__tabs"><nav className="menu-tabs section-wrap" aria-label="Categorías del menú">{menu.map((category, index) => <button className={`menu-tab ${active === index ? "menu-tab--active" : ""}`} type="button" key={category.categoria} onClick={() => jumpTo(index)} aria-current={active === index ? "true" : undefined}>{category.categoria}</button>)}</nav></div>
    <div className="section-wrap menu-page__content">
      {menu.map((category, index) => {
        const Icon = icons[index % icons.length];
        return <div key={category.categoria}>
          {index === 0 && <div className="menu-page__chapter"><h2>Comida</h2><span>Para compartir y disfrutar</span></div>}
          {index === 5 && <div className="menu-page__chapter menu-page__chapter--drinks"><h2>Bebidas</h2><span>Algo para brindar</span></div>}
          <section id={menuCategoryId(index)} data-index={index} className={`menu-page__category menu-page__category--${index % 2 ? "alternate" : "paper"} menu-accent--${menuAccents[index % menuAccents.length]}`} aria-labelledby={`category-title-${index}`}>
            <header className="menu-page__category-heading-wrap"><div className="menu-page__category-title"><span>{String(index + 1).padStart(2, "0")}</span><h3 id={`category-title-${index}`}>{category.categoria}</h3><span>{String(category.items.length).padStart(2, "0")} opciones</span></div></header>
            <ul className="menu-page__gallery" aria-label={`Fotos ilustrativas: ${category.categoria}`}>
              {(menuCategoryPhotos[index] ?? []).map((photo, photoIndex) => <li key={photo.src}>
                <figure><picture><img src={photo.src} width="1000" height="750" alt={photo.alt} loading={index === 0 && photoIndex === 0 ? "eager" : "lazy"} fetchPriority={index === 0 && photoIndex === 0 ? "high" : "auto"} decoding="async" /></picture></figure>
              </li>)}
            </ul>
            <div className="menu-page__grid">{category.items.map((item, itemIndex) => <details className="menu-page__item" key={`${item.nombre}-${itemIndex}`}>
              <summary className="menu-page__summary" aria-label={`Mostrar pedido para ${item.nombre}, ${formatPrice(item.precio)}`}><Icon size={19} aria-hidden="true" /><span className="menu-page__dishline"><span className="menu-page__dish">{item.nombre}</span><span className="menu-page__leader" aria-hidden="true" /><span className="menu-page__description">{item.descripcion}</span></span><span className="menu-page__price">{formatPrice(item.precio)}</span><span className="menu-page__preview">Ver opción de pedido<ArrowUpRight size={12} aria-hidden="true" /></span></summary>
              <div className="menu-page__item-action"><span>Por WhatsApp</span><a className="menu-page__order" href={individualOrderLink(item.nombre)} {...safeExternalLink}>Pedir este<ArrowUpRight size={13} aria-hidden="true" /></a></div>
            </details>)}</div>
          </section>
        </div>;
      })}
    </div>
    <section className="menu-page__actions section-pad"><div className="section-wrap">
      <a className="button button--terracotta" href={business.whatsapp} {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} /></a>
      <a className="button button--pedidosya" href={business.pedidosYa} {...safeExternalLink}><img src={pedidosYaIcon} width="21" height="21" alt="" />Pedir por PedidosYa<ArrowUpRight size={17} /></a>
      <Link className="button button--outline-dark" to="/reservas">Reservar mesa<ArrowUpRight size={17} /></Link>
    </div></section>
    <button className={`menu-back-top${showBackToTop ? " menu-back-top--visible" : ""}`} type="button" aria-label="Volver arriba" aria-hidden={!showBackToTop} tabIndex={showBackToTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp size={19} aria-hidden="true" /><span>Volver arriba</span></button>
    <nav className="menu-mobile-actions" aria-label="Pedidos rápidos"><a className="menu-mobile-actions__whatsapp" href={business.whatsapp} {...safeExternalLink}><WhatsappMark />WhatsApp</a><a className="menu-mobile-actions__pedidosya" href={business.pedidosYa} {...safeExternalLink}><img src={pedidosYaIcon} width="22" height="22" alt="" />PedidosYa</a></nav>
  </main>;
}

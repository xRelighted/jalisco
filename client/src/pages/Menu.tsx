import { ArrowUp, ArrowUpRight, Beer, Check, Citrus, CookingPot, CupSoda, GlassWater, Popcorn, Sandwich, Share2, Snowflake, UtensilsCrossed, UsersRound, Wine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { individualOrderLink, business, copy, formatPrice, fullAddress, menuFacts, menuAccents, pedidosYaIcon, photos, safeExternalLink, siteUrl } from "@/data/site";
import { menuCategoryMedia } from "@/data/media";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import ResponsiveImage from "@/components/ResponsiveImage";
import TrackedLink from "@/components/TrackedLink";
import { trackEvent } from "@/lib/analytics";
import { menu } from "@/data/menu";

const icons = [UsersRound, Popcorn, Sandwich, UtensilsCrossed, CookingPot, Wine, Snowflake, Citrus, GlassWater, Beer, CupSoda];
const menuCategoryId = (index: number) => `menu-category-${index}`;
const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${siteUrl}/menu#menu`,
  name: `${business.name} — ${copy.menuTitle}`,
  url: `${siteUrl}/menu`,
  hasMenuSection: menu.map((category) => ({ "@type": "MenuSection", name: category.categoria, hasMenuItem: category.items.map((item) => ({ "@type": "MenuItem", name: item.nombre, offers: { "@type": "Offer", price: item.precio, priceCurrency: "PYG" } })) })),
};
const safeMenuSchema = JSON.stringify(menuSchema).replace(/</g, "\\u003c");

export default function MenuPage() {
  const [active, setActive] = useState(0);
  const [activePhotos, setActivePhotos] = useState<Record<number, number>>({});
  const [shareLabel, setShareLabel] = useState("Compartir menú");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = menu.map((_, index) => document.getElementById(menuCategoryId(index))).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(Number(current.target.getAttribute("data-index")));
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, .2, .55] });
    const updateBackToTop = () => setShowBackToTop(window.scrollY > window.innerHeight * 1.5);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    targets.forEach((element) => observer.observe(element));

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < .55) return;
        const category = Number((entry.target as HTMLElement).dataset.categoryIndex);
        const photo = Number((entry.target as HTMLElement).dataset.photoIndex);
        setActivePhotos((current) => current[category] === photo ? current : { ...current, [category]: photo });
      });
    }, { threshold: [.55, .75] });
    document.querySelectorAll<HTMLElement>(".menu-page__gallery-item").forEach((item) => imageObserver.observe(item));
    return () => { observer.disconnect(); imageObserver.disconnect(); window.removeEventListener("scroll", updateBackToTop); };
  }, []);

  useEffect(() => {
    const container = tabsRef.current;
    const tab = container?.querySelector<HTMLElement>(".menu-tab--active");
    if (!container || !tab) return;
    const left = tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2;
    container.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [active]);

  const jumpTo = (index: number) => {
    setActive(index);
    document.getElementById(menuCategoryId(index))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };

  const shareMenu = async () => {
    trackEvent("share_menu");
    const url = `${siteUrl}/menu`;
    const payload = { title: `${copy.menuTitle} | ${business.name}`, text: `Consultá el menú completo de Jalisco Mexican Grill en ${fullAddress}.`, url };
    if (navigator.share) {
      try { await navigator.share(payload); setShareLabel("Menú compartido"); return; }
      catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); setShareLabel("Enlace copiado"); }
    catch { window.prompt("Copiá el enlace del menú", url); }
  };

  return <main id="contenido" className="menu-page" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeMenuSchema }} />
    <header className="menu-hero">
      <div className="menu-hero__image"><ResponsiveImage photo={photos[1]} sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="menu-hero__shade" /><span className="menu-hero__talavera" aria-hidden="true" />
      <div className="section-wrap menu-hero__content"><ScrollReveal><p className="menu-hero__eyebrow">Jalisco Mexican Grill · Cocina mexicana</p><h1>{copy.menuTitle}</h1><p>{menuFacts}</p><button className="menu-share" type="button" onClick={shareMenu}><Share2 size={17} aria-hidden="true" />{shareLabel}</button><span className="menu-share-status" role="status" aria-live="polite">{shareLabel === "Compartir menú" ? "" : shareLabel}</span></ScrollReveal></div>
    </header>
    <div className="menu-tabs-wrap menu-page__tabs"><nav ref={tabsRef} className="menu-tabs section-wrap" aria-label="Categorías del menú">{menu.map((category, index) => <button className={`menu-tab ${active === index ? "menu-tab--active" : ""}`} type="button" key={category.categoria} onClick={() => jumpTo(index)} aria-current={active === index ? "location" : undefined}>{category.categoria}</button>)}</nav></div>
    <p className="menu-page__reference-note section-wrap">Las fotos de esta carta son referenciales.</p>
    <div className="section-wrap menu-page__content">
      {menu.map((category, index) => {
        const Icon = icons[index % icons.length];
        const gallery = menuCategoryMedia[index] ?? [];
        return <div key={category.categoria}>
          {index === 0 && <div className="menu-page__chapter"><h2>Comida</h2><span>Para compartir y disfrutar</span></div>}
          {index === 5 && <div className="menu-page__chapter menu-page__chapter--drinks"><h2>Bebidas</h2><span>Algo para brindar</span></div>}
          <section id={menuCategoryId(index)} data-index={index} className={`menu-page__category menu-page__category--${index % 2 ? "alternate" : "paper"} menu-accent--${menuAccents[index % menuAccents.length]}`} aria-labelledby={`category-title-${index}`}>
            <header className="menu-page__category-heading-wrap"><div className="menu-page__category-title"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3 id={`category-title-${index}`}>{category.categoria}</h3><span>{String(category.items.length).padStart(2, "0")} opciones</span></div></header>
            <ul className="menu-page__gallery" aria-label={`Fotos de ${category.categoria}`} tabIndex={0}>
              {gallery.map((photo, photoIndex) => <li className="menu-page__gallery-item" data-category-index={index} data-photo-index={photoIndex} key={`${index}-${photoIndex}`}>
                <figure><picture><source type="image/avif" srcSet={photo.avifSet} sizes="(max-width: 767px) 76vw, 33vw" /><source type="image/webp" srcSet={photo.webpSet} sizes="(max-width: 767px) 76vw, 33vw" /><img src={photo.src} width="1024" height="768" alt={photo.alt} loading="lazy" fetchPriority="auto" decoding="async" /></picture></figure>
              </li>)}
            </ul>
            {gallery.length > 1 && <div className="menu-page__gallery-dots" aria-hidden="true">{gallery.map((_, dot) => <span className={(activePhotos[index] ?? 0) === dot ? "is-active" : ""} key={dot} />)}</div>}
            <div className="menu-page__grid">{category.items.map((item, itemIndex) => <details className="menu-page__item" key={`${item.nombre}-${itemIndex}`}>
              <summary className="menu-page__summary"><Icon size={19} aria-hidden="true" /><span className="menu-page__dishline"><span className="menu-page__dish">{item.nombre}</span><span className="menu-page__leader" aria-hidden="true" /><span className="menu-page__description">{item.descripcion}</span></span><span className="menu-page__price">{formatPrice(item.precio)}</span><span className="menu-page__preview">Ver opción de pedido<ArrowUpRight size={12} aria-hidden="true" /></span></summary>
              <div className="menu-page__item-action"><span>Por WhatsApp</span><TrackedLink className="menu-page__order" href={individualOrderLink(item.nombre)} event="order_dish" eventData={{ dish: item.nombre }} aria-label={`Pedir este: ${item.nombre} por WhatsApp, se abre en una pestaña nueva`} {...safeExternalLink}>Pedir este<ArrowUpRight size={13} aria-hidden="true" /></TrackedLink></div>
            </details>)}</div>
          </section>
        </div>;
      })}
    </div>
    <section className="menu-page__actions section-pad"><div className="section-wrap">
      <TrackedLink className="button button--terracotta" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "menu-final" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>
      <TrackedLink className="button button--pedidosya" href={business.pedidosYa} event="order_pedidosya" aria-label="Pedir por PedidosYa, se abre en una pestaña nueva" {...safeExternalLink}><img src={pedidosYaIcon} width="21" height="21" alt="" />Pedir por PedidosYa<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>
      <Link className="button button--outline-dark" to="/reservas">Reservar mesa<ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div></section>
    <button className={`menu-back-top${showBackToTop ? " menu-back-top--visible" : ""}`} type="button" aria-label="Volver arriba" aria-hidden={!showBackToTop} tabIndex={showBackToTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp size={19} aria-hidden="true" /><span>Volver arriba</span></button>
  </main>;
}

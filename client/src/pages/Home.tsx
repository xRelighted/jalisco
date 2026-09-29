import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { business, copy, locations, photos, safeExternalLink, sectionIds, storyStats } from "@/data/site";
import { featuredDishes } from "@/data/featured";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import OpeningHours from "@/components/OpeningHours";
import ResponsiveImage from "@/components/ResponsiveImage";
import MapFacade from "@/components/MapFacade";
import FeaturedDishCard from "@/components/FeaturedDishCard";

const marqueeWords = ["TACOS", "TEQUILA", "BUENA ONDA", "MARGARITAS", "BURRITOS"];

function PicadoDivider() {
  return <div className="picado-divider" aria-hidden="true"><svg viewBox="0 0 320 24" preserveAspectRatio="none"><path d="M0 0h320v10l-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11z" fill="currentColor"/><path d="M8 4h9v4H8zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9z" fill="#f5efe6"/></svg></div>;
}

function Marquee() {
  return <div className="marquee" role="img" aria-label="Tacos, tequila, buena onda, margaritas y burritos"><div className="marquee__track">{[0,1].map((copyIndex) => <span className="marquee__group" key={copyIndex} aria-hidden={copyIndex === 1}>{marqueeWords.map((word, index) => <span className="marquee__item" key={word}><span>{word}</span><i className={`marquee__diamond marquee__diamond--${index % 4}`} aria-hidden="true">◆</i></span>)}</span>)}</div></div>;
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+\s*/, "");
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(target); return; }
      const started = performance.now();
      const duration = 650;
      const tick = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        setCount(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: .6 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);
  return <div className="about__stat" ref={ref} aria-label={`${target} ${suffix} ${label}`}><strong>{count}<small>{suffix}</small></strong><span>{label}</span></div>;
}

export default function Home() {
  return <main id="contenido" tabIndex={-1}>
    <section className="hero" aria-labelledby="home-title">
      <div className="hero__photo"><ResponsiveImage photo={photos[0]} alt="" sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="hero__shade" /><div className="hero__grain" /><span className="hero__paper-picado" aria-hidden="true" /><span className="hero__talavera" aria-hidden="true" />
      <div className="hero__content"><div className="hero__copy">
        <p className="eyebrow eyebrow--light">{copy.eyebrow}</p>
        <h1 id="home-title">{copy.heroTitle}</h1>
        <p className="hero__tagline">{copy.heroSubtitle}</p>
        <div><OpeningHours variant="compact" /></div>
        <div className="hero__actions">
          <a className="button button--terracotta" href={business.whatsapp} {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} /></a>
          <Link className="button button--outline" to="/menu">Ver menú<ArrowUpRight size={16} /></Link>
          <Link className="button button--outline" to="/reservas">Reservar mesa<ArrowUpRight size={16} /></Link>
        </div>
        <a className="hero__delivery-link" href={business.pedidosYa} {...safeExternalLink}><span>También disponible en</span><strong>PedidosYa</strong><ArrowUpRight size={14} aria-hidden="true" /></a>
      </div></div>
    </section>
    <Marquee />
    <section className="home-featured section-pad" id={sectionIds.menu} aria-labelledby="home-featured-title">
      <div className="section-wrap">
        <ScrollReveal className="home-featured__heading"><p className="eyebrow">Jalisco Mexican Grill <span aria-hidden="true" /> Lo más pedido</p><h2 id="home-featured-title">Los que no podés dejar de pedir</h2><p className="section-lead">Elegí uno y pedilo en un toque.</p></ScrollReveal>
        <ScrollReveal><div className="featured-dishes">{featuredDishes.map((dish, index) => <FeaturedDishCard key={dish.nombre} dish={dish} index={index} />)}</div></ScrollReveal>
        <p className="featured-disclaimer">Imágenes referenciales. La presentación y los ingredientes pueden diferir del plato servido.</p>
        <ScrollReveal><Link className="button button--dark home-featured__all" to="/menu">Ver menú completo<ArrowUpRight size={17} /></Link></ScrollReveal>
      </div>
    </section>
    <PicadoDivider />
    <section className="about section-pad" id={sectionIds.history} aria-labelledby="history-title">
      <div className="section-wrap about__grid">
        <ScrollReveal className="about__visual"><div className="about__image-frame"><ResponsiveImage photo={photos[2]} sizes="(max-width: 700px) 100vw, 45vw" /></div></ScrollReveal>
        <ScrollReveal className="about__copy" delay={.07}><h2 id="history-title">{copy.storyTitle}</h2><p>{copy.story}</p>
          <div className="about__stats" aria-label="Datos de Jalisco"><div className="about__stats-grid">{storyStats.map((stat) => <AnimatedStat key={stat.value} value={stat.value} label={stat.label} />)}</div></div>
        </ScrollReveal>
      </div>
    </section>
    <section className="gallery-section section-pad" id={sectionIds.gallery} aria-labelledby="gallery-title">
      <div className="section-wrap"><ScrollReveal className="gallery-heading"><div><h2 id="gallery-title">{copy.galleryTitle}</h2><p className="section-lead">{copy.gallery}</p></div></ScrollReveal>
        <ScrollReveal><div className="gallery-grid">{photos.map((photo, index) => <div key={photo.src} className={`gallery__tile gallery__tile--tile-${index}`}><ResponsiveImage photo={photo} sizes="(max-width: 700px) 33vw, (max-width: 1100px) 50vw, 58vw" /><span className="gallery__caption">{photo.name}</span></div>)}</div></ScrollReveal>
      </div>
    </section>
    <section className="instagram-section section-pad" id={sectionIds.instagram} aria-labelledby="instagram-title">
      <div className="section-wrap"><ScrollReveal className="instagram-section__heading"><h2 id="instagram-title">{copy.instagramTitle}</h2><p>{copy.instagram}</p></ScrollReveal>
        <ScrollReveal><div className="instagram-grid">{photos.map((photo, index) => <a className="instagram-grid__tile" key={photo.src} href={business.instagram} {...safeExternalLink} aria-label={`Instagram ${index + 1}: ${photo.alt}`}><ResponsiveImage photo={photo} sizes="(max-width: 700px) 33vw, 20vw" /><span><Instagram size={18} aria-hidden="true" /></span></a>)}</div></ScrollReveal>
        <ScrollReveal><a className="button button--terracotta" href={business.instagram} {...safeExternalLink}><Instagram size={17} />Seguir en Instagram<ArrowUpRight size={16} /></a></ScrollReveal>
      </div>
    </section>
    <section className="location section-pad" id={sectionIds.location} aria-labelledby="location-title">
      <div className="section-wrap"><ScrollReveal className="location-heading"><h2 id="location-title">{copy.locationTitle}</h2><a className="text-link" href={locations[0].directions} {...safeExternalLink}>Cómo llegar<ArrowUpRight size={16} /></a></ScrollReveal>
        {locations.map((location) => <ScrollReveal className="location__grid" delay={.04} key={location.id}><MapFacade title={location.name} address={location.address} embedUrl={location.mapEmbed} directionsUrl={location.directions} />
          <div className="location-card"><div className="location-card__topline">{location.name}</div><div className="location-card__block"><MapPin size={20} aria-hidden="true" /><p>{location.address}</p></div><div className="location-card__block location-card__hours"><OpeningHours /></div><a className="button button--dark" href={location.directions} {...safeExternalLink}>Abrir en Google Maps<ArrowUpRight size={16} /></a></div>
        </ScrollReveal>)}
      </div>
    </section>
    <section className="home-final-cta" aria-labelledby="final-cta-title">
      <div className="home-final-cta__photo"><ResponsiveImage photo={photos[0]} alt="" sizes="100vw" /></div><div className="home-final-cta__shade" />
      <div className="section-wrap home-final-cta__content"><ScrollReveal><p className="eyebrow eyebrow--light">Jalisco Mexican Grill</p><h2 id="final-cta-title">Tu mesa te está esperando</h2><div className="home-final-cta__actions"><a className="button button--terracotta" href={business.whatsapp} {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} /></a><Link className="button button--outline" to="/reservas">Reservar mesa<ArrowUpRight size={17} /></Link></div></ScrollReveal></div>
    </section>
  </main>;
}

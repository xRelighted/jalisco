import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { business, copy, photos, safeExternalLink, sectionIds } from "@/data/site";
import { featuredDishes } from "@/data/featured";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import OpeningHours from "@/components/OpeningHours";
import ResponsiveImage from "@/components/ResponsiveImage";
import FeaturedDishCard from "@/components/FeaturedDishCard";
import LocationBlock from "@/components/LocationBlock";
import TrackedLink from "@/components/TrackedLink";

function PicadoDivider() {
  return <div className="picado-divider" aria-hidden="true"><svg viewBox="0 0 320 24" preserveAspectRatio="none"><path d="M0 0h320v10l-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11-10 11-10-11z" fill="currentColor"/><path d="M8 4h9v4H8zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9zm23 0h9v4h-9z" fill="#f5efe6"/></svg></div>;
}

export default function Home() {
  return <main id="contenido" tabIndex={-1}>
    <section className="hero" aria-labelledby="home-title">
      <div className="hero__photo"><ResponsiveImage photo={photos[0]} alt="" sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="hero__shade" /><div className="hero__grain" /><span className="hero__talavera" aria-hidden="true" />
      <div className="hero__content"><div className="hero__copy">
        <p className="eyebrow eyebrow--light">{copy.eyebrow}</p>
        <h1 id="home-title">{copy.heroTitle}</h1>
        <p className="hero__tagline">{copy.heroSubtitle}</p>
        <OpeningHours variant="hero" />
        <p className="hero__location"><MapPin size={16} aria-hidden="true" />Paseo Deltoto, Lambaré</p>
        <div className="hero__actions">
          <TrackedLink className="button button--terracotta" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "hero" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>
          <Link className="button button--outline" to="/menu">Ver menú<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link className="button button--outline" to="/reservas">Reservar mesa<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <TrackedLink className="button button--pedidosya" href={business.pedidosYa} event="order_pedidosya" aria-label="Pedir por PedidosYa, se abre en una pestaña nueva" {...safeExternalLink}><img src="https://jalisco-gril-2tnpava5.manus.space/manus-storage/pedidosya-icon_d3498a7f.png" width="22" height="22" alt="" />Pedir por PedidosYa<ArrowUpRight size={16} aria-hidden="true" /></TrackedLink>
        </div>
      </div></div>
    </section>

    <section className="home-featured section-pad" id={sectionIds.menu} aria-labelledby="home-featured-title">
      <div className="section-wrap">
        <ScrollReveal className="home-featured__heading"><h2 id="home-featured-title">Los que no podés dejar de pedir</h2><p className="section-lead">Elegí uno y pedilo en un toque.</p></ScrollReveal>
        <ScrollReveal><div className="featured-dishes" role="region" aria-label="Platos destacados" tabIndex={0}>{featuredDishes.map((dish) => <FeaturedDishCard key={dish.nombre} dish={dish} />)}</div></ScrollReveal>
        <p className="featured-disclaimer">Imágenes referenciales. La presentación puede diferir del plato servido.</p>
        <ScrollReveal><Link className="button button--dark home-featured__all" to="/menu">Ver menú completo<ArrowUpRight size={17} aria-hidden="true" /></Link></ScrollReveal>
      </div>
    </section>
    <PicadoDivider />

    <section className="gallery-section section-pad" id={sectionIds.gallery} aria-labelledby="gallery-title">
      <div className="section-wrap"><ScrollReveal className="gallery-heading"><div><h2 id="gallery-title">{copy.galleryTitle}</h2><p className="section-lead">{copy.gallery}</p></div></ScrollReveal>
        <ScrollReveal><div className="gallery-grid" role="region" aria-label="Fotos de Jalisco Mexican Grill" tabIndex={0}>{photos.map((photo, index) => <div key={photo.src} className={`gallery__tile gallery__tile--tile-${index}`}><ResponsiveImage photo={photo} alt={photo.alt} sizes="(max-width: 700px) 86vw, (max-width: 1100px) 50vw, 58vw" /></div>)}</div></ScrollReveal>
      </div>
    </section>

    <section className="about section-pad" id={sectionIds.history} aria-labelledby="history-title">
      <div className="section-wrap about__grid">
        <ScrollReveal className="about__visual"><div className="about__image-frame"><ResponsiveImage photo={photos[2]} sizes="(max-width: 700px) 100vw, 45vw" /></div></ScrollReveal>
        <ScrollReveal className="about__copy" delay={.07}><h2 id="history-title">{copy.storyTitle}</h2><p>{copy.story}</p><Link className="text-link" to="/menu">Ver el menú<ArrowUpRight size={16} aria-hidden="true" /></Link></ScrollReveal>
      </div>
    </section>

    <section className="instagram-section section-pad" id={sectionIds.instagram} aria-labelledby="instagram-title">
      <div className="section-wrap"><ScrollReveal className="instagram-section__heading"><h2 id="instagram-title">{copy.instagramTitle}</h2><p>{copy.instagram}</p></ScrollReveal>
        <ScrollReveal><div className="instagram-grid">{photos.map((photo, index) => <TrackedLink className="instagram-grid__tile" key={photo.src} href={business.instagram} event="instagram" eventData={{ location: "grid", image: index + 1 }} aria-label={`Instagram: ${photo.alt}, se abre en una pestaña nueva`} {...safeExternalLink}><ResponsiveImage photo={photo} sizes="(max-width: 700px) 33vw, 20vw" /><span><Instagram size={18} aria-hidden="true" /></span></TrackedLink>)}</div></ScrollReveal>
        <ScrollReveal><TrackedLink className="button button--terracotta" href={business.instagram} event="instagram" aria-label="Seguir en Instagram, se abre en una pestaña nueva" {...safeExternalLink}><Instagram size={17} aria-hidden="true" />Seguir en Instagram<ArrowUpRight size={16} aria-hidden="true" /></TrackedLink></ScrollReveal>
      </div>
    </section>

    <section className="location section-pad" id={sectionIds.location} aria-labelledby="location-title">
      <div className="section-wrap"><ScrollReveal className="location-heading"><h2 id="location-title">{copy.locationTitle}</h2></ScrollReveal><ScrollReveal><LocationBlock showHours /></ScrollReveal></div>
    </section>

    <section className="home-final-cta" aria-labelledby="final-cta-title">
      <div className="home-final-cta__photo"><ResponsiveImage photo={photos[0]} alt="" sizes="100vw" /></div><div className="home-final-cta__shade" />
      <div className="section-wrap home-final-cta__content"><ScrollReveal><h2 id="final-cta-title">Tu mesa te está esperando</h2><div className="home-final-cta__actions"><TrackedLink className="button button--terracotta" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "cta_final" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink><Link className="button button--outline" to="/reservas">Reservar mesa<ArrowUpRight size={17} aria-hidden="true" /></Link></div></ScrollReveal></div>
    </section>
  </main>;
}

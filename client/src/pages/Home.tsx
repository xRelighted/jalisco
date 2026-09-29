import { m, type Variants } from "framer-motion";
import { ArrowUpRight, Clock3, Instagram, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { business, copy, featuredMenu, formatPrice, locations, orderLink, pedidosYaIcon, photos, safeExternalLink, sectionIds, storyStats } from "@/data/site";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import OpeningHours from "@/components/OpeningHours";
import ResponsiveImage from "@/components/ResponsiveImage";

const heroStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: .1, delayChildren: .07 } } };
const heroLine: Variants = { hidden: { opacity: 0, y: 17 }, show: { opacity: 1, y: 0, transition: { duration: .46, ease: [.22, 1, .36, 1] } } };

export default function Home() {
  return <main id="contenido" tabIndex={-1}>
    <section className="hero" aria-labelledby="home-title">
      <div className="hero__photo"><ResponsiveImage photo={photos[4]} alt="" sizes="100vw" loading="eager" fetchPriority="high" /></div>
      <div className="hero__shade" /><div className="hero__grain" /><span className="hero__paper-picado" aria-hidden="true" /><span className="hero__talavera" aria-hidden="true" />
      <div className="hero__content"><m.div className="hero__copy" variants={heroStagger} initial="hidden" animate="show">
        <m.p className="eyebrow eyebrow--light" variants={heroLine}>{copy.eyebrow}</m.p>
        <m.h1 id="home-title" variants={heroLine}>{copy.heroTitle}</m.h1>
        <m.p className="hero__tagline" variants={heroLine}>{copy.heroSubtitle}</m.p>
        <m.p className="hero__support" variants={heroLine}>{copy.heroSupport}</m.p>
        <m.div className="hero__actions" variants={heroLine}>
          <a className="button button--terracotta" href={business.whatsapp} {...safeExternalLink}><WhatsappMark />Pedir por WhatsApp<ArrowUpRight size={17} /></a>
          <Link className="button button--outline" to="/menu">Ver menú<ArrowUpRight size={16} /></Link>
          <Link className="button button--outline" to="/reservas">Reservar mesa<ArrowUpRight size={16} /></Link>
        </m.div>
        <m.a className="hero__delivery-link" variants={heroLine} href={business.pedidosYa} {...safeExternalLink}>
          <span>También disponible en</span><img src={pedidosYaIcon} width="22" height="22" alt="" /><strong>PedidosYa</strong><ArrowUpRight size={14} aria-hidden="true" />
        </m.a>
      </m.div></div>
    </section>
    <section className="about section-pad" id={sectionIds.history} aria-labelledby="history-title">
      <div className="section-wrap about__grid">
        <ScrollReveal className="about__visual"><div className="about__image-frame"><ResponsiveImage photo={photos[2]} sizes="(max-width: 700px) 100vw, 45vw" /></div></ScrollReveal>
        <ScrollReveal className="about__copy" delay={.07}><h2 id="history-title">{copy.storyTitle}</h2><p>{copy.story}</p>
          <div className="about__stats" aria-label="Datos de Jalisco"><div className="about__stats-grid">{storyStats.map((stat) => <div className="about__stat" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
        </ScrollReveal>
      </div>
    </section>
    <section className="home-menu section-pad" id={sectionIds.menu} aria-labelledby="home-menu-title">
      <div className="section-wrap"><ScrollReveal className="menu-heading"><h2 id="home-menu-title">{copy.menuTitle}</h2></ScrollReveal>
        <div className="menu-grid home-menu__grid">{featuredMenu.map((item, index) => <ScrollReveal key={`${item.categoria}-${item.nombre}`} delay={index * .05}>
          <a className="menu-item home-menu__item" href={orderLink(item.nombre)} {...safeExternalLink}><span className="menu-item__copy"><strong>{item.nombre}</strong><small>{item.categoria}</small></span><span className="menu-item__price">{formatPrice(item.precio)}</span></a>
        </ScrollReveal>)}</div>
        <ScrollReveal><Link className="text-link" to="/menu">Ver menú completo <ArrowUpRight size={16} /></Link></ScrollReveal>
      </div>
    </section>
    <section className="gallery-section section-pad" id={sectionIds.gallery} aria-labelledby="gallery-title">
      <div className="section-wrap"><ScrollReveal className="gallery-heading"><div><h2 id="gallery-title">{copy.galleryTitle}</h2><p className="section-lead">{copy.gallery}</p></div></ScrollReveal>
        <div className="gallery-grid">{photos.map((photo, index) => <ScrollReveal key={photo.src} delay={index * .04} className={`gallery__tile gallery__tile--tile-${index}`}><ResponsiveImage photo={photo} sizes="(max-width: 700px) 33vw, (max-width: 1100px) 50vw, 58vw" /></ScrollReveal>)}</div>
      </div>
    </section>
    <section className="instagram-section section-pad" id={sectionIds.instagram} aria-labelledby="instagram-title">
      <div className="section-wrap"><ScrollReveal className="instagram-section__heading"><h2 id="instagram-title">{copy.instagramTitle}</h2><p>{copy.instagram}</p></ScrollReveal>
        <div className="instagram-grid">{photos.map((photo, index) => <m.a className="instagram-grid__tile" key={photo.src} href={business.instagram} {...safeExternalLink} aria-label={`Instagram ${index + 1}: ${photo.alt}`} initial={{ opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .38, delay: index * .045 }}><ResponsiveImage photo={photo} sizes="(max-width: 700px) 33vw, 20vw" /><span><Instagram size={18} aria-hidden="true" /></span></m.a>)}</div>
        <ScrollReveal><a className="button button--terracotta" href={business.instagram} {...safeExternalLink}><Instagram size={17} />Seguir en Instagram<ArrowUpRight size={16} /></a></ScrollReveal>
      </div>
    </section>
    <section className="location section-pad" id={sectionIds.location} aria-labelledby="location-title">
      <div className="section-wrap"><ScrollReveal className="location-heading"><h2 id="location-title">{copy.locationTitle}</h2><a className="text-link" href={locations[0].directions} {...safeExternalLink}>Abrir en Google Maps<ArrowUpRight size={16} /></a></ScrollReveal>
        {locations.map((location) => <ScrollReveal className="location__grid" delay={.05} key={location.id}><div className="map-frame"><iframe title={`Mapa de ${location.name}: ${location.address}`} src={location.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <div className="location-card"><div className="location-card__topline">{location.name}</div><div className="location-card__block"><MapPin size={20} aria-hidden="true" /><p>{location.address}</p></div><div className="location-card__block location-card__hours"><Clock3 size={20} aria-hidden="true" /><OpeningHours /></div><a className="button button--dark" href={location.directions} {...safeExternalLink}>Abrir en Google Maps<ArrowUpRight size={16} /></a></div>
        </ScrollReveal>)}
      </div>
    </section>
  </main>;
}

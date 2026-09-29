import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { business, copy, locations, safeExternalLink, whatsappReservation } from "@/data/site";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import OpeningHours from "@/components/OpeningHours";
import GoogleMapsEmbed from "@/components/GoogleMapsEmbed";

export default function Reservations() {
  const location = locations[0];
  return (
    <main id="contenido" className="reservations-page" tabIndex={-1}>
      <section className="reservations-page__hero" aria-labelledby="reservations-title">
        <span className="reservations-page__talavera" aria-hidden="true" />
        <span className="hero__paper-picado reservations-page__paper-picado" aria-hidden="true" />
        <div className="section-wrap reservations-page__hero-inner">
          <ScrollReveal className="reservations-page__copy">
            <p className="eyebrow eyebrow--light">Jalisco Mexican Grill · Lambaré</p>
            <h1 id="reservations-title">{copy.reservationsTitle}</h1>
            <p>{copy.reservations}</p>
            <div className="reservations-page__actions">
              <a className="button button--cream" href={business.reservations} {...safeExternalLink}>Reservar ahora<ArrowUpRight size={17} /></a>
              <a className="reservations-page__whatsapp" href={whatsappReservation} {...safeExternalLink}><WhatsappMark size={18} />Coordinar por WhatsApp<ArrowUpRight size={15} /></a>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reservations-hours-card" delay={.08}>
            <span className="reservations-hours-card__eyebrow"><Clock3 size={15} /> HORARIO DE ATENCIÓN</span>
            <OpeningHours />
            <div className="reservations-hours-card__place"><MapPin size={16} /><span>{location.address}</span></div>
          </ScrollReveal>
        </div>
      </section>
      <section className="reservations-page__contact section-pad">
        <div className="section-wrap reservations-page__contact-inner">
          <div><p className="eyebrow eyebrow--light">¿Tenés una consulta?</p><h2>{copy.reservationAlternative}</h2><p>Escribinos y coordinamos por el canal que te quede más cómodo.</p></div>
          <a className="button button--terracotta" href={whatsappReservation} {...safeExternalLink}><WhatsappMark />Coordinar por WhatsApp<ArrowUpRight size={17} /></a>
        </div>
      </section>
      <section className="location section-pad" aria-labelledby="reservations-location-title">
        <div className="section-wrap">
          <ScrollReveal><h2 id="reservations-location-title">{copy.locationTitle}</h2></ScrollReveal>
          <div className="location__grid">
            <GoogleMapsEmbed title={location.name} address={location.address} embedUrl={location.mapEmbed} directionsUrl={location.directions} />
            <div className="location-card">
              <div className="location-card__topline">{location.name}</div>
              <div className="location-card__block"><MapPin size={20} aria-hidden="true" /><p>{location.address}</p></div>
              <div className="location-card__block location-card__hours"><OpeningHours variant="schedule" /></div>
              <a className="button button--dark" href={location.directions} {...safeExternalLink}>Abrir en Google Maps<ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

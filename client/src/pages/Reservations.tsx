import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { business, copy, locations, safeExternalLink, whatsappReservation } from "@/data/site";
import { ScrollReveal } from "@/components/SiteLayout";

export default function Reservations() {
  return (
    <main id="contenido" className="reservations-page" tabIndex={-1}>
      <section className="reservations-page__hero">
        <span className="reservations-page__talavera" aria-hidden="true" />
        <span className="hero__paper-picado reservations-page__paper-picado" aria-hidden="true" />
        <div className="section-wrap">
          <ScrollReveal>
            <h1>{copy.reservationsTitle}</h1>
            <p>{copy.reservations}</p>
            <a className="button button--cream" href={business.reservations} {...safeExternalLink}>
              Reservar ahora<ArrowUpRight size={17} />
            </a>
          </ScrollReveal>
        </div>
      </section>
      <section className="reservations-page__contact section-pad">
        <div className="section-wrap reservations-page__contact-inner">
          <h2>{copy.reservationAlternative}</h2>
          <a className="button button--terracotta" href={whatsappReservation} {...safeExternalLink}>
            Coordinar por WhatsApp<ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="location section-pad" aria-labelledby="reservations-location-title">
        <div className="section-wrap">
          <h2 id="reservations-location-title">{copy.locationTitle}</h2>
          {locations.map((location) => (
            <div className="location__grid" key={location.id}>
              <div className="map-frame">
                <iframe
                  title={`Mapa de ${location.name}: ${location.address}`}
                  src={location.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="location-card">
                <div className="location-card__topline">{location.name}</div>
                <div className="location-card__block">
                  <MapPin size={20} aria-hidden="true" />
                  <p>{location.address}</p>
                </div>
                <div className="location-card__block">
                  <Clock3 size={20} aria-hidden="true" />
                  <div>{location.hours.map((hour) => <p key={hour}>{hour}</p>)}</div>
                </div>
                <a className="button button--dark" href={location.directions} {...safeExternalLink}>
                  Abrir en Google Maps<ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

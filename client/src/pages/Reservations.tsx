import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { business, copy, locations, safeExternalLink, whatsappReservation } from "@/data/site";
import { ScrollReveal, WhatsappMark } from "@/components/SiteLayout";
import OpeningHours from "@/components/OpeningHours";
import LocationBlock from "@/components/LocationBlock";
import TrackedLink from "@/components/TrackedLink";
import { landmark } from "@/data/site";

export default function Reservations() {
  const location = locations[0];
  return (
    <main id="contenido" className="reservations-page" tabIndex={-1}>
      <section className="reservations-page__hero" aria-labelledby="reservations-title">
        <div className="section-wrap reservations-page__hero-inner">
          <ScrollReveal className="reservations-page__copy">
            <p className="eyebrow eyebrow--light">{landmark.toLocaleUpperCase("es-PY")} · LAMBARÉ</p>
            <h1 id="reservations-title">{copy.reservationsTitle}</h1>
            <p>{copy.reservations}</p>
            <div className="reservations-page__actions">
              <TrackedLink className="button button--cream" href={business.reservations} event="reserve" aria-label="Reservar ahora en línea, se abre en una pestaña nueva" {...safeExternalLink}>Reservar ahora<ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>
              <TrackedLink className="reservations-page__whatsapp" href={whatsappReservation} event="order_whatsapp" eventData={{ location: "reservas" }} aria-label="Coordinar por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark size={18} />Coordinar por WhatsApp<ArrowUpRight size={15} aria-hidden="true" /></TrackedLink>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reservations-hours-card" delay={.08}>
            <span className="reservations-hours-card__eyebrow"><Clock3 size={15} aria-hidden="true" /> HORARIO DE ATENCIÓN</span>
            <OpeningHours variant="full" />
            <div className="reservations-hours-card__place"><MapPin size={16} aria-hidden="true" /><span>{location.address}</span></div>
          </ScrollReveal>
        </div>
      </section>
      <section className="location section-pad" aria-labelledby="reservations-location-title">
        <div className="section-wrap">
          <ScrollReveal className="location-heading"><h2 id="reservations-location-title">¿Dónde estamos?</h2></ScrollReveal>
          <ScrollReveal><LocationBlock /></ScrollReveal>
        </div>
      </section>
    </main>
  );
}

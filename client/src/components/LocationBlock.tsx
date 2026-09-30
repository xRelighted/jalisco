import { ArrowUpRight, MapPin } from "lucide-react";
import GoogleMapsEmbed from "@/components/GoogleMapsEmbed";
import OpeningHours from "@/components/OpeningHours";
import TrackedLink from "@/components/TrackedLink";
import { fullAddress, landmark, locations, safeExternalLink } from "@/data/site";

type Props = { showHours?: boolean };

export default function LocationBlock({ showHours = false }: Props) {
  const location = locations[0];
  return (
    <div className="location__grid">
      <GoogleMapsEmbed title="Mapa de Jalisco Mexican Grill en Paseo Deltoto" embedUrl={location.mapEmbed} />
      <div className="location-card">
        <div className="location-card__topline">{landmark} · Lambaré</div>
        <div className="location-card__block"><MapPin size={20} aria-hidden="true" /><p>{fullAddress}</p></div>
        {showHours && <div className="location-card__block location-card__hours"><OpeningHours variant="schedule" /></div>}
        <TrackedLink className="button button--dark" href={location.directions} event="directions" aria-label="Cómo llegar a Jalisco Mexican Grill en Paseo Deltoto, se abre en una pestaña nueva" {...safeExternalLink}>Cómo llegar<ArrowUpRight size={16} aria-hidden="true" /></TrackedLink>
      </div>
    </div>
  );
}

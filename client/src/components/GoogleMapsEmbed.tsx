import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  address: string;
  embedUrl: string;
  directionsUrl: string;
};

export default function GoogleMapsEmbed({ title, address, embedUrl, directionsUrl }: Props) {
  return (
    <div className="map-frame">
      <iframe
        title={`Mapa de ${title}: ${address}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a className="map-frame__external" href={directionsUrl} target="_blank" rel="noopener noreferrer">
        Abrir en Google Maps <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

type Props = {
  title: string;
  address: string;
  embedUrl: string;
  directionsUrl: string;
};

export default function MapFacade({ title, address, embedUrl, directionsUrl }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="map-frame" aria-label={`Mapa interactivo: ${title}`}>
        <iframe title={`Mapa de ${title}: ${address}`} src={embedUrl} loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <a className="map-frame__external" href={directionsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <ArrowUpRight size={14} /></a>
      </div>
    );
  }

  return (
    <div className="map-frame map-frame--facade">
      <div className="map-facade" aria-hidden="true">
        <span className="map-facade__road map-facade__road--one" />
        <span className="map-facade__road map-facade__road--two" />
        <span className="map-facade__road map-facade__road--three" />
        <span className="map-facade__parcel map-facade__parcel--one" />
        <span className="map-facade__parcel map-facade__parcel--two" />
        <span className="map-facade__parcel map-facade__parcel--three" />
        <span className="map-facade__pin"><MapPin size={30} fill="currentColor" /><span>Jalisco Mexican Grill</span></span>
        <span className="map-facade__address">Porvenir · Lambaré, Paraguay</span>
      </div>
      <button className="map-frame__load" type="button" onClick={() => setLoaded(true)} aria-label={`Cargar mapa interactivo de ${title}`}>
        <MapPin size={17} aria-hidden="true" /> Cargar mapa interactivo
      </button>
      <a className="map-frame__external" href={directionsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={14} /></a>
    </div>
  );
}

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  embedUrl: string;
};

export default function GoogleMapsEmbed({ title, embedUrl }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px 0px" });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="map-frame" role="region" aria-label={title}>
      {shouldLoad ? <iframe title={title} src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : (
        <div className="map-frame__placeholder" aria-hidden="true"><MapPin size={28} /></div>
      )}
    </div>
  );
}

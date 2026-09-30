import { useEffect, useState } from "react";
import { openingHours } from "@/data/hours";
import { getOpeningSnapshot, type OpeningSnapshot } from "@/lib/openNow";

type Props = { variant?: "full" | "compact" | "hero" | "schedule" | "status" };

export function OpeningStatus() {
  const [snapshot, setSnapshot] = useState<OpeningSnapshot | null>(null);
  useEffect(() => {
    const refresh = () => setSnapshot(getOpeningSnapshot(new Date()));
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);
  return <div className={`opening-hours__status${snapshot ? ` opening-hours__status--${snapshot.isOpen ? "open" : "closed"}` : " opening-hours__status--checking"}`} role="status" aria-live="polite">
    {snapshot ? <><span className="opening-hours__status-dot" aria-hidden="true" /><strong>{snapshot.status}</strong><span className="opening-hours__detail">{snapshot.detail}</span></> : <><span className="opening-hours__status-dot" aria-hidden="true" /><span className="opening-hours__status-placeholder" aria-hidden="true" /></>}
  </div>;
}

export default function OpeningHours({ variant = "full" }: Props) {
  const showStatus = variant === "full" || variant === "hero" || variant === "status";
  const compactRows = variant === "hero" || variant === "compact";
  const fullRows = variant === "full" || variant === "schedule";
  return <div className={`opening-hours opening-hours--${variant}`} aria-label="Horario de atención de Jalisco Mexican Grill">
    {showStatus && <OpeningStatus />}
    {compactRows && <div className="opening-hours__short" aria-label="Horarios">{openingHours.map((period) => <span className="opening-hours__short-line" key={period.shortLabel}>{period.shortLabel} · {period.opens} a {period.closes}</span>)}</div>}
    {fullRows && <ul className="opening-hours__list">{openingHours.map((period) => <li key={period.shortLabel}><span>{period.label}</span><span>{period.opens} a {period.closes}</span></li>)}</ul>}
  </div>;
}

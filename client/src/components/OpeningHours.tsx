import { useEffect, useState } from "react";
import { openingHours } from "@/data/hours";
import { getOpeningSnapshot, type OpeningSnapshot } from "@/lib/openNow";

type Props = { variant?: "full" | "compact" | "schedule" | "status" };

function OpeningHours({ variant = "full" }: Props) {
  const [snapshot, setSnapshot] = useState<OpeningSnapshot>(() => getOpeningSnapshot(new Date()));

  useEffect(() => {
    const refresh = () => setSnapshot(getOpeningSnapshot(new Date()));
    const timer = window.setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const status = variant !== "schedule";
  return (
    <div className={`opening-hours opening-hours--${variant}`} aria-label="Horario de atención de Jalisco Mexican Grill">
      {status && (
        <div className={`opening-hours__status opening-hours__status--${snapshot.isOpen ? "open" : "closed"}`} role="status" aria-live="polite">
          <span className="opening-hours__status-dot" aria-hidden="true" />
          <strong>{snapshot.status}</strong>
          <span className="opening-hours__detail">{snapshot.detail}</span>
        </div>
      )}
      {variant === "compact" ? (
        <p className="opening-hours__short">Lun–Jue 17:30 a 00:00 <span aria-hidden="true">·</span> Vie y Sáb 17:30 a 01:00</p>
      ) : variant === "schedule" || variant === "full" ? (
        <ul className="opening-hours__list">
          {openingHours.map((period) => (
            <li key={period.shortLabel}>
              <span>{period.label}</span>
              <span>{period.opens} a {period.closes}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default OpeningHours;

import { useEffect, useState } from "react";

type OpeningStatus = "open" | "closed";

export function getOpeningStatus(date: Date): OpeningStatus {
  // Use the visitor's device-local date and time, as specified in the brief.
  const weekday = date.getDay(); // 0 = Sunday, 1 = Monday, …, 6 = Saturday.
  const minutes = date.getHours() * 60 + date.getMinutes();
  const opensAt = 17 * 60 + 30;

  // Friday closes at 01:00 Saturday; Saturday closes at 01:00 Sunday.
  if ((weekday === 6 || weekday === 0) && minutes < 60) {
    return "open";
  }

  // Monday–Thursday close at midnight. Friday and Saturday close at 01:00.
  if (weekday >= 1 && weekday <= 6 && minutes >= opensAt) return "open";
  return "closed";
}

const statusText: Record<OpeningStatus, string> = {
  open: "Abierto ahora",
  closed: "Cerrado ahora",
};

export default function OpeningHours() {
  const [status, setStatus] = useState<OpeningStatus>(() => getOpeningStatus(new Date()));

  useEffect(() => {
    const updateStatus = () => setStatus(getOpeningStatus(new Date()));
    const timer = window.setInterval(updateStatus, 60_000);
    document.addEventListener("visibilitychange", updateStatus);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateStatus);
    };
  }, []);

  return (
    <div className="opening-hours" aria-label="Horario de atención de Jalisco Mexican Grill">
      <div className={`opening-hours__status opening-hours__status--${status}`} role="status" aria-live="polite">
        <span className="opening-hours__status-dot" aria-hidden="true" />
        {statusText[status]}
      </div>
      <table className="opening-hours__table">
        <tbody>
          <tr>
            <th scope="row">Lunes a Jueves</th>
            <td>17:30 – 00:00</td>
          </tr>
          <tr>
            <th scope="row">Viernes y Sábados</th>
            <td>17:30 – 01:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import { businessTimeZone, businessUtcOffsetMinutes, openingHours } from "@/data/hours";

export type OpeningSnapshot = {
  isOpen: boolean;
  status: "Abierto ahora" | "Cerrado ahora";
  detail: string;
  closesAt?: "00:00" | "01:00";
};

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const OPEN_MINUTES = 17 * 60 + 30;

function wallClock(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: businessTimeZone,
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
    hourCycle: "h23",
  });
  const initialParts = formatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => initialParts.find((item) => item.type === type)?.value ?? "0";
  const offsetName = initialParts.find((item) => item.type === "timeZoneName")?.value ?? "GMT";
  const offsetMatch = offsetName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  const ianaOffset = offsetMatch
    ? (offsetMatch[1] === "-" ? -1 : 1) * (Number(offsetMatch[2]) * 60 + Number(offsetMatch[3] ?? 0))
    : 0;
  // ICU data in some runtimes still reports Paraguay's retired UTC−4 winter offset.
  // Correct the instant to Paraguay's legally fixed UTC−3, then format it in the required IANA zone.
  const legalWallTime = new Date(Date.UTC(
    Number(part("year")), Number(part("month")) - 1, Number(part("day")),
    Number(part("hour")), Number(part("minute")),
  ) + (businessUtcOffsetMinutes - ianaOffset) * 60_000);
  return {
    day: WEEKDAYS[legalWallTime.getUTCDay()],
    minutes: legalWallTime.getUTCHours() * 60 + legalWallTime.getUTCMinutes(),
  };
}

function hoursFor(day: string) {
  return openingHours.find((period) => (period.days as readonly string[]).includes(day));
}

export function getOpeningSnapshot(date: Date): OpeningSnapshot {
  const { day, minutes } = wallClock(date);
  const weekdayIndex = WEEKDAYS.indexOf(day as (typeof WEEKDAYS)[number]);

  // The after-midnight hour belongs to the previous night's service: Fri→Sat, Sat→Sun.
  if (minutes < 60 && (weekdayIndex === 6 || weekdayIndex === 0)) {
    const previousDay = weekdayIndex === 6 ? "Friday" : "Saturday";
    const period = hoursFor(previousDay);
    if (period) return { isOpen: true, status: "Abierto ahora", detail: `Cierra a las ${period.closes}`, closesAt: period.closes };
  }

  const todayPeriod = hoursFor(day);
  if (todayPeriod && minutes >= OPEN_MINUTES) {
    return { isOpen: true, status: "Abierto ahora", detail: `Cierra a las ${todayPeriod.closes}`, closesAt: todayPeriod.closes };
  }

  const opensToday = Boolean(todayPeriod) && minutes < OPEN_MINUTES;
  return {
    isOpen: false,
    status: "Cerrado ahora",
    detail: opensToday ? "Abre hoy a las 17:30" : weekdayIndex === 6 ? "Abre el lunes a las 17:30" : "Abre mañana a las 17:30",
  };
}

/** Test helper for a specified local wall-clock instant in Asunción. */
export function asuncionInstant(day: (typeof WEEKDAYS)[number], time: string): Date {
  const [hour, minute] = time.split(":").map(Number);
  // The reference instant is Monday at noon in Paraguay's fixed UTC−3 zone.
  const shift = (WEEKDAYS.indexOf(day) - WEEKDAYS.indexOf("Monday") + 7) % 7;
  return new Date(Date.UTC(2026, 8, 28 + shift, hour - businessUtcOffsetMinutes / 60, minute, 0, 0));
}

export function formatHoursLine() {
  return openingHours.map((period) => `${period.label} · ${period.opens} a ${period.closes}`).join(" · ");
}

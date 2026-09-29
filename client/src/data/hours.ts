export const openingHours = [
  {
    label: "Lunes a Jueves",
    shortLabel: "Lun–Jue",
    opens: "17:30",
    closes: "00:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  {
    label: "Viernes y Sábados",
    shortLabel: "Vie y Sáb",
    opens: "17:30",
    closes: "01:00",
    days: ["Friday", "Saturday"],
  },
] as const;

export const businessTimeZone = "America/Asuncion";
// Ley paraguaya N.º 7.354/2024: UTC−3 oficial durante todo el año desde octubre de 2024.
// El offset fijo también evita que runtimes con bases IANA desactualizadas calculen UTC−4.
export const businessUtcOffsetMinutes = -180;

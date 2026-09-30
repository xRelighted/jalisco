import assert from "node:assert/strict";
import { asuncionInstant, getOpeningSnapshot } from "../client/src/lib/openNow";

const cases = [
  ["Monday", "16:00", "Cerrado ahora", "Abre hoy a las 17:30"],
  ["Monday", "17:30", "Abierto ahora", "Cierra a las 00:00"],
  ["Thursday", "23:59", "Abierto ahora", "Cierra a las 00:00"],
  ["Friday", "00:30", "Cerrado ahora", "Abre hoy a las 17:30"],
  ["Friday", "18:00", "Abierto ahora", "Cierra a las 01:00"],
  ["Saturday", "00:30", "Abierto ahora", "Cierra a las 01:00"],
  ["Saturday", "01:30", "Cerrado ahora", "Abre hoy a las 17:30"],
  ["Sunday", "00:30", "Abierto ahora", "Cierra a las 01:00"],
  ["Sunday", "12:00", "Cerrado ahora", "Abre mañana a las 17:30"],
  ["Sunday", "20:00", "Cerrado ahora", "Abre mañana a las 17:30"],
] as const;

for (const [day, time, status, detail] of cases) {
  const snapshot = getOpeningSnapshot(asuncionInstant(day, time));
  assert.equal(snapshot.status, status, `${day} ${time} status`);
  assert.equal(snapshot.detail, detail, `${day} ${time} detail`);
}
console.log(`openNow: ${cases.length}/${cases.length} casos OK (America/Asuncion).`);

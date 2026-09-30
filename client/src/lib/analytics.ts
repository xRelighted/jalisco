import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "order_whatsapp"
  | "order_dish"
  | "order_pedidosya"
  | "reserve"
  | "directions"
  | "instagram"
  | "share_menu";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, string | number | boolean | null>) {
  try {
    track(event, data);
  } catch {
    // Analytics must never block navigation or ordering.
  }
}

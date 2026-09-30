import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  eventData?: Record<string, string | number | boolean | null>;
};

export default function TrackedLink({ event, eventData, onClick, ...props }: Props) {
  const handleClick = (click: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, eventData);
    onClick?.(click);
  };
  return <a {...props} onClick={handleClick} />;
}

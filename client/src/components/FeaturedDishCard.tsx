import { ArrowUpRight } from "lucide-react";
import { individualOrderLink, formatPrice } from "@/data/site";
import { featuredMedia } from "@/data/media";
import type { FeaturedDish } from "@/data/featured";
import TrackedLink from "@/components/TrackedLink";

type Props = { dish: FeaturedDish };

export default function FeaturedDishCard({ dish }: Props) {
  const media = featuredMedia[dish.imageKey];
  const href = individualOrderLink(dish.nombre);
  return (
    <article className="featured-dish-card" style={{ "--featured-focal": dish.focalPoint } as React.CSSProperties}>
      <picture className="featured-dish-card__photo">
        <source type="image/avif" srcSet={media.avifSet} sizes="(max-width: 640px) 82vw, (max-width: 1000px) 44vw, 25vw" />
        <source type="image/webp" srcSet={media.webpSet} sizes="(max-width: 640px) 82vw, (max-width: 1000px) 44vw, 25vw" />
        <img src={media.webp1024} width="1024" height="768" alt={dish.alt} loading="lazy" decoding="async" />
        <span className="featured-dish-card__price">{formatPrice(dish.precio)}</span>
        {dish.editorialBadge && <span className="featured-dish-card__editorial-badge">{dish.editorialBadge}</span>}
      </picture>
      <div className="featured-dish-card__copy">
        <h3>{dish.nombre}</h3>
        <p className="featured-dish-card__description">{dish.descripcion}</p>
        <TrackedLink className="featured-dish-card__order" href={href} event="order_dish" eventData={{ dish: dish.nombre }} aria-label={`Pedir este: ${dish.nombre} por WhatsApp, se abre en una pestaña nueva`} target="_blank" rel="noopener noreferrer">Pedir este<ArrowUpRight size={16} aria-hidden="true" /></TrackedLink>
      </div>
    </article>
  );
}

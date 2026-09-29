import { ArrowUpRight } from "lucide-react";
import { individualOrderLink, formatPrice, safeExternalLink } from "@/data/site";
import { featuredMedia } from "@/data/media";
import type { FeaturedDish } from "@/data/featured";

type Props = { dish: FeaturedDish };

export default function FeaturedDishCard({ dish }: Props) {
  const media = featuredMedia[dish.imageKey];
  return (
    <article className="featured-dish-card" style={{ "--featured-focal": dish.focalPoint } as React.CSSProperties}>
      <a className="featured-dish-card__photo" href={individualOrderLink(dish.nombre)} {...safeExternalLink} aria-label={`Pedir ${dish.nombre} por WhatsApp`}>
        <picture>
          <source type="image/avif" srcSet={media.avifSet} sizes="(max-width: 640px) 86vw, (max-width: 1000px) 44vw, 25vw" />
          <source type="image/webp" srcSet={media.webpSet} sizes="(max-width: 640px) 86vw, (max-width: 1000px) 44vw, 25vw" />
          <img src={media.webp1024} width="1024" height="768" alt={dish.alt} loading="lazy" decoding="async" />
        </picture>
        <span className="featured-dish-card__price">{formatPrice(dish.precio)}</span>
        {dish.recomendadoPorLaCasa && <span className="featured-dish-card__ribbon">Recomendado por la casa</span>}
      </a>
      <div className="featured-dish-card__copy">
        <p className="featured-dish-card__category">{dish.category}</p>
        <h3>{dish.nombre}</h3>
        <p className="featured-dish-card__description">{dish.descripcion}</p>
        <a className="featured-dish-card__order" href={individualOrderLink(dish.nombre)} {...safeExternalLink}>Pedir este<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

import type { ResponsivePhoto } from "@/data/site";

type Props = {
  photo: ResponsivePhoto;
  alt?: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ResponsiveImage({
  photo,
  alt = photo.alt,
  className,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
}: Props) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={photo.avifSet} sizes={sizes} />
      <source type="image/webp" srcSet={photo.webpSet} sizes={sizes} />
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

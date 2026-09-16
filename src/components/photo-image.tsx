import type { Photo } from "@/lib/program-media";
import { photoSrc, photoSrcSet } from "@/lib/program-media";

/**
 * Every photograph on the marketing pages goes through here, so the responsive
 * WebP set is used consistently and no page can quietly fall back to serving a
 * 1 MB source file.
 *
 * `sizes` is required because getting it wrong is the one mistake srcset cannot
 * recover from — the browser picks its width from this before layout exists.
 * Set `priority` only for an image above the fold.
 */
export function PhotoImage({
  photo,
  sizes,
  alt = "",
  className,
  priority = false,
}: {
  photo: Photo;
  sizes: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={photoSrc(photo)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      className={className}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

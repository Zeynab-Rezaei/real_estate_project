import { imageSrcSet, imageUrl } from '../../lib/images.js';

/**
 * Responsive, lazy-loaded architectural photograph.
 * `priority` is reserved for the hero image above the fold.
 */
export default function Photo({ id, alt, sizes = '100vw', priority = false, className }) {
  return (
    <img
      className={className}
      src={imageUrl(id, 1200)}
      srcSet={imageSrcSet(id)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

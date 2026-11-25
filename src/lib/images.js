const UNSPLASH = 'https://images.unsplash.com/photo-';

/** Build an optimized Unsplash URL for a stored photo id. */
export function imageUrl(id, width = 1200, quality = 74) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/** Responsive srcset for a stored photo id. */
export function imageSrcSet(id, widths = [640, 900, 1200, 1600, 2200]) {
  return widths.map((width) => `${imageUrl(id, width)} ${width}w`).join(', ');
}

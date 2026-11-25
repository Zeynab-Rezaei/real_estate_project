import { useRef } from 'react';
import PropertyCard from './PropertyCard.jsx';
import { ArrowLeft, ArrowRight } from './ui/Icons.jsx';

/**
 * Snap-scrolling property carousel with mouse drag, touch swipe,
 * arrow controls (looping) and keyboard arrows.
 */
export default function PropertyCarousel({ items, ariaLabel = 'Featured properties' }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const suppressClick = useRef(0);

  const cardStep = () => {
    const track = trackRef.current;
    const first = track?.querySelector('[data-card]');
    const gap = parseFloat(getComputedStyle(track).columnGap || '20') || 20;
    return (first?.offsetWidth || 320) + gap;
  };

  const scrollByCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 4) return;
    if (direction > 0 && track.scrollLeft >= max - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (direction < 0 && track.scrollLeft <= 8) {
      track.scrollTo({ left: max, behavior: 'smooth' });
      return;
    }
    track.scrollBy({ left: direction * cardStep(), behavior: 'smooth' });
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const track = trackRef.current;
    drag.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: false };
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startLeft - delta;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    drag.current.active = false;
    track.classList.remove('is-dragging');
    if (drag.current.moved) suppressClick.current = Date.now();
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__nav carousel__nav--prev"
        onClick={() => scrollByCards(-1)}
        aria-label="Previous properties"
      >
        <ArrowLeft />
      </button>

      <div
        className="carousel__track"
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (Date.now() - suppressClick.current < 180) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollByCards(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollByCards(-1);
          }
        }}
      >
        {items.map((property) => (
          <div className="carousel__item" data-card key={property.slug}>
            <PropertyCard property={property} variant="overlay" />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel__nav carousel__nav--next"
        onClick={() => scrollByCards(1)}
        aria-label="Next properties"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

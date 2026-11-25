import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Photo from './ui/Photo.jsx';
import { ArrowLeft, ArrowRight, Close, Expand } from './ui/Icons.jsx';

function Lightbox({ images, name, index, setIndex, onClose }) {
  const closeRef = useRef(null);

  const go = useCallback(
    (direction) => {
      setIndex((current) => (current + direction + images.length) % images.length);
    },
    [images.length, setIndex]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [go, onClose]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image gallery`}>
      <div className="lightbox__top">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button type="button" className="lightbox__close" ref={closeRef} onClick={onClose} aria-label="Close gallery">
          <Close />
        </button>
      </div>

      <div className="lightbox__stage">
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
          <ArrowLeft />
        </button>
        <img src={`https://images.unsplash.com/photo-${images[index]}?auto=format&fit=crop&w=2000&q=80`} alt={`${name} — view ${index + 1}`} />
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image">
          <ArrowRight />
        </button>
      </div>

      <div className="lightbox__thumbs">
        {images.map((image, thumbIndex) => (
          <button
            type="button"
            key={image}
            className={`lightbox__thumb ${thumbIndex === index ? 'is-active' : ''}`.trim()}
            onClick={() => setIndex(thumbIndex)}
            aria-label={`View image ${thumbIndex + 1}`}
            aria-current={thumbIndex === index}
          >
            <img src={`https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=240&q=60`} alt="" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

export default function PropertyGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;

  const go = (direction) => setIndex((current) => (current + direction + count) % count);

  return (
    <div className="gallery">
      <div className="gallery__main">
        <Photo
          id={images[index]}
          alt={`${name} — view ${index + 1} of ${count}`}
          sizes="(max-width: 900px) 100vw, 1280px"
          priority
        />
        <button
          type="button"
          className="gallery__nav gallery__nav--prev"
          onClick={() => go(-1)}
          aria-label="Previous image"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className="gallery__nav gallery__nav--next"
          onClick={() => go(1)}
          aria-label="Next image"
        >
          <ArrowRight />
        </button>
        <button type="button" className="gallery__expand" onClick={() => setOpen(true)}>
          <Expand />
          View gallery
        </button>
        <span className="gallery__count" aria-live="polite">
          {index + 1} / {count}
        </span>
      </div>

      <div className="gallery__thumbs" role="tablist" aria-label="Property images">
        {images.map((image, thumbIndex) => (
          <button
            type="button"
            key={image}
            role="tab"
            aria-selected={thumbIndex === index}
            aria-label={`Show image ${thumbIndex + 1}`}
            className={`gallery__thumb ${thumbIndex === index ? 'is-active' : ''}`.trim()}
            onClick={() => setIndex(thumbIndex)}
          >
            <Photo id={image} alt="" sizes="120px" />
          </button>
        ))}
      </div>

      {open ? (
        <Lightbox
          images={images}
          name={name}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}

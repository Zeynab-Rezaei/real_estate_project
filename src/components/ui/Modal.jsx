import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Accessible dialog shell: Escape to close, backdrop click to close,
 * focus moved into the panel and restored on close, background scroll locked.
 */
export default function Modal({ open, onClose, labelledBy, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = overflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

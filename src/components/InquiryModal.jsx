import InquiryForm from './InquiryForm.jsx';
import Modal from './ui/Modal.jsx';
import { Close } from './ui/Icons.jsx';
import { locationLabel } from '../lib/format.js';

const TITLE_ID = 'inquiry-dialog-title';

export default function InquiryModal({ open, onClose, mode = 'contact', property = null }) {
  const isViewing = mode === 'viewing';

  return (
    <Modal open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
        <Close />
      </button>
      <span className="eyebrow eyebrow--plain">
        {isViewing ? 'Schedule a viewing' : 'Contact an advisor'}
      </span>
      <h2 className="modal__title" id={TITLE_ID}>
        {property ? property.name : 'Speak with Horizon'}
      </h2>
      <p className="modal__sub">
        {property
          ? locationLabel(property.location)
          : 'Tell us what you are looking for and a senior advisor will be in touch.'}
      </p>
      <InquiryForm kind={mode} property={property} />
    </Modal>
  );
}

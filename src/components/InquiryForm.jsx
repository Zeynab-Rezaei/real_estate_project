import { useId, useState } from 'react';
import { submitInquiry } from '../lib/api.js';
import { ArrowRight, Check } from './ui/Icons.jsx';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function InquiryForm({ kind = 'contact', property = null }) {
  const uid = useId();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const isViewing = kind === 'viewing';

  async function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus('sending');
    setError('');
    try {
      await submitInquiry({
        ...data,
        kind,
        propertySlug: property?.slug || '',
      });
      setStatus('sent');
    } catch (requestError) {
      setError(requestError.message);
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="modal__success" role="status">
        <span className="modal__success-icon">
          <Check />
        </span>
        <h3 className="modal__title" style={{ margin: 0 }}>
          {isViewing ? 'Viewing requested' : 'Message sent'}
        </h3>
        <p className="text-muted" style={{ maxWidth: '38ch' }}>
          {isViewing
            ? 'Thank you — an advisor will confirm your viewing time within one business day.'
            : 'Thank you — an advisor will be in touch within one business day.'}
        </p>
      </div>
    );
  }

  return (
    <form className="modal__form" onSubmit={handleSubmit}>
      <div className="modal__row">
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-name`}>
            Full name
          </label>
          <input
            className="input"
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Jane Ellis"
            required
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-email`}>
            Email
          </label>
          <input
            className="input"
            id={`${uid}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="jane@example.com"
            required
          />
        </div>
      </div>

      <div className="modal__row">
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-phone`}>
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            className="input"
            id={`${uid}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="(555) 000-0000"
          />
        </div>
        {isViewing ? (
          <div className="field">
            <label className="field__label" htmlFor={`${uid}-date`}>
              Preferred date
            </label>
            <input
              className="input"
              id={`${uid}-date`}
              type="date"
              name="preferredDate"
              min={todayISO()}
              required
            />
          </div>
        ) : null}
      </div>

      {isViewing ? (
        <div className="field">
          <label className="field__label" htmlFor={`${uid}-time`}>
            Preferred time
          </label>
          <select className="select" id={`${uid}-time`} name="preferredTime" defaultValue="Morning">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
      ) : null}

      <div className="field">
        <label className="field__label" htmlFor={`${uid}-message`}>
          Message
        </label>
        <textarea
          className="textarea"
          id={`${uid}-message`}
          name="message"
          rows={4}
          defaultValue={
            property
              ? isViewing
                ? `I would like to arrange a viewing of ${property.name}.`
                : `I would like to know more about ${property.name}.`
              : ''
          }
          placeholder="Tell us what you are looking for…"
        />
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn btn--navy btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : isViewing ? 'Request viewing' : 'Send message'}
        <ArrowRight />
      </button>
      <p className="agent-card__note">A senior advisor replies within one business day.</p>
    </form>
  );
}

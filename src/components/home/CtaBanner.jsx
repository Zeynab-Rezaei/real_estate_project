import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight, Key } from '../ui/Icons.jsx';

export default function CtaBanner() {
  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-banner">
          <span className="cta-banner__icon" aria-hidden="true">
            <Key />
          </span>
          <div className="cta-banner__text">
            <h2 className="cta-banner__title">Ready to Find Your Perfect Property?</h2>
            <p className="cta-banner__sub">
              Let our experts guide you to the right home or investment.
            </p>
          </div>
          <Link to="/contact" className="btn btn--navy">
            Get in Touch
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

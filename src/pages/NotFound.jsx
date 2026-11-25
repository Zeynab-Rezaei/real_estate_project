import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/ui/Icons.jsx';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <span className="eyebrow">404</span>
        <h1>This page has moved on.</h1>
        <p className="text-muted">
          The address you followed is no longer here. Browse the current collection, or let us
          point you in the right direction.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--navy">
            Back home
            <ArrowRight />
          </Link>
          <Link to="/properties" className="btn btn--outline">
            View properties
          </Link>
        </div>
      </div>
    </div>
  );
}

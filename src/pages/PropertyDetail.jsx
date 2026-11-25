import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropertyGallery from '../components/PropertyGallery.jsx';
import InquiryModal from '../components/InquiryModal.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { useFavorites } from '../context/Favorites.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import {
  ArrowRight,
  Area,
  Bath,
  Bed,
  Calendar,
  Check,
  Heart,
  Mail,
  MapPin,
  Phone,
} from '../components/ui/Icons.jsx';
import { formatNumber, formatUSD, locationLabel, priceLabel } from '../lib/format.js';
import { getProperty, getSimilarProperties } from '../data/properties.js';
import { getAgent } from '../data/team.js';

function SaveButton({ property }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(property.slug);

  return (
    <button
      type="button"
      className={`detail__save ${active ? 'is-active' : ''}`.trim()}
      aria-pressed={active}
      onClick={() => {
        toggle(property.slug);
        toast(active ? 'Removed from saved properties' : `Saved ${property.name}`);
      }}
    >
      <Heart filled={active} />
      {active ? 'Saved to your collection' : 'Save this property'}
    </button>
  );
}

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = getProperty(slug);
  const [inquiry, setInquiry] = useState(null);

  if (!property) {
    return (
      <div className="not-found">
        <div className="not-found__inner">
          <span className="eyebrow">Not found</span>
          <h1>This residence is no longer listed.</h1>
          <p className="text-muted">
            It may have been sold or withdrawn. Browse the current collection to find something
            comparable.
          </p>
          <Link to="/properties" className="btn btn--navy">
            View properties
            <ArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  const agent = getAgent(property.agentId);
  const similar = getSimilarProperties(property);

  return (
    <div className="detail">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ArrowRight />
          <Link to="/properties">Properties</Link>
          <ArrowRight />
          <span className="crumbs__current" aria-current="page">
            {property.name}
          </span>
        </nav>

        <PropertyGallery images={property.images} name={property.name} />

        <div className="detail__head">
          <div>
            <span className="eyebrow eyebrow--plain">{property.type}</span>
            <h1 className="detail__title">{property.name}</h1>
            <p className="detail__loc">
              <MapPin />
              {locationLabel(property.location)}
            </p>
          </div>
          <div className="detail__price">
            <small>Asking price</small>
            {priceLabel(property.price)}
          </div>
        </div>

        <ul className="specs">
          <li className="spec">
            <Bed />
            <div>
              <div className="spec__value">{property.beds}</div>
              <div className="spec__label">Bedrooms</div>
            </div>
          </li>
          <li className="spec">
            <Bath />
            <div>
              <div className="spec__value">{property.baths}</div>
              <div className="spec__label">Bathrooms</div>
            </div>
          </li>
          <li className="spec">
            <Area />
            <div>
              <div className="spec__value">{formatNumber(property.sqft)}</div>
              <div className="spec__label">Square feet</div>
            </div>
          </li>
          <li className="spec">
            <Calendar />
            <div>
              <div className="spec__value">{property.yearBuilt}</div>
              <div className="spec__label">Year built</div>
            </div>
          </li>
        </ul>

        <div className="detail__grid">
          <div className="detail__main">
            <section aria-labelledby="about-property">
              <h2 className="detail__block-title" id="about-property">
                About this residence
              </h2>
              <p className="detail__text">{property.description}</p>
            </section>

            <section aria-labelledby="key-features">
              <h2 className="detail__block-title" id="key-features">
                Key features
              </h2>
              <ul className="feature-list">
                {property.features.map((feature) => (
                  <li key={feature}>
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="amenities">
              <h2 className="detail__block-title" id="amenities">
                Amenities
              </h2>
              <ul className="amenities">
                {property.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="property-facts">
              <h2 className="detail__block-title" id="property-facts">
                Property facts
              </h2>
              <div className="facts">
                <div className="fact">
                  <div className="fact__label">Type</div>
                  <div className="fact__value">{property.type}</div>
                </div>
                <div className="fact">
                  <div className="fact__label">Lot</div>
                  <div className="fact__value">{property.lot}</div>
                </div>
                <div className="fact">
                  <div className="fact__label">Built</div>
                  <div className="fact__value">{property.yearBuilt}</div>
                </div>
                <div className="fact">
                  <div className="fact__label">Reference</div>
                  <div className="fact__value">HP-{property.slug.slice(0, 3).toUpperCase()}{property.yearBuilt}</div>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail__aside" aria-label="Contact and save">
            <div className="agent-card">
              <div className="agent-card__price">
                <span>Asking price</span>
                <strong>{formatUSD(property.price)}</strong>
              </div>

              <div className="agent-card__person">
                <div className="agent-card__avatar">
                  <img
                    src={`https://images.unsplash.com/photo-${agent.photo}?auto=format&fit=crop&w=160&q=70`}
                    alt={`Portrait of ${agent.name}`}
                    width="58"
                    height="58"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="agent-card__name">{agent.name}</div>
                  <div className="agent-card__role">{agent.role}</div>
                </div>
              </div>

              <div className="agent-card__contact">
                <a href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}>
                  <Phone />
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`}>
                  <Mail />
                  {agent.email}
                </a>
              </div>

              <div className="agent-card__actions">
                <button
                  type="button"
                  className="btn btn--navy btn--block"
                  onClick={() => setInquiry('contact')}
                >
                  Contact agent
                  <ArrowRight />
                </button>
                <button
                  type="button"
                  className="btn btn--outline btn--block"
                  onClick={() => setInquiry('viewing')}
                >
                  <Calendar />
                  Schedule a viewing
                </button>
              </div>

              <p className="agent-card__note">Typically replies within one business day.</p>
            </div>

            <SaveButton property={property} />
          </aside>
        </div>

        <section className="similar" aria-labelledby="similar-title">
          <div className="similar__head">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 className="section-head__title" id="similar-title">
                Similar properties
              </h2>
            </div>
            <Link to="/properties" className="text-link">
              View all properties
              <ArrowRight />
            </Link>
          </div>

          <div className="similar__grid">
            {similar.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60}>
                <PropertyCard property={item} variant="panel" />
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <div className="detail-bar">
        <div className="detail-bar__price">
          <strong>{priceLabel(property.price)}</strong>
          <span>{property.location.city}</span>
        </div>
        <button type="button" className="btn btn--navy" onClick={() => setInquiry('contact')}>
          Contact
          <ArrowRight />
        </button>
      </div>

      <InquiryModal
        open={inquiry !== null}
        mode={inquiry || 'contact'}
        property={property}
        onClose={() => setInquiry(null)}
      />
    </div>
  );
}

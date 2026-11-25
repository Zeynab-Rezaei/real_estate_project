import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';
import Photo from './ui/Photo.jsx';
import { ArrowUpRight, Bath, Bed, Area, MapPin } from './ui/Icons.jsx';
import { formatNumber, locationLabel, priceLabel } from '../lib/format.js';

export default function PropertyCard({ property, variant = 'overlay', sizes }) {
  const to = `/properties/${property.slug}`;
  const alt = `${property.name}, ${property.location.city}, ${property.location.region}`;

  if (variant === 'panel') {
    return (
      <article className="pcard pcard--panel">
        <Link to={to} className="pcard__link">
          <div className="pcard__media">
            <Photo
              id={property.images[0]}
              alt={alt}
              sizes={sizes || '(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw'}
            />
          </div>
          <div className="pcard__body">
            <div className="pcard__meta">
              <span className="pcard__type">{property.type}</span>
              <span className="pcard__price pcard__price--dark">{priceLabel(property.price)}</span>
            </div>
            <h3 className="pcard__name">{property.name}</h3>
            <p className="pcard__loc">
              <MapPin />
              {locationLabel(property.location)}
            </p>
            <ul className="pcard__specs">
              <li className="pcard__spec">
                <Bed />
                {property.beds} bd
              </li>
              <li className="pcard__spec">
                <Bath />
                {property.baths} ba
              </li>
              <li className="pcard__spec">
                <Area />
                {formatNumber(property.sqft)} sq ft
              </li>
            </ul>
          </div>
        </Link>
        <FavoriteButton slug={property.slug} name={property.name} variant="panel" />
      </article>
    );
  }

  return (
    <article className="pcard pcard--overlay">
      <Link to={to} className="pcard__link">
        <div className="pcard__media">
          <Photo
            id={property.images[0]}
            alt={alt}
            sizes={sizes || '(max-width: 767px) 78vw, 27vw'}
          />
        </div>
        <div className="pcard__scrim" aria-hidden="true" />
        <span className="pcard__chip">{property.type}</span>
        <div className="pcard__body">
          <h3 className="pcard__name">{property.name}</h3>
          <p className="pcard__loc">
            <MapPin />
            {locationLabel(property.location)}
          </p>
          <div className="pcard__price-row">
            <span className="pcard__price">{priceLabel(property.price)}</span>
            <span className="pcard__go" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
      <FavoriteButton slug={property.slug} name={property.name} />
    </article>
  );
}

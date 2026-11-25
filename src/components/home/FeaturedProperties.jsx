import { Link } from 'react-router-dom';
import { properties } from '../../data/properties.js';
import PropertyCarousel from '../PropertyCarousel.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight } from '../ui/Icons.jsx';

export default function FeaturedProperties() {
  const featured = properties.filter((property) => property.featured);

  return (
    <section className="section featured" aria-labelledby="featured-title">
      <div className="container">
        <Reveal className="featured__head">
          <span className="eyebrow">Featured</span>
          <h2 className="section-head__title" id="featured-title">
            Featured Properties
          </h2>
          <p className="section-head__text">
            A short list of residences that define our collection — each chosen for architecture,
            setting and light.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <PropertyCarousel items={featured} ariaLabel="Featured properties" />
        </Reveal>

        <div className="carousel__footer">
          <Link to="/properties" className="text-link">
            View all properties
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

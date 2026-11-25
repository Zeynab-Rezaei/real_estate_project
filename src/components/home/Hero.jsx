import { site } from '../../data/site.js';
import Photo from '../ui/Photo.jsx';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo id={site.heroImage} alt={site.heroAlt} sizes="100vw" priority className="hero__img" />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__content">
        <h1 className="hero__title" id="hero-title">
          Discover Exceptional Homes &amp; Investments
        </h1>
        <p className="hero__sub">
          Premium properties in prime locations. Find your dream home or the perfect investment
          with confidence.
        </p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/site.js';
import Photo from '../ui/Photo.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ArrowUpRight } from '../ui/Icons.jsx';

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section services" aria-labelledby="services-title">
      <div className="container services__grid">
        <div>
          <Reveal className="section-head">
            <span className="eyebrow">Services</span>
            <h2 className="section-head__title" id="services-title">
              Considered guidance, end to end.
            </h2>
            <p className="section-head__text">
              Acquisition, valuation, marketing and relocation — handled by one senior advisor,
              supported by the full studio.
            </p>
          </Reveal>

          <div className="services__list">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                to={`/services#${service.slug}`}
                className="service-row"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="service-row__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-row__body">
                  <span className="service-row__title">{service.title}</span>
                  <span className="service-row__blurb">{service.blurb}</span>
                </span>
                <span className="service-row__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Reveal className="services__media" delay={140}>
          {services.map((service, index) => (
            <Photo
              key={service.slug}
              id={service.image}
              alt={service.title}
              className={index === active ? 'is-active' : ''}
              sizes="(max-width: 980px) 0px, 34vw"
            />
          ))}
          <div className="services__media-caption">
            <span>{String(active + 1).padStart(2, '0')}</span>
            {services[active].title}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

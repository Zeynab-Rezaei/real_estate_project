import { Link } from 'react-router-dom';
import { differentiators, stats } from '../../data/site.js';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight } from '../ui/Icons.jsx';

export default function WhyHorizon() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container">
        <div className="why__grid">
          <Reveal className="why__body">
            <span className="eyebrow">Why Horizon</span>
            <h2 className="section-head__title" id="why-title">
              A quieter way to buy exceptionally well.
            </h2>
            <p className="lead">
              We are not a listings portal. We are a small advisory studio that represents a
              handful of properties at a time, and knows each one intimately.
            </p>
            <div>
              <Link to="/contact" className="btn btn--navy">
                Speak with an advisor
                <ArrowRight />
              </Link>
            </div>
          </Reveal>

          <div className="why__list">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} className="why-item" delay={index * 80}>
                <span className="why-item__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="why-item__title">{item.title}</h3>
                <p className="why-item__text">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__value">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

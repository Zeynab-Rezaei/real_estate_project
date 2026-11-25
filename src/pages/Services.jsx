import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import Photo from '../components/ui/Photo.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { ArrowRight } from '../components/ui/Icons.jsx';
import { services } from '../data/site.js';

const process = [
  {
    title: 'Introduction',
    text: 'A conversation about what you are looking for, your timeline and how you want to own.',
  },
  {
    title: 'Curated shortlist',
    text: 'A considered selection of on- and off-market residences, presented with full context.',
  },
  {
    title: 'Closing',
    text: 'Negotiation, due diligence and coordination with your legal and financial advisors.',
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory for every stage of ownership."
        image="1449844908441-8829872d2607"
      >
        <p>
          Acquisition, investment, marketing, valuation and relocation — delivered by one senior
          advisor, supported by the full studio.
        </p>
      </PageHero>

      <section className="section section--white">
        <div className="container">
          <div className="service-details">
            {services.map((service, index) => (
              <Reveal key={service.slug} id={service.slug} className="service-detail">
                <div className="service-detail__body">
                  <span className="service-detail__num">
                    {String(index + 1).padStart(2, '0')} — Service
                  </span>
                  <h2 className="service-detail__title">{service.title}</h2>
                  <p className="service-detail__text">{service.blurb}</p>
                  <p className="service-detail__text text-muted">{service.detail}</p>
                  <Link to="/contact" className="text-link">
                    Discuss this service
                    <ArrowRight />
                  </Link>
                </div>
                <div className="service-detail__media">
                  <Photo
                    id={service.image}
                    alt={service.title}
                    sizes="(max-width: 860px) 100vw, 45vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 'clamp(28px, 3.6vw, 48px)' }}>
            <span className="eyebrow">How we work</span>
            <h2 className="section-head__title">Three steps, no noise.</h2>
          </div>
          <div className="process">
            {process.map((step, index) => (
              <Reveal key={step.title} className="process__step" delay={index * 80}>
                <span className="process__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__text">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import { Link } from 'react-router-dom';
import Photo from '../ui/Photo.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight } from '../ui/Icons.jsx';

export default function AboutSection() {
  return (
    <section className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__body">
          <span className="eyebrow">About us</span>
          <h2 className="about__title" id="about-title">
            Who We Are
          </h2>
          <p className="about__text">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <p className="about__text">
            Founded in Austin in 2008, our advisors work across the country’s most considered
            addresses — from lakefront modernism to quiet canyon retreats. We take on fewer
            clients, so each one receives the attention a significant purchase deserves.
          </p>
          <div>
            <Link to="/about" className="btn btn--navy">
              Learn More
              <ArrowRight />
            </Link>
          </div>
          <div className="about__signature">
            <span className="about__signature-line" aria-hidden="true" />
            <div>
              <strong>Daniel Morgan</strong>
              Founder &amp; Managing Director
            </div>
          </div>
        </Reveal>

        <Reveal className="about__media" delay={120}>
          <Link to="/properties" className="about__frame about__frame--main">
            <Photo
              id="1600585154340-be6161a56a0c"
              alt="Modern white villa with a pool and landscaped garden"
              sizes="(max-width: 900px) 60vw, 32vw"
            />
          </Link>
          <Link to="/properties" className="about__frame about__frame--side">
            <Photo
              id="1600210492486-724fe5c67fb0"
              alt="Warm contemporary living room with large windows"
              sizes="(max-width: 900px) 34vw, 17vw"
            />
          </Link>
          <Link to="/about" className="about__arrow" aria-label="Learn more about Horizon Properties">
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

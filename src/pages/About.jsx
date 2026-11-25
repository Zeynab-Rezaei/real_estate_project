import PageHero from '../components/ui/PageHero.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import WhyHorizon from '../components/home/WhyHorizon.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import Photo from '../components/ui/Photo.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { Check } from '../components/ui/Icons.jsx';
import { site } from '../data/site.js';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Horizon"
        title="Quietly exceptional property, thoughtfully represented."
        image={site.heroImage}
      >
        <p>
          Horizon Properties is an independent advisory for buyers, sellers and investors of
          architecturally significant homes. We work with a small number of clients at a time, so
          every decision receives senior attention.
        </p>
      </PageHero>

      <AboutSection />

      <section className="section section--mist">
        <div className="container">
          <div className="editorial-split">
            <Reveal className="editorial-split__media">
              <Photo
                id="1600566753086-00f18fb6b3ea"
                alt="Considered interior with natural stone and warm timber"
                sizes="(max-width: 860px) 100vw, 46vw"
              />
            </Reveal>
            <Reveal className="editorial-split__body" delay={110}>
              <span className="eyebrow">Our approach</span>
              <h2 className="section-head__title">A studio, not a listings portal.</h2>
              <p className="lead">
                We began in 2008 with a simple idea: that a significant property purchase deserves
                the same care as the architecture itself. Today that means fewer listings, deeper
                knowledge of each home, and a single advisor who stays with you from first viewing
                to keys.
              </p>
              <ul className="feature-list">
                <li>
                  <Check />
                  Independent advice — never a sales target
                </li>
                <li>
                  <Check />
                  Private access to off-market residences
                </li>
                <li>
                  <Check />
                  Discreet handling of confidential sales
                </li>
                <li>
                  <Check />
                  One senior advisor from start to finish
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyHorizon />
      <TeamSection />
      <CtaBanner />
    </>
  );
}

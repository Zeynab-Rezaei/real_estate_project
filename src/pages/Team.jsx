import PageHero from '../components/ui/PageHero.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';
import { team } from '../data/team.js';

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="A small team, deliberately."
        image="1560448204-e02f11c3d0e2"
      >
        <p>
          Four senior advisors, one shared standard. Each client works directly with a principal —
          never a call centre, never a hand-off.
        </p>
      </PageHero>

      <TeamSection />

      <section className="section section--mist">
        <div className="container">
          <div className="editorial-split">
            <div className="section-head">
              <span className="eyebrow">Working with us</span>
              <h2 className="section-head__title">Direct access to the people doing the work.</h2>
              <p className="section-head__text">
                Every advisor at Horizon handles a limited number of clients at once. That means
                you can reach the person who knows your property — by phone, on the day you call.
              </p>
            </div>
            <ul className="team-notes">
              {team.map((member) => (
                <li key={member.id}>
                  <strong>{member.name}</strong>
                  <span>{member.bio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import { Link } from 'react-router-dom';
import { team } from '../../data/team.js';
import Photo from '../ui/Photo.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ArrowRight, Mail, Phone } from '../ui/Icons.jsx';

export default function TeamSection() {
  return (
    <section className="section team" aria-labelledby="team-title">
      <div className="container">
        <div className="team__head">
          <Reveal className="section-head">
            <span className="eyebrow">Our team</span>
            <h2 className="section-head__title" id="team-title">
              Advisors, not agents.
            </h2>
          </Reveal>
          <Link to="/team" className="text-link">
            Meet the team
            <ArrowRight />
          </Link>
        </div>

        <div className="team__grid">
          {team.map((member, index) => (
            <Reveal key={member.id} className="team-card" delay={index * 70}>
              <div className="team-card__media">
                <Photo
                  id={member.photo}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <div className="team-card__links">
                  <a
                    className="team-card__link"
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail />
                  </a>
                  <a
                    className="team-card__link"
                    href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

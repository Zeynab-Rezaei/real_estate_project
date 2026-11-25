import PageHero from '../components/ui/PageHero.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import Photo from '../components/ui/Photo.jsx';
import { Clock, Mail, MapPin, Phone } from '../components/ui/Icons.jsx';
import { site } from '../data/site.js';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s find your next address."
        image="1600607687939-ce8a6c25118c"
      >
        <p>
          Whether you are buying, selling or simply exploring the market, a senior advisor will
          reply within one business day.
        </p>
      </PageHero>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Austin studio</span>
            <h2 className="section-head__title">Come and see us.</h2>
            <p className="lead">
              Our studio sits just off Canyon Ridge Drive, a few minutes from the lake. Visits are
              by appointment so we can give you our full attention.
            </p>

            <ul className="contact-list">
              <li>
                <span className="contact-list__icon" aria-hidden="true">
                  <MapPin />
                </span>
                <div>
                  <strong>Office</strong>
                  {site.address}
                </div>
              </li>
              <li>
                <span className="contact-list__icon" aria-hidden="true">
                  <Phone />
                </span>
                <div>
                  <strong>Phone</strong>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon" aria-hidden="true">
                  <Mail />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon" aria-hidden="true">
                  <Clock />
                </span>
                <div>
                  <strong>Hours</strong>
                  {site.hours}
                </div>
              </li>
            </ul>

            <div className="contact-info__media">
              <Photo
                id="1600585153490-76fb20a32601"
                alt="Horizon Properties studio exterior in the late afternoon"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </div>

          <div className="contact-card">
            <span className="eyebrow">Enquiry</span>
            <h2 className="section-head__title">Send us a message</h2>
            <p className="text-muted">
              Tell us a little about what you are looking for and we will match you with the right
              advisor.
            </p>
            <InquiryForm kind="contact" />
          </div>
        </div>
      </section>
    </>
  );
}

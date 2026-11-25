import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems, services, site } from '../data/site.js';
import { subscribeNewsletter } from '../lib/api.js';
import Logo from './Logo.jsx';
import { socialIcons } from './ui/Icons.jsx';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await subscribeNewsletter(email);
      setStatus('sent');
      setEmail('');
    } catch (requestError) {
      setError(requestError.message);
      setStatus('idle');
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__desc">
              An independent real estate advisory representing exceptional homes and considered
              investments across the United States.
            </p>
            <div className="footer__socials">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    className="footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Horizon Properties on ${social.label}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer — explore">
            <h3 className="footer__heading">Explore</h3>
            <div className="footer__links">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer — services">
            <h3 className="footer__heading">Services</h3>
            <div className="footer__links">
              {services.slice(0, 5).map((service) => (
                <Link key={service.slug} to={`/services#${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h3 className="footer__heading">Contact</h3>
            <div className="footer__contact">
              <div>
                <span>Phone</span>
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
              <div>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <span>Office</span>
                {site.address}
              </div>
              <div>
                <span>Hours</span>
                {site.hours}
              </div>
            </div>
          </div>

          <div className="footer__newsletter">
            <h3 className="footer__heading">Newsletter</h3>
            <p className="footer__newsletter-text">
              New residences and market notes, sent occasionally.
            </p>
            <form className="footer__form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                className="input"
                type="email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="btn btn--champagne" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? '…' : 'Join'}
              </button>
            </form>
            {status === 'sent' ? (
              <p className="footer__note" role="status">
                Thank you — you’re on the list.
              </p>
            ) : null}
            {error ? (
              <p className="footer__note" role="alert" style={{ color: '#f0b7a9' }}>
                {error}
              </p>
            ) : null}
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p>Licensed real estate brokerage · Texas #9014472</p>
        </div>
      </div>
    </footer>
  );
}

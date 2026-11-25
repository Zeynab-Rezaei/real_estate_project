import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site.js';
import Logo from './Logo.jsx';
import { Close, Menu, Phone } from './ui/Icons.jsx';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = !isHome || scrolled;

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <nav className="header__nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`.trim()}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={site.phoneHref}>
            <Phone />
            {site.phone}
          </a>
          <button
            type="button"
            className="header__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`.trim()}
              style={{ animationDelay: `${80 + index * 55}ms` }}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <span>{String(index + 1).padStart(2, '0')}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          <div className="mobile-menu__contact">
            <span className="mobile-menu__label">Speak with us</span>
            <a href={site.phoneHref} tabIndex={open ? 0 : -1}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
              {site.email}
            </a>
            <span>{site.address}</span>
          </div>
          <NavLink
            to="/contact"
            className="btn btn--champagne btn--block"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Book a consultation
          </NavLink>
        </div>
      </div>
    </header>
  );
}

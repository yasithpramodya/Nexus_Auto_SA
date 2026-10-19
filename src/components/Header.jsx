import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { PhoneIcon, MapPinIcon, ArrowRightIcon, MailIcon } from './Icons.jsx';
import nexusEmblem from '../assets/logo/nexus-emblem.svg';

const links = [
  { to: '/',              label: 'Home' },
  { to: '/vehicles',      label: 'Import Catalog' },
  { to: '/what-we-offer', label: 'How It Works' },
  { to: '/about',         label: 'About Us' },
  { to: '/contact',       label: 'Contact' },
];

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close nav on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Track scroll for frosted glass header effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav when resizing to desktop (>= 992px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile nav on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="topbar" role="banner">
        <div className="wrap topbar-inner">
          <div className="topbar-left">
            <a href={`tel:${business.phone.replace(/\s/g,'')}`} className="topbar-link">
              <PhoneIcon size={12} />
              <span>{business.phone}</span>
            </a>
            <span className="topbar-sep">·</span>
            <span className="topbar-desc">Direct Japanese Imports (Order on Request)</span>
          </div>
          <div className="topbar-right">
            <span className="topbar-location">
              <MapPinIcon size={12} />
              <span>Australia &amp; Sri Lanka Operations</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap header-inner">

          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setOpen(false)} aria-label={`${business.name} — home`}>
            <div className="logo-emblem-wrap" aria-hidden="true">
              <img src={nexusEmblem} alt="" className="logo-emblem-img" />
            </div>
            <div className="logo-text-group">
              <span className="logo-name">{business.name}</span>
              <span className="logo-tagline">
                <span className="logo-accent">Japanese Imports</span> · AU &amp; LK
              </span>
            </div>
          </Link>

          {/* Desktop & Mobile Navigation Menu */}
          <nav
            id="main-nav"
            className={`nav${open ? ' open' : ''}`}
            aria-label="Main navigation"
          >
            <div className="nav-links-wrap">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span>{l.label}</span>
                  <span className="nav-link-arrow" aria-hidden="true">›</span>
                </NavLink>
              ))}
            </div>

            <div className="nav-cta">
              <Link
                className="btn btn-primary btn-sm"
                to="/request-a-car"
                id="header-cta"
                onClick={() => setOpen(false)}
              >
                <span>Request a Car</span>
                <ArrowRightIcon size={13} />
              </Link>
            </div>

            {/* Quick contact actions in mobile drawer */}
            <div className="mobile-nav-contact">
              <a href={`tel:${business.phone.replace(/\s/g,'')}`} className="mobile-contact-pill">
                <PhoneIcon size={13} />
                <span>Call {business.phone}</span>
              </a>
              <a href={`mailto:${business.email}`} className="mobile-contact-pill">
                <MailIcon size={13} />
                <span>Email Us</span>
              </a>
            </div>
          </nav>

          {/* Hamburger button */}
          <button
            className={`menu-btn${open ? ' open' : ''}`}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>

        {/* Backdrop for mobile drawer */}
        <div
          className={`nav-backdrop${open ? ' open' : ''}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      </header>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { PhoneIcon, MapPinIcon, ArrowRightIcon } from './Icons.jsx';
import nexusEmblem from '../assets/logo/nexus-emblem.svg';

const links = [
  { to: '/',        label: 'Home'     },
  { to: '/vehicles', label: 'Vehicles' },
  { to: '/about',   label: 'About Us' },
  { to: '/contact', label: 'Contact'  },
];

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 700) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="topbar" role="banner">
        <div className="wrap topbar-inner">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <PhoneIcon size={12} />
            <a href={`tel:${business.phone.replace(/\s/g,'')}`}>{business.phone}</a>
            <span style={{ opacity: 0.5 }}>·</span>
            {business.licence}
          </span>
          <span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <MapPinIcon size={12} />
              {business.address}
            </a>
          </span>
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
            <span>
              <div className="logo-name">{business.name}</div>
              <div className="logo-tagline">
                <span style={{ color: 'var(--red)', fontWeight: 700 }}>Experience Excellence</span> · Adelaide
              </div>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            id="main-nav"
            className={`nav${open ? ' open' : ''}`}
            aria-label="Main navigation"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="nav-cta">
              <Link
                className="btn btn-primary btn-sm"
                to="/contact"
                id="header-cta"
                onClick={() => setOpen(false)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <span>Get in touch</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>
          </nav>

          {/* Hamburger */}
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
      </header>
    </>
  );
}

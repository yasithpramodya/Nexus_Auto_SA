import { Link } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from './Icons.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">

          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" className="logo" aria-label={business.name}>
              <span className="logo-icon" aria-hidden="true">N</span>
              <span>
                <div className="logo-name">{business.name}</div>
                <div className="logo-tagline">Import · Sales · Adelaide</div>
              </span>
            </Link>
            <p className="footer-brand-text">
              Locally owned Japanese vehicle importer and dealer in Adelaide. Hand-picked JDM icons, luxury sedans, and rare classics sourced directly from Japan.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook" title="Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram" title="Instagram">
                <InstagramIcon size={16} />
              </a>
              <a href={`mailto:${business.email}`} className="social-btn" aria-label="Email us" title="Email">
                <MailIcon size={16} />
              </a>
              <a href={`tel:${business.phone.replace(/\s/g,'')}`} className="social-btn" aria-label="Call us" title="Phone">
                <PhoneIcon size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vehicles">Showroom Vehicles</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact &amp; Location</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Direct Auction Imports</li>
              <li>ADR Compliance &amp; SA Rego</li>
              <li>Pre-Delivery Service &amp; Detail</li>
              <li>Private Yard Test Drives</li>
              <li>Nationwide Enclosed Transport</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${business.phone.replace(/\s/g,'')}`}>{business.phone}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>{business.address}</li>
              <li style={{ marginTop: 8, color: 'var(--ink-3)' }}>
                Mon–Fri 8:30am–5:30pm<br />
                Sat 9:00am–4:00pm
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {year} {business.name}. All rights reserved.</span>
          <span>
            {business.licence} · Adelaide, South Australia
          </span>
        </div>
      </div>
    </footer>
  );
}

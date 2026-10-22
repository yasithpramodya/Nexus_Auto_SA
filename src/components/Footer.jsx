import { Link } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from './Icons.jsx';
import nexusEmblem from '../assets/logo/nexus-emblem.svg';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">

          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" className="logo" aria-label={business.name}>
              <div className="logo-emblem-wrap" aria-hidden="true">
                <img src={nexusEmblem} alt="" className="logo-emblem-img" />
              </div>
              <span>
                <div className="logo-name">{business.name}</div>
                <div className="logo-tagline">
                  <span style={{ color: 'var(--red)', fontWeight: 700 }}>Japanese Imports</span> · Australia &amp; Sri Lanka
                </div>
              </span>
            </Link>
            <p className="footer-brand-text">
              Connecting customers in Australia and Sri Lanka with quality used vehicles and Japanese imports. We help customers discover vehicles that suit their lifestyle, needs, and budgets.
            </p>
            <p className="footer-brand-text footer-license">Licence ID: {business.dealerLicense}</p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook" title="Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram" title="Instagram">
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
            <h4>Quick Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/import">Import</Link></li>
              <li><Link to="/finance">Finance</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="footer-col">
            <h4>Vehicle Categories</h4>
            <ul>
              <li><Link to="/vehicles?category=Hatchbacks">Fuel-Efficient Hatchbacks</Link></li>
              <li><Link to="/vehicles?category=Sedans">Comfortable Sedans</Link></li>
              <li><Link to="/vehicles?category=SUVs">Spacious SUVs</Link></li>
              <li><Link to="/vehicles?category=Family">Family Vehicles</Link></li>
              <li><Link to="/vehicles?category=Specialty">Japanese Imports</Link></li>
            </ul>
          </div>

          {/* Regional Operations & Contact */}
          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul>
              <li>
                <a href={`tel:${business.phone.replace(/\s/g,'')}`}>{business.phone}</a>
              </li>
              <li>
                <a href={`tel:${business.mobile.replace(/\s/g,'')}`}>{business.mobile}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li style={{ marginTop: 8, color: 'var(--ink-2)' }}>
                Operating in Australia &amp; Sri Lanka
              </li>
              <li style={{ marginTop: 12 }}>
                <Link to="/admin" style={{ fontSize: '11.5px', color: 'var(--ink-3)', textDecoration: 'underline' }}>
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {year} {business.name}. Bringing Quality Japanese Cars Closer to You.</span>
          <span>
            Quality Used Cars &amp; Japanese Vehicle Imports · Australia &amp; Sri Lanka
          </span>
        </div>
      </div>
    </footer>
  );
}

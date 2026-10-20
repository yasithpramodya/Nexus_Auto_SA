import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';
import { business } from '../data/vehicles.js';
import { WrenchIcon, PhoneIcon, ArrowRightIcon } from '../components/Icons.jsx';

export default function Finance() {
  const heroRef = useReveal();

  return (
    <section
      className="page-hero"
      ref={heroRef}
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: '80px',
      }}
    >
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="wrap" style={{ width: '100%' }}>
        <div
          className="glass-card reveal"
          style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '56px 40px',
            textAlign: 'center',
            border: '1px solid var(--border-2)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 40px rgba(245,198,64,0.12)',
            borderRadius: 'var(--r-xl)',
            background: 'linear-gradient(180deg, var(--card) 0%, rgba(9,9,13,0.96) 100%)',
          }}
        >
          {/* Maintenance Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(245, 198, 64, 0.12)',
              border: '1.5px solid rgba(245, 198, 64, 0.35)',
              color: 'var(--gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              boxShadow: '0 0 28px rgba(245, 198, 64, 0.25)',
            }}
          >
            <WrenchIcon size={34} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <span
              className="badge badge-gold"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '6px 14px',
              }}
            >
              Under Maintenance
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Finance Section Under Maintenance
          </h1>

          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              maxWidth: '48ch',
              margin: '0 auto 32px',
            }}
          >
            This section is currently undergoing maintenance and updates. We are updating our finance details and online tools. Please check back soon.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/contact?topic=Financing"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>Contact Us for Enquiries</span>
              <ArrowRightIcon size={14} />
            </Link>
            <a
              href={`tel:${business.phone.replace(/\s/g, '')}`}
              className="btn btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <PhoneIcon size={14} />
              <span>Call {business.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

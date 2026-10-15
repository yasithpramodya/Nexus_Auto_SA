import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';
import {
  CarIcon,
  ShipIcon,
  ShieldCheckIcon,
  SearchIcon,
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  MapPinIcon,
  AwardIcon,
  HandshakeIcon,
  ZapIcon,
  FileTextIcon,
} from '../components/Icons.jsx';

/* Country Tag component without emojis */
function CountryBadge({ code, name, role, details }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: '16px 18px',
        background: 'rgba(255,255,255,0.025)',
        borderRadius: 'var(--r-sm)',
        border: '1px solid var(--border)',
        transition: 'border-color var(--t-fast), background var(--t-fast)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--r-sm)',
          background: 'var(--card-2)',
          border: '1px solid var(--border-2)',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'var(--mono)',
          fontWeight: 800,
          fontSize: 13,
          color: 'var(--gold)',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}
      >
        {code}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <strong style={{ color: 'var(--ink)', fontSize: '0.98rem', fontWeight: 700 }}>{name}</strong>
          <span className="badge badge-gold" style={{ fontSize: '9.5px', padding: '3px 8px' }}>{role}</span>
        </div>
        <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem', marginTop: 4, lineHeight: 1.55 }}>{details}</p>
      </div>
    </div>
  );
}

export default function About() {
  const heroRef     = useReveal();
  const introRef    = useReveal();
  const statsRef    = useReveal();
  const passionRef  = useReveal();
  const whyRef      = useReveal();
  const stockRef    = useReveal();
  const customRef   = useReveal();
  const ctaRef      = useReveal();

  return (
    <>
      {/* ── 1. Page Hero ─────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Our Heritage &amp; Mission</p>
          <h1 className="reveal delay-1" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Bringing Quality Japanese Cars <span style={{ color: 'var(--red)' }}>Closer to You</span>
          </h1>
          <p className="page-hero-sub reveal delay-2">
            Welcome to our world of quality used cars and Japanese vehicle imports. We are passionate
            about helping people find the right vehicle to suit their lifestyle, needs, and budget —
            making your car-buying journey simple, convenient, and enjoyable.
          </p>
          <div className="reveal delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/vehicles" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Browse Current Stock</span>
              <ArrowRightIcon size={14} />
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Our Specialists
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Who We Are & Dual-Market Presence ─────────── */}
      <section className="section" ref={introRef} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Who We Are</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                Connecting Drivers with Exceptional Vehicles
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 16 }}>
                Welcome to our world of quality used cars and Japanese vehicle imports. Whether you are looking for a reliable everyday car, a comfortable family vehicle, a fuel-efficient hatchback, or a spacious SUV, our goal is to make your car-buying journey transparent, relaxed, and rewarding.
              </p>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 24 }}>
                Operating across <strong style={{ color: 'var(--ink)' }}>Australia and Sri Lanka</strong>, we connect discerning customers with quality used vehicles, focusing on popular Japanese makes and models known globally for their practicality, comfort, and reliability. We understand that buying a vehicle is a major milestone, and believe every buyer deserves clear information, friendly service, and total peace of mind.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  'Reliable daily commuters & family vehicles',
                  'Fuel-efficient hatchbacks & versatile SUVs',
                  'Clear Japanese history & verified odometers',
                  'Honest advice with zero pressure sales',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--red)', display: 'grid', flexShrink: 0 }}>
                      <CheckIcon size={14} />
                    </span>
                    <span style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating hubs panel */}
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ color: 'var(--red)', display: 'grid' }}>
                  <MapPinIcon size={22} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>Where We Operate</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>Cross-border automotive import network</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <CountryBadge
                  code="AU"
                  name="Australia"
                  role="Adelaide Dealership & Compliance"
                  details="Showroom sales, full Australian ADR compliance, roadworthy inspection, and South Australian registration."
                />
                <CountryBadge
                  code="LK"
                  name="Sri Lanka"
                  role="Global Sourcing & Customer Relations"
                  details="Import logistics, regional client consulting, and direct sourcing support for international buyers."
                />
                <CountryBadge
                  code="JP"
                  name="Japan"
                  role="Tokyo & Nagoya Sourcing Network"
                  details="Daily participation in USS, CAA, and TAA auctions, translated condition sheets, and verified export certification."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Stats Strip ─────────────────────────────────── */}
      <div className="trust-bar" ref={statsRef}>
        <div className="wrap trust-inner">
          {[
            { icon: <CarIcon size={22} />, num: '200+', label: 'Vehicles Sourced & Delivered' },
            { icon: <ShipIcon size={22} />, num: '2', label: 'Operating Markets (AU & LK)' },
            { icon: <StarIcon size={22} />, num: '5★', label: 'Customer Satisfaction Rating' },
            { icon: <ShieldCheckIcon size={22} />, num: '100%', label: 'ADR Verified & Compliant' },
          ].map(({ icon, num, label }, i) => (
            <div className={`trust-item reveal delay-${i + 1}`} key={label}>
              <div className="trust-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                {icon}
              </div>
              <div className="trust-text">
                <div className="trust-num">{num}</div>
                <div className="trust-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Our Passion for Japanese Vehicles ─────────── */}
      <section className="section" ref={passionRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow gold">Automotive Excellence</p>
            <h2 className="section-title">Our Passion for Japanese Vehicles</h2>
            <p className="section-sub">
              Japanese cars have earned an unmatched global reputation for precision engineering, fuel efficiency, everyday practicality, and enduring value.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                icon: <ShieldCheckIcon size={26} />,
                color: 'var(--red)',
                title: 'World-Class Reliability',
                body: 'Japanese carmakers set the international benchmark for build quality and mechanical durability, offering decades of trouble-free driving.',
              },
              {
                icon: <CarIcon size={26} />,
                color: 'var(--gold)',
                title: 'Variety for Every Lifestyle',
                body: 'From nimble city hatchbacks and executive sedans to rugged all-wheel drive SUVs and iconic performance coupés, there is a vehicle tailored to your needs.',
              },
              {
                icon: <AwardIcon size={26} />,
                color: 'var(--cyan)',
                title: 'Exceptional Value',
                body: 'Japanese engineering provides high equipment levels, advanced safety technologies, and low long-term running costs at honest price points.',
              },
              {
                icon: <SearchIcon size={26} />,
                color: 'var(--green)',
                title: 'Direct Import Access',
                body: 'Our direct relationship with premier Japanese auctions unlocks high-spec trims, pristine condition grades, and unique editions rarely found locally.',
              },
            ].map(({ icon, color, title, body }) => (
              <div key={title} className="glass-card" style={{ padding: '32px 28px' }}>
                <div style={{ color, marginBottom: 18, display: 'grid' }}>{icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose Us? (Requested Feature) ─────────── */}
      <section className="section" ref={whyRef} style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">The Kensei Advantage</p>
            <h2 className="section-title">Why Choose Kensei Motors?</h2>
            <p className="section-sub">
              We stand apart through careful vehicle curation, cross-border reach, and genuine passion for connecting people with cars they truly love.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                badge: 'Curated',
                title: 'Quality Selection',
                body: 'We carefully hand-select vehicles that strike the right balance of proven reliability, interior comfort, and long-term resale value.',
                icon: <AwardIcon size={24} />,
              },
              {
                badge: 'Personal',
                title: 'Customer-First Approach',
                body: 'We take the time to understand your lifestyle and budget, providing transparent advice with zero sales pressure and complete honesty.',
                icon: <HandshakeIcon size={24} />,
              },
              {
                badge: 'Global',
                title: 'Dual-Market Reach',
                body: 'Operating in both Australia and Sri Lanka gives us unique cross-border insights and direct supply networks to source vehicles that match customer demands.',
                icon: <ShipIcon size={24} />,
              },
              {
                badge: 'Fair Price',
                title: 'Affordable Choices',
                body: 'We believe premium Japanese quality does not have to come with an unreasonable price tag. We work hard to offer highly competitive, all-inclusive pricing.',
                icon: <ZapIcon size={24} />,
              },
            ].map(({ badge, title, body, icon }) => (
              <div key={title} className="glass-card" style={{ padding: '32px 28px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ color: 'var(--red)', display: 'grid' }}>{icon}</span>
                  <span className="badge badge-muted">{badge}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Explore Our Current Stock ─────────────────── */}
      <section className="section" ref={stockRef}>
        <div className="wrap">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow gold">Available In Adelaide</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                Explore Our Current Stock
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 16 }}>
                Our Stock page makes it simple to explore the vehicles we currently have on hand in Adelaide. Compare different makes, body styles, and performance specifications, and find the vehicle that matches your lifestyle.
              </p>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 28 }}>
                Our stock changes as vehicles are purchased and fresh arrivals land from Japan, so we encourage you to check back regularly. If you find a car that interests you, submit an enquiry or book an on-site yard inspection today.
              </p>
              <Link to="/vehicles" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>View All Showroom Vehicles</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            {/* What to Expect checklist */}
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ color: 'var(--gold)', display: 'grid' }}>
                  <FileTextIcon size={22} />
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>What You Can Expect</h3>
              </div>

              {[
                { icon: <CarIcon size={16} />, title: 'Detailed vehicle listings', sub: 'Comprehensive photo galleries and factory build specifications.' },
                { icon: <SearchIcon size={16} />, title: 'Side-by-side comparison', sub: 'Filter easily by body style, price, mileage, and transmission.' },
                { icon: <CheckIcon size={16} />, title: 'Rapid enquiry response', sub: 'Direct answers to your questions from knowledgeable team members.' },
                { icon: <ShipIcon size={16} />, title: 'Frequent Japanese arrivals', sub: 'Fresh inventory arriving continuously from Japanese auction centers.' },
                { icon: <ShieldCheckIcon size={16} />, title: 'Full ADR compliance & rego', sub: 'Drive away without stressful paperwork or hidden compliance fees.' },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ color: 'var(--red)', marginTop: 2, display: 'grid', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <strong style={{ color: 'var(--ink)', fontSize: '0.92rem', display: 'block' }}>{title}</strong>
                    <span style={{ color: 'var(--ink-3)', fontSize: '0.82rem' }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Can't Find Your Preferred Car? (Custom Order) ── */}
      <section className="section" ref={customRef} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow cyan">Custom Auction Sourcing</p>
            <h2 className="section-title">Can't Find Your Preferred Car?</h2>
            <p className="section-sub">
              Your ideal vehicle may not always be in current inventory. We welcome preferred-car enquiries and commission custom vehicle searches direct from Japanese auction lanes.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              {
                step: '01',
                title: 'Specific Make & Model',
                body: 'Tell us exactly what you want: make, model, target year range, and specific variant or chassis code.',
              },
              {
                step: '02',
                title: 'Colour & Specifications',
                body: 'Select your ideal paint colour, interior upholstery (leather, alcantara), and factory option packages.',
              },
              {
                step: '03',
                title: 'Budget & Body Style',
                body: 'Share your comfortable drive-away budget and preferred vehicle format (sedan, SUV, wagon, or hatch).',
              },
              {
                step: '04',
                title: 'We Source It For You',
                body: 'We search 150,000+ weekly auction listings, translate inspection sheets, and secure your matching car.',
              },
            ].map(({ step, title, body }) => (
              <div key={title} className="glass-card" style={{ padding: '28px 24px', position: 'relative' }}>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 22,
                    fontWeight: 900,
                    color: 'var(--red)',
                    display: 'block',
                    marginBottom: 12,
                    lineHeight: 1,
                  }}
                >
                  {step}
                </span>
                <h4 style={{ color: 'var(--ink)', fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>{title}</h4>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <Link
              to="/contact?topic=Importing+a+car"
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>Submit a Custom Vehicle Enquiry</span>
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Start Your Search Today CTA ───────────────── */}
      <section className="section-sm" ref={ctaRef}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow gold" style={{ marginBottom: 12 }}>Start Your Search Today</p>
              <h2 className="cta-title">Your Next Car Could Be Waiting For You</h2>
              <p className="cta-sub">
                Take a look at our current stock to see what is ready for inspection in Adelaide, or get in touch with our team to discuss how we can help you find your next vehicle. We look forward to assisting you on your car-buying journey.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/vehicles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Browse Current Stock</span>
                <ArrowRightIcon size={15} />
              </Link>
              <Link className="btn btn-ghost" to="/contact">
                Enquire With Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
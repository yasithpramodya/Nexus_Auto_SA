import { useState } from 'react';
import { Link } from 'react-router-dom';
import { heroImage, vehicles, business, formatKm } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import VehicleModal from '../components/VehicleModal.jsx';
import {
  CarIcon,
  ShieldCheckIcon,
  SearchIcon,
  HandshakeIcon,
  ArrowRightIcon,
  CameraIcon,
  ZapIcon,
  AwardIcon,
  MapPinIcon,
  CheckIcon,
} from '../components/Icons.jsx';

/* Mini SVG icons for specs */
const MiniIcons = {
  gauge: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10a6 6 0 1 1 12 0" strokeLinecap="round" />
      <path d="M8 10 10.5 6" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 13h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z" strokeLinecap="round" />
      <path d="M4 6h5M12 7l2 2v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  ),
};

/* Vehicle categories */
const categories = [
  {
    title: 'Fuel-Efficient Hatchbacks',
    slug: 'Hatchbacks',
    desc: 'Economical, agile city cars engineered for remarkable fuel economy and effortless daily commuting.',
    icon: <ZapIcon size={22} />,
    tag: 'Fuel Efficiency',
  },
  {
    title: 'Comfortable Sedans',
    slug: 'Sedans',
    desc: 'Refined road comfort, smooth powertrains, and sophisticated Japanese cabin engineering.',
    icon: <CarIcon size={22} />,
    tag: 'Comfort & Style',
  },
  {
    title: 'Spacious SUVs',
    slug: 'SUVs',
    desc: 'Versatile cargo capacity, elevated ride height, and dependable all-weather capability.',
    icon: <ShieldCheckIcon size={22} />,
    tag: 'Space & Versatility',
  },
  {
    title: 'Family Vehicles',
    slug: 'Family',
    desc: 'Spacious multi-passenger seating, generous storage, and dependable everyday practicality.',
    icon: <HandshakeIcon size={22} />,
    tag: 'Practicality',
  },
  {
    title: 'Specialty Japanese Imports',
    slug: 'Specialty',
    desc: 'Classic performance icons, compact roadsters, and rare Japanese models with proven provenance.',
    icon: <AwardIcon size={22} />,
    tag: 'Enthusiast & Iconic',
  },
];

/* Why Choose Japanese Vehicles */
const whyChoosePoints = [
  {
    title: 'Practicality and Reliability',
    text: 'Japanese vehicles have earned a worldwide reputation for robust engineering, low maintenance demands, and enduring long-term dependability.',
    icon: <ShieldCheckIcon size={24} />,
  },
  {
    title: 'Fuel-Efficient Options',
    text: 'From advanced hybrid systems to lightweight compact powerplants, Japanese manufacturers lead the globe in fuel efficiency and lower running costs.',
    icon: <ZapIcon size={24} />,
  },
  {
    title: 'Wide Selection of Makes & Models',
    text: 'Access a comprehensive spectrum of vehicles from Toyota, Nissan, Honda, Lexus, Mazda, Subaru, and Mitsubishi to find the exact configuration you desire.',
    icon: <CarIcon size={24} />,
  },
  {
    title: 'Options for Different Budgets & Lifestyles',
    text: 'Whether seeking an affordable daily commuter, a versatile family cruiser, or an imported Japanese icon, there is a vehicle tailored to every budget.',
    icon: <HandshakeIcon size={24} />,
  },
];

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const heroRef       = useReveal();
  const featuredRef   = useReveal();
  const whyRef        = useReveal();
  const categoriesRef = useReveal();
  const requestRef    = useReveal();
  const aboutRef      = useReveal();
  const finalCtaRef   = useReveal();

  // Featured actual import vehicles
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <>
      {/* ═══════════════ 1. HERO SECTION ════════════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-noise" aria-hidden="true" />
        <img
          className="hero-bg"
          src={heroImage}
          alt="Quality Japanese Car Imports and Used Vehicles"
          fetchpriority="high"
        />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="wrap" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
          <div className="hero-grid">
            <div className="hero-content reveal">
              {/* Pill badge */}
              <div className="hero-pill">
                <span className="pulse-dot" aria-hidden="true" />
                Direct Japanese Imports · Order on Request · Australia &amp; Sri Lanka
              </div>

              {/* Headline */}
              <h1 className="hero-headline" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)' }}>
                Bringing Quality Japanese Cars <span style={{ color: 'var(--red)' }}>Closer to You</span>
              </h1>

              {/* Description */}
              <p className="hero-sub">
                Discover quality used vehicles and Japanese imports available to order. We connect buyers in Australia and Sri Lanka with popular Japanese makes and models sourced direct on request—no showroom floor markups.
              </p>

              {/* CTAs */}
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" to="/vehicles" id="hero-explore-stock">
                  Browse Import Catalog
                </Link>
                <Link className="btn btn-ghost btn-lg" to="/request-a-car" id="hero-find-car">
                  Request a Custom Import
                </Link>
              </div>
            </div>

            {/* Floating live inventory overview card */}
            <aside className="hero-floater reveal reveal-right" aria-label="Current stock overview">
              <div className="floater-head">Import Catalog Overview</div>
              <div className="floater-stat">
                <div className="floater-stat-num">{vehicles.length}</div>
                <div className="floater-stat-label">Import Models<br />Order on Request</div>
              </div>
              <div className="floater-divider" />
              <div className="floater-cars">
                {featuredVehicles.slice(0, 3).map((v) => (
                  <div
                    className="floater-car"
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="floater-car-name">{v.year} {v.title}</span>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>{v.availability || v.status}</span>
                  </div>
                ))}
              </div>
              <Link className="btn btn-outline btn-sm" to="/vehicles" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                Browse All {vehicles.length} Models →
              </Link>
            </aside>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" aria-hidden="true" onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}>
          <div className="scroll-line" />
          <span className="scroll-label">Scroll to explore</span>
        </div>
      </section>

      {/* ═══════════════ 2. FEATURED VEHICLES ═══════════ */}
      <section className="section" ref={featuredRef} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p className="eyebrow red">Direct Import Catalog</p>
                <h2 className="section-title">Popular Japanese Models to Import</h2>
                <p className="section-sub">
                  Curated Japanese import models available on request for buyers in Australia and Sri Lanka. We do not operate a showroom lot—every car is inspected in Japan and imported direct upon buyer request.
                </p>
              </div>
              <Link to="/vehicles" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>View All {vehicles.length} Models</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>

          <div className="gallery-grid">
            {featuredVehicles.map((v, i) => (
              <article
                key={v.id}
                className={`vcard reveal delay-${i + 1}`}
                id={`featured-card-${v.id}`}
              >
                <div className="vcard-img" onClick={() => setSelectedVehicle(v)} style={{ cursor: 'pointer' }}>
                  <img src={v.image} alt={`${v.year} ${v.title}`} loading={i === 0 ? 'eager' : 'lazy'} />
                  <div className="vcard-overlay" aria-hidden="true" />
                  <span className="vcard-badge badge badge-green">
                    <span className="dot" aria-hidden="true" />
                    {v.availability || v.status}
                  </span>
                  {v.gallery && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(9,9,13,.82)',
                        border: '1px solid var(--border-2)',
                        color: '#fff',
                        fontFamily: 'var(--mono)',
                        fontSize: 10,
                        padding: '3px 8px',
                        borderRadius: 'var(--r-full)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        backdropFilter: 'blur(8px)',
                        zIndex: 2,
                      }}
                    >
                      <CameraIcon size={11} />
                      {v.gallery.length} Photos
                    </span>
                  )}
                </div>

                <div className="vcard-body">
                  <div className="vcard-meta" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{v.year} · {v.make}</span>
                    <span style={{ color: 'var(--gold)', fontFamily: 'var(--mono)', fontSize: 11.5 }}>
                      {MiniIcons.pin} {v.location}
                    </span>
                  </div>

                  <h3 className="vcard-title" onClick={() => setSelectedVehicle(v)} style={{ cursor: 'pointer' }}>
                    {v.title}
                  </h3>

                  {/* Pricing on Request */}
                  <div className="vcard-price-row">
                    <span className="vcard-price" style={{ fontSize: '1.02rem', color: 'var(--gold)' }}>{v.priceDisplay}</span>
                    <span className="vcard-price-note">{v.priceNote}</span>
                  </div>

                  {/* Specs List */}
                  <div className="vcard-specs" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, margin: '14px 0' }}>
                    <span className="vcard-spec" title="Mileage">
                      {MiniIcons.gauge} {formatKm(v.odometerKm)}
                    </span>
                    <span className="vcard-spec" title="Transmission">
                      {MiniIcons.gear} {v.transmission.split(' ')[0]}
                    </span>
                    <span className="vcard-spec" title="Fuel Type">
                      {MiniIcons.fuel} {v.fuelType}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                    <Link
                      to={`/request-a-car?make=${encodeURIComponent(v.make)}&model=${encodeURIComponent(v.model)}&year=${v.year}&id=${encodeURIComponent(v.id)}`}
                      className="btn btn-primary btn-sm"
                      style={{ justifyContent: 'center' }}
                    >
                      Request to Import
                    </Link>
                    <Link
                      to={`/vehicles/${v.id}`}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'center' }}
                    >
                      Full Specs
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link className="btn btn-primary btn-lg" to="/vehicles" id="home-view-all-stock" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>View All Stock</span>
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. WHY CHOOSE JAPANESE VEHICLES ════ */}
      <section className="section" ref={whyRef} style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow gold">Engineered for Value</p>
            <h2 className="section-title">Why Choose Japanese Vehicles?</h2>
            <p className="section-sub">
              Japanese vehicles are a key focus because of their reputation for practicality, engineering, fuel efficiency, and value.
            </p>
          </div>

          <div className="features-grid">
            {whyChoosePoints.map((item, idx) => (
              <div className={`feature-card reveal delay-${idx + 1}`} key={item.title}>
                <div className="feature-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                  {item.icon}
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. VEHICLE CATEGORIES ═══════════ */}
      <section className="section" ref={categoriesRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow cyan">Explore By Category</p>
            <h2 className="section-title">Discover Vehicles by Category</h2>
            <p className="section-sub">
              Explore vehicle categories tailored to different driving habits, family requirements, and lifestyle needs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }} className="reveal">
            {categories.map((cat, i) => (
              <Link
                key={cat.title}
                to={`/vehicles?category=${encodeURIComponent(cat.slug)}`}
                className="glass-card"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform var(--t-med), border-color var(--t-med)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ color: 'var(--red)', background: 'var(--red-dim)', padding: 12, borderRadius: 'var(--r-sm)' }}>
                    {cat.icon}
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: 9.5 }}>{cat.tag}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-2)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                  {cat.desc}
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>Browse Category</span>
                  <ArrowRightIcon size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. FIND YOUR PREFERRED CAR ══════ */}
      <section className="section" ref={requestRef} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div
            className="glass-card reveal"
            style={{
              padding: 'clamp(32px, 5vw, 56px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div>
              <p className="eyebrow red" style={{ marginBottom: 12 }}>Personalised Sourcing</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
                Find Your Preferred Car
              </h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: 20 }}>
                Looking for a specific model, year, body style, or budget that is not currently in our stock? Tell us which car you are looking for, and our team can review your requirements and discuss available options across Australia and Sri Lanka.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
                {[
                  'Custom makes & specific models',
                  'Budget & currency flexibility (AUD / LKR)',
                  'Hatchbacks, sedans, SUVs & family cars',
                  'Dedicated import & review assistance',
                ].map((pt) => (
                  <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--red)', display: 'grid' }}>
                      <CheckIcon size={14} />
                    </span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--ink-2)' }}>{pt}</span>
                  </div>
                ))}
              </div>
              <Link to="/request-a-car" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Submit Vehicle Request</span>
                <ArrowRightIcon size={15} />
              </Link>
            </div>

            <div
              style={{
                background: 'var(--card)',
                borderRadius: 'var(--r-md)',
                padding: 28,
                border: '1px solid var(--border-2)',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                How the Request Service Works
              </h3>
              <ol style={{ paddingLeft: 20, color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.92rem' }}>
                <li style={{ marginBottom: 8 }}>
                  <strong style={{ color: 'var(--ink)' }}>Submit Preferences:</strong> Provide your desired make, model, year range, and budget.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <strong style={{ color: 'var(--ink)' }}>Inventory &amp; Import Review:</strong> We search current networks across Australia and Sri Lanka for matching vehicles.
                </li>
                <li>
                  <strong style={{ color: 'var(--ink)' }}>Clear Consultation:</strong> We share full vehicle details, photos, and discuss suitable possibilities.
                </li>
              </ol>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <Link to="/request-a-car" className="text-link" style={{ fontSize: '0.88rem' }}>
                  Open Preferred Vehicle Request Form →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. ABOUT OUR BUSINESS ══════════ */}
      <section className="section" ref={aboutRef}>
        <div className="wrap">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow gold">About Our Business</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                Connecting Drivers with Quality Japanese Vehicles
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 16 }}>
                Our business connects customers in Australia and Sri Lanka with quality used vehicles and Japanese imports. We aim to help customers discover vehicles that suit their lifestyle, needs, and budgets.
              </p>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 24 }}>
                We understand that buying a vehicle is an important decision. We believe every customer deserves clear information, friendly service, and the confidence to choose the right vehicle from our verified inventory or personalized import requests.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span>Read Full About Us</span>
                  <ArrowRightIcon size={14} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ color: 'var(--red)', display: 'grid' }}>
                  <MapPinIcon size={24} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)' }}>Our Regional Operations</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>Cross-border automotive import network</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>Australia</strong>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem', marginTop: 4 }}>
                    Connecting Australian drivers with quality used vehicles and popular Japanese makes and models.
                  </p>
                </div>

                <div style={{ padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.95rem' }}>Sri Lanka</strong>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem', marginTop: 4 }}>
                    Providing vehicle sourcing, import options, and guidance for fuel-efficient and family Japanese vehicles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. FINAL CTA ════════════════════ */}
      <section className="section-sm" ref={finalCtaRef}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow red" style={{ marginBottom: 12 }}>Ready to Find Your Car?</p>
              <h2 className="cta-title">Your Next Car Starts Here</h2>
              <p className="cta-sub">
                Explore our current stock of quality used cars and Japanese imports, or submit a preferred car request with your ideal specifications.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/vehicles" id="final-cta-browse">
                Browse Our Stock
              </Link>
              <Link className="btn btn-ghost btn-lg" to="/request-a-car" id="final-cta-request">
                Request a Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ QUICK VIEW MODAL ═══════════════ */}
      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </>
  );
}

import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';
import {
  CarIcon,
  ShieldCheckIcon,
  SearchIcon,
  CheckIcon,
  ArrowRightIcon,
  MapPinIcon,
  AwardIcon,
  HandshakeIcon,
  ZapIcon,
} from '../components/Icons.jsx';

export default function About() {
  const heroRef       = useReveal();
  const whoRef        = useReveal();
  const passionRef    = useReveal();
  const whyExploreRef = useReveal();
  const commitmentRef = useReveal();
  const stockRef      = useReveal();
  const requestRef    = useReveal();
  const ctaRef        = useReveal();

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">About Our Business</p>
          <h1 className="reveal delay-1" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Bringing Quality Japanese Cars <span style={{ color: 'var(--red)' }}>Closer to You</span>
          </h1>
          <p className="page-hero-sub reveal delay-2">
            Welcome to our world of quality used cars and Japanese vehicle imports. We are passionate about helping people find the right vehicle to suit their lifestyle, needs, and budget.
          </p>
          <div className="reveal delay-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/vehicles" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Explore Our Current Stock</span>
              <ArrowRightIcon size={14} />
            </Link>
            <Link to="/request-a-car" className="btn btn-ghost">
              Can't Find Your Preferred Car?
            </Link>
          </div>
        </div>
      </section>

      {/* ── 1. Who We Are ────────────────────────────────── */}
      <section className="section" ref={whoRef} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow red">Who We Are</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                Connecting Australia &amp; Sri Lanka with Quality Vehicles
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 16 }}>
                Welcome to our world of quality used cars and Japanese vehicle imports. We are passionate about helping people find the right vehicle to suit their lifestyle, needs, and budget. Whether you are looking for a reliable everyday car, a comfortable family vehicle, a fuel-efficient hatchback, or a spacious SUV, our goal is to make your car-buying journey simple, convenient, and enjoyable.
              </p>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 24 }}>
                Operating in <strong style={{ color: 'var(--ink)' }}>Australia and Sri Lanka</strong>, we focus on connecting customers with quality used vehicles, including popular Japanese makes and models known for their practicality, comfort, and reliability. We understand that buying a car is an important decision, and we believe every customer deserves clear information, friendly service, and the confidence to choose the right vehicle.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  'Fuel-efficient hatchbacks for daily driving',
                  'Comfortable and refined sedans',
                  'Spacious SUVs and versatile family vehicles',
                  'Specialty Japanese used vehicles and imports',
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

            {/* Operating Hubs Panel */}
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ color: 'var(--red)', display: 'grid' }}>
                  <MapPinIcon size={24} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink)' }}>Our Operation</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>Cross-border automotive import network</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ padding: '16px 18px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <strong style={{ color: 'var(--ink)', fontSize: '0.98rem' }}>Australia</strong>
                    <span className="badge badge-gold" style={{ fontSize: 9.5 }}>Active Market</span>
                  </div>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    Connecting Australian drivers with quality used vehicles, verified specifications, and Japanese vehicle imports tailored to lifestyle and budget.
                  </p>
                </div>

                <div style={{ padding: '16px 18px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <strong style={{ color: 'var(--ink)', fontSize: '0.98rem' }}>Sri Lanka</strong>
                    <span className="badge badge-gold" style={{ fontSize: 9.5 }}>Active Market</span>
                  </div>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    Assisting customers across Sri Lanka with import options, vehicle requests, and sourcing fuel-efficient and family-friendly Japanese cars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Our Passion for Japanese Vehicles ─────────── */}
      <section className="section" ref={passionRef} style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow gold">Automotive Heritage</p>
            <h2 className="section-title">Our Passion for Japanese Vehicles</h2>
            <p className="section-sub">
              Japanese vehicles are a key focus because of their reputation for practicality, engineering, fuel efficiency, and value.
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <ShieldCheckIcon size={24} />,
                title: 'Practicality & Reliability',
                text: 'Japanese cars have earned a strong reputation worldwide for their thoughtful practicality, build quality, and mechanical reliability over hundreds of thousands of kilometres.',
              },
              {
                icon: <ZapIcon size={24} />,
                title: 'Fuel-Efficient Options',
                text: 'From advanced hybrid technology to highly efficient petrol and compact engines, Japanese models provide excellent fuel economy to keep running costs economical.',
              },
              {
                icon: <CarIcon size={24} />,
                title: 'Wide Selection of Makes & Models',
                text: 'The Japanese automotive market offers an unparalleled breadth of vehicles: compact city cars, spacious family estates, comfortable sedans, and versatile SUVs.',
              },
              {
                icon: <AwardIcon size={24} />,
                title: 'Options for Different Budgets',
                text: 'Whether you require an affordable first vehicle, an economical commuter, or a premium import, Japanese manufacturers provide dependable options across every budget.',
              },
            ].map((f, i) => (
              <div className={`feature-card reveal delay-${i + 1}`} key={f.title}>
                <div className="feature-icon" style={{ color: 'var(--red)', display: 'grid' }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Why Explore Japanese Imports? ─────────────── */}
      <section className="section" ref={whyExploreRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow cyan">Smart Car Buying</p>
            <h2 className="section-title">Why Explore Japanese Imports?</h2>
            <p className="section-sub">
              Importing or purchasing a Japanese vehicle gives customers access to higher specification grades, meticulous maintenance histories, and diverse vehicle types.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }} className="reveal">
            {[
              {
                title: 'Superior Vehicle Condition',
                desc: 'Japanese vehicle inspection standards and regular maintenance culture mean used vehicles often arrive in exceptional mechanical and cosmetic condition.',
                icon: <CheckIcon size={22} />,
              },
              {
                title: 'Unique Trims & Features',
                desc: 'Access desirable trims, advanced safety packages, and modern cockpit features that may not have been released in local domestic markets.',
                icon: <AwardIcon size={22} />,
              },
              {
                title: 'Outstanding Value for Money',
                desc: 'Japanese vehicle imports offer a compelling price-to-feature ratio, delivering modern technology and comfort at honest price points.',
                icon: <ZapIcon size={22} />,
              },
              {
                title: 'Lifestyle Versatility',
                desc: 'From compact hatchbacks for tight city streets to spacious 7-seat family haulers and AWD wagons, imports cater to all lifestyle requirements.',
                icon: <CarIcon size={22} />,
              },
            ].map((card) => (
              <div key={card.title} className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: 'var(--red)', background: 'var(--red-dim)', padding: 12, borderRadius: 'var(--r-sm)', width: 'fit-content', marginBottom: 16 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Our Commitment to Customers ───────────────── */}
      <section className="section" ref={commitmentRef} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow gold">Customer Centered</p>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                Our Commitment to Customers
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 16 }}>
                We understand that buying a car is an important decision. That is why our commitment is centered on transparency, helpful guidance, and straightforward communication.
              </p>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: 20 }}>
                We believe every customer deserves clear information about the vehicle they are considering, friendly service, and the confidence to choose the right car for their household or business.
              </p>
            </div>

            <div className="glass-card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
                What We Strive to Deliver
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  {
                    title: 'Clear & Accurate Information',
                    desc: 'We present verified vehicle specifications, mileage, and condition details without misleading claims.',
                  },
                  {
                    title: 'Friendly & Attentive Service',
                    desc: 'Our team listens to your driving habits and budget needs to help you make an informed decision.',
                  },
                  {
                    title: 'Simplified Search Journey',
                    desc: 'Whether browsing current stock or requesting a car, we make every step simple, convenient, and enjoyable.',
                  },
                ].map((item) => (
                  <div key={item.title} style={{ padding: '12px 14px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)' }}>
                    <strong style={{ color: 'var(--ink)', fontSize: '0.94rem' }}>{item.title}</strong>
                    <p style={{ color: 'var(--ink-2)', fontSize: '0.86rem', marginTop: 4, lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Explore Our Current Stock ─────────────────── */}
      <section className="section" ref={stockRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow red">Available Inventory</p>
            <h2 className="section-title">Explore Our Current Stock</h2>
            <p className="section-sub">
              Browse our currently listed quality used cars and Japanese imports. Compare vehicle specifications, view high-resolution photo galleries, and enquire directly.
            </p>
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <Link to="/vehicles" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Browse All Vehicles in Stock</span>
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Can't Find Your Preferred Car? ────────────── */}
      <section className="section-sm" ref={requestRef} style={{ borderTop: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow gold" style={{ marginBottom: 12 }}>Personalized Sourcing</p>
              <h2 className="cta-title">Can't Find Your Preferred Car?</h2>
              <p className="cta-sub">
                Tell us which vehicle you are looking for, and our team can review your requirements and discuss the available options across Australia and Sri Lanka.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/request-a-car" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Submit Vehicle Request</span>
                <ArrowRightIcon size={15} />
              </Link>
              <Link className="btn btn-ghost" to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
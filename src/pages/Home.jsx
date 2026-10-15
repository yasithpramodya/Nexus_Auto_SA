import { useState } from 'react';
import { Link } from 'react-router-dom';
import { heroImage, vehicles, business } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import VehicleModal from '../components/VehicleModal.jsx';
import GradingGuide from '../components/GradingGuide.jsx';
import FaqSection from '../components/FaqSection.jsx';
import {
  CarIcon,
  FileTextIcon,
  AwardIcon,
  MapPinIcon,
  ShipIcon,
  ShieldCheckIcon,
  SearchIcon,
  HandshakeIcon,
  WrenchIcon,
  StarIcon,
  ArrowRightIcon,
  PhoneIcon,
  CameraIcon,
} from '../components/Icons.jsx';

/* Status → badge variant */
function statusBadge(status) {
  const s = status.toLowerCase();
  if (s.includes('just arrived'))  return { cls: 'badge-red',   dot: true  };
  if (s.includes('arriving soon')) return { cls: 'badge-gold',  dot: false };
  return                                   { cls: 'badge-green', dot: true  };
}

/* Mini SVG icons for card specs */
const MiniIcons = {
  gauge: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10a6 6 0 1 1 12 0" strokeLinecap="round"/>
      <path d="M8 10 10.5 6" strokeLinecap="round"/>
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4"/>
    </svg>
  ),
  car: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 9h14M3 13h2M11 13h2" strokeLinecap="round"/>
      <path d="M2 9l1.5-4h9L14 9" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="12" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
    </svg>
  ),
};

/* Testimonials data */
const testimonials = [
  { name: "Marcus Thompson", initials: "MT", car: "Nissan Skyline R34 GT-R V-Spec", rating: 5, quote: "Absolute legends. Found my dream BNR34 in Japan within 2 weeks of enquiring. The Japanese auction sheet was 100% accurate, and the Australian compliance was handled without a hitch. I just picked up the keys in Adelaide ready to drive." },
  { name: "Suresh Patel", initials: "SP", car: "Honda S660 Alpha", rating: 5, quote: "I was hesitant about importing from overseas, but Kensei Motors made it effortless. Weekly updates with photos from Yokohama port, zero hidden charges, and the car arrived in immaculate condition. Adelaide's best JDM dealer." },
  { name: "Ryan Anderson", initials: "RA", car: "Toyota Crown Athlete S VIP", rating: 5, quote: "Bought the Crown Athlete directly off the Prospect showroom floor. Fully complied, fresh SA registration, fresh fluids, and detailed to perfection. Professional, knowledgeable team who genuinely love Japanese cars." },
];

/* Why choose us data with SVG icons */
const features = [
  { icon: <ShipIcon size={24} />, title: "Direct Japan Sourcing", text: "Direct access to USS, CAA, and TAA auctions across Tokyo, Nagoya, and Osaka. Complete translated auction sheets with verified history." },
  { icon: <ShieldCheckIcon size={24} />, title: "ADR Compliance & Rego", text: "Every car receives certified Australian Design Rule compliance, engineering sign-off, South Australian roadworthy, and SA registration." },
  { icon: <SearchIcon size={24} />, title: "100-Point Inspection", text: "Physical pre-bid Japanese inspection plus comprehensive mechanical, suspension, and diagnostic testing at our Adelaide facility." },
  { icon: <HandshakeIcon size={24} />, title: "Transparent Pricing", text: "No deceptive fees or surprise import taxes. Every car is advertised with an honest all-inclusive Drive Away figure." },
  { icon: <AwardIcon size={24} />, title: "Grade 4+ Guarantee", text: "We strictly filter for auction grade 4, 4.5, and 5 vehicles. Clean chassis rails, non-accident history, and genuine low kilometers." },
  { icon: <WrenchIcon size={24} />, title: "Warranty & Aftercare", text: "Nationwide comprehensive mechanical warranties up to 5 years, plus dedicated parts sourcing direct from Japanese OEM distributors." },
];

/* Process steps */
const process = [
  { n: '01', title: 'Consultation & Wishlist', text: "Share your target model, chassis code, budget, and specs. We review market values and explain the import roadmap with complete transparency." },
  { n: '02', title: 'Daily Auction Search', text: "We inspect over 150,000 Japanese auction listings weekly, sending you translated inspection reports, HD condition photos, and bidding guidance." },
  { n: '03', title: 'Shipping & Compliance', text: "Once secured, we coordinate insured roll-on/roll-off shipping to Adelaide port, customs clearance, and Australian ADR compliance." },
  { n: '04', title: 'Key Handover & Drive Away', text: "Inspect your freshly detailed, fully registered vehicle at our Adelaide showroom, sign the paperwork, and drive home with complete peace of mind." },
];

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const heroRef         = useReveal();
  const trustRef        = useReveal();
  const galleryRef      = useReveal();
  const featuresRef     = useReveal();
  const processRef      = useReveal();
  const gradingRef      = useReveal();
  const testimonialsRef = useReveal();
  const faqRef          = useReveal();
  const ctaRef          = useReveal();

  const recent = vehicles.slice(0, 3);

  return (
    <>
      {/* ═══════════════ HERO ════════════════════════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-noise" aria-hidden="true" />
        <img
          className="hero-bg"
          src={heroImage}
          alt="Kensei Motors Luxury Japanese Automotive Showroom"
          fetchpriority="high"
        />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-glow"    aria-hidden="true" />

        <div className="wrap" style={{ position: 'relative', width: '100%' }}>
          <div className="hero-content reveal">
            {/* Pill badge */}
            <div className="hero-pill">
              <span className="pulse-dot" aria-hidden="true" />
              Adelaide's JDM &amp; Japanese Import Specialist · {business.licence}
            </div>

            {/* Headline */}
            <h1 className="hero-headline" aria-label="We import. We sell. You drive.">
              <span className="word-1">We import.</span>
              <span className="word-2">We sell.</span>
              <span className="word-3">You drive.</span>
            </h1>

            {/* Subline */}
            <p className="hero-sub">
              Hand-picked Japanese performance icons, luxury executive sedans, and rare classics. 
              Direct from Japanese auctions, complied to Australian standards, and registered ready to drive away.
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/vehicles" id="hero-see-vehicles">
                Browse Showroom Stock ({vehicles.length})
              </Link>
              <Link className="btn btn-ghost btn-lg" to="/contact" id="hero-contact">
                Custom Auction Import
              </Link>
            </div>
          </div>

          {/* Floating live stock card */}
          <aside className="hero-floater" aria-label="Current stock highlights">
            <div className="floater-head">Live Adelaide Inventory</div>
            <div className="floater-stat">
              <div className="floater-stat-num">{vehicles.length}</div>
              <div className="floater-stat-label">Vehicles<br/>In Showroom</div>
            </div>
            <div className="floater-divider" />
            <div className="floater-cars">
              {recent.map((v) => {
                const { cls } = statusBadge(v.status);
                return (
                  <div className="floater-car" key={v.id} onClick={() => setSelectedVehicle(v)} style={{ cursor: 'pointer' }}>
                    <span className="floater-car-name">{v.year} {v.title.split(' ').slice(0, 3).join(' ')}</span>
                    <span className={`badge ${cls}`} style={{ fontSize: 9 }}>{v.status}</span>
                  </div>
                );
              })}
            </div>
            <Link className="btn btn-outline btn-sm" to="/vehicles" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              View All Inventory →
            </Link>
          </aside>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll" aria-hidden="true" onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}>
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>

      {/* ═══════════════ TRUST BAR ═══════════════════════ */}
      <div className="trust-bar" ref={trustRef}>
        <div className="wrap trust-inner">
          {[
            { icon: <CarIcon size={20} />, num: vehicles.length, unit: '+', label: 'Cars In Stock' },
            { icon: <FileTextIcon size={20} />, num: 100, unit: '%', label: 'Auction Sheets Verified' },
            { icon: <AwardIcon size={20} />, num: '4.5', unit: ' / 5', label: 'Average Auction Grade' },
            { icon: <MapPinIcon size={20} />, num: 'SA', unit: ' Rego', label: 'Complied & Drive Away' },
          ].map(({ icon, num, unit, label }, i) => (
            <div className={`trust-item reveal delay-${i + 1}`} key={label}>
              <div className="trust-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                {icon}
              </div>
              <div className="trust-text">
                <div className="trust-num">{num}<span className="accent">{unit}</span></div>
                <div className="trust-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ LATEST VEHICLES ════════════════ */}
      <section className="section" ref={galleryRef}>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Showroom Collection</p>
            <h2 className="section-title">Current In-Stock &amp; Incoming Vehicles</h2>
            <p className="section-sub">
              Every vehicle is personally inspected in Japan, certified with genuine odometer verification,
              and provided with complete Australian roadworthy and South Australian registration.
            </p>
          </div>

          <div className="gallery-grid">
            {vehicles.map((v, i) => {
              const { cls, dot } = statusBadge(v.status);
              return (
                <div
                  key={v.id}
                  className={`vcard reveal delay-${Math.min((i % 3) + 1, 3)}`}
                  id={`home-card-${v.id}`}
                  onClick={() => setSelectedVehicle(v)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="vcard-img">
                    <img src={v.image} alt={`${v.year} ${v.title}`} loading={i < 3 ? 'eager' : 'lazy'} />
                    <div className="vcard-overlay" aria-hidden="true" />
                    <span className={`vcard-badge badge ${cls}`}>
                      {dot && <span className="dot" aria-hidden="true" />}
                      {v.status}
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
                    <span className="vcard-meta">{v.year} · {v.bodyStyle} · Grade {v.auctionGrade}</span>
                    <span className="vcard-title">{v.title}</span>

                    {/* Price Row */}
                    <div className="vcard-price-row">
                      <span className="vcard-price">{v.priceDisplay}</span>
                      <span className="vcard-price-note">{v.priceNote.split('·')[0]}</span>
                    </div>

                    {/* Key Tags */}
                    {v.tags && (
                      <div className="vcard-tags">
                        {v.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="vcard-tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Specs Row */}
                    <div className="vcard-specs">
                      <span className="vcard-spec">{MiniIcons.gauge}{v.engine.split('(')[0]}</span>
                      <span className="vcard-spec">{MiniIcons.gear}{v.transmission.split(' ')[0]}</span>
                      <span className="vcard-spec">{MiniIcons.car}{v.drive.split(' ')[0]}</span>
                    </div>

                    <div className="vcard-footer">
                      <span className="vcard-chassis">Chassis: {v.chassis}</span>
                      <span className="vcard-arrow" aria-hidden="true">
                        <ArrowRightIcon size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 48, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link className="btn btn-primary btn-lg" to="/vehicles" id="home-viewall" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>View Detailed Specs For All Vehicles</span>
              <ArrowRightIcon size={15} />
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/contact">
              Can't Find Your Car? Ask Us To Import It
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ JAPANESE AUCTION GRADING ════════ */}
      <section className="section" ref={gradingRef}>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow cyan">Buyer Confidence</p>
            <h2 className="section-title">Understanding Japanese Auction Grading</h2>
            <p className="section-sub">
              Every Japanese car is evaluated by certified third-party inspectors before auction. 
              We strictly source Grade 4 and higher to ensure immaculate mechanical health and body integrity.
            </p>
          </div>
          <div className="reveal">
            <GradingGuide />
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY KENSEI ══════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} ref={featuresRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">The Kensei Standard</p>
            <h2 className="section-title">Why Enthusiasts Choose Kensei Motors</h2>
            <p className="section-sub">
              We aren't a generic high-volume lot. We are lifelong automotive enthusiasts dedicated to bringing the cleanest Japanese machinery to Adelaide.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className={`feature-card reveal delay-${(i % 3) + 1}`} key={f.title}>
                <div className="feature-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ════════════════════ */}
      <section className="section" ref={processRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow gold">Direct Import Journey</p>
            <h2 className="section-title">How Importing With Us Works</h2>
            <p className="section-sub">
              From the auction floor in Tokyo to your driveway in South Australia — we handle the entire process seamlessly.
            </p>
          </div>

          <div className="process-grid reveal">
            {process.map((p, i) => (
              <div className={`process-step delay-${i + 1}`} key={p.n}>
                <div className="step-number" aria-label={`Step ${p.n}`}>{p.n}</div>
                <h3 className="step-title">{p.title}</h3>
                <p className="step-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} ref={testimonialsRef}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">Verified Adelaide Customers</p>
            <h2 className="section-title">What Our Drivers Say</h2>
            <p className="section-sub">
              Read real feedback from Adelaide car enthusiasts who trusted Kensei Motors for their dream Japanese vehicles.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`tcard reveal delay-${i + 1}`} key={t.name}>
                <div className="tcard-stars" aria-label={`${t.rating} out of 5 stars`} style={{ display: 'flex', gap: 4 }}>
                  {[...Array(t.rating)].map((_, starIdx) => (
                    <span key={starIdx} style={{ color: 'var(--gold)', display: 'inline-flex' }}>
                      <StarIcon size={15} filled={true} />
                    </span>
                  ))}
                </div>
                <p className="tcard-quote">{t.quote}</p>
                <div className="tcard-author">
                  <div className="tcard-avatar" aria-hidden="true">{t.initials}</div>
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-car">{t.car} · Verified Buyer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FREQUENTLY ASKED QUESTIONS ══════ */}
      <section className="section" ref={faqRef}>
        <div className="wrap-sm">
          <div className="section-head center reveal">
            <p className="eyebrow cyan">Got Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">
              Everything you need to know about purchasing, importing, compliance, and warranty coverage with Kensei Motors.
            </p>
          </div>
          <div className="reveal">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ══════════════════════ */}
      <section className="section-sm" ref={ctaRef}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Ready for the next step?</p>
              <h2 className="cta-title">Visit Our Prospect Showroom or Source from Japan</h2>
              <p className="cta-sub">
                Book a private inspection of our current yard stock, or talk to our import specialists 
                to locate your dream Japanese vehicle in tomorrow's auction lane.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/contact" id="home-cta-enquire">
                Send Showroom Enquiry →
              </Link>
              <a
                href={`tel:${business.phone.replace(/\s/g,'')}`}
                className="btn btn-ghost"
                id="home-cta-call"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <PhoneIcon size={15} />
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MODAL ═══════════════════════════ */}
      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </>
  );
}

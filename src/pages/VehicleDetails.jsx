import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getVehicleById, vehicles, formatKm, business, financeLinks } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import {
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  ShieldCheckIcon,
  CarIcon,
  MapPinIcon,
  ExternalLinkIcon,
  CalculatorIcon,
} from '../components/Icons.jsx';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = getVehicleById(id);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const heroRef    = useReveal();
  const specsRef   = useReveal();
  const similarRef = useReveal();

  useEffect(() => {
    setActivePhotoIdx(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!vehicle) {
    return (
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap text-center" style={{ textAlign: 'center', margin: 'auto' }}>
          <div style={{ display: 'inline-flex', padding: 24, borderRadius: '50%', background: 'var(--card)', marginBottom: 20, color: 'var(--red)' }}>
            <CarIcon size={48} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Vehicle Not Found</h1>
          <p style={{ color: 'var(--ink-2)', maxWidth: '45ch', margin: '0 auto 28px' }}>
            We could not find the vehicle listing you requested. It may have been updated or sold.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <Link to="/vehicles" className="btn btn-primary">
              Browse Available Stock
            </Link>
            <Link to="/request-a-car" className="btn btn-ghost">
              Request This Car
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const gallery = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [{ src: vehicle.image, label: 'Exterior' }];
  const currentPhoto = gallery[activePhotoIdx] || gallery[0];

  // Similar vehicles from actual inventory
  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <>
      {/* ── Breadcrumbs & Header ────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom: 24 }} ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <nav aria-label="Breadcrumb" style={{ marginBottom: 16 }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: 'var(--ink-3)' }}>
              <li>
                <Link to="/" style={{ color: 'var(--ink-2)' }}>Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/vehicles" style={{ color: 'var(--ink-2)' }}>Import Catalogue</Link>
              </li>
              <li>/</li>
              <li style={{ color: 'var(--ink)' }}>{vehicle.year} {vehicle.title}</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="badge badge-green">
                  <span className="dot" aria-hidden="true" />
                  {vehicle.availability || vehicle.status}
                </span>
                <span className="badge badge-gold" style={{ fontSize: 11 }}>
                  {vehicle.category}
                </span>
                <span style={{ color: 'var(--ink-3)', fontSize: 12, fontFamily: 'var(--mono)' }}>
                  Location: {vehicle.location}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                {vehicle.title}
              </h1>
              <p style={{ color: 'var(--ink-2)', fontSize: '0.98rem' }}>
                {vehicle.year} · {vehicle.make} {vehicle.model} · {formatKm(vehicle.odometerKm)}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                {vehicle.priceDisplay}
              </div>
              <div style={{ color: 'var(--ink-3)', fontSize: '0.85rem', marginTop: 4 }}>
                {vehicle.priceNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Details Grid ───────────────────────────── */}
      <section className="section" style={{ paddingTop: 16 }} ref={specsRef}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'start' }}>
            
            {/* Gallery Column */}
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  aspectRatio: '16/10',
                  cursor: 'zoom-in',
                }}
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={currentPhoto.src}
                  alt={`${vehicle.title} - ${currentPhoto.label}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    background: 'rgba(9,9,13,.82)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: 'var(--r-full)',
                    fontSize: 12,
                    fontFamily: 'var(--mono)',
                    border: '1px solid var(--border-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <CameraIcon size={13} />
                  <span>{currentPhoto.label} ({activePhotoIdx + 1}/{gallery.length})</span>
                </div>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto', paddingBottom: 6 }}>
                  {gallery.map((img, idx) => (
                    <button
                      key={img.label + idx}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      style={{
                        width: 80,
                        height: 56,
                        flexShrink: 0,
                        borderRadius: 'var(--r-sm)',
                        overflow: 'hidden',
                        padding: 0,
                        border: activePhotoIdx === idx ? '2px solid var(--red)' : '1px solid var(--border)',
                        cursor: 'pointer',
                        opacity: activePhotoIdx === idx ? 1 : 0.65,
                        transition: 'opacity var(--t-fast), border-color var(--t-fast)',
                        background: 'var(--card)',
                      }}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Vehicle Description */}
              <div className="glass-card" style={{ marginTop: 28, padding: 28 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                  Vehicle Description
                </h2>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: '0.96rem' }}>
                  {vehicle.description}
                </p>

                {/* Features & Inclusions */}
                {vehicle.features && vehicle.features.length > 0 && (
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                      Verified Specifications &amp; Features
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                      {vehicle.features.map((feat) => (
                        <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: 'var(--red)', display: 'grid', flexShrink: 0 }}>
                            <CheckIcon size={14} />
                          </span>
                          <span style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications & CTA Sidebar */}
            <div>
              <div className="glass-card" style={{ padding: 28, position: 'sticky', top: 96 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
                  Specifications Overview
                </h2>

                <dl className="specs-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 10, margin: '0 0 24px' }}>
                  {[
                    { label: 'Make', value: vehicle.make },
                    { label: 'Model', value: vehicle.model },
                    { label: 'Manufacturing Year', value: vehicle.year },
                    { label: 'Mileage', value: formatKm(vehicle.odometerKm) },
                    { label: 'Transmission', value: vehicle.transmission },
                    { label: 'Fuel Type', value: vehicle.fuelType },
                    { label: 'Body Type', value: vehicle.bodyType },
                    { label: 'Engine', value: vehicle.engine },
                    { label: 'Drive', value: vehicle.drive },
                    { label: 'Chassis Code', value: vehicle.chassis },
                    { label: 'Exterior Colour', value: vehicle.colour },
                    { label: 'Seating Capacity', value: `${vehicle.seats} seats` },
                    { label: 'Condition', value: vehicle.condition || 'Quality Used Import' },
                    { label: 'Location', value: vehicle.location },
                  ].map(({ label, value }) => (
                    <div className="spec-cell" key={label} style={{ background: 'var(--bg-1)', padding: '10px 14px', borderRadius: 'var(--r-sm)' }}>
                      <dt className="spec-label" style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                        {label}
                      </dt>
                      <dd className="spec-value" style={{ fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 600, marginTop: 4 }}>
                        {value || 'Not Specified'}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Direct Import Info */}
                <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 'var(--r-md)', fontSize: '0.86rem', color: 'var(--ink-2)', marginBottom: 16 }}>
                  <strong style={{ color: 'var(--ink)' }}>Direct Import Model:</strong> Sourced upon your request directly from Japan for delivery to Australia or Sri Lanka. Every car is inspected in Japan and imported directly upon the buyer's request.
                </div>

                {/* Primary CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    to={`/request-a-car?make=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${vehicle.year}&id=${encodeURIComponent(vehicle.id)}`}
                    className="btn btn-primary btn-lg"
                    style={{ justifyContent: 'center' }}
                    id="details-request-car-btn"
                  >
                    Request to Import This Car
                  </Link>

                  <Link
                    to={`/contact?car=${encodeURIComponent(vehicle.title)}&id=${encodeURIComponent(vehicle.id)}`}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'center' }}
                  >
                    Ask a Question / Get a Quote
                  </Link>
                </div>

                {/* Finance Assistance Box */}
                <div
                  style={{
                    marginTop: 20,
                    padding: '16px',
                    borderRadius: 'var(--r-md)',
                    background: 'rgba(245, 198, 64, 0.05)',
                    border: '1px solid rgba(245, 198, 64, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="badge badge-gold" style={{ fontSize: 10 }}>50+ Lenders Available</span>
                    <Link to="/finance" style={{ fontSize: 11, color: 'var(--gold)', textDecoration: 'underline' }}>
                      Learn More
                    </Link>
                  </div>
                  <strong style={{ fontSize: 13, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
                    Need Car Finance for this Vehicle?
                  </strong>
                  <p style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 12px' }}>
                    Compare over 50 trusted Australian lenders via Credit One with competitive rates for Japanese imports.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <a
                      href={financeLinks.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: 11, padding: '8px 10px', justifyContent: 'center', gap: 4 }}
                    >
                      <span>Apply Now</span>
                      <ExternalLinkIcon size={12} />
                    </a>
                    <a
                      href={financeLinks.calculatorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{ fontSize: 11, padding: '8px 10px', justifyContent: 'center', gap: 4 }}
                    >
                      <CalculatorIcon size={12} />
                      <span>Calculator</span>
                    </a>
                  </div>
                </div>

                {/* Direct Contact Assist */}
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)', fontSize: '0.86rem', color: 'var(--ink-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <PhoneIcon size={14} />
                    <span>Call or Enquire: <a href={`tel:${business.phone.replace(/\s/g,'')}`} style={{ color: 'var(--ink)' }}>{business.phone}</a></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MailIcon size={14} />
                    <span>Email: <a href={`mailto:${business.email}`} style={{ color: 'var(--ink)' }}>{business.email}</a></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Similar Vehicles From Actual Inventory ───────── */}
      <section className="section" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }} ref={similarRef}>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow red">Explore More Options</p>
            <h2 className="section-title">Other Japanese Import Models</h2>
            <p className="section-sub">
              Browse other popular Japanese vehicles available to import upon request.
            </p>
          </div>

          <div className="gallery-grid">
            {similarVehicles.map((v, i) => (
              <article key={v.id} className={`vcard reveal delay-${i + 1}`}>
                <div className="vcard-img" onClick={() => navigate(`/vehicles/${v.id}`)} style={{ cursor: 'pointer' }}>
                  <img src={v.image} alt={v.title} loading="lazy" />
                  <div className="vcard-overlay" aria-hidden="true" />
                  <span className="vcard-badge badge badge-green">{v.availability || v.status}</span>
                </div>
                <div className="vcard-body">
                  <div className="vcard-meta">{v.year} · {v.make} · {v.location}</div>
                  <h3 className="vcard-title" onClick={() => navigate(`/vehicles/${v.id}`)} style={{ cursor: 'pointer' }}>
                    {v.title}
                  </h3>
                  <div className="vcard-price-row">
                    <span className="vcard-price" style={{ fontSize: '1.02rem', color: 'var(--gold)' }}>{v.priceDisplay}</span>
                    <span className="vcard-price-note">{v.priceNote}</span>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Link to={`/vehicles/${v.id}`} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/vehicles" className="btn btn-ghost">
              Browse Full Import Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ──────────────────────────────── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,5,8,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backdropFilter: 'blur(10px)',
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <div style={{ position: 'relative', maxWidth: 1100, width: '100%', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={currentPhoto.src}
              alt={currentPhoto.label}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--r-md)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, color: '#fff' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{currentPhoto.label}</span>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setLightboxOpen(false)}
              >
                Close Gallery (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

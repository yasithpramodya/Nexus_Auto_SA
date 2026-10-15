import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatKm, vehicles } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import VehicleModal from '../components/VehicleModal.jsx';
import { SearchIcon, CheckIcon, ArrowRightIcon, CameraIcon } from '../components/Icons.jsx';

function statusBadge(status) {
  const s = status.toLowerCase();
  if (s.includes('just arrived'))  return 'badge-red';
  if (s.includes('arriving soon')) return 'badge-gold';
  return 'badge-green';
}

function hasDot(status) {
  const s = status.toLowerCase();
  return s.includes('in stock') || s.includes('just arrived');
}

function VehicleCard({ v, i, onOpenModal }) {
  const gallery = v.gallery && v.gallery.length > 0 ? v.gallery : [{ src: v.image, label: 'Exterior' }];
  const [photoIdx, setPhotoIdx] = useState(0);

  const badgeCls = statusBadge(v.status);
  const dot = hasDot(v.status);
  const currentPhoto = gallery[photoIdx] || gallery[0];

  return (
    <article
      className={`vehicle-article reveal delay-${Math.min(i + 1, 3)}`}
      id={`vehicle-${v.id}`}
    >
      {/* Image panel */}
      <div className="va-img">
        <img
          src={currentPhoto.src}
          alt={`${v.year} ${v.title} - ${currentPhoto.label}`}
          loading={i < 2 ? 'eager' : 'lazy'}
          onClick={() => onOpenModal(v)}
          style={{ cursor: 'pointer' }}
        />
        <div className="va-gradient" aria-hidden="true" />
        
        {/* Status Badge */}
        <span className={`va-badge badge ${badgeCls}`}>
          {dot && <span className="dot" aria-hidden="true" />}
          {v.status}
        </span>

        {/* Photo Count Pill */}
        <span
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(9,9,13,.82)',
            border: '1px solid var(--border-2)',
            color: '#fff',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            padding: '4px 10px',
            borderRadius: 'var(--r-full)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
          }}
          onClick={() => onOpenModal(v)}
        >
          <CameraIcon size={12} />
          {gallery.length} Photos
        </span>

        {/* Mini Thumbnail Strip on Card */}
        {gallery.length > 1 && (
          <div className="va-thumbs-row">
            {gallery.map((g, idx) => (
              <button
                key={g.label + idx}
                type="button"
                className={`va-thumb-item${photoIdx === idx ? ' active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIdx(idx);
                }}
                aria-label={`View ${g.label}`}
                title={g.label}
              >
                <img src={g.src} alt={g.label} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content panel */}
      <div className="va-body">
        <div className="va-meta">
          <span>{v.year}</span>
          <span className="va-meta-sep">·</span>
          <span>Chassis {v.chassis}</span>
          <span className="va-meta-sep">·</span>
          <span>Grade {v.auctionGrade}</span>
          <span className="va-meta-sep">·</span>
          <span style={{ color: 'var(--red)', fontWeight: 600 }}>{v.category}</span>
        </div>

        <h2 className="va-title" onClick={() => onOpenModal(v)} style={{ cursor: 'pointer' }}>
          {v.title}
        </h2>

        {/* Pricing Box */}
        <div className="va-price-box">
          <div>
            <div className="va-price-amount">{v.priceDisplay}</div>
            <div className="va-price-sub">{v.priceNote}</div>
          </div>
          <div className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <CheckIcon size={12} />
            Complied &amp; Registered
          </div>
        </div>

        <p className="va-desc">{v.description}</p>

        {/* Specs */}
        <dl className="specs-grid">
          {[
            { label: 'Odometer',     value: formatKm(v.odometerKm) },
            { label: 'Transmission', value: v.transmission         },
            { label: 'Engine',       value: v.engine               },
            { label: 'Drive',        value: v.drive                },
            { label: 'Body style',   value: v.bodyStyle            },
            { label: 'Colour',       value: v.colour               },
            { label: 'Seats',        value: `${v.seats} seats`     },
            { label: 'Auction grade',value: v.auctionGrade         },
          ].map(({ label, value }) => (
            <div className="spec-cell" key={label}>
              <dt className="spec-label">{label}</dt>
              <dd className="spec-value">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Highlights */}
        {v.features && (
          <div className="va-highlights">
            <div className="va-highlights-title">Verified Inclusions &amp; Equipment</div>
            <div className="va-highlights-list">
              {v.features.slice(0, 4).map((f) => (
                <div key={f} className="va-highlight-item">
                  <span className="va-highlight-icon">
                    <CheckIcon size={12} />
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="va-actions">
          <Link
            className="btn btn-primary"
            to={`/contact?car=${encodeURIComponent(v.title)}`}
            id={`enquire-${v.id}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span>Enquire / Book Inspection</span>
            <ArrowRightIcon size={14} />
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onOpenModal(v)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <CameraIcon size={14} />
            View Photo Gallery ({gallery.length})
          </button>
        </div>
      </div>
    </article>
  );
}

export default function WhatWeOffer() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [modalVehicle, setModalVehicle] = useState(null);

  const heroRef = useReveal();
  const listRef = useReveal();
  const ctaRef  = useReveal();

  const categories = useMemo(() => {
    return ['All', 'Performance', 'Luxury Sedan', 'Classic', 'Kei Roadster', 'In Stock'];
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category filter
        if (selectedCategory === 'In Stock' && !v.status.toLowerCase().includes('in stock')) {
          return false;
        }
        if (selectedCategory !== 'All' && selectedCategory !== 'In Stock' && v.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.chassis.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.colour.toLowerCase().includes(q) ||
          (v.tags && v.tags.some((t) => t.toLowerCase().includes(q))) ||
          String(v.year).includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'km-asc') return a.odometerKm - b.odometerKm;
        return 0; // featured
      });
  }, [search, selectedCategory, sortBy]);

  return (
    <>
      {/* ── Page hero ──────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Adelaide Showroom &amp; Import Inventory</p>
          <h1 className="reveal delay-1">Japanese Vehicles</h1>
          <p className="page-hero-sub reveal delay-2">
            Every vehicle is personally selected from Japanese auction houses, complied to full
            Australian ADR standards, mechanically certified, and provided with South Australian registration.
            Don't see your dream car?{' '}
            <Link className="text-link" to="/contact?topic=Importing+a+car">
              We can source it for you direct from Japan
              <ArrowRightIcon size={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* ── Filter & Search Section ─────────────────────── */}
      <section className="section" style={{ paddingTop: 36 }} ref={listRef}>
        <div className="wrap">
          
          <div className="filter-wrapper reveal">
            <div className="filter-top">
              {/* Search Box */}
              <div className="filter-search-box">
                <span className="filter-search-icon" aria-hidden="true">
                  <SearchIcon size={16} />
                </span>
                <input
                  type="text"
                  className="filter-search-input"
                  placeholder="Search by model, chassis code (e.g. BNR34), engine or tag..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search vehicles"
                />
              </div>

              {/* Sort By */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Sort:</span>
                <select
                  className="filter-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort vehicles"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="km-asc">Mileage: Lowest First</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab-btn${selectedCategory === cat ? ' active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'All' ? 'All Vehicles' : cat}
                </button>
              ))}
              <span className="filter-results-count">
                Showing {filteredVehicles.length} of {vehicles.length} vehicles
              </span>
            </div>
          </div>

          {/* ── Vehicle List ───────────────────────────── */}
          {filteredVehicles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-flex', padding: 20, borderRadius: '50%', background: 'var(--bg-1)', marginBottom: 16, color: 'var(--ink-3)' }}>
                <SearchIcon size={38} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>No vehicles match your criteria</h2>
              <p style={{ color: 'var(--ink-2)', marginBottom: 24, maxWidth: '40ch', marginInline: 'auto' }}>
                We couldn't find any in-stock cars matching "{search}". We can easily source this exact model direct from Japan for you!
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                >
                  Clear Filters
                </button>
                <Link
                  to={`/contact?topic=Importing+a+car&message=${encodeURIComponent('Hi Nexus Auto SA, I am looking for a ' + search)}`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <span>Request Custom Import Search</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="vehicles-list">
              {filteredVehicles.map((v, i) => (
                <VehicleCard key={v.id} v={v} i={i} onOpenModal={setModalVehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Import CTA ─────────────────────────────────── */}
      <section className="section-sm" ref={ctaRef}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Looking for a specific specification?</p>
              <h2 className="cta-title">We'll source your dream car directly from Japan</h2>
              <p className="cta-sub">
                Tell us the make, model, chassis, grade, and budget. We monitor Japan's live auction lanes
                daily and will alert you the moment a matching car comes up. Lead time is
                typically 6–10 weeks door to door in Adelaide.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/contact?topic=Importing+a+car" id="offer-import-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Start Custom Import Enquiry</span>
                <ArrowRightIcon size={15} />
              </Link>
              <Link className="btn btn-ghost" to="/contact?topic=Test+drive" id="offer-test-drive">
                Book a Yard Inspection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ───────────────────────────────────────── */}
      {modalVehicle && (
        <VehicleModal vehicle={modalVehicle} onClose={() => setModalVehicle(null)} />
      )}
    </>
  );
}

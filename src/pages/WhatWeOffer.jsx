import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatKm, vehicles } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import VehicleModal from '../components/VehicleModal.jsx';
import {
  SearchIcon,
  CheckIcon,
  ArrowRightIcon,
  CameraIcon,
  FilterIcon,
  XIcon,
} from '../components/Icons.jsx';

/* Mini SVG icons */
const MiniIcons = {
  gauge: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10a6 6 0 1 1 12 0" strokeLinecap="round" />
      <path d="M8 10 10.5 6" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" />
    </svg>
  ),
  fuel: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 13h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z" strokeLinecap="round" />
      <path d="M4 6h5M12 7l2 2v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  ),
};

function statusBadge(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('just arrived')) return 'badge-red';
  if (s.includes('arriving soon') || s.includes('transit')) return 'badge-gold';
  return 'badge-green';
}

function VehicleCard({ v, i, onOpenModal }) {
  const gallery = v.gallery && v.gallery.length > 0 ? v.gallery : [{ src: v.image, label: 'Exterior' }];
  const badgeCls = statusBadge(v.availability || v.status);

  return (
    <article className={`vcard reveal delay-${Math.min((i % 3) + 1, 3)}`} id={`stock-${v.id}`}>
      {/* Image Container */}
      <div className="vcard-img" onClick={() => onOpenModal(v)} style={{ cursor: 'pointer' }}>
        <img
          src={v.image}
          alt={`${v.year} ${v.title}`}
          loading={i < 3 ? 'eager' : 'lazy'}
        />
        <div className="vcard-overlay" aria-hidden="true" />

        <span className={`vcard-badge badge ${badgeCls}`}>
          <span className="dot" aria-hidden="true" />
          {v.availability || v.status}
        </span>

        {gallery.length > 0 && (
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
            {gallery.length} Photos
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="vcard-body">
        <div className="vcard-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{v.year} · {v.make} · {v.bodyType}</span>
          <span style={{ color: 'var(--gold)', fontSize: 11, fontFamily: 'var(--mono)' }}>
            {MiniIcons.pin} {v.location}
          </span>
        </div>

        <h2 className="vcard-title" onClick={() => onOpenModal(v)} style={{ cursor: 'pointer', fontSize: '1.15rem' }}>
          {v.title}
        </h2>

        {/* Pricing on Request */}
        <div className="vcard-price-row">
          <span className="vcard-price" style={{ fontSize: '1.02rem', color: 'var(--gold)' }}>
            Price on Request
          </span>
          <span className="vcard-price-note">Direct Landed Import Quote</span>
        </div>

        {/* Key Specifications Grid */}
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
            id={`request-btn-${v.id}`}
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
  );
}

export default function WhatWeOffer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceFilter, setPriceFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [bodyFilter, setBodyFilter] = useState('All');
  const [transFilter, setTransFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [modalVehicle, setModalVehicle] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const heroRef = useReveal();
  const listRef = useReveal();
  const ctaRef  = useReveal();

  const categories = useMemo(() => {
    return [
      'All',
      'Comfortable Sedans',
      'Specialty Japanese Imports',
      'Hatchbacks',
      'SUVs',
      'Family',
    ];
  }, []);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setPriceFilter('All');
    setYearFilter('All');
    setBodyFilter('All');
    setTransFilter('All');
    setFuelFilter('All');
    setLocationFilter('All');
    setAvailabilityFilter('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category
        if (selectedCategory !== 'All') {
          const matchCat =
            v.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            v.bodyType.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!matchCat) return false;
        }

        // Price filter
        if (priceFilter === 'under40') {
          if (v.price >= 40000) return false;
        } else if (priceFilter === '40to80') {
          if (v.price < 40000 || v.price > 80000) return false;
        } else if (priceFilter === 'over80') {
          if (v.price <= 80000) return false;
        }

        // Year filter
        if (yearFilter === '2020+') {
          if (v.year < 2020) return false;
        } else if (yearFilter === '2010-2019') {
          if (v.year < 2010 || v.year > 2019) return false;
        } else if (yearFilter === 'pre2010') {
          if (v.year >= 2010) return false;
        }

        // Body type filter
        if (bodyFilter !== 'All') {
          if (v.bodyType.toLowerCase() !== bodyFilter.toLowerCase()) return false;
        }

        // Transmission filter
        if (transFilter !== 'All') {
          if (!v.transmission.toLowerCase().includes(transFilter.toLowerCase())) return false;
        }

        // Fuel filter
        if (fuelFilter !== 'All') {
          if (v.fuelType.toLowerCase() !== fuelFilter.toLowerCase()) return false;
        }

        // Location filter
        if (locationFilter !== 'All') {
          if (!v.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
        }

        // Availability filter
        if (availabilityFilter !== 'All') {
          const statusCombined = `${v.status} ${v.availability}`.toLowerCase();
          if (!statusCombined.includes(availabilityFilter.toLowerCase())) return false;
        }

        // Search Query
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.chassis.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.colour.toLowerCase().includes(q) ||
          v.fuelType.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          String(v.year).includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'year-asc') return a.year - b.year;
        if (sortBy === 'km-asc') return a.odometerKm - b.odometerKm;
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
        return 0; // featured
      });
  }, [
    search,
    selectedCategory,
    yearFilter,
    bodyFilter,
    transFilter,
    fuelFilter,
    locationFilter,
    availabilityFilter,
    sortBy,
  ]);

  const hasActiveFilters =
    search ||
    selectedCategory !== 'All' ||
    yearFilter !== 'All' ||
    bodyFilter !== 'All' ||
    transFilter !== 'All' ||
    fuelFilter !== 'All' ||
    locationFilter !== 'All' ||
    availabilityFilter !== 'All';

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Direct Japanese Imports · Order on Request</p>
          <h1 className="reveal delay-1">Import Catalog</h1>
          <p className="page-hero-sub reveal delay-2">
            Explore 15 popular Japanese models available to import to Australia and Sri Lanka. We do not keep cars sitting on a showroom floor—every vehicle is sourced and imported direct upon buyer request to meet your exact specifications and budget.
          </p>
        </div>
      </section>

      {/* ── Filter & Search Section ───────────────────────── */}
      <section className="section" style={{ paddingTop: 28 }} ref={listRef}>
        <div className="wrap">
          <div className="filter-wrapper reveal">
            {/* Top row: search & primary controls */}
            <div className="filter-top">
              {/* Search Box */}
              <div className="filter-search-box">
                <span className="filter-search-icon" aria-hidden="true">
                  <SearchIcon size={16} />
                </span>
                <input
                  type="text"
                  className="filter-search-input"
                  placeholder="Search by make, model, chassis, or keyword (e.g. Crown, Skyline, Hybrid)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search vehicles"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    style={{ background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', padding: 8 }}
                    aria-label="Clear search"
                  >
                    <XIcon size={14} />
                  </button>
                )}
              </div>

              {/* Sort By Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                  Sort:
                </span>
                <select
                  className="filter-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort vehicles"
                >
                  <option value="featured">Featured Models</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="year-asc">Year: Oldest First</option>
                  <option value="km-asc">Mileage: Lowest First</option>
                  <option value="name-asc">Make &amp; Model (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab-btn${selectedCategory === cat ? ' active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchParams(cat === 'All' ? {} : { category: cat });
                  }}
                >
                  {cat === 'All' ? 'All Inventory' : cat}
                </button>
              ))}
            </div>

            {/* Detailed Filter Dropdowns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 10,
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
              }}
            >

              {/* Manufacturing Year */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: 4 }}>
                  Year
                </label>
                <select
                  className="filter-sort-select"
                  style={{ width: '100%' }}
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  aria-label="Filter by year"
                >
                  <option value="All">All Years</option>
                  <option value="2020+">2020 &amp; Newer</option>
                  <option value="2010-2019">2010 – 2019</option>
                  <option value="pre2010">Pre-2010 (Classic)</option>
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: 4 }}>
                  Body Type
                </label>
                <select
                  className="filter-sort-select"
                  style={{ width: '100%' }}
                  value={bodyFilter}
                  onChange={(e) => setBodyFilter(e.target.value)}
                  aria-label="Filter by body type"
                >
                  <option value="All">All Bodies</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: 4 }}>
                  Transmission
                </label>
                <select
                  className="filter-sort-select"
                  style={{ width: '100%' }}
                  value={transFilter}
                  onChange={(e) => setTransFilter(e.target.value)}
                  aria-label="Filter by transmission"
                >
                  <option value="All">All Transmissions</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: 4 }}>
                  Fuel Type
                </label>
                <select
                  className="filter-sort-select"
                  style={{ width: '100%' }}
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                  aria-label="Filter by fuel type"
                >
                  <option value="All">All Fuels</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', display: 'block', marginBottom: 4 }}>
                  Location
                </label>
                <select
                  className="filter-sort-select"
                  style={{ width: '100%' }}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="All">All Locations</option>
                  <option value="Australia">Australia</option>
                  <option value="Sri Lanka">Sri Lanka Import Eligible</option>
                </select>
              </div>
            </div>

            {/* Results bar & Reset */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 13, color: 'var(--ink-3)' }}>
              <span>
                Showing <strong style={{ color: 'var(--ink)' }}>{filteredVehicles.length}</strong> of {vehicles.length} listings
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--red)',
                    fontSize: 12,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* ── Vehicle Grid or Empty State ───────────────── */}
          {filteredVehicles.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 20px',
                background: 'var(--card)',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)',
                marginTop: 24,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: 20,
                  borderRadius: '50%',
                  background: 'var(--bg-1)',
                  marginBottom: 16,
                  color: 'var(--ink-3)',
                }}
              >
                <SearchIcon size={38} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: 'var(--ink)' }}>
                No vehicles match your criteria
              </h2>
              <p style={{ color: 'var(--ink-2)', marginBottom: 24, maxWidth: '44ch', marginInline: 'auto', lineHeight: 1.6 }}>
                We could not find any current in-stock listings matching your selected filters. You can request this exact car through our preferred car request service.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={resetAllFilters}
                >
                  Clear All Filters
                </button>
                <Link
                  to={`/request-a-car?make=${encodeURIComponent(search)}`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <span>Request This Vehicle</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="gallery-grid" style={{ marginTop: 28 }}>
              {filteredVehicles.map((v, i) => (
                <VehicleCard key={v.id} v={v} i={i} onOpenModal={setModalVehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Final Preferred Request CTA ──────────────────── */}
      <section className="section-sm" ref={ctaRef}>
        <div className="wrap">
          <div className="cta-banner reveal">
            <div>
              <p className="eyebrow red" style={{ marginBottom: 12 }}>Can't Find Your Preferred Car?</p>
              <h2 className="cta-title">Tell Us Which Car You Are Looking For</h2>
              <p className="cta-sub">
                Our business connects drivers across Australia and Sri Lanka with quality used vehicles and Japanese imports. If your preferred car is not listed in our stock, tell us your requirements and our team will review the available options.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/request-a-car" id="stock-request-car-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Request a Vehicle</span>
                <ArrowRightIcon size={15} />
              </Link>
              <Link className="btn btn-ghost" to="/contact" id="stock-contact-team">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick View Modal ──────────────────────────────── */}
      {modalVehicle && (
        <VehicleModal vehicle={modalVehicle} onClose={() => setModalVehicle(null)} />
      )}
    </>
  );
}

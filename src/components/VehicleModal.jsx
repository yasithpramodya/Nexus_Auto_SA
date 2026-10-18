import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatKm, business } from '../data/vehicles.js';
import { CloseIcon, CheckIcon, PhoneIcon, ChevronDownIcon, ArrowRightIcon } from './Icons.jsx';

export default function VehicleModal({ vehicle, onClose }) {
  const [activePhoto, setActivePhoto] = useState(0);

  // Use gallery array or fallback to main image
  const gallery = vehicle?.gallery && vehicle.gallery.length > 0
    ? vehicle.gallery
    : [{ src: vehicle.image, label: 'Exterior' }];

  useEffect(() => {
    setActivePhoto(0);
  }, [vehicle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActivePhoto((prev) => (prev + 1) % gallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhoto((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, gallery.length]);

  if (!vehicle) return null;

  const currentPhoto = gallery[activePhoto] || gallery[0];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-subtitle">{vehicle.year} · Chassis {vehicle.chassis} · Grade {vehicle.auctionGrade}</div>
            <h2 id="modal-title" className="modal-title">{vehicle.title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Main Photo Gallery */}
          <div>
            <div className="modal-image-wrap">
              <img src={currentPhoto.src} alt={`${vehicle.title} - ${currentPhoto.label}`} />

              {/* Prev/Next Buttons if multiple photos */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    className="modal-gallery-nav-btn prev"
                    onClick={() => setActivePhoto((prev) => (prev - 1 + gallery.length) % gallery.length)}
                    aria-label="Previous photo"
                  >
                    <span style={{ transform: 'rotate(90deg)', display: 'grid' }}>
                      <ChevronDownIcon size={18} />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="modal-gallery-nav-btn next"
                    onClick={() => setActivePhoto((prev) => (prev + 1) % gallery.length)}
                    aria-label="Next photo"
                  >
                    <span style={{ transform: 'rotate(-90deg)', display: 'grid' }}>
                      <ChevronDownIcon size={18} />
                    </span>
                  </button>
                </>
              )}

              {/* Caption tag */}
              <div className="modal-gallery-tag">
                {currentPhoto.label} ({activePhoto + 1} of {gallery.length})
              </div>
            </div>

            {/* Thumbnails strip */}
            {gallery.length > 1 && (
              <div className="modal-thumbs-strip" style={{ marginTop: 12 }}>
                {gallery.map((item, idx) => (
                  <button
                    key={item.label + idx}
                    type="button"
                    className={`modal-thumb-btn${activePhoto === idx ? ' active' : ''}`}
                    onClick={() => setActivePhoto(idx)}
                    aria-label={`View ${item.label}`}
                  >
                    <img src={item.src} alt={item.label} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Status Box */}
          <div className="va-price-box">
            <div>
              <div className="va-price-amount" style={{ color: 'var(--gold)', fontSize: '1.4rem' }}>{vehicle.priceDisplay}</div>
              <div className="va-price-sub">{vehicle.priceNote}</div>
            </div>
            <div className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CheckIcon size={12} />
              {vehicle.availability || vehicle.status}
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.75 }}>
            {vehicle.description}
          </p>

          {/* Full Specifications Grid */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Vehicle Specifications
            </h3>
            <dl className="specs-grid">
              {[
                { label: 'Make & Model', value: `${vehicle.make} ${vehicle.model}` },
                { label: 'Year', value: vehicle.year },
                { label: 'Mileage', value: formatKm(vehicle.odometerKm) },
                { label: 'Transmission', value: vehicle.transmission },
                { label: 'Fuel Type', value: vehicle.fuelType },
                { label: 'Body Style', value: vehicle.bodyStyle },
                { label: 'Engine', value: vehicle.engine },
                { label: 'Drive Type', value: vehicle.drive },
                { label: 'Exterior Colour', value: vehicle.colour },
                { label: 'Seating Capacity', value: `${vehicle.seats} Seats` },
                { label: 'Condition', value: vehicle.condition || 'Quality Used Import' },
                { label: 'Location', value: vehicle.location },
              ].map(({ label, value }) => (
                <div className="spec-cell" key={label}>
                  <dt className="spec-label">{label}</dt>
                  <dd className="spec-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Key Features */}
          {vehicle.features && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Factory Highlights &amp; Inclusions
              </h3>
              <div className="va-highlights-list">
                {vehicle.features.map((feat) => (
                  <div key={feat} className="va-highlight-item">
                    <span className="va-highlight-icon">
                      <CheckIcon size={12} />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Import Notice */}
          <div style={{ background: 'rgba(232,25,44,0.06)', border: '1px solid rgba(232,25,44,0.2)', padding: '12px 16px', borderRadius: 'var(--r-md)', fontSize: '0.86rem', color: 'var(--ink-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>Direct Import on Request:</strong> This vehicle is available to import to Australia or Sri Lanka. We source directly from Japanese dealer auctions upon your request—no showroom floor markups.
          </div>

          {/* Action CTAs */}
          <div className="va-actions" style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <Link
              to={`/request-a-car?make=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${vehicle.year}&id=${encodeURIComponent(vehicle.id)}`}
              className="btn btn-primary"
              onClick={onClose}
              id={`modal-request-${vehicle.id}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>Request to Import This Car</span>
              <ArrowRightIcon size={14} />
            </Link>
            <Link
              to={`/vehicles/${vehicle.id}`}
              className="btn btn-ghost"
              onClick={onClose}
            >
              View Full Vehicle Specs
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

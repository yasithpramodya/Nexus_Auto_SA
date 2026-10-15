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
              <div className="va-price-amount">{vehicle.priceDisplay}</div>
              <div className="va-price-sub">{vehicle.priceNote}</div>
            </div>
            <div className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CheckIcon size={12} />
              SA Rego &amp; Compliance Certified
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.75 }}>
            {vehicle.description}
          </p>

          {/* Full Specifications Grid */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Full Specifications &amp; Compliance Data
            </h3>
            <dl className="specs-grid">
              {[
                { label: 'Odometer', value: formatKm(vehicle.odometerKm) },
                { label: 'Transmission', value: vehicle.transmission },
                { label: 'Engine', value: vehicle.engine },
                { label: 'Drive Type', value: vehicle.drive },
                { label: 'Body Style', value: vehicle.bodyStyle },
                { label: 'Exterior Colour', value: vehicle.colour },
                { label: 'Seating Capacity', value: `${vehicle.seats} Seats` },
                { label: 'Auction Grade', value: `${vehicle.auctionGrade} (Verified USS)` },
                { label: 'ADR Compliance', value: 'Complete & Certified' },
                { label: 'Registration', value: 'South Australia (Included)' },
              ].map(({ label, value }) => (
                <div className="spec-cell" key={label}>
                  <dt className="spec-label">{label}</dt>
                  <dd className="spec-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Key Features & Japanese Logbook Checklist */}
          {vehicle.features && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Factory Highlights &amp; Certified Inclusions
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

          {/* Action CTAs */}
          <div className="va-actions" style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <Link
              to={`/contact?car=${encodeURIComponent(vehicle.title)}`}
              className="btn btn-primary"
              onClick={onClose}
              id={`modal-enquire-${vehicle.id}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>Enquire About This Vehicle</span>
              <ArrowRightIcon size={14} />
            </Link>
            <a
              href={`tel:${business.phone.replace(/\s/g,'')}`}
              className="btn btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <PhoneIcon size={14} />
              Call {business.phone}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

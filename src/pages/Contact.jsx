import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import {
  ZapIcon,
  AwardIcon,
  ShieldCheckIcon,
  LockIcon,
  CarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ShipIcon,
  ArrowRightIcon,
  MailIcon,
} from '../components/Icons.jsx';

const topics = ['Buying a car', 'Importing a car', 'Test drive', 'Other'];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const carParam = searchParams.get('car');
  const topicParam = searchParams.get('topic');
  const messageParam = searchParams.get('message');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: topicParam || (carParam ? 'Buying a car' : topics[0]),
    message: messageParam || (carParam ? `Hi Nexus Auto SA, I am interested in inspecting the ${carParam}. Is it currently available for viewing in Adelaide?` : ''),
  });

  useEffect(() => {
    if (carParam) {
      setForm((f) => ({
        ...f,
        topic: 'Buying a car',
        message: f.message || `Hi Nexus Auto SA, I am interested in inspecting the ${carParam}. Is it currently available for viewing in Adelaide?`,
      }));
    } else if (topicParam) {
      setForm((f) => ({ ...f, topic: topicParam }));
    }
  }, [carParam, topicParam]);

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus('error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      const body = `Name: ${form.name}\nPhone: ${form.phone}\nTopic: ${form.topic}\n\nMessage:\n${form.message}`;
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(`Website enquiry [${form.topic}]: ${form.name}`)}&body=${encodeURIComponent(body)}`;
    }, 600);
  };

  const heroRef = useReveal();
  const gridRef = useReveal();

  return (
    <>
      {/* ── Page hero ──────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Connect with Nexus Auto SA Adelaide</p>
          <h1 className="reveal delay-1">Visit or Contact Us</h1>
          <p className="page-hero-sub reveal delay-2">
            Ask about an in-stock vehicle, arrange a private test drive at our Clapham showroom,
            or commission a custom import directly from Japanese auctions.
          </p>
          {/* Quick reasons */}
          <div className="reveal delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px', marginTop: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span style={{ color: 'var(--gold)', display: 'grid' }}><ZapIcon size={16} /></span>
              Rapid Response — usually within 2 to 4 business hours
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span style={{ color: 'var(--red)', display: 'grid' }}><AwardIcon size={16} /></span>
              Grade 4+ Japanese auction cars guaranteed
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span style={{ color: 'var(--green)', display: 'grid' }}><ShieldCheckIcon size={16} /></span>
              Full ADR compliance, SA roadworthy &amp; registration
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-2)' }}>
              <span style={{ color: 'var(--cyan)', display: 'grid' }}><LockIcon size={16} /></span>
              Licensed SA Dealer (LMVD 294810) — 100% transparent
            </span>
          </div>
        </div>
      </section>

      {/* ── Contact grid ───────────────────────────────── */}
      <section className="section" ref={gridRef}>
        <div className="wrap contact-grid">

          {/* ── Form ─────────────────────────────────── */}
          <form
            className="form-panel reveal"
            onSubmit={submit}
            noValidate
            id="contact-form"
            aria-label="Send an enquiry"
          >
            <div>
              <h2>Send an Enquiry</h2>
              <p>We personally respond to every message within one business day.</p>
            </div>

            {carParam && (
              <div style={{ background: 'rgba(232,25,44,.1)', border: '1px solid rgba(232,25,44,.25)', borderRadius: 'var(--r-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--red)', display: 'grid' }}><CarIcon size={22} /></span>
                <div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', color: 'var(--red)' }}>Vehicle Selected</div>
                  <strong style={{ fontSize: 14, color: '#fff' }}>{carParam}</strong>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={update}
                  placeholder="e.g. John Henderson"
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="04xx xxx xxx"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update}
                placeholder="john@example.com.au"
              />
            </div>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <div className="chips-wrap">
                <legend className="chips-label">I am enquiring about</legend>
                <div className="chips">
                  {topics.map((t) => (
                    <label key={t} className={`chip${form.topic === t ? ' on' : ''}`}>
                      <input
                        type="radio"
                        name="topic"
                        value={t}
                        checked={form.topic === t}
                        onChange={update}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Tell us what you're looking for, or any questions about compliance, shipping, and viewing..."
              />
            </div>

            {status === 'error' && (
              <p className="form-notice" role="alert" style={{ background: 'var(--red-dim)', border: '1px solid rgba(232,25,44,.2)', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircleIcon size={18} />
                <span>Please enter your full name and a valid email address so we can reply.</span>
              </p>
            )}

            {status === 'success' && (
              <p className="form-notice" role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircleIcon size={18} />
                <span>Your enquiry has been received! Our default email application is launching with your message. Thank you, {form.name.split(' ')[0]}!</span>
              </p>
            )}

            <button
              className="btn btn-primary btn-lg"
              type="submit"
              id="contact-submit"
              disabled={isSubmitting}
              style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
              <ArrowRightIcon size={15} />
            </button>
          </form>

          {/* ── Info sidebar ─────────────────────────── */}
          <aside className="info-col reveal delay-2" aria-label="Contact information">

            {/* Visit */}
            <div className="info-panel">
              <div className="info-panel-head">
                <span className="info-panel-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                  <MapPinIcon size={20} />
                </span>
                <h3>Showroom Location</h3>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--ink)' }}>{business.name}</p>
              <p>{business.address}</p>
              <p style={{ fontSize: 11, color: 'var(--ink-3)' }}>Licence: {business.licence}</p>
              <a
                className="text-link"
                href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
                target="_blank"
                rel="noreferrer"
                id="maps-link"
                style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                Get Directions on Google Maps
                <ArrowRightIcon size={13} />
              </a>
            </div>

            {/* Phone & email */}
            <div className="info-panel">
              <div className="info-panel-head">
                <span className="info-panel-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                  <PhoneIcon size={20} />
                </span>
                <h3>Direct Dealership Contact</h3>
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PhoneIcon size={13} />
                <a href={`tel:${business.phone.replace(/\s/g,'')}`}>{business.phone}</a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PhoneIcon size={13} />
                <a href={`tel:${business.mobile.replace(/\s/g,'')}`}>{business.mobile} (Mobile / WhatsApp)</a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MailIcon size={13} />
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>
            </div>

            {/* Hours */}
            <div className="info-panel">
              <div className="info-panel-head">
                <span className="info-panel-icon" aria-hidden="true" style={{ color: 'var(--gold)', display: 'grid' }}>
                  <ClockIcon size={20} />
                </span>
                <h3>Showroom Hours</h3>
              </div>
              <table className="hours-tbl" aria-label="Opening hours">
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {business.hours.map((h) => (
                    <tr key={h.day}>
                      <td>{h.day}</td>
                      <td className={h.sales === 'Closed' ? 'closed' : ''}>{h.sales}</td>
                      <td className={h.service === 'Closed' ? 'closed' : ''}>{h.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick CTA */}
            <div className="info-panel" style={{ background: 'var(--red-dim)', border: '1px solid var(--red-dim2)' }}>
              <div className="info-panel-head">
                <span className="info-panel-icon" aria-hidden="true" style={{ color: 'var(--red)', display: 'grid' }}>
                  <ShipIcon size={20} />
                </span>
                <h3>Looking for an Auction Import?</h3>
              </div>
              <p style={{ color: 'var(--ink-2)', fontFamily: 'var(--font)', fontSize: 13.5, lineHeight: 1.7 }}>
                Can't find the exact specification you want? We monitor 150,000+ weekly auction listings across Japan.
              </p>
              <Link className="btn btn-primary btn-sm" to="/vehicles" style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span>Explore Inventory First</span>
                <ArrowRightIcon size={13} />
              </Link>
            </div>

          </aside>
        </div>
      </section>
    </>
  );
}

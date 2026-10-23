import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendFormEmail } from '../utils/sendFormEmail.js';
import {
  CarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
} from '../components/Icons.jsx';

const enquiryTypes = ['General', 'Vehicle Enquiry', 'Vehicle Request'];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const carParam = searchParams.get('car');
  const idParam = searchParams.get('id');
  const typeParam = searchParams.get('type');
  const messageParam = searchParams.get('message');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: typeParam || (carParam ? 'Vehicle Enquiry' : 'General'),
    subject: carParam ? `Enquiry regarding ${carParam}` : '',
    message: messageParam || (carParam ? `Hi Nexus Auto SA, I am interested in learning more about the ${carParam}. Could you please provide further details and availability?` : ''),
    faxHoneypot: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (carParam) {
      setForm((prev) => ({
        ...prev,
        enquiryType: 'Vehicle Enquiry',
        subject: prev.subject || `Enquiry regarding ${carParam}`,
        message: prev.message || `Hi Nexus Auto SA, I am interested in learning more about the ${carParam}. Could you please provide further details and availability?`,
      }));
    }
  }, [carParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot
    if (form.faxHoneypot) {
      setStatus('success');
      return;
    }

    if (!form.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!form.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please provide a contact phone number.');
      return;
    }
    if (!form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your enquiry message.');
      return;
    }

    setStatus('submitting');

    const enquiryPayload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      enquiryType: form.enquiryType,
      subject: form.subject.trim() || `${form.enquiryType} from ${form.name}`,
      message: form.message.trim(),
      vehicleReference: carParam ? `${carParam} (ID: ${idParam || 'N/A'})` : null,
      status: 'New',
      createdAt: serverTimestamp(),
      submittedAtIso: new Date().toISOString(),
    };

    // Save to Firestore and email the sales inbox at the same time
    const [saveResult, emailResult] = await Promise.allSettled([
      addDoc(collection(db, 'enquiries'), enquiryPayload),
      sendFormEmail({
        formName: 'Contact Us Form',
        summary: `${enquiryPayload.enquiryType} from ${enquiryPayload.name}`,
        replyTo: enquiryPayload.email,
        fields: {
          'Name': enquiryPayload.name,
          'Email': enquiryPayload.email,
          'Phone': enquiryPayload.phone,
          'Enquiry Type': enquiryPayload.enquiryType,
          'Subject': enquiryPayload.subject,
          'Vehicle Reference': enquiryPayload.vehicleReference || 'None',
          'Message': enquiryPayload.message,
        },
      }),
    ]);
    if (emailResult.status === 'rejected') console.warn('Enquiry email not sent:', emailResult.reason);

    if (saveResult.status === 'fulfilled' || emailResult.status === 'fulfilled') {
      const docId = saveResult.value?.id;
      setReferenceId(docId ? docId.slice(0, 8).toUpperCase() : `ENQ-${Date.now().toString().slice(-6)}`);
      setStatus('success');
    } else {
      console.warn('Firestore error, falling back to local storage backup:', saveResult.reason);
      try {
        const stored = JSON.parse(localStorage.getItem('customer_enquiries') || '[]');
        const fallbackRef = `ENQ-${Date.now().toString().slice(-6)}`;
        stored.push({ ...enquiryPayload, id: fallbackRef });
        localStorage.setItem('customer_enquiries', JSON.stringify(stored));
        setReferenceId(fallbackRef);
        setStatus('success');
      } catch (localErr) {
        setStatus('error');
        setErrorMessage('Could not send message. Please contact us via phone or email directly.');
      }
    }
  };

  const heroRef = useReveal();
  const gridRef = useReveal();

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Connect with Our Team</p>
          <h1 className="reveal delay-1">Contact Us</h1>
          <p className="page-hero-sub reveal delay-2">
            Have questions about a listed vehicle, custom vehicle imports, or general advice? We are here to help drivers in Australia and Sri Lanka find the right car.
          </p>
        </div>
      </section>

      {/* ── Contact Grid ─────────────────────────────────── */}
      <section className="section" ref={gridRef} style={{ paddingTop: 24 }}>
        <div className="wrap contact-grid">

          {/* Form Panel */}
          {status === 'success' ? (
            <div
              className="form-panel reveal"
              style={{
                textAlign: 'center',
                padding: '48px 32px',
                border: '1px solid rgba(52,211,153,0.3)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: 18,
                  borderRadius: '50%',
                  background: 'rgba(52,211,153,0.12)',
                  color: 'var(--green)',
                  marginBottom: 16,
                }}
              >
                <CheckCircleIcon size={40} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                Enquiry Sent Successfully
              </h2>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 16 }}>
                Thank you, <strong>{form.name}</strong>. Your enquiry has been received under reference{' '}
                <strong style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>#{referenceId}</strong>.
              </p>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.9rem', marginBottom: 28 }}>
                Our team will review your message and reply to {form.email} as soon as possible.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link to="/vehicles" className="btn btn-primary">
                  Browse Vehicles
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setStatus('idle');
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      enquiryType: 'General',
                      subject: '',
                      message: '',
                      faxHoneypot: '',
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form
              className="form-panel reveal"
              onSubmit={handleSubmit}
              noValidate
              id="contact-form"
              aria-label="Send vehicle enquiry"
            >
              <div className="form-panel-head">
                <h2>Send an Enquiry</h2>
                <p>Fill out the form below and our team will get in touch with you.</p>
              </div>

              {carParam && (
                <div
                  style={{
                    background: 'rgba(232,25,44,0.1)',
                    border: '1px solid rgba(232,25,44,0.25)',
                    borderRadius: 'var(--r-sm)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ color: 'var(--red)', display: 'grid' }}>
                    <CarIcon size={22} />
                  </span>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', color: 'var(--red)' }}>
                      Vehicle Selected
                    </div>
                    <strong style={{ fontSize: 14, color: '#fff' }}>{carParam}</strong>
                  </div>
                </div>
              )}

              {status === 'error' && errorMessage && (
                <div
                  style={{
                    background: 'rgba(232,25,44,0.12)',
                    border: '1px solid rgba(232,25,44,0.3)',
                    borderRadius: 'var(--r-sm)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#ff6b7a',
                  }}
                >
                  <AlertCircleIcon size={18} />
                  <span style={{ fontSize: '0.92rem' }}>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="faxHoneypot"
                  value={form.faxHoneypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Michael Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. michael@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g. (08) 7113 3287 or +61 415 993 511"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="enquiryType">Enquiry Type *</label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={form.enquiryType}
                    onChange={handleChange}
                  >
                    {enquiryTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Availability of Crown Sedan or Custom Import Query"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Write your questions or tell us about your requirements..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={status === 'submitting'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'submitting' ? 'Submitting Enquiry...' : 'Send Enquiry'}
              </button>
            </form>
          )}

          {/* Contact Information & Channels */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>
                Direct Contact Details
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Reach out directly via phone or email. Our team is available to assist with enquiries regarding current inventory, Japanese imports, or preferred vehicle sourcing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a
                  href={`tel:${business.phone.replace(/\s/g,'')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--ink)', textDecoration: 'none' }}
                >
                  <span style={{ color: 'var(--red)', background: 'var(--red-dim)', padding: 10, borderRadius: 'var(--r-sm)', display: 'grid' }}>
                    <PhoneIcon size={18} />
                  </span>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Phone</div>
                    <strong style={{ fontSize: '1.05rem' }}>{business.phone}</strong>
                  </div>
                </a>

                <a
                  href={`tel:${business.mobile.replace(/\s/g,'')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--ink)', textDecoration: 'none' }}
                >
                  <span style={{ color: 'var(--gold)', background: 'var(--gold-dim)', padding: 10, borderRadius: 'var(--r-sm)', display: 'grid' }}>
                    <PhoneIcon size={18} />
                  </span>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Mobile</div>
                    <strong style={{ fontSize: '1.05rem' }}>{business.mobile}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${business.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--ink)', textDecoration: 'none' }}
                >
                  <span style={{ color: 'var(--green)', background: 'var(--green-dim)', padding: 10, borderRadius: 'var(--r-sm)', display: 'grid' }}>
                    <MailIcon size={18} />
                  </span>
                  <div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Email</div>
                    <strong style={{ fontSize: '1rem' }}>{business.email}</strong>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 20, paddingTop: 16 }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 10 }}>
                  Social Channels
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FacebookIcon size={16} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ color: 'var(--red)', display: 'grid' }}>
                  <MapPinIcon size={20} />
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>
                  Operating Regions
                </h3>
              </div>
              <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 16 }}>
                Our automotive business connects drivers in <strong>Australia and Sri Lanka</strong> with quality used cars and Japanese vehicle imports.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ padding: '10px 14px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', fontSize: '0.88rem', color: 'var(--ink-2)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Australia:</strong> Quality used vehicle sales and Japanese imports
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--bg-1)', borderRadius: 'var(--r-sm)', fontSize: '0.88rem', color: 'var(--ink-2)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Sri Lanka:</strong> Vehicle sourcing and Japanese import requests
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Need a specific unlisted car?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginBottom: 14 }}>
                Submit detailed vehicle preferences on our dedicated request page.
              </p>
              <Link to="/request-a-car" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Go to Request a Car Page →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

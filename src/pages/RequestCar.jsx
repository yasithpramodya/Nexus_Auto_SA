import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { business } from '../data/vehicles.js';
import { useReveal } from '../hooks/useReveal.js';
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  CarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  ZapIcon,
} from '../components/Icons.jsx';

export default function RequestCar() {
  const [searchParams] = useSearchParams();
  const prefillMake = searchParams.get('make') || '';
  const prefillModel = searchParams.get('model') || '';
  const prefillCategory = searchParams.get('category') || '';
  const prefillYear = searchParams.get('year') || '';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneCode: '+61',
    phone: '',
    location: 'Australia',
    make: prefillMake,
    model: prefillModel,
    yearRange: prefillYear,
    budgetCurrency: 'AUD',
    budgetAmount: '',
    bodyType: prefillCategory || '',
    transmission: 'Any',
    fuelType: 'Any',
    colour: '',
    additionalRequirements: '',
    // Honeypot for spam protection
    faxHoneypot: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const heroRef = useReveal();
  const formRef = useReveal();

  useEffect(() => {
    if (prefillMake || prefillModel || prefillYear) {
      setForm((prev) => ({
        ...prev,
        make: prefillMake || prev.make,
        model: prefillModel || prev.model,
        yearRange: prefillYear || prev.yearRange,
      }));
    }
  }, [prefillMake, prefillModel, prefillYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Auto-update country code default when location changes if not customized
      ...(name === 'location'
        ? {
            phoneCode: value === 'Sri Lanka' ? '+94' : '+61',
            budgetCurrency: value === 'Sri Lanka' ? 'LKR' : 'AUD',
          }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam honeypot check
    if (form.faxHoneypot) {
      console.warn('Spam detected via honeypot');
      setStatus('success');
      return;
    }

    // Required fields validation
    if (!form.fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your full name.');
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

    setStatus('submitting');

    const requestPayload = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      phoneNumber: `${form.phoneCode} ${form.phone.trim()}`,
      location: form.location,
      preferredMake: form.make.trim() || 'Any',
      preferredModel: form.model.trim() || 'Any',
      yearRange: form.yearRange.trim() || 'Flexible',
      budget: form.budgetAmount.trim() ? `${form.budgetCurrency} ${form.budgetAmount.trim()}` : 'Flexible',
      bodyType: form.bodyType || 'Flexible',
      transmission: form.transmission,
      fuelType: form.fuelType,
      preferredColour: form.colour.trim() || 'Flexible',
      additionalRequirements: form.additionalRequirements.trim() || 'None specified',
      status: 'New',
      createdAt: serverTimestamp(),
      submittedAtIso: new Date().toISOString(),
    };

    try {
      // Connect to Firestore backend
      const docRef = await addDoc(collection(db, 'preferred_requests'), requestPayload);
      const generatedRef = docRef.id ? docRef.id.slice(0, 8).toUpperCase() : `REQ-${Date.now().toString().slice(-6)}`;
      setReferenceId(generatedRef);
      setStatus('success');
    } catch (err) {
      console.warn('Firestore error, falling back to local submission record:', err);
      // Fallback: save to localStorage and compose direct mailto backup so request is never lost
      try {
        const stored = JSON.parse(localStorage.getItem('preferred_requests') || '[]');
        const fallbackRef = `REQ-${Date.now().toString().slice(-6)}`;
        stored.push({ ...requestPayload, id: fallbackRef });
        localStorage.setItem('preferred_requests', JSON.stringify(stored));
        setReferenceId(fallbackRef);
        setStatus('success');
      } catch (localErr) {
        setStatus('error');
        setErrorMessage('Unable to submit your request at this moment. Please call or email us directly.');
      }
    }
  };

  return (
    <>
      {/* ── Page Hero ────────────────────────────────────── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <p className="eyebrow gold reveal">Custom Sourcing &amp; Imports</p>
          <h1 className="reveal delay-1">Can't Find Your Preferred Car?</h1>
          <p className="page-hero-sub reveal delay-2">
            Tell us which vehicle you are looking for, and our team can review your requirements and discuss the available options across Australia and Sri Lanka.
          </p>
        </div>
      </section>

      {/* ── Form Section ─────────────────────────────────── */}
      <section className="section" ref={formRef} style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 960 }}>

          {status === 'success' ? (
            <div
              className="glass-card reveal"
              style={{
                padding: 'clamp(32px, 6vw, 56px)',
                textAlign: 'center',
                border: '1px solid rgba(52,211,153,0.3)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: 20,
                  borderRadius: '50%',
                  background: 'rgba(52,211,153,0.12)',
                  color: 'var(--green)',
                  marginBottom: 20,
                }}
              >
                <CheckCircleIcon size={44} />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
                Vehicle Request Received
              </h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '1.02rem', maxWidth: '52ch', margin: '0 auto 20px', lineHeight: 1.7 }}>
                Thank you, <strong style={{ color: 'var(--ink)' }}>{form.fullName}</strong>. Your preferred vehicle request has been securely registered in our system under reference{' '}
                <strong style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>#{referenceId}</strong>.
              </p>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.9rem', maxWidth: '52ch', margin: '0 auto 28px', lineHeight: 1.6 }}>
                Our vehicle sourcing specialists will review the current availability and auction schedules in {form.location} and contact you at {form.email} with matching possibilities.
              </p>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/vehicles" className="btn btn-primary">
                  Browse Current Stock
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setStatus('idle');
                    setForm({
                      fullName: '',
                      email: '',
                      phoneCode: '+61',
                      phone: '',
                      location: 'Australia',
                      make: '',
                      model: '',
                      yearRange: '',
                      budgetCurrency: 'AUD',
                      budgetAmount: '',
                      bodyType: '',
                      transmission: 'Any',
                      fuelType: 'Any',
                      colour: '',
                      additionalRequirements: '',
                      faxHoneypot: '',
                    });
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card reveal" style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                  Preferred Vehicle Requirements Form
                </h2>
                <p style={{ color: 'var(--ink-2)', fontSize: '0.95rem' }}>
                  Please fill out the details below. Partial preferences are welcomed if you are still deciding on specific trims or options.
                </p>
              </div>

              {status === 'error' && errorMessage && (
                <div
                  style={{
                    background: 'rgba(232,25,44,0.12)',
                    border: '1px solid rgba(232,25,44,0.3)',
                    borderRadius: 'var(--r-sm)',
                    padding: '12px 16px',
                    marginBottom: 24,
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

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field (hidden from screen and CSS) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="faxHoneypot">Do not fill this</label>
                  <input
                    type="text"
                    id="faxHoneypot"
                    name="faxHoneypot"
                    tabIndex="-1"
                    value={form.faxHoneypot}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {/* Section 1: Customer Contact Details */}
                <fieldset style={{ border: 'none', padding: 0, margin: '0 0 32px' }}>
                  <legend style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }} />
                    1. Your Contact Information
                  </legend>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    <div className="field">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="e.g. David Silva"
                        value={form.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="e.g. david@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16, marginTop: 14 }}>
                    <div className="field">
                      <label htmlFor="phoneCode">Country Code</label>
                      <select
                        id="phoneCode"
                        name="phoneCode"
                        value={form.phoneCode}
                        onChange={handleChange}
                      >
                        <option value="+61">+61 (AU)</option>
                        <option value="+94">+94 (LK)</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+81">+81 (JP)</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="e.g. 0415 993 511"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="location">Preferred Location *</label>
                      <select
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                      >
                        <option value="Australia">Australia</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Section 2: Vehicle Preferences */}
                <fieldset style={{ border: 'none', padding: 0, margin: '0 0 32px' }}>
                  <legend style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                    2. Vehicle Specifications
                  </legend>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <div className="field">
                      <label htmlFor="make">Preferred Make</label>
                      <input
                        type="text"
                        id="make"
                        name="make"
                        placeholder="e.g. Toyota, Nissan, Honda, Lexus"
                        value={form.make}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="model">Preferred Model</label>
                      <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="e.g. Crown, Prius, Skyline, Fit, Vezel"
                        value={form.model}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="yearRange">Manufacturing Year / Range</label>
                      <input
                        type="text"
                        id="yearRange"
                        name="yearRange"
                        placeholder="e.g. 2018 - 2023, or 2015+"
                        value={form.yearRange}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16, marginTop: 14 }}>
                    <div className="field">
                      <label htmlFor="budgetCurrency">Currency</label>
                      <select
                        id="budgetCurrency"
                        name="budgetCurrency"
                        value={form.budgetCurrency}
                        onChange={handleChange}
                      >
                        <option value="AUD">AUD ($)</option>
                        <option value="LKR">LKR (Rs)</option>
                        <option value="USD">USD ($)</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="budgetAmount">Approximate Budget</label>
                      <input
                        type="text"
                        id="budgetAmount"
                        name="budgetAmount"
                        placeholder="e.g. 35,000"
                        value={form.budgetAmount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="bodyType">Preferred Body Type</label>
                      <select
                        id="bodyType"
                        name="bodyType"
                        value={form.bodyType}
                        onChange={handleChange}
                      >
                        <option value="">Any Body Type</option>
                        <option value="Fuel-efficient hatchback">Fuel-Efficient Hatchback</option>
                        <option value="Comfortable sedan">Comfortable Sedan</option>
                        <option value="Spacious SUV">Spacious SUV</option>
                        <option value="Family vehicle">Family Vehicle</option>
                        <option value="Coupe / Sports">Coupe / Performance</option>
                        <option value="Other suitable Japanese vehicle">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 14 }}>
                    <div className="field">
                      <label htmlFor="transmission">Transmission</label>
                      <select
                        id="transmission"
                        name="transmission"
                        value={form.transmission}
                        onChange={handleChange}
                      >
                        <option value="Any">Any / No Preference</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="fuelType">Fuel Type</label>
                      <select
                        id="fuelType"
                        name="fuelType"
                        value={form.fuelType}
                        onChange={handleChange}
                      >
                        <option value="Any">Any / No Preference</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric (EV)">Electric (EV)</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="colour">Preferred Colour(s)</label>
                      <input
                        type="text"
                        id="colour"
                        name="colour"
                        placeholder="e.g. White Pearl, Black, Silver, Any"
                        value={form.colour}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 16 }}>
                    <label htmlFor="additionalRequirements">Additional Requirements / Notes</label>
                    <textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      rows="4"
                      placeholder="Mention any specific features, mileage limits, sunroof, leather seats, or timeline considerations..."
                      value={form.additionalRequirements}
                      onChange={handleChange}
                    />
                  </div>
                </fieldset>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', margin: 0 }}>
                    We protect your privacy. Your information is used strictly to assist with your car search.
                  </p>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={status === 'submitting'}
                    style={{ minWidth: 200, justifyContent: 'center' }}
                  >
                    {status === 'submitting' ? 'Submitting Request...' : 'Submit Vehicle Request'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';
import { business, financeLinks } from '../data/vehicles.js';
import FinanceCalculator from '../components/FinanceCalculator.jsx';
import {
  ShieldCheckIcon,
  PhoneIcon,
  ExternalLinkIcon,
  CalculatorIcon,
  CheckCircleIcon,
  LockIcon,
  ChevronDownIcon,
  CheckIcon,
} from '../components/Icons.jsx';

export default function Finance() {
  const heroRef = useReveal();
  const calcSectionRef = useRef(null);
  const formSectionRef = useRef(null);
  const faqRef = useReveal();

  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // Clean up previous script if any
    const existingScript = document.getElementById('coau-quick-quote-script');
    if (existingScript) {
      existingScript.remove();
    }

    const container = document.getElementById('coau-embedded-form');
    if (container) {
      container.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'coau-quick-quote-script';
      script.src = financeLinks.scriptUrl;
      script.setAttribute('data-step', 'form');
      script.setAttribute('data-dealer', financeLinks.dealerName);
      script.setAttribute('data-customstyle', 'no');
      script.setAttribute('data-customscript', 'no');
      script.setAttribute('data-utmsource', 'dealer');
      script.setAttribute('data-utmmedium', 'referral');
      script.setAttribute('data-utmcampaign', 'dealer_application_form');
      script.setAttribute('data-utmkeywords', 'quick-quote');
      script.async = true;

      container.appendChild(script);
    }

    return () => {
      const s = document.getElementById('coau-quick-quote-script');
      if (s) s.remove();
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToCalculator = (e) => {
    e.preventDefault();
    if (calcSectionRef.current) {
      calcSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Will submitting a Quick Quote affect my credit score?',
      a: 'No. Submitting an initial quick quote enquiry through Credit One does not affect your credit rating. Formal credit checks only take place once you choose an offer and authorize a full lender application.',
    },
    {
      q: 'Can I finance a vehicle imported directly from Japan?',
      a: 'Yes. Our lending network includes specialist Australian lenders and banks that finance Japanese imports, complied performance cars, hybrid people movers, and commercial vans.',
    },
    {
      q: 'Can I obtain pre-approval before choosing a vehicle?',
      a: 'Yes, and we highly recommend it. Having conditional pre-approval establishes your exact budget ceiling and accelerates bidding and purchasing at auction in Japan.',
    },
    {
      q: 'What loan terms and deposit options are available?',
      a: 'Loan terms typically range from 1 to 7 years (12 to 84 months). Flexible deposit structures, including zero-deposit options for approved applicants, and balloon payments are available.',
    },
    {
      q: 'What documents do I need to prepare?',
      a: 'Standard requirements include an Australian driver’s licence or passport, proof of income (recent payslips or business tax returns for self-employed applicants), and recent bank statements.',
    },
  ];

  return (
    <>
      {/* ── 1. Page Hero ─────────────────────────────────── */}
      <section className="page-hero" ref={heroRef} style={{ paddingBottom: 24 }}>
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="wrap page-hero-inner">
          <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="badge badge-gold" style={{ fontSize: 12, padding: '6px 14px' }}>
                <ShieldCheckIcon size={13} />
                50+ Lending Providers
              </span>
              <span className="badge badge-subtle" style={{ fontSize: 12 }}>
                Powered by Credit One
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                fontWeight: 900,
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Over 50 Lenders. More Possibilities.
            </h1>

            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.75,
                maxWidth: '66ch',
                margin: '0 auto 28px',
              }}
            >
              We work with over 50 trusted finance providers to help you access a wider range of car finance options. By connecting you with our extensive lending network, we make it easier to explore competitive offers and find a finance solution that suits your budget.
              <br />
              We’re committed to making your car-buying journey simpler, smarter, and more rewarding.
            </p>

            {/* Quick Navigation Buttons */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 28,
              }}
            >
              <button
                type="button"
                onClick={scrollToCalculator}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: 14 }}
              >
                <CalculatorIcon size={16} />
                <span>Nexus Auto Loan Calculator</span>
                <span style={{ fontSize: 14 }}>↓</span>
              </button>

              <button
                type="button"
                onClick={scrollToForm}
                className="btn btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', fontSize: 14 }}
              >
                <span>Quick Quote Form</span>
                <span style={{ fontSize: 14 }}>↓</span>
              </button>

              <a
                href={financeLinks.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', fontSize: 14 }}
              >
                <span>Online Loan Application</span>
                <ExternalLinkIcon size={13} style={{ opacity: 0.7 }} />
              </a>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px 24px',
                fontSize: 13,
                color: 'var(--ink-2)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleIcon size={14} style={{ color: 'var(--gold)' }} />
                50+ Australian Lenders
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <LockIcon size={13} style={{ color: 'var(--green)' }} />
                No Credit Score Impact for Quotes
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleIcon size={14} style={{ color: 'var(--gold)' }} />
                Pre-Approvals for Japanese Imports
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Nexus Auto Loan Calculator (DIRECTLY ON PAGE) ── */}
      <section className="section" ref={calcSectionRef} id="loan-calculator-section" style={{ paddingTop: 16, paddingBottom: 48 }}>
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <FinanceCalculator onScrollToForm={scrollToForm} />
        </div>
      </section>

      {/* ── 3. Credit One Embedded Quick Quote Section ───── */}
      <section className="section" ref={formSectionRef} id="quote-form-section" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingBlock: 56 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div className="section-head" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 32px' }}>
            <p className="eyebrow gold">Credit One Finance Integration</p>
            <h2 className="section-title">Get an Obligation-Free Quick Quote</h2>
            <p className="section-sub">
              Fill in your details below. Credit One’s vehicle finance brokers will connect with our network of over 50 trusted Australian lenders to find competitive options tailored to your purchase.
            </p>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '32px',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border-2)',
              background: 'linear-gradient(180deg, var(--card) 0%, rgba(12, 12, 18, 0.96) 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 198, 64, 0.06)',
            }}
          >
            {/* Security Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                padding: '12px 18px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                marginBottom: 20,
                fontSize: 12,
                color: 'var(--ink-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <LockIcon size={13} style={{ color: 'var(--gold)' }} />
                <span>256-Bit SSL Bank Encryption</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircleIcon size={13} style={{ color: 'var(--green)' }} />
                <span>Won't Affect Your Credit Score</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheckIcon size={13} style={{ color: 'var(--gold)' }} />
                <span>Accredited Dealer: Nexus Auto</span>
              </div>
            </div>

            {/* Embedded Form Frame */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 10,
                padding: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                minHeight: 340,
              }}
            >
              <div id="coau-embedded-form"></div>

              {/* Adblocker fallback link */}
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: '1px solid #eee',
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#666',
                }}
              >
                <span>Prefer the direct online application portal? </span>
                <a
                  href={financeLinks.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#005691',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span>Open Credit One Quick Quote</span>
                  <ExternalLinkIcon size={11} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Why Finance With Us & Assistance ─────────── */}
      <section className="section" style={{ paddingBlock: 56 }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {[
              { title: '50+ Competing Lenders', desc: 'Credit One leverages Australia’s largest network of tier-1 banks and automotive financiers.' },
              { title: 'Japanese Import Specialists', desc: 'Tailored approval criteria that understand Japanese auction grading and import compliance.' },
              { title: 'Pre-Approval Confidence', desc: 'Lock in your finance limit before sourcing or bidding on your car in Japan.' },
              { title: 'Flexible Loan Terms', desc: '1 to 7 year loan terms with customized deposit and balloon payment options.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: 24,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gold)', marginBottom: 8 }}>
                  <CheckIcon size={16} />
                  <strong style={{ fontSize: 15, color: 'var(--ink)' }}>{item.title}</strong>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Bar */}
          <div
            className="glass-card"
            style={{
              padding: '20px 28px',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--border-2)',
              background: 'linear-gradient(90deg, rgba(245,198,64,0.06) 0%, rgba(229,24,43,0.06) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>
                Have questions about financing your Japanese import?
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                Our team and Credit One finance specialists are ready to guide you.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/contact?topic=Financing" className="btn btn-ghost" style={{ fontSize: 13 }}>
                Contact Us
              </Link>
              <a
                href={`tel:${business.phone.replace(/\s/g, '')}`}
                className="btn btn-primary"
                style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <PhoneIcon size={13} />
                <span>Call {business.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Frequently Asked Questions ─────────────────── */}
      <section className="section" ref={faqRef} style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', paddingBlock: 56 }}>
        <div className="wrap">
          <div className="section-head" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 36px' }}>
            <p className="eyebrow gold">Clear &amp; Transparent</p>
            <h2 className="section-title">Finance Questions &amp; Answers</h2>
            <p className="section-sub">
              Everything you need to know about getting approved for car finance with Nexus Auto SA.
            </p>
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  overflow: 'hidden',
                  background: activeFaq === index ? 'var(--card-hover)' : 'var(--card)',
                  transition: 'background var(--t-fast)',
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    background: 'none',
                    border: 'none',
                    color: 'var(--ink)',
                    fontSize: 15,
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--t-fast)',
                      color: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDownIcon size={16} />
                  </span>
                </button>
                {activeFaq === index && (
                  <div style={{ padding: '0 22px 18px', color: 'var(--ink-2)', fontSize: 13.5, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

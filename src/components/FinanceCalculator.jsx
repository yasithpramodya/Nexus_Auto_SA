import { useState } from 'react';
import { formatAud, financeLinks } from '../data/vehicles.js';
import {
  ExternalLinkIcon,
  CalculatorIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from './Icons.jsx';

// Keep only digits so "$55,000" style typing still parses cleanly
const toDigits = (value) => value.replace(/\D/g, '').slice(0, 9);
const withCommas = (digits) => (digits === '' ? '' : Number(digits).toLocaleString('en-AU'));

export default function FinanceCalculator({ onScrollToForm }) {
  // Text inputs are held as strings so the client can clear a box while typing
  const [carPriceInput, setCarPriceInput] = useState('55000');
  const [depositInput, setDepositInput] = useState('5000');
  const [termYears, setTermYears] = useState(5);
  const [rateInput, setRateInput] = useState('6.99');
  const [balloonPercent, setBalloonPercent] = useState(0);
  const [frequency, setFrequency] = useState('weekly'); // 'weekly' | 'fortnightly' | 'monthly'

  const carPrice = Number(carPriceInput) || 0;
  const deposit = Number(depositInput) || 0;
  const interestRate = Number(rateInput) || 0;
  const depositTooHigh = deposit > carPrice && carPrice > 0;

  const loanAmount = Math.max(0, carPrice - deposit);
  const balloonAmount = Math.round((loanAmount * balloonPercent) / 100);

  // Frequency configurations
  const freqPeriods = {
    weekly: termYears * 52,
    fortnightly: termYears * 26,
    monthly: termYears * 12,
  };
  const freqDivisor = {
    weekly: 52,
    fortnightly: 26,
    monthly: 12,
  };

  const n = freqPeriods[frequency];
  const r = (interestRate / 100) / freqDivisor[frequency];

  let periodicPayment = 0;
  if (loanAmount > 0 && n > 0 && r > 0) {
    const discountFactor = Math.pow(1 + r, -n);
    periodicPayment = (loanAmount - balloonAmount * discountFactor) * r / (1 - discountFactor);
  } else if (loanAmount > 0 && n > 0) {
    // 0% rate entered: straight-line repayment of the non-balloon portion
    periodicPayment = (loanAmount - balloonAmount) / n;
  }

  const roundedPayment = Math.round(periodicPayment);
  const totalRepaid = Math.round(periodicPayment * n + balloonAmount);
  const totalInterest = Math.max(0, totalRepaid - loanAmount);

  return (
    <div
      className="glass-card"
      style={{
        padding: '36px',
        borderRadius: 'var(--r-xl)',
        border: '1px solid rgba(245, 198, 64, 0.3)',
        background: 'linear-gradient(180deg, var(--card) 0%, rgba(14, 14, 22, 0.96) 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(245, 198, 64, 0.08)',
      }}
    >
      {/* Calculator Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span className="badge badge-gold" style={{ fontSize: 11, padding: '4px 10px' }}>
              Nexus Auto SA
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
              Over 50 Australian Lenders
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: 900, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>
            Nexus Auto Loan Calculator
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--green)' }}>
          <ShieldCheckIcon size={14} />
          <span>Accredited Rates · 100% Obligation-Free</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 36,
          alignItems: 'start',
        }}
      >
        {/* ── Left Column: Inputs & Sliders ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* 1. Vehicle Purchase Price */}
          <div>
            <label htmlFor="calc-price-input" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>
              Vehicle Purchase Price
            </label>
            <div className="calc-input-wrap">
              <span className="calc-input-affix">$</span>
              <input
                id="calc-price-input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 55,000"
                value={withCommas(carPriceInput)}
                onChange={(e) => setCarPriceInput(toDigits(e.target.value))}
                className="calc-input"
              />
              <span className="calc-input-affix">AUD</span>
            </div>
          </div>

          {/* 2. Deposit Amount */}
          <div>
            <label htmlFor="calc-deposit-input" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>
              Deposit / Trade-In Amount
            </label>
            <div className={`calc-input-wrap${depositTooHigh ? ' is-invalid' : ''}`}>
              <span className="calc-input-affix">$</span>
              <input
                id="calc-deposit-input"
                type="text"
                inputMode="numeric"
                placeholder="0 for zero deposit"
                value={withCommas(depositInput)}
                onChange={(e) => setDepositInput(toDigits(e.target.value))}
                className="calc-input"
              />
              <span className="calc-input-affix">AUD</span>
            </div>
            {depositTooHigh && (
              <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--red)' }}>
                Deposit can't be more than the purchase price.
              </p>
            )}
          </div>

          {/* 3. Loan Term Buttons */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>
              Loan Term: <span style={{ color: 'var(--gold)' }}>{termYears} Years ({termYears * 12} Months)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {[1, 2, 3, 4, 5, 7].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTermYears(yr)}
                  style={{
                    padding: '8px 0',
                    fontSize: 12,
                    fontWeight: 700,
                    borderRadius: 'var(--r-sm)',
                    border: termYears === yr ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                    background: termYears === yr ? 'rgba(245, 198, 64, 0.15)' : 'var(--bg-1)',
                    color: termYears === yr ? 'var(--gold)' : 'var(--ink-2)',
                    cursor: 'pointer',
                    transition: 'all var(--t-fast)',
                  }}
                >
                  {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Interest Rate & Balloon Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label htmlFor="rate-input" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
                Comparison Rate
              </label>
              <div className="calc-input-wrap">
                <input
                  id="rate-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 6.99"
                  value={rateInput}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    // Allow up to 2 whole digits and 2 decimals, e.g. 6, 6., 6.9, 12.49
                    if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) setRateInput(val);
                  }}
                  className="calc-input"
                />
                <span className="calc-input-affix">% p.a.</span>
              </div>
            </div>

            <div>
              <label htmlFor="balloon-selector" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
                Balloon / Residual
              </label>
              <select
                id="balloon-selector"
                value={balloonPercent}
                onChange={(e) => setBalloonPercent(Number(e.target.value))}
                className="filter-sort-select"
                style={{ width: '100%', minWidth: 'auto', fontSize: 13 }}
              >
                <option value={0}>0% (No Balloon)</option>
                <option value={10}>10% Balloon ({formatAud(Math.round(loanAmount * 0.1))})</option>
                <option value={20}>20% Balloon ({formatAud(Math.round(loanAmount * 0.2))})</option>
                <option value={30}>30% Balloon ({formatAud(Math.round(loanAmount * 0.3))})</option>
              </select>
            </div>
          </div>

        </div>

        {/* ── Right Column: Live Repayment Card ── */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(245, 198, 64, 0.08) 0%, rgba(18, 18, 28, 0.95) 100%)',
            border: '1.5px solid rgba(245, 198, 64, 0.35)',
            borderRadius: 'var(--r-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Frequency Selector Pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Estimated Repayment
              </span>
              <div style={{ display: 'inline-flex', background: 'var(--bg-1)', borderRadius: 'var(--r-full)', padding: 3, border: '1px solid var(--border)' }}>
                {['weekly', 'fortnightly', 'monthly'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    style={{
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 'var(--r-full)',
                      border: 'none',
                      background: frequency === freq ? 'var(--gold)' : 'transparent',
                      color: frequency === freq ? '#000000' : 'var(--ink-3)',
                      cursor: 'pointer',
                      transition: 'all var(--t-fast)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Big Output */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 'clamp(2.6rem, 5vw, 3.4rem)',
                    fontWeight: 900,
                    color: 'var(--gold)',
                    fontFamily: 'var(--mono)',
                    lineHeight: 1,
                  }}
                >
                  ${roundedPayment.toLocaleString()}
                </span>
                <span style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 600 }}>
                  / {frequency === 'weekly' ? 'week' : frequency === 'fortnightly' ? 'fortnight' : 'month'}
                </span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--ink-3)' }}>
                Based on net loan of {formatAud(loanAmount)} over {termYears} years at {interestRate}% p.a.
              </p>
            </div>

            {/* Financial Breakdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: 'var(--r-md)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: 20,
              }}
            >
              <div>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', display: 'block' }}>Net Financed</span>
                <strong style={{ fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
                  {formatAud(loanAmount)}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', display: 'block' }}>Est. Total Interest</span>
                <strong style={{ fontSize: 14, color: 'var(--ink)', fontFamily: 'var(--mono)' }}>
                  {formatAud(totalInterest)}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', display: 'block' }}>Total Repayable</span>
                <strong style={{ fontSize: 14, color: 'var(--gold)', fontFamily: 'var(--mono)' }}>
                  {formatAud(totalRepaid)}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', display: 'block' }}>Balloon / Rate</span>
                <strong style={{ fontSize: 14, color: balloonAmount > 0 ? 'var(--ink)' : 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
                  {balloonAmount > 0 ? formatAud(balloonAmount) : 'None ($0)'}
                </strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href={financeLinks.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', gap: 8, padding: '13px 18px', fontSize: 14 }}
              id="calc-apply-preapproval-btn"
            >
              <span>Apply for Pre-Approval Now</span>
              <ExternalLinkIcon size={14} />
            </a>

            {onScrollToForm && (
              <button
                type="button"
                onClick={onScrollToForm}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', gap: 8, fontSize: 13, padding: '10px 16px' }}
              >
                <span>Request Quick Quote Below</span>
                <ArrowRightIcon size={13} style={{ transform: 'rotate(90deg)' }} />
              </button>
            )}

            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)', marginTop: 4 }}>
              *Indicative estimates only. Credit One connects you with 50+ lenders across Australia.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

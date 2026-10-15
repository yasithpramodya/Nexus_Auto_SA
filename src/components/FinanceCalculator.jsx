import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatAud } from '../data/vehicles.js';

export default function FinanceCalculator() {
  const [carPrice, setCarPrice] = useState(65000);
  const [deposit, setDeposit] = useState(10000);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(7.9);

  const loanAmount = Math.max(0, carPrice - deposit);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termMonths;
  
  const monthlyPayment = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const weeklyPayment = Math.round((monthlyPayment * 12) / 52);

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 6 }}>
              Estimate Your Weekly Repayment
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>
              Competitive automotive finance available for Australian residents on all imported Japanese vehicles.
            </p>
          </div>

          {/* Car Price Slider */}
          <div className="calc-slider-group">
            <div className="calc-slider-label">
              <span>Vehicle Purchase Price</span>
              <span className="calc-slider-val">{formatAud(carPrice)}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="180000"
              step="1000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="calc-slider"
            />
          </div>

          {/* Deposit Slider */}
          <div className="calc-slider-group">
            <div className="calc-slider-label">
              <span>Deposit Amount</span>
              <span className="calc-slider-val">{formatAud(deposit)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="60000"
              step="1000"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="calc-slider"
            />
          </div>

          {/* Term & Rate */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field">
              <label htmlFor="term-select">Loan Term</label>
              <select
                id="term-select"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="filter-sort-select"
                style={{ width: '100%', minWidth: 'auto' }}
              >
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={84}>84 Months (7 Years)</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="rate-select">Interest Rate (Comparison)</label>
              <select
                id="rate-select"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="filter-sort-select"
                style={{ width: '100%', minWidth: 'auto' }}
              >
                <option value={6.9}>6.90% p.a. (Tier 1 Prime)</option>
                <option value={7.9}>7.90% p.a. (Standard Dealer)</option>
                <option value={8.9}>8.90% p.a. (Flexible)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output Display */}
        <div className="calc-output-box">
          <span className="calc-weekly-label">Estimated Weekly Repayment</span>
          <div className="calc-weekly-amount">${weeklyPayment}</div>
          <p className="calc-weekly-sub">
            Based on a net loan of {formatAud(loanAmount)} over {termMonths / 12} years at {interestRate}% p.a.
          </p>
          <Link
            to="/contact?topic=Financing"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 8 }}
          >
            Apply for Pre-Approval →
          </Link>
          <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>
            *Disclaimer: Repayments are indicative only and subject to credit approval.
          </span>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { CarIcon, ArrowRightIcon } from '../components/Icons.jsx';

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ textAlign: 'center', margin: 'auto', maxWidth: 540 }}>
        <div
          style={{
            display: 'inline-flex',
            padding: 24,
            borderRadius: '50%',
            background: 'var(--card)',
            color: 'var(--red)',
            marginBottom: 20,
            border: '1px solid var(--border)',
          }}
        >
          <CarIcon size={48} />
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
          The page you are looking for does not exist or may have been moved. You can return to our homepage or explore our current stock of quality Japanese cars.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/vehicles" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>Browse Stock</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

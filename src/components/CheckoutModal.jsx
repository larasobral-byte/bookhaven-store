import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '../utils/format.js';

const STEPS = ['Shipping', 'Summary', 'Confirmation'];

const EMPTY_FORM = { name: '', email: '', address: '', city: '', country: '' };

function generateOrderId() {
  return 'BH-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---------- Step 1: Shipping form ----------
function ShippingStep({ form, onChange, onNext }) {
  const firstRef = useRef(null);
  useEffect(() => { firstRef.current?.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="co-form" onSubmit={handleSubmit} noValidate>
      <div className="co-field">
        <label htmlFor="co-name">Full name</label>
        <input
          id="co-name" ref={firstRef} type="text"
          value={form.name} onChange={(e) => onChange('name', e.target.value)}
          required autoComplete="name" placeholder="Jane Smith"
        />
      </div>
      <div className="co-field">
        <label htmlFor="co-email">Email</label>
        <input
          id="co-email" type="email"
          value={form.email} onChange={(e) => onChange('email', e.target.value)}
          required autoComplete="email" placeholder="jane@example.com"
        />
      </div>
      <div className="co-field">
        <label htmlFor="co-address">Street address</label>
        <input
          id="co-address" type="text"
          value={form.address} onChange={(e) => onChange('address', e.target.value)}
          required autoComplete="street-address" placeholder="123 Main St"
        />
      </div>
      <div className="co-row">
        <div className="co-field">
          <label htmlFor="co-city">City</label>
          <input
            id="co-city" type="text"
            value={form.city} onChange={(e) => onChange('city', e.target.value)}
            required autoComplete="address-level2" placeholder="New York"
          />
        </div>
        <div className="co-field">
          <label htmlFor="co-country">Country</label>
          <input
            id="co-country" type="text"
            value={form.country} onChange={(e) => onChange('country', e.target.value)}
            required autoComplete="country-name" placeholder="United States"
          />
        </div>
      </div>
      <div className="co-actions">
        <button type="submit" className="btn btn-primary btn-large btn-block">
          Continue to Summary →
        </button>
      </div>
    </form>
  );
}

// ---------- Step 2: Order summary ----------
function SummaryStep({ form, items, total, onBack, onConfirm }) {
  return (
    <div className="co-summary">
      <div className="co-ship-review">
        <p className="co-ship-label">Shipping to</p>
        <p className="co-ship-value">
          {form.name} · {form.address}, {form.city}, {form.country}
        </p>
        <p className="co-ship-value">{form.email}</p>
      </div>

      <ul className="co-item-list">
        {items.map(({ book, qty }) => (
          <li key={book.id} className="co-item">
            <span className="co-item-title">{book.title}</span>
            <span className="co-item-qty">× {qty}</span>
            <span className="co-item-price">{formatPrice(book.price * qty)}</span>
          </li>
        ))}
      </ul>

      <div className="co-total-row">
        <span>Order total</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      <div className="co-actions co-actions-split">
        <button type="button" className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary btn-large" onClick={onConfirm}>
          Place Order
        </button>
      </div>
    </div>
  );
}

// ---------- Step 3: Confirmation ----------
function ConfirmationStep({ orderId, onClose }) {
  const btnRef = useRef(null);
  useEffect(() => { btnRef.current?.focus(); }, []);

  return (
    <div className="co-confirm">
      <div className="co-confirm-icon" aria-hidden="true">✓</div>
      <h3 className="co-confirm-heading">Order placed!</h3>
      <p className="co-confirm-text">
        Thank you for your purchase. Your order <strong>{orderId}</strong> has been received
        and will be processed shortly.
      </p>
      <p className="co-confirm-sub">A confirmation email has been sent to your inbox.</p>
      <button
        type="button"
        className="btn btn-primary btn-large"
        onClick={onClose}
        ref={btnRef}
      >
        Back to Store
      </button>
    </div>
  );
}

// ---------- Main modal ----------
export default function CheckoutModal({ open, items, total, onClose, onOrderComplete }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [step, setStep] = useState(0);          // 0 | 1 | 2
  const [form, setForm] = useState(EMPTY_FORM);
  const [orderId, setOrderId] = useState('');

  // Reset to step 0 whenever the modal is opened fresh
  useEffect(() => {
    if (open) { setStep(0); setForm(EMPTY_FORM); }
  }, [open]);

  // Focus trap + Escape (disabled on confirmation so Esc doesn't accidentally close)
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && step < 2) { onClose(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, step, onClose]);

  if (!open) return null;

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleConfirm = () => {
    const id = generateOrderId();
    setOrderId(id);
    setStep(2);
    onOrderComplete();   // clears the cart in App
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={step < 2 ? handleClose : undefined}
    >
      <div
        className="modal co-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="co-title" className="modal-title">Checkout</h2>
          {step < 2 && (
            <button
              type="button" className="icon-btn"
              onClick={handleClose} ref={closeRef}
              aria-label="Close checkout"
            >✕</button>
          )}
        </div>

        {/* Step indicator */}
        <ol className="co-stepper" aria-label="Checkout steps">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={`co-step ${i === step ? 'co-step-active' : ''} ${i < step ? 'co-step-done' : ''}`}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="co-step-num" aria-hidden="true">{i < step ? '✓' : i + 1}</span>
              <span className="co-step-label">{label}</span>
            </li>
          ))}
        </ol>

        {/* Step content */}
        <div className="co-body">
          {step === 0 && (
            <ShippingStep form={form} onChange={handleChange} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <SummaryStep
              form={form} items={items} total={total}
              onBack={() => setStep(0)} onConfirm={handleConfirm}
            />
          )}
          {step === 2 && (
            <ConfirmationStep orderId={orderId} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
}

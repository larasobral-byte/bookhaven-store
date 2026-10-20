import { useEffect, useRef } from 'react';
import { formatPrice } from '../utils/format.js';

export default function CartDrawer({ open, items, total, itemCount, onClose, onIncrease, onDecrease, onRemove, onClear, onCheckout }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Move focus into the drawer when it opens, restore it on close,
  // close on Escape, and keep Tab focus inside the drawer.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current.querySelectorAll('button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2 id="cart-title">Your Cart ({itemCount})</h2>
          <button type="button" className="icon-btn" onClick={onClose} ref={closeRef} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="drawer-empty">Your cart is empty. Add a book to get started!</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ book, qty }) => (
              <li key={book.id} className="cart-item">
                <div className="cart-item-info">
                  <p className="cart-item-title">{book.title}</p>
                  <p className="cart-item-author">{book.author}</p>
                  <p className="cart-item-price">{formatPrice(book.price * qty)}</p>
                </div>
                <div className="qty" role="group" aria-label={`Quantity for ${book.title}`}>
                  <button type="button" className="icon-btn" onClick={() => onDecrease(book.id)} aria-label={`Decrease quantity of ${book.title}`}>−</button>
                  <span aria-live="polite">{qty}</span>
                  <button type="button" className="icon-btn" onClick={() => onIncrease(book.id)} aria-label={`Increase quantity of ${book.title}`}>+</button>
                </div>
                <button type="button" className="link-btn" onClick={() => onRemove(book.id)} aria-label={`Remove ${book.title} from cart`}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer-footer">
          <p className="total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            Checkout
          </button>
          <button type="button" className="link-btn" onClick={onClear} disabled={items.length === 0}>
            Clear cart
          </button>
        </div>
      </aside>
    </div>
  );
}

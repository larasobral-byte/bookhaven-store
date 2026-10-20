import { useEffect, useRef } from 'react';
import BookCover from './BookCover.jsx';
import Rating from './Rating.jsx';
import { formatPrice } from '../utils/format.js';

// Brief description per category — gives the modal some readable content.
const categoryBlurbs = {
  Fiction:       'A richly imagined work of fiction that weaves compelling characters with an unforgettable narrative.',
  Mystery:       'A gripping mystery full of twists, red herrings, and a resolution that will keep you guessing until the very last page.',
  'Sci-Fi':      'A thought-provoking science-fiction adventure that pushes the boundaries of imagination and technology.',
  'Non-Fiction': 'An insightful non-fiction read grounded in research, offering fresh perspectives on the world around us.',
  Technology:    'An accessible deep-dive into technology, perfect for practitioners and curious minds alike.',
  Fantasy:       'An epic fantasy set in a vividly constructed world filled with magic, conflict, and memorable heroes.',
  Romance:       'A heartfelt romance that explores connection, vulnerability, and the enduring power of love.',
};

export default function BookModal({ book, onClose, onAdd }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!book) return undefined;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
  }, [book, onClose]);

  if (!book) return null;

  const blurb = categoryBlurbs[book.category] ??
    'A captivating read that is sure to leave a lasting impression.';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{book.title}</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close book details"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-cover">
            <BookCover book={book} />
          </div>
          <div className="modal-info">
            <p className="modal-author">by {book.author}</p>
            <div className="modal-chips">
              <span className="chip chip-category">{book.category}</span>
              {book.badge && (
                <span className={`badge badge-${book.badge.toLowerCase()}`}>{book.badge}</span>
              )}
            </div>
            <Rating value={book.rating} reviews={book.reviews} />
            <p className="modal-blurb">{blurb}</p>
            <div className="modal-footer">
              <p className="price modal-price">{formatPrice(book.price)}</p>
              <button
                type="button"
                className="btn btn-primary btn-large"
                onClick={() => onAdd(book)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

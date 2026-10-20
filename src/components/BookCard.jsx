import BookCover from './BookCover.jsx';
import Rating from './Rating.jsx';
import { formatPrice } from '../utils/format.js';

export default function BookCard({ book, onAdd, onDetails }) {
  return (
    <article className="card">
      <div className="cover-wrap">
        <button
          type="button"
          className="cover-btn"
          onClick={() => onDetails(book)}
          aria-label={`View details for ${book.title}`}
          tabIndex={0}
        >
          <BookCover book={book} />
        </button>
        {book.badge && (
          <span className={`badge badge-${book.badge.toLowerCase()}`} aria-label={book.badge}>
            {book.badge}
          </span>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">by {book.author}</p>
        <Rating value={book.rating} reviews={book.reviews} />
        <div className="card-footer">
          <p className="price">{formatPrice(book.price)}</p>
          <div className="card-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onAdd(book)}
              aria-label={`Add ${book.title} to cart`}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onDetails(book)}
              aria-label={`View details for ${book.title}`}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Shows 5 stars. Screen readers get a text version instead of the star symbols.
export default function Rating({ value, reviews }) {
  const rounded = Math.round(value);
  return (
    <p className="rating">
      <span aria-hidden="true" className="stars">
        {'★'.repeat(rounded)}
        <span className="stars-empty">{'★'.repeat(5 - rounded)}</span>
      </span>
      <span className="visually-hidden">Rated {value} out of 5</span>
      <span className="rating-count">
        {value.toFixed(1)} ({reviews.toLocaleString('en-US')})
      </span>
    </p>
  );
}

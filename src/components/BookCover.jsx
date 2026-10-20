// Decorative cover drawn with CSS. The title/author are already in the card text,
// so this is hidden from screen readers to avoid reading them twice.
export default function BookCover({ book }) {
  return (
    <div
      className="cover"
      aria-hidden="true"
      style={{ '--cover-bg': book.color, '--cover-accent': book.accent }}
    >
      <span className="cover-category">{book.category}</span>
      <span className="cover-title">{book.title}</span>
      <span className="cover-author">{book.author}</span>
    </div>
  );
}

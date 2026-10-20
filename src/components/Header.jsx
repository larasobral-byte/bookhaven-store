export default function Header({ itemCount, onCartClick, cartButtonRef }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="BookHaven home">
          <span className="logo-mark" aria-hidden="true">B</span>
          BookHaven
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li><a href="#top">Home</a></li>
            <li><a href="#books">Books</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>

        <button
          type="button"
          className="cart-button"
          onClick={onCartClick}
          ref={cartButtonRef}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="cart-count" aria-hidden="true">{itemCount}</span>
          <span className="visually-hidden">
            , {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
          </span>
        </button>
      </div>
    </header>
  );
}

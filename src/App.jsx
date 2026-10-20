import { useMemo, useRef, useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Filters from './components/Filters.jsx';
import BookCard from './components/BookCard.jsx';
import BookModal from './components/BookModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import Toast from './components/Toast.jsx';
import Footer from './components/Footer.jsx';
import { books, categories } from './data/books.js';
import { useLocalStorageReducer } from './hooks/useLocalStorage.js';

// The cart is an object: { [bookId]: quantity }. A reducer keeps all the
// cart rules in one place.
function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: (state[action.id] || 0) + 1 };
    case 'increase':
      return { ...state, [action.id]: state[action.id] + 1 };
    case 'decrease': {
      const next = { ...state };
      if (next[action.id] > 1) next[action.id] -= 1;
      else delete next[action.id];
      return next;
    }
    case 'remove': {
      const next = { ...state };
      delete next[action.id];
      return next;
    }
    case 'clear':
      return {};
    default:
      return state;
  }
}

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, dispatch] = useLocalStorageReducer('bh-cart', cartReducer, {});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState('');
  const cartButtonRef = useRef(null);

  const visibleBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = books.filter(
      (b) =>
        (category === 'All' || b.category === category) &&
        (q === '' || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    );
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === 'rating-desc') return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === 'rating-asc') return [...filtered].sort((a, b) => a.rating - b.rating);
    return filtered;
  }, [query, category, sort]);

  const cartItems = useMemo(
    () => books.filter((b) => cart[b.id]).map((book) => ({ book, qty: cart[book.id] })),
    [cart]
  );
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const total = cartItems.reduce((sum, i) => sum + i.qty * i.book.price, 0);

  const handleAdd = (book) => {
    dispatch({ type: 'add', id: book.id });
    setToast(`"${book.title}" added to cart`);
  };
  const closeCart = useCallback(() => setCartOpen(false), []);
  const clearToast = useCallback(() => setToast(''), []);
  const openCheckout = useCallback(() => { setCartOpen(false); setCheckoutOpen(true); }, []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);
  const handleOrderComplete = useCallback(() => {
    dispatch({ type: 'clear' });
    setToast('Order placed! Thank you for your purchase 🎉');
  }, [dispatch]);

  return (
    <>
      <a href="#books" className="skip-link">Skip to books</a>
      <Header itemCount={itemCount} onCartClick={() => setCartOpen(true)} cartButtonRef={cartButtonRef} />

      <main id="top">
        <Hero />

        <section id="books" className="container section" aria-labelledby="books-title">
          <h2 id="books-title">Our Collection</h2>
          <Filters
            query={query}
            onQueryChange={setQuery}
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />

          <p className="results-count" role="status">
            Showing {visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'}
          </p>

          {visibleBooks.length === 0 ? (
            <p className="empty">No books match your search. Try a different word or category.</p>
          ) : (
            <div className="grid">
              {visibleBooks.map((book) => (
                <BookCard key={book.id} book={book} onAdd={handleAdd} onDetails={setSelectedBook} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <Toast message={toast} onDone={clearToast} />

      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAdd={(book) => { handleAdd(book); setSelectedBook(null); }}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        total={total}
        itemCount={itemCount}
        onClose={closeCart}
        onIncrease={(id) => dispatch({ type: 'increase', id })}
        onDecrease={(id) => dispatch({ type: 'decrease', id })}
        onRemove={(id) => dispatch({ type: 'remove', id })}
        onClear={() => dispatch({ type: 'clear' })}
        onCheckout={openCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cartItems}
        total={total}
        onClose={closeCheckout}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
}

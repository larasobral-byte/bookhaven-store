export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <p className="eyebrow">Free shipping on orders over $35</p>
        <h1 id="hero-title">Find your next favorite story at BookHaven</h1>
        <p className="hero-text">
          Hand-picked fiction, fantasy, mystery, and more. Browse the collection,
          add your picks to the cart, and start reading today.
        </p>
        <a href="#books" className="btn btn-primary btn-large">Browse books</a>
      </div>
    </section>
  );
}

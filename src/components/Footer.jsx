export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container">
        <h2>About BookHaven</h2>
        <p>
          BookHaven is a demo bookstore built with React. Books and prices are sample
          data, and no real payments are processed.
        </p>
        <p className="copyright">© {new Date().getFullYear()} BookHaven. All rights reserved.</p>
      </div>
    </footer>
  );
}

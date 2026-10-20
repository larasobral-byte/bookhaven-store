# BookHaven: Responsive eCommerce Bookstore 📚

BookHaven is a modern, high-performance, and accessible eCommerce bookstore web application. It is designed to deliver a seamless, responsive, and delightful shopping experience across all device sizes—from large desktop monitors down to compact mobile screens.

This project was developed utilizing advanced **agentic development tools (IBM Bob)** to design the system architecture, write modern modular React components, and build a robust, fluidly responsive CSS layout.

---

## 🚀 Live Demo & Presentation

* **Live Deployment:** [Link to your hosted live site, e.g., GitHub Pages / Vercel / Netlify]
* **GitHub Repository:** [Link to your GitHub Repository]
* **Manager Review Video (3 mins):** [Link to your video presentation if uploaded online, or note that it is attached]

---

## 🛠️ Tech Stack & Architecture

* **Frontend Library:** React 19 (leveraging modern hooks and custom hooks)
* **Build Tool:** Vite (for near-instantaneous hot module reloading and optimized production bundles)
* **Styling:** Modern Vanilla CSS (using CSS Variables, CSS Grid, Flexbox, Fluid Typography, and CSS Custom Properties for dynamic styling)
* **State Management:** React `useReducer` with a custom-built hook for **persistent LocalStorage sync**
* **Accessibility (a11y):** Built following WCAG 2.1 AA standards (Semantic markup, Keyboard Focus management, Skip to Content links, and `prefers-reduced-motion` queries)

---

## 🌟 Key Features

1. **Lightweight CSS-Only Book Covers:** Instead of loading heavy image assets, book covers are dynamically drawn using React and custom inline CSS properties (`--cover-bg`, `--cover-accent`). This ensures immediate load times, zero layout shifts (CLS), and full responsiveness.
2. **Interactive Searching & Filtering:** Users can filter the collection by category (chips) and search by title or author in real time.
3. **Smart Sorting:** Books can be sorted by Price (Low to High / High to Low) and Rating.
4. **Persistent Shopping Cart:** An interactive drawer cart that tracks quantities. Page refreshes do not lose the cart state, thanks to a custom local storage sync hook.
5. **Multi-Step Checkout Flow:** A secure, intuitive, and accessible checkout modal with form validation, a review step, and a final order success confirmation.
6. **Toast Notifications:** Smooth notifications confirming actions like "Added to Cart" and "Order Completed" with auto-cleanup to prevent layout clutter.

---

## 📱 Responsive & Mobile-First Design Principles

BookHaven is styled utilizing **Fluid and Adaptive Design** practices rather than rigid breakpoints:
* **Fluid Layouts:** Uses CSS Grid (`repeat(auto-fill, minmax(230px, 1fr))`) and Flexbox wrap behaviors so content flows naturally.
* **Fluid Typography:** Leverages `clamp()` (e.g., `clamp(2rem, 5vw, 3.25rem)`) for headers to dynamically scale titles based on screen viewport without jarring breakages.
* **Flexible Grids:** Displays 4 books per row on desktop, 2 per row on tablets/mobiles, and 1 per row on extra small screens (<380px) to maximize screen real estate and legibility.
* **Adaptive Navigation:** The header navigation moves into a clean, centered row layout on mobile to maintain accessibility.
* **Motion Preferences:** Implements media queries for `@media (prefers-reduced-motion: reduce)` to disable transitions and scrolling behavior for users with vestibular or motion sensitivities.

---

## 🤖 Agentic Development Journey with IBM Bob

Collaborating with **IBM Bob** as an AI agentic coding companion accelerated the development cycle through several key steps:

1. **Scaffolding & Architecture:** Bob drafted the component breakdown, creating clean boundaries between data (`books.js`), presentation (`BookCard`, `Hero`, `Rating`), and state containers (`CartDrawer`, `CheckoutModal`).
2. **Optimizing State with Reducers:** To keep cart logic robust, Bob helped implement a formal `cartReducer` that centralizes commands like `add`, `increase`, `decrease`, `remove`, and `clear`.
3. **Local Storage Synchronization:** Bob designed the `useLocalStorageReducer` custom hook, wrapping the standard React `useReducer` so cart states automatically write and hydrate from the browser's storage safely.
4. **Responsive CSS Coaching:** Bob assisted in implementing a modern container-first CSS approach, utilizing semantic design tokens, clean flex-wrapping, and strict focus-indicator systems (`:focus-visible`) for perfect accessibility.
5. **Continuous Validation:** Used Bob's direct execution capabilities to continuously build and test compilation in the background, resulting in a zero-error production build.

---

## 📦 Getting Started

To run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd bookhaven-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled static assets will be ready in the `/dist` directory.

// Sample data. "color" and "accent" are used to draw each book cover in CSS.
// badge: 'Bestseller' | 'New' | null
export const books = [
  { id: 1, title: 'The Silent Orchard', author: 'Maren Holt', price: 14.99, rating: 4.6, reviews: 1280, category: 'Fiction', color: '#1f4e5f', accent: '#f2c14e', badge: null },
  { id: 2, title: 'Midnight at Harbor Lane', author: 'Daniel Okafor', price: 12.5, rating: 4.2, reviews: 864, category: 'Mystery', color: '#2b2d42', accent: '#ef8354', badge: 'New' },
  { id: 3, title: 'Starlight Protocol', author: 'Priya Venkat', price: 16.99, rating: 4.8, reviews: 2310, category: 'Sci-Fi', color: '#3a1c71', accent: '#7ee8fa', badge: 'Bestseller' },
  { id: 4, title: 'A Brief History of Rivers', author: 'Elena Marchetti', price: 18.0, rating: 4.4, reviews: 502, category: 'Non-Fiction', color: '#0b6e4f', accent: '#f4f1de', badge: null },
  { id: 5, title: 'Code, Coffee & Calm', author: 'Samuel Reyes', price: 22.95, rating: 4.7, reviews: 1745, category: 'Technology', color: '#264653', accent: '#e9c46a', badge: 'Bestseller' },
  { id: 6, title: 'The Ember Crown', author: 'Isolde Draven', price: 15.75, rating: 4.5, reviews: 3120, category: 'Fantasy', color: '#7b1e3a', accent: '#ffd166', badge: 'Bestseller' },
  { id: 7, title: 'Letters to Lisbon', author: 'Camila Duarte', price: 11.99, rating: 4.1, reviews: 430, category: 'Romance', color: '#c1495b', accent: '#fff1e6', badge: 'New' },
  { id: 8, title: 'Quiet Mind, Bold Life', author: 'Hannah Lindqvist', price: 13.4, rating: 4.3, reviews: 978, category: 'Non-Fiction', color: '#5e548e', accent: '#e0b1cb', badge: null },
  { id: 9, title: 'The Cartographer\u2019s Secret', author: 'Oliver Grant', price: 17.25, rating: 4.6, reviews: 1502, category: 'Mystery', color: '#4a3b2a', accent: '#d4a373', badge: null },
  { id: 10, title: 'Neon Tides', author: 'Kenji Watanabe', price: 14.2, rating: 4.0, reviews: 612, category: 'Sci-Fi', color: '#0d3b66', accent: '#f95738', badge: 'New' },
  { id: 11, title: 'Dragons of the Salt Sea', author: 'Fiona McAllister', price: 19.5, rating: 4.9, reviews: 4086, category: 'Fantasy', color: '#06543f', accent: '#f0a6ca', badge: 'Bestseller' },
  { id: 12, title: 'Learning React, Gently', author: 'Amara Nwosu', price: 29.0, rating: 4.7, reviews: 2210, category: 'Technology', color: '#14213d', accent: '#61dafb', badge: 'New' },
];

export const categories = ['All', ...new Set(books.map((b) => b.category))];

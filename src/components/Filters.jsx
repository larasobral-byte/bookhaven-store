export default function Filters({ query, onQueryChange, categories, activeCategory, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="filters">
      <div className="filters-top">
        <div className="search">
          <label htmlFor="book-search">Search by title or author</label>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="e.g. Dragons, Maren Holt"
            maxLength={100}
            autoComplete="off"
          />
        </div>

        <div className="sort">
          <label htmlFor="book-sort">Sort by</label>
          <select
            id="book-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
          </select>
        </div>
      </div>

      <div role="group" aria-label="Filter by category" className="chips">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip ${cat === activeCategory ? 'chip-active' : ''}`}
            aria-pressed={cat === activeCategory}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

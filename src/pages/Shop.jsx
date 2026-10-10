import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = ["Corporate Chic", "Quiet Luxury", "Y2K", "Casual Chic"];
const colours = ["Black", "White", "Blue", "Beige", "Cream", "Brown"];

export default function Shop() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [colour, setColour] = useState("All");
  const [size, setSize] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let result = products.filter(product => {
      const term = search.toLowerCase().trim();
      const matchesSearch = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(term);
      return matchesSearch &&
        (category === "All" || product.category === category) &&
        (colour === "All" || product.color === colour) &&
        (size === "All" || product.sizes.includes(size)) &&
        product.price <= maxPrice;
    });
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "newest") result.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    if (sort === "popular") result.sort((a, b) => b.popularity - a.popularity);
    return result;
  }, [search, category, colour, size, maxPrice, sort]);

  function clearFilters() {
    setSearch(""); setCategory("All"); setColour("All"); setSize("All"); setMaxPrice(5000); setSort("featured");
  }

  return (
    <main className="page-shell">
      <header className="page-heading shop-heading"><p className="eyebrow">THE RUNWAY EDIT</p><h1>Shop the Collection</h1><p>Pieces to make your everyday style feel like your own.</p></header>
      <div className="shop-layout">
        <aside className="filters">
          <div className="filter-title"><h2>Filters</h2><button className="plain-button" onClick={clearFilters}>Clear all</button></div>
          <label className="field-label">Search<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pieces..." /></label>
          <label className="field-label">Category<select value={category} onChange={e => setCategory(e.target.value)}><option>All</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
          <label className="field-label">Colour<select value={colour} onChange={e => setColour(e.target.value)}><option>All</option>{colours.map(c => <option key={c}>{c}</option>)}</select></label>
          <label className="field-label">Size<select value={size} onChange={e => setSize(e.target.value)}><option>All</option>{["XS","S","M","L","XL","36","37","38","39","40","One Size"].map(s => <option key={s}>{s}</option>)}</select></label>
          <label className="field-label">Maximum price <strong>₹{maxPrice.toLocaleString("en-IN")}</strong><input type="range" min="500" max="5000" step="100" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} /></label>
        </aside>
        <section className="shop-results">
          <div className="results-toolbar"><p><strong>{filtered.length}</strong> pieces found</p><label>Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="newest">Newest</option><option value="popular">Popularity</option></select></label></div>
          {filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No pieces found</h2><p>Try changing your search or filters.</p><button className="button button-dark" onClick={clearFilters}>CLEAR FILTERS</button></div>}
        </section>
      </div>
    </main>
  );
}

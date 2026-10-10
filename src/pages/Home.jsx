import { Link } from "react-router-dom";
import products from "../data/products";
import collections from "../data/collections";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">THE NEW SEASON</p>
        <h1>DISCOVER YOUR STYLE</h1>
        <p className="hero-description">Explore the latest trends, discover new looks, and define your own style.</p>
        <Link to="/trends" className="button button-dark">EXPLORE TRENDS</Link>
      </section>
      <section className="section">
        <div className="section-heading"><p className="eyebrow">WHAT'S IN</p><h2>Trending Now</h2><p>Find the aesthetics shaping your next look.</p></div>
        <div className="collection-grid">
          {collections.map(item => (
            <Link to={`/shop?category=${encodeURIComponent(item.category)}`} className="collection-card" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="collection-overlay"><span>EXPLORE THE EDIT</span><h3>{item.title}</h3><p>{item.description}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section section-soft">
        <div className="section-heading section-heading-row"><div><p className="eyebrow">THE NEW EDIT</p><h2>Featured Pieces</h2></div><Link className="text-link" to="/shop">SHOP ALL →</Link></div>
        <div className="product-grid">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      <section className="lookbook-banner">
        <div><p className="eyebrow">YOUR STYLE, YOUR STORY</p><h2>Looks worth saving.<br />Styles worth making yours.</h2><Link to="/lookbook" className="button button-light">EXPLORE THE LOOKBOOK</Link></div>
      </section>
    </main>
  );
}

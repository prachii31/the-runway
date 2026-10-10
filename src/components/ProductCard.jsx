import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useShop();
  const saved = wishlist.some(item => item.id === product.id);

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/product/${product.id}`} className="product-card-image">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>
        <button className={`quick-heart ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist">
          {saved ? "♥" : "♡"}
        </button>
        <span className="product-category-tag">{product.category}</span>
      </div>
      <div className="product-card-info">
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <p>{product.color}</p>
        <strong>₹{product.price.toLocaleString("en-IN")}</strong>
      </div>
    </article>
  );
}

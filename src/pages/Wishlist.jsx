import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, notify } = useShop();
  return (
    <main className="page-shell">
      <header className="page-heading"><p className="eyebrow">YOUR EDIT</p><h1>Saved Favourites</h1><p>Pieces you love, all in one place.</p></header>
      {wishlist.length ? <div className="product-grid">{wishlist.map(product => <div className="wishlist-item" key={product.id}><ProductCard product={product} /><div className="wishlist-actions"><Link className="button button-dark" to={`/product/${product.id}`}>VIEW PRODUCT</Link><button className="button button-outline" onClick={() => { addToCart(product, product.sizes[0]); }}>ADD TO CART</button><button className="plain-button" onClick={() => removeFromWishlist(product.id)}>Remove</button></div></div>)}</div> : <div className="empty-state"><div className="empty-heart">♡</div><h2>Your wishlist is waiting</h2><p>Save pieces you love and find them here later.</p><Link to="/shop" className="button button-dark">EXPLORE THE SHOP</Link></div>}
    </main>
  );
}

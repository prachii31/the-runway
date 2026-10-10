import { NavLink, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Navbar.css";

function HeartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>;
}
function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
}

export default function Navbar() {
  const { cart, wishlist } = useShop();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link to="/" className="logo">THE RUNWAY</Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/trends">Trends</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/outfit-studio">Outfit Studio</NavLink>
        <NavLink to="/lookbook">Lookbook</NavLink>
        
      </nav>
      <div className="nav-actions">
        <Link to="/personal-stylist">AI Stylist</Link>
        <Link to="/wishlist" className="nav-icon" aria-label={`Wishlist, ${wishlist.length} items`}>
          <HeartIcon />
          {wishlist.length > 0 && <span className="counter">{wishlist.length}</span>}
        </Link>
        <Link to="/cart" className="nav-icon" aria-label={`Cart, ${count} items`}>
          <BagIcon />
          {count > 0 && <span className="counter">{count}</span>}
        </Link>
        
      </div>
    </header>
  );
}

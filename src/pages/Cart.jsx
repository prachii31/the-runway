import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, notify } = useShop();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">YOUR SELECTION</p>
        <h1>Shopping Bag</h1>
        <p>Good style is just a few pieces away.</p>
      </header>
      
      {!cart.length ? <div className="empty-state">
        <div className="empty-heart">♡</div>
        <h2>Your bag is empty</h2>
        <p>Find something that feels like you.</p>
        <Link to="/shop" className="button button-dark">EXPLORE THE SHOP</Link></div> :
         <>
        <div className="cart-topline"><span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
        <button className="plain-button" onClick={() => { if (window.confirm("Clear every item from your cart?")) { clearCart(); notify("Cart cleared"); } }}>Clear cart</button></div>
       
        <div className="cart-layout">
          <section className="cart-list">{cart.map(item => <article className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
            <Link to={`/product/${item.id}`} className="cart-item-image">
              <img src={item.images?.[0] || "https://placehold.co/400x500?text=Fashion"} 
              alt={item.name} />
            </Link>
            <div className="cart-item-info">
              <p className="eyebrow">{item.category}</p>
              <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
              <p>Colour: {item.color} · Size: {item.size}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item, -1)} aria-label="Decrease quantity">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item, 1)} aria-label="Increase quantity">+</button>
              </div>
              
              <button className="plain-button remove-link" onClick={() => removeFromCart(item)}>Remove</button>
            </div>
            
            <strong className="cart-item-price">₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
            </article>) }
            
          </section>
          <aside className="order-summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <div><span>Subtotal</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          <div>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div><button className="button button-dark button-wide" 
            onClick={() => notify("Checkout is a demo feature", "error")}>CONTINUE TO CHECKOUT</button>
            <p className="summary-note">Demo checkout only. No payment will be taken.</p>
          </aside>
        </div>
      </>}
    </main>
  );
}

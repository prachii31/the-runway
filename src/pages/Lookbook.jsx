import { Link } from "react-router-dom";
import looks from "../data/looks";
import products from "../data/products";
import { useShop } from "../context/ShopContext";

export default function Lookbook() {
  const { addToCart } = useShop();
  return (
    <main className="page-shell">
      <header className="page-heading"><p className="eyebrow">THE RUNWAY JOURNAL</p><h1>The Lookbook</h1><p>Ideas to inspire your next outfit, from workday polish to off-duty ease.</p></header>
      <div className="lookbook-list">{looks.map((look, index) => {
        const items = look.productIds.map(id => products.find(product => product.id === id)).filter(Boolean);
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return <article className={`lookbook-entry ${index % 2 ? "lookbook-reverse" : ""}`} key={look.id}><div className="lookbook-image"><img src={look.image} alt={look.title} loading="lazy" /></div><div className="lookbook-copy"><p className="eyebrow">{look.category}</p><h2>{look.title}</h2><p>{look.description}</p><div className="lookbook-products">{items.map(item => <Link key={item.id} to={`/product/${item.id}`}><img src={item.images[0]} alt={item.name} /><span>{item.name}</span><strong>₹{item.price.toLocaleString("en-IN")}</strong></Link>)}</div><div className="look-total"><span>Shop this look</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><button className="button button-dark" onClick={() => items.forEach(item => addToCart(item, item.sizes[0]))}>ADD LOOK TO CART</button></div></article>;
      })}</div>
    </main>
  );
}

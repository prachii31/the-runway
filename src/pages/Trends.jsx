import { Link } from "react-router-dom";
import collections from "../data/collections";

export default function Trends() {
  return (
    <main className="page-shell">
      <header className="page-heading"><p className="eyebrow">EXPLORE THE LATEST</p><h1>Fashion Trends</h1><p>Discover styles, aesthetics, and looks defining fashion right now.</p></header>
      <div className="collection-grid trends-grid">
        {collections.map(item => <article className="collection-card" key={item.title}>
          <img src={item.image} alt={item.title} loading="lazy" />
          <div className="collection-overlay"><span>THE STYLE GUIDE</span><h3>{item.title}</h3><p>{item.description}</p><Link to={`/shop?category=${encodeURIComponent(item.category)}`} className="button button-light">SHOP THIS STYLE</Link></div>
        </article>)}
      </div>
    </main>
  );
}

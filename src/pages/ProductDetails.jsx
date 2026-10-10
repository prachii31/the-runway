import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(item => item.id === Number(id));
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const { addToCart, wishlist, toggleWishlist, notify } = useShop();

  if (!product) return <NotFound />;
  const saved = wishlist.some(item => item.id === product.id);
  const related = products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3);

  function handleAdd() {
    if (!size) { notify("Please select a size first", "error"); return; }
    addToCart(product, size, colour || product.color);
  }

  return (
    <main className="page-shell">
      <div className="breadcrumbs"><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
      <section className="details-layout">
        <div className="gallery">
          <div className="gallery-main"><img src={product.images[imageIndex]} alt={product.name} onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"; }} /></div>
          <div className="gallery-thumbs">{product.images.map((image, index) => <button className={imageIndex === index ? "thumb active" : "thumb"} key={image} onClick={() => setImageIndex(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div>
        </div>
        <div className="details-info">
          <p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="details-price">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="details-description">{product.description}</p>
          <div className="option-block"><div className="option-heading"><strong>Select size</strong><span>{size || "Required"}</span></div><div className="size-options">{product.sizes.map(item => <button className={size === item ? "size-option selected" : "size-option"} key={item} onClick={() => setSize(item)}>{item}</button>)}</div></div>
          <div className="option-block"><div className="option-heading"><strong>Colour</strong><span>{colour || product.color}</span></div><div className="colour-options"><button aria-label={product.color} title={product.color} className="colour-swatch selected" onClick={() => setColour(product.color)} /></div></div>
          <button className="button button-dark button-wide" onClick={handleAdd}>ADD TO CART — ₹{product.price.toLocaleString("en-IN")}</button>
          <button className="button button-outline button-wide wishlist-detail" onClick={() => toggleWishlist(product)}>{saved ? "♥ SAVED TO WISHLIST" : "♡ ADD TO WISHLIST"}</button>
          <div className="product-note"><strong>THE RUNWAY NOTE</strong><p>Style it your way. Mix this piece with your existing wardrobe or explore the related edit below.</p></div>
        </div>
      </section>
      {related.length > 0 && <section className="section related-section"><div className="section-heading section-heading-row"><div><p className="eyebrow">MORE TO LOVE</p><h2>You May Also Like</h2></div><Link to="/shop" className="text-link">SHOP ALL →</Link></div><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div></section>}
    </main>
  );
}

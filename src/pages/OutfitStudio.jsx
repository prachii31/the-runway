import { useEffect, useState } from "react";
import products from "../data/products";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

const outfitChoices = {
  top: products.filter(item => [1, 2, 5].includes(item.id)),
  bottom: products.filter(item => [3, 4, 6].includes(item.id)),
  shoes: products.filter(item => item.id === 7),
  extra: products.filter(item => item.id === 8)
};

export default function OutfitStudio() {
  const [selected, setSelected] = useState({ top: null, bottom: null, shoes: null, extra: null });
  const [savedOutfits, setSavedOutfits] = useState(() => {
    try { return JSON.parse(localStorage.getItem("savedOutfits")) || []; } catch { return []; }
  });
  const [outfitName, setOutfitName] = useState("");
  const { addToCart, notify } = useShop();
  const total = Object.values(selected).reduce((sum, item) => sum + (item?.price || 0), 0);

  useEffect(() => localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits)), [savedOutfits]);

  function saveOutfit() {
    if (!Object.values(selected).some(Boolean)) { notify("Choose at least one piece first", "error"); return; }
    const name = outfitName.trim() || `My Look ${savedOutfits.length + 1}`;
    setSavedOutfits(prev => [...prev, { id: Date.now(), name, selected, total }]);
    setOutfitName("");
    notify("Outfit saved");
  }

  function restoreOutfit(outfit) {
    setSelected(outfit.selected);
    setOutfitName(outfit.name);
    notify("Outfit restored");
  }

  return (
    <main className="page-shell">
      <header className="page-heading"><p className="eyebrow">STYLE IT YOUR WAY</p><h1>Outfit Studio</h1><p>Mix your favourite pieces and create a look that feels like you.</p></header>
      <div className="studio-layout"><section className="studio-choices">
        {Object.entries(outfitChoices).map(([type, items]) => <div className="choice-section" key={type}><h2>{type === "extra" ? "Add an accessory" : `Choose ${type === "shoes" ? "shoes" : `a ${type}`}`}</h2><div className="choice-grid">{items.map(item => <button key={item.id} className={`choice-card ${selected[type]?.id === item.id ? "choice-selected" : ""}`} onClick={() => setSelected(prev => ({ ...prev, [type]: item }))}><img src={item.images[0]} alt={item.name} /><span>{item.name}</span><strong>₹{item.price.toLocaleString("en-IN")}</strong></button>)}</div></div>)}
      </section><aside className="studio-preview"><p className="eyebrow">YOUR CREATION</p><h2>Current Look</h2><div className="preview-pieces">{Object.entries(selected).map(([type, item]) => <div className="preview-piece" key={type}><span>{type}</span>{item ? <><img src={item.images[0]} alt={item.name} /><strong>{item.name}</strong></> : <p>Choose {type}</p>}</div>)}</div><div className="studio-total"><span>Outfit total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><input className="studio-name" value={outfitName} onChange={e => setOutfitName(e.target.value)} placeholder="Name your outfit (optional)" /><button className="button button-dark button-wide" onClick={saveOutfit}>SAVE THIS LOOK</button><button className="button button-outline button-wide" onClick={() => setSelected({ top: null, bottom: null, shoes: null, extra: null })}>RESET OUTFIT</button><button className="button button-outline button-wide" onClick={() => { const items = Object.values(selected).filter(Boolean); if (!items.length) { notify("Choose pieces first", "error"); return; } items.forEach(item => addToCart(item, item.sizes[0])); }}>ADD SELECTED PIECES TO CART</button></aside></div>
      <section className="section saved-section"><div className="section-heading section-heading-row"><div><p className="eyebrow">YOUR PERSONAL EDIT</p><h2>Saved Looks</h2></div></div>{savedOutfits.length ? <div className="saved-look-grid">{savedOutfits.map(outfit => <article className="saved-look-card" key={outfit.id}><h3>{outfit.name}</h3><p>{Object.values(outfit.selected).filter(Boolean).map(item => item.name).join(" · ")}</p><strong>₹{outfit.total.toLocaleString("en-IN")}</strong><div className="saved-look-actions"><button className="button button-dark" onClick={() => restoreOutfit(outfit)}>RESTORE</button><button className="button button-outline" onClick={() => setSavedOutfits(prev => prev.filter(item => item.id !== outfit.id))}>DELETE</button></div></article>)}</div> : <p className="muted center">Your saved looks will appear here.</p>}</section>
    </main>
  );
}

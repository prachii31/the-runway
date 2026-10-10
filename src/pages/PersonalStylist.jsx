
import { useState } from "react";
import { Link } from "react-router-dom";
import "./PersonalStylist.css";

export default function PersonalStylist() {
  const [occasion, setOccasion] = useState("College");
  const [style, setStyle] = useState("Casual chic");
  const [budget, setBudget] = useState("2000");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert(
      `Your style: ${style}\nOccasion: ${occasion}\nBudget: ₹${budget}\nDescription: ${description}`
    );
  }

  return (
    <main className="stylist-page">
      <section className="stylist-hero">
        <p className="eyebrow">THE RUNWAY STYLE ASSISTANT</p>
        <h1>Your style, your story.</h1>
        <p>
          Tell us where you're going and what you love.
          Let's find a look that feels like you.
        </p>
      </section>

      <form className="stylist-form" onSubmit={handleSubmit}>
        <label htmlFor="occasion">What are you dressing for?</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(event) => setOccasion(event.target.value)}
        >
          <option>College</option>
          <option>Date night</option>
          <option>Party</option>
          <option>Everyday</option>
          <option>Office</option>
          <option>Wedding</option>
        </select>

        <label htmlFor="style">Choose your style</label>
        <select
          id="style"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
        >
          <option>Casual chic</option>
          <option>Minimalist</option>
          <option>Streetwear</option>
          <option>Old money</option>
          <option>Boho</option>
          <option>Elegant</option>
        </select>

        <label htmlFor="budget">Your budget (₹)</label>
        <input
          id="budget"
          type="number"
          min="1"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
        />

        <label htmlFor="description">
          Tell us more about your ideal outfit
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Example: A comfortable winter outfit with jeans and sneakers..."
          rows="4"
        />

        <button className="button button-dark button-wide" type="submit">
          FIND MY STYLE
        </button>

        <p className="stylist-note">
          Your personal styling experience starts here.
        </p>
      </form>

      <div className="stylist-back">
        <Link to="/shop">← Explore the shop</Link>
      </div>
    </main>
  );
}

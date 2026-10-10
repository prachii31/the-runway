import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="empty-state not-found"><p className="eyebrow">404 — WRONG TURN</p><h1>We couldn't find that page.</h1><p>Let's get you back to discovering your style.</p><Link className="button button-dark" to="/">BACK HOME</Link></main>;
}

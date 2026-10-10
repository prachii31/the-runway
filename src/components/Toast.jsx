import { useEffect } from "react";
import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast, dismissToast } = useShop();
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 2600);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;
  return <div className={`toast toast-${toast.type}`} role="status">{toast.message}<button onClick={dismissToast} aria-label="Dismiss notification">×</button></div>;
}

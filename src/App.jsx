import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import OutfitStudio from "./pages/OutfitStudio";
import Lookbook from "./pages/Lookbook";
import NotFound from "./pages/NotFound";
import PersonalStylist from "./pages/PersonalStylist";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/outfit-studio" element={<OutfitStudio />} />
        <Route path="/outfit-builder" element={<OutfitStudio />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/personal-stylist" element={<PersonalStylist />} />
      </Routes>
    </BrowserRouter>
  );
}

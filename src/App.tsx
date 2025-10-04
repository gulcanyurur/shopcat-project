import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import GearList from "./Components/GearList";
import CartPage from "./Components/CartPage";
import MultiStepCheckout from "./Components/MultiStepCheckout";
import LiveChat from "./Components/LiveChat";
import type { Product } from "./types/Product";


function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
}

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GearList cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<MultiStepCheckout />} />
      </Routes>
      <LiveChat />
    </Router>
  );
};

export default App;





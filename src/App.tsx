import React, { useState } from "react";
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from "./store/CartContext";

function App() {
  const [isModal, setIsModal] = useState(false);
  const showCartModal = () => {
    document.body.style.overflow = "hidden"
    setIsModal(true);
  };
  const hideCartModal = () => {
    document.body.style.overflow = "visible"
    setIsModal(false);
  };
  return (
    <CartProvider>
      <>
        {isModal && <Cart hideCartModal={hideCartModal} />}
        <Header showCartModal={showCartModal} />
        <main>
          <Meals />
        </main>
      </>
    </CartProvider>
  );
}

export default App;

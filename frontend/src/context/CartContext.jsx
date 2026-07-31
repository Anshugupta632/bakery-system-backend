import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('bakery_cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (cake, size, quantity = 1, customizationText = '') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.cake_id === cake.id && item.size_id === size.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          cake_id: cake.id,
          name: cake.name,
          image_url: cake.image_url,
          size_id: size.id,
          size_label: size.label || size.weight,
          item_price: size.price || cake.base_price,
          quantity,
          customization_text: customizationText,
        },
      ];
    });
  };

  const removeFromCart = (cake_id, size_id) => {
    setCart((prev) => prev.filter((item) => !(item.cake_id === cake_id && item.size_id === size_id)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.item_price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
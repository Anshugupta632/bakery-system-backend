import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load initial cart state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cake_bakers_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
      return [];
    }
  });

  // Sync cart changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cake_bakers_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cartItems]);

  // Add Item to Cart (with strict undefined safety checks)
  const addToCart = (newItem) => {
    if (!newItem || !newItem.id) {
      console.error("❌ AddToCart Error: Invalid item object provided", newItem);
      return;
    }

    setCartItems((prevItems) => {
      // Find if item with same ID and custom icing text exists
      const existingIndex = prevItems.findIndex(
        (item) => item && item.id === newItem.id && item.customText === newItem.customText
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item && item.id !== id));
  };

  // Update Item Quantity Directly
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear Entire Cart
  const clearCart = () => setCartItems([]);

  // Calculate Total Amount
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Calculate Total Quantity
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.warn("useCart was used outside of a CartProvider");
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      cartTotal: 0,
      cartCount: 0,
    };
  }
  return context;
};
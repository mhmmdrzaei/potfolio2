import { createContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'mohammad-store-cart';

export const CartContext = createContext({
  items: [],
  itemCount: 0,
  addItem: () => {},
  removeItem: () => {},
  setItemQuantity: () => {},
  clearCart: () => {},
  getProductQuantity: () => 0,
  getTotalCost: () => 0
});

function readStoredCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch (error) {
    console.warn('Unable to read stored cart.', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setCartItems(readStoredCart());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hasHydrated]);

  function getProductQuantity(id) {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
  }

  function addItem(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item._id === product._id);

      if (!existingItem) {
        return [...currentItems, { ...product, quantity: 1 }];
      }

      return currentItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function removeItem(id) {
    setCartItems((currentItems) => currentItems.filter((item) => item._id !== id));
  }

  function setItemQuantity(id, nextQuantity) {
    if (nextQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function getTotalCost() {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  }

  const value = {
    items: cartItems,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    addItem,
    removeItem,
    setItemQuantity,
    clearCart,
    getProductQuantity,
    getTotalCost
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;

import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Total calculate karne ka logic
  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      return acc + (price * (item.qty || 1));
    }, 0);
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  };

  const decreaseQty = (name) => {
    setCart(prev => 
      prev.map(i => i.name === name ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
    );
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, decreaseQty, removeFromCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};
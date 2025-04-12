// context/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate cart total and count
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [items]);
  
  const addToCart = (product: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += product.quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, product];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

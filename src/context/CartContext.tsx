// src/context/CartContext.tsx

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Definição da interface para o produto
interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string; // Preço como string, mas será convertido para número ao usar
}

// Definição da interface para o contexto do carrinho
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      // Verifica se o item está no carrinho
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // vê se o item está no carrinho, atualize a quantidade
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Caso contrário, adicione o novo item ao carrinho
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};



'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);


  // Add to cart
  const addToCart = async (itemId) => {

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;

    }
    else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    if (currentUser) {
      try {
        await axios.post('/api/cart', { cartData })
        toast.success('Item Added')

      } catch (error) {
        toast.error(error.message)

      }
    }


  }


  // Update quantity

  const updateCartQuantity = async (itemId, quantity) => {

    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData)
    if (user) {
      try {
        await axios.post('/api/cart', { cartData })
        toast.success('cart updated')

      } catch (error) {
        toast.error(error.message)

      }
    }

  }


  const userCart = async () => {
    try {
      const { data } = await axios.get('/api/cart')
      if (data.success) {
        setCartItems(data.cartItems)
      }
    } catch (error) {
      console.log(error.message);


    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  }


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }


  const value = {
    cartItems,
    updateCartQuantity,
    addToCart,
    loading,
    getCartAmount,
    getCartCount,
    userCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};

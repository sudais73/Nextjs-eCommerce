"use client"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create a new context
export const ProductContext = createContext();

// Create a provider component
export const ProductContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true)
      try {
        const { data } = await axios.get('/api/products')
        if (data.success) {
          setAllProducts(data.products)
        } else {
          toast.error('something wrong!')
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoadingProducts(false)
      }

    }
    fetchProducts()
  }, []);

  // The value that will be provided to consumers
  const contextValue = { allProducts, loadingProducts };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};


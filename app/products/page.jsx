'use client';

import React, { useState, useEffect, useContext } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/productCard';
import { ProductContext } from '../context/shopContext';


const ProductsPage = () => {
  const { allProducts } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeFilters, setActiveFilters] = useState({ categories: [], subcategories: [] });

  const applyFilters = (filters) => {
    let tempProducts = allProducts;

    if (filters.categories.length > 0) {
      tempProducts = tempProducts.filter(product => filters.categories.includes(product.category));
    }
    if (filters.subcategories.length > 0) {
      tempProducts = tempProducts.filter(product => filters.subcategories.includes(product.subCategory));
    }

    setFilteredProducts(tempProducts);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  useEffect(() => {
    applyFilters(activeFilters);
  }, [activeFilters]);

  return (
    <section className='w-[90%] md:w-[80%] mx-auto py-10'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800'>Our Collection</h1>
        <p className='text-md text-gray-600 mt-2 max-w-2xl mx-auto'>
          Browse through our extensive catalog to find exactly what you're looking for.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Filter Sidebar */}
        <div className='lg:w-1/4'>
          <FilterSidebar allProducts={allProducts} onFilterChange={handleFilterChange} />
        </div>

        {/* Products Display Area */}
        <div className='lg:w-3/4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>All Products ({filteredProducts.length})</h2>
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
              {filteredProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <p className='text-center text-lg text-gray-500 mt-10'>No products match your filters. Try adjusting them!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
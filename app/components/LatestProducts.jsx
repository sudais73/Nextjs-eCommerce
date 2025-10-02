"use client"
import React, { useContext } from 'react'
import ProductCard from './productCard'
import Link from 'next/link';
import { ProductContext } from '../context/shopContext';

const LatestProducts = () => {
    const { allProducts } = useContext(ProductContext);
    const latestProductsToDisplay = allProducts.slice(0, 8); 
return (
    <section className='w-[90%] md:w-[80%] mx-auto py-10'> 
      {/* Section Header */}
      <div className='text-center mb-8'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>Latest Arrivals</h2>
        <p className='text-md text-gray-600 mt-2 max-w-2xl mx-auto'>
          Explore our newest collection of products, carefully selected to bring you the best in quality and innovation.
        </p>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'> 
        {latestProductsToDisplay.map((item) => (
          <ProductCard key={item._id} product={item} /> 
        ))}
      </div>

      {/* Call to Action: View All Products */}
      <div className='text-center mt-10'>
        <Link href="/products">
          <button className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer'>
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LatestProducts

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// This component receives product data as props
const ProductCard = ({ product }) => {
  
  const productLink = `/products/${product.slug || product._id}`; 

  return (
    <Link href={productLink}> {/* Make the whole card clickable */}
      <div className='flex flex-col gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full'>
        {/* Product Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg"> {/* Fixed height for image container */}
          <Image
            src={product.image[0]} // Display the first image
            alt={product.name}
            fill // Make the image fill its parent div
            style={{ objectFit: 'cover' }} // Cover the entire area
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Optimizes image loading
            className='transition-transform duration-300 hover:scale-105' // Subtle zoom on hover
          />
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-1 mt-2 flex-grow'> 
          <h3 className='text-base md:text-lg font-medium text-gray-800 line-clamp-2'>{product.name}</h3> 
          {product.brand && <p className='text-sm text-gray-500'>{product.brand}</p>} 
          <p className='text-lg md:text-xl font-semibold text-blue-600 mt-auto'>${product.price.toFixed(2)}</p> 
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
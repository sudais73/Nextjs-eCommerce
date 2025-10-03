'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/cartContext';

const CartItem = ({ item }) => {
  const {updateCartQuantity } = useCart();

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      updateCartQuantity(item._id, item.quantity + 1);
    } else if (type === 'decrement') {
      updateCartQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div className='flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0'>
      <div className='flex flex-col md:flex-row items-center gap-4'>
        {/* Product Image */}
        <div className='relative w-20 h-20 rounded-md overflow-hidden'>
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="80px"
            className='rounded-md'
          />
        </div>

        {/* Product Details */}
        <div className='flex flex-col'>
          <Link
            href={`/products/${item._id || item.productId}`}
            className='text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors'
          >
            {item.name}
          </Link>
          {item.size && <p className='text-sm text-gray-500'>Size: {item.size}</p>}
          <p className='text-md font-bold text-gray-700'>${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls & Remove Button */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center border border-gray-300 rounded-md'>
          <button
            onClick={() => handleQuantityChange('decrement')}
            className='px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-md'
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className='px-4 text-md'>{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange('increment')}
            className='px-3 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-md'
          >
            +
          </button>
        </div>
        <button
          onClick={() => updateCartQuantity(item._id, 0)}
          className='hidden md:flex text-red-600 hover:text-red-800 transition-colors'
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

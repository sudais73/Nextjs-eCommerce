'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Format date for better readability
  const formattedDate = new Date(order.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-100'>
      {/* Order Summary Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4'>
        <div className='mb-4 md:mb-0'>
          <h3 className='text-lg font-semibold text-gray-900'>Order #{order._id}</h3>
          <p className='text-sm text-gray-600'>Ordered on: {formattedDate}</p>
        </div>
        <div className='flex flex-col md:items-end'>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <p className='text-xl font-bold text-gray-900 mt-2'>Total: ${order.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Ordered Items Preview */}
      <div className='mb-4'>
        <h4 className='text-md font-semibold text-gray-800 mb-2'>Items ({order.items.length})</h4>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {order.items.slice(0, 4).map((item, index) => ( // Show first 4 items as preview
            <div key={index} className='flex items-center gap-2'>
              <div className='relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden'>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="48px" />
              </div>
              <p className='text-sm text-gray-700 leading-tight'>{item.name}</p>
            </div>
          ))}
          {order.items.length > 4 && (
            <p className='text-sm text-gray-500'>+ {order.items.length - 4} more items</p>
          )}
        </div>
      </div>

      {/* Toggle Order Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className='text-blue-600 hover:underline text-sm font-medium mt-2'
      >
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      {/* Collapsible Order Details */}
      {showDetails && (
        <div className='mt-4 border-t pt-4'>
          <h4 className='text-md font-semibold text-gray-800 mb-3'>Detailed Items:</h4>
          {order.items.map((item, index) => (
            <div key={index} className='flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0'>
              <div className='flex items-center gap-3'>
                <div className='relative w-16 h-16 rounded-md overflow-hidden'>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="64px" />
                </div>
                <div>
                  <Link href={`/products/${item.productId}`} className='text-md font-medium text-gray-800 hover:text-blue-600'>
                    {item.name}
                  </Link>
                  <p className='text-sm text-gray-500'>Size: {item.size} | Qty: {item.quantity}</p>
                </div>
              </div>
              <p className='text-md font-semibold text-gray-900'>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className='mt-4 pt-4 border-t text-sm text-gray-700'>
            <h4 className='font-semibold mb-2'>Shipping Address:</h4>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
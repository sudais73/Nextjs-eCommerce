'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Subscription = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing!');
    setEmail(''); 
  };

  return (
    <section className='w-[90%] md:w-[80%] mx-auto py-12'>
      <div className='flex flex-col items-center text-center p-8 bg-gray-100 rounded-2xl shadow-lg'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight'>
          Subscribe to our newsletter
        </h2>
        <p className='text-lg text-gray-600 mt-4 max-w-2xl'>
          Get 20% off your first order and receive exclusive deals, product launches, and more directly in your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className='mt-8 w-full max-w-lg'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              className='flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              required
            />
            <button
              type='submit'
              className='w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300'
            >
              SUBSCRIBE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Subscription;
'use client'; 

import React from 'react';

const ContactUsPage = () => {
 

  return (
    <section className='w-[90%] md:w-[80%] mx-auto py-12'>
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center'>Get in Touch</h1>

      <div className='flex flex-col lg:flex-row gap-10'>
        {/* Contact Form (Left Side) */}
        <div className='lg:w-2/3 bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Send Us a Message</h2>
          <form  className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
               
                required
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
               
                required
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div>
              <label htmlFor='subject' className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
               
                required
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
              <textarea
                id='message'
                name='message'
                rows='5'
               
                required
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y'
              ></textarea>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info (Right Side) */}
        <div className='lg:w-1/3 bg-white p-8 rounded-lg shadow-md h-fit'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Our Details</h2>
          <div className='space-y-5'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Email</h3>
              <p className='text-gray-700'><a href='mailto:support@forever.com' className='text-blue-600 hover:underline'>support@forever.com</a></p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Phone</h3>
              <p className='text-gray-700'><a href='tel:+1234567890' className='text-blue-600 hover:underline'>+1 (234) 567-890</a></p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Address</h3>
              <p className='text-gray-700'>123 Fashion Lane, Suite 100</p>
              <p className='text-gray-700'>Style City, ST 98765, USA</p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Business Hours</h3>
              <p className='text-gray-700'>Mon-Fri: 9:00 AM - 5:00 PM</p>
              <p className='text-gray-700'>Sat: 10:00 AM - 3:00 PM</p>
              <p className='text-gray-700'>Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
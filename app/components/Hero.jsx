
import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';
import { assets } from '../assets/assets'; 

const Hero = () => {
  return (
    // Main container 
    <section className='relative w-full h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center'>
      {/* Background Image - positioned absolutely to cover the section */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={assets.hero_img}
          alt='Hero Background Image for E-commerce'
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          priority 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" 
        />
       
        <div className='absolute inset-0 bg-black opacity-30'></div>
      </div>

      {/* Content Container - positioned above the image */}
      <div className='relative z-10 flex flex-col items-center text-center text-white p-6 space-y-4 md:space-y-6'>
        {/* Subtitle */}
        <p className='text-lg md:text-xl font-semibold uppercase tracking-wider'>
          Our Best Sellers
        </p>
        {/* Main Headline */}
        <h1 className='text-4xl md:text-6xl font-extrabold leading-tight'>
          Discover Your Next <br /> Favorite Item
        </h1>
        {/* Call-to-Action Button */}
        <Link href="/products" passHref> 
          <button className='mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105'>
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
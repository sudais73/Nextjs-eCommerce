import React from 'react';
import Image from 'next/image';
import { assets } from '../assets/assets';

const AboutUsPage = () => {
  return (
    <section className='w-[90%] md:w-[80%] mx-auto py-12'>
      <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center'>About Our Store</h1>

      {/* Hero Section for About Us */}
      <div className='relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-12'>
        <Image
          src={assets.about_img} 
          alt="Our Team Working Together"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
          className='rounded-xl'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <p className='text-white text-2xl md:text-4xl font-bold text-center p-4'>
            Fashion that tells your story.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className='mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>Our Story</h2>
        <p className='text-lg text-gray-700 leading-relaxed mb-4'>
          Founded in [Year], Forever. was born out of a passion for timeless fashion and quality craftsmanship. We believe that clothing should not only be stylish but also comfortable, durable, and ethically made. What started as a small dream to offer curated collections has grown into a vibrant online community for fashion enthusiasts.
        </p>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Every piece in our collection is handpicked to ensure it meets our high standards for design, fabric, and fit. We work closely with designers and manufacturers who share our commitment to sustainability and fair labor practices, bringing you fashion you can feel good about.
        </p>
      </div>

      {/* Our Mission */}
      <div className='mb-12 flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-8 rounded-lg shadow-sm'>
        <div className='md:w-1/2'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>Our Mission</h2>
          <p className='text-lg text-gray-700 leading-relaxed'>
            To empower individuals through fashion, offering versatile and high-quality apparel that inspires confidence and self-expression. We aim to create a seamless shopping experience and foster a community that values conscious consumption and personal style.
          </p>
        </div>
        <div className='md:w-1/2 relative w-full h-64 rounded-md overflow-hidden'>
          <Image
            src={assets.about_img} // Placeholder image
            alt="Our Mission"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 400px"
            className='rounded-md'
          />
        </div>
      </div>

      {/* Our Values */}
      <div className='text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-8'>Our Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Quality</h3>
            <p className='text-gray-700'>
              We commit to offering only the finest materials and superior craftsmanship in every garment.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Integrity</h3>
            <p className='text-gray-700'>
              Honesty and ethical practices guide all our decisions, from sourcing to customer service.
            </p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Community</h3>
            <p className='text-gray-700'>
              We believe in building connections and celebrating individuality within our fashion family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
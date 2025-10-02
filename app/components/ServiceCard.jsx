import Image from 'next/image';
import React from 'react';

// This component receives icon, title, and description as props
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className='flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full'>
      {/* Service Icon */}
      <div className='mb-4'> 
        <Image 
          src={icon} 
          alt={`${title} icon`} 
          width={48} 
          height={48} 
          className='w-12 h-12 object-contain' 
        />
      </div>
      
      {/* Service Details */}
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg md:text-xl font-semibold text-gray-800'>{title}</h3> 
        <p className='text-sm text-gray-600'>{description}</p> 
      </div>
    </div>
  );
};

export default ServiceCard;

import React from 'react';
import { assets } from '../assets/assets';
import ServiceCard from './ServiceCard';

const Service = () => {
    // Define the service data in an array for easy mapping
    const serviceFeatures = [
        {
            icon: assets.exchange_icon,
            title: 'Easy Exchange Policy',
            description: 'We offer hassle-free exchange policy within 30 days.'
        },
        {
            icon: assets.quality_icon,
            title: '7 Days Return Policy',
            description: 'We provide 7 days free return policy for all products.'
        },
        {
            icon: assets.support_img,
            title: '24/7 Customer Support',
            description: 'Our dedicated team is available around the clock to assist you.'
        }
    ];

    return (
        <section className='w-[90%] md:w-[80%] mx-auto mt-10 mb-10 py-8'>
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us?</h2>
                <p className="text-md text-gray-600 mt-2">Discover the benefits of shopping with us.</p>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {serviceFeatures.map((service, index) => (
                    <ServiceCard
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default Service;
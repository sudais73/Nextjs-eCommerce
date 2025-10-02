import React, { useContext } from 'react';
import { ProductContext } from '../context/shopContext';
import ProductCard from './productCard';

const RelatedProduct = ({ currentProductId, category, subCategory }) => {
    const { allProducts } = useContext(ProductContext);

//Find products that match both category and subcategory, and are not the current product
    let related = allProducts.filter(p => 
        p.category === category && 
        p.subCategory === subCategory &&
        p._id !== currentProductId
    );

   

    // Limit to the first 4 unique results
    const uniqueRelated = related.slice(0, 4);

    // Don't render the section if there are no related products
    if (uniqueRelated.length === 0) {
        return null;
    }

    return (
        <section className='mt-16 mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left'>
                You might also like... ({uniqueRelated.length})
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6'>
                {uniqueRelated.map((item) => (
                    <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProduct;
'use client'; 

import React, { useState } from 'react';

const FilterSidebar = ({ allProducts, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Dynamically get unique categories and subcategories from the product data
  const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
  const uniqueSubcategories = [...new Set(allProducts.map(p => p.subCategory))];

  const handleCheckboxChange = (filterType, value) => {
    let newSelection;
    let newCategories = [...selectedCategories];
    let newSubcategories = [...selectedSubcategories];

    if (filterType === 'category') {
      newSelection = newCategories.includes(value)
        ? newCategories.filter((cat) => cat !== value)
        : [...newCategories, value];
      setSelectedCategories(newSelection);
      newCategories = newSelection;
    } else if (filterType === 'subCategory') {
      newSelection = newSubcategories.includes(value)
        ? newSubcategories.filter((subcat) => subcat !== value)
        : [...newSubcategories, value];
      setSelectedSubcategories(newSelection);
      newSubcategories = newSelection;
    }
    
    // Pass the combined filters back to the parent component
    onFilterChange({ categories: newCategories, subcategories: newSubcategories });
  };

  return (
    <aside className='w-full lg:w-64 p-6 bg-white rounded-lg shadow-md lg:sticky lg:top-24 h-fit'>
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>Filters</h3>

      {/* Filter by Category */}
      <div className='mb-8'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>CATEGORIES</h4>
        {uniqueCategories.map((category) => (
          <div key={category} className='flex items-center mb-2'>
            <input
              type='checkbox'
              id={`category-${category}`}
              className='mr-2 accent-blue-600 w-4 h-4'
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange('category', category)}
            />
            <label htmlFor={`category-${category}`} className='text-gray-600 cursor-pointer'>
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Filter by Subcategory */}
      <div>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>SUBCATEGORIES</h4>
        {uniqueSubcategories.map((subcat) => (
          <div key={subcat} className='flex items-center mb-2'>
            <input
              type='checkbox'
              id={`subcat-${subcat}`}
              className='mr-2 accent-blue-600 w-4 h-4'
              checked={selectedSubcategories.includes(subcat)}
              onChange={() => handleCheckboxChange('subCategory', subcat)}
            />
            <label htmlFor={`subcat-${subcat}`} className='text-gray-600 cursor-pointer'>
              {subcat}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
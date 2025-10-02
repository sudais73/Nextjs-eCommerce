'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const categories = ['Men', 'Women', 'Kids', 'Accessories'];
const subCategories = ['Topwear','Bottomwear','Winterwear'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // single image file
  const [imagePreview, setImagePreview] = useState(null); // preview URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [size, setSize] = useState([]); // multiple sizes allowed

  // cleanup preview URL
  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!imageFile) {
        setLoading(false);
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("description", description);
      size.forEach(s => formData.append("size[]", s));
      formData.append("image", imageFile);

      const { data } = await axios.post("/api/admin/products", formData);

      if (data.success) {
        toast.success(data.msg);
        // reset form
        setName('');
        setPrice('');
        setCategory('');
        setSubCategory('');
        setDescription('');
        setSize([]);
        setImageFile(null);
        setImagePreview(null);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Product</h1>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Product Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              required
              min={0}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              id="subCategory"
              value={subCategory}
              onChange={(e)=>setSubCategory(e.target.value)}
              disabled={!category}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white disabled:bg-gray-200"
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
      
        {/* Sizes Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((s) => (
              <label key={s} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={size.includes(s)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSize([...size, s]);
                    } else {
                      setSize(size.filter(val => val !== s));
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <span className="text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload Input and Preview */}
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file || null);
            }}
            className="mt-2"
          />
          {imagePreview && (
            <div className="mt-4 w-32 h-32 border rounded-md overflow-hidden">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;

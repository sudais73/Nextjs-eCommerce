'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaEdit, FaSpinner } from 'react-icons/fa';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId, productName) => {
  if (!window.confirm(`Are you sure you want to delete product: "${productName}"?`)) return;

  try {
    await axios.delete(`/api/admin/products`, { 
      data: { productId } 
    });

    toast.success(`Product "${productName}" deleted successfully!`);
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error(error.response?.data?.message || "Failed to delete product.");
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <FaSpinner className="animate-spin text-3xl text-indigo-600" />
        <p className="ml-3 text-lg">Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-2 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All Products ({products.length})
        </h1>
        <Link
          href="/admin/add-products/"
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200"
        >
          <FaPlus className="mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No products found. Add one to get started!</p>
      ) : (
        <>
          {/* Table for medium+ screens */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image[0] || '/images/default.png'}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <span className="text-indigo-600 hover:text-indigo-900" title="Edit Product">
                          <FaEdit className="inline-block text-lg" />
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Product"
                      >
                        <FaTrash className="inline-block text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image[0] || '/images/default.png'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="font-medium text-gray-900">{product.name}</h2>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Link href={`/admin/products/edit/${product._id}`}>
                    <span className="text-indigo-600 hover:text-indigo-900">
                      <FaEdit />
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductsPage;

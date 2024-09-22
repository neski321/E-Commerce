import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL;

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      setProductId('');
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">

      <Link to="/product-crud" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
            Back to Product Control
          </Link>
          <br></br>
          <br></br>

        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        <form onSubmit={handleDeleteProduct} className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Delete Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DeleteProduct;

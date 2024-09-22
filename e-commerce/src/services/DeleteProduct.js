import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL;

const DeleteProduct = () => {
  const [searchId, setSearchId] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [editingProduct, setEditingProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    if (!productId) {
      alert('Please select a product to delete.');
      return;
    }
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      setProductId('');
      alert('Product deleted successfully');
      setEditingProduct(null); // Clear product info after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // function to handle search
  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      let response;
  
      if (searchType === 'id') {
        // Search by Product ID (fetch by id in the URL)
        response = await axios.get(`${API_URL}/products/${searchId}/`);
      } else if (searchType === 'title') {
        // Search by Product Title
        response = await axios.get(`${API_URL}/products/`, {
          params: {
            search: searchTitle,
            type: 'regular',
          },
        });
      }
  
      // Check if the response contains data
      if (response.data) {
        const product = searchType === 'id' ? response.data : response.data[0];
        setEditingProduct(product);
        setProductId(product.id);  // Set the product ID for deletion
        setProductNotFound(false);
      } else {
        setProductNotFound(true);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setEditingProduct(null);
      setProductNotFound(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <Link to="/product-crud" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
          Back to Product Control
        </Link>
        <br />
        <br />

        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>

        <form onSubmit={handleSearchProduct} className="bg-white p-4 rounded shadow-md mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Search By</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="id">Product ID</option>
              <option value="title">Product Title</option>
            </select>
          </div>

          {searchType === 'id' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product ID</label>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}

          {searchType === 'title' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Title</label>
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}

          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Search Product
          </button>
        </form>

        {/* Display Product to be deleted */}
        {productNotFound && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Product not found!</strong>
            <span className="block sm:inline"> Please search for a valid product ID or title.</span>
          </div>
        )}

        {editingProduct && (
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-bold mb-2">Product to be Deleted</h3>
            <p><strong>ID:</strong> {editingProduct.id}</p>
            <p><strong>Title:</strong> {editingProduct.title}</p>
            <p><strong>Description:</strong> {editingProduct.description}</p>
            <p><strong>Category:</strong> {editingProduct.category}</p>
            <p><strong>Price:</strong> ${editingProduct.price}</p>
          </div>
        )}

        <form onSubmit={handleDeleteProduct} className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={!editingProduct} // Disable input if no product is selected
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" disabled={!editingProduct}>
            Delete Product
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DeleteProduct;

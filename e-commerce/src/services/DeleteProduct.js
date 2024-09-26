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

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      let response;
  
      if (searchType === 'id') {
        response = await axios.get(`${API_URL}/products/${searchId}/`);
      } else if (searchType === 'title') {
        response = await axios.get(`${API_URL}/products/`, {
          params: {
            search: searchTitle,
            type: 'regular',
          },
        });
      }
  
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
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto py-12 px-4 text-center">
          <Link to="/product-crud" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out">
            Back to Product Control
          </Link>
          <br />
          <br />

          <h2 className="text-4xl font-bold mb-6">Delete Product</h2>

          <form onSubmit={handleSearchProduct} className="bg-white p-6 rounded shadow-md mb-6 mx-auto w-full max-w-xl text-left">
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

            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out">
              Search Product
            </button>
          </form>

          {productNotFound && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 mx-auto w-full max-w-xl" role="alert">
              <strong className="font-bold">Product not found!</strong>
              <span className="block sm:inline"> Please search for a valid product ID or title.</span>
            </div>
          )}

          {editingProduct && (
            <div className="bg-white p-6 rounded shadow-md mb-6 mx-auto w-full max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Product to be Deleted</h3>
              <p className="mb-2"><strong>Product ID:</strong> {editingProduct.id}</p>
              <p className="mb-2"><strong>Title:</strong> {editingProduct.title}</p>
              <p className="mb-2"><strong>Description:</strong> {editingProduct.description}</p>
              <p className="mb-2"><strong>Category:</strong> {editingProduct.category}</p>
              <p className="mb-4"><strong>Price:</strong> ${editingProduct.price}</p>

              <form onSubmit={handleDeleteProduct} className="bg-white p-4 rounded-md shadow-md">
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                  disabled={!editingProduct}
                >
                  Delete Product
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteProduct;

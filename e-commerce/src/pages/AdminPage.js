// src/pages/AdminPage.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, category: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products/`, newProduct);
      setNewProduct({id:'', title: '', description: '', price: 0, category: '' });
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/products/${searchId}`);
      setEditingProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/products/${editingProduct.id}/`, editingProduct);
      setEditingProduct(null);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/products/${deleteId}`);
      setDeleteId('');
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Control - Admin</h1>

      {/* Add Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={newProduct.id}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Product
          </button>
        </form>
      </div>

      {/* Update Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSearchProduct} className="bg-white p-4 rounded shadow-md mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Search Product by ID</label>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Search Product
          </button>
        </form>
        {editingProduct && (
          <form onSubmit={handleUpdateProduct} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="name"
                value={editingProduct.title}
                onChange={handleEditInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleEditInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleEditInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={handleEditInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Update Product
            </button>
          </form>
        )}
      </div>

      {/* Delete Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        <form onSubmit={handleDeleteProduct} className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Delete Product
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AdminPage;

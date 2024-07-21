import React, { useState } from 'react';
import axios from 'axios';
import { addProduct, updateProduct, deleteProduct, removeReview } from '../services/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL;

const ProductCRUD = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discount_percentage: '',
    rating: '',
    stock: '',
    brand: '',
    sku: '',
    weight: '',
    warranty_information: '',
    shipping_information: '',
    availability_status: '',
    return_policy: '',
    minimum_order_quantity: '',
    thumbnail: '',
    images: {},
    reviews: [],
    dimensions: {
      width: '',
      height: '',
      depth: ''
    }
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [productNotFound, setProductNotFound] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setNewProduct({
        title: '',
        description: '',
        category: '',
        price: '',
        discount_percentage: '',
        rating: '',
        stock: '',
        brand: '',
        sku: '',
        weight: '',
        warranty_information: '',
        shipping_information: '',
        availability_status: '',
        return_policy: '',
        minimum_order_quantity: '',
        thumbnail: '',
        images: {},
      });
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
      setProductNotFound(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setEditingProduct(null);
      setProductNotFound(true);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { reviews, ...updatedProduct } = editingProduct;
      await updateProduct(updatedProduct.id, updatedProduct);
      setEditingProduct(null);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(deleteId);
      setDeleteId('');
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      dimensions: {
        ...editingProduct.dimensions,
        [name]: value
      }
    });
  };

  const handleReviewChange = (e, index) => {
    const { name, value } = e.target;
    setEditingProduct(prevState => {
      const updatedReviews = [...prevState.reviews]; // Clone the reviews array
      updatedReviews[index] = {
        ...updatedReviews[index], // Clone the specific review object
        [name]: value  // Update the specific property (name) of the review object
      };
      return {
        ...prevState,
        reviews: updatedReviews  // Update the reviews array in editingProduct state
      };
    });
  };

  const handleRemoveReview = async (index) => {
    const reviewId = editingProduct.reviews[index].id; // Assuming each review has a unique id
    const productId = editingProduct.id;

    try {
      await removeReview(productId, reviewId);
      setEditingProduct(prevState => {
        const updatedReviews = [...prevState.reviews];
        updatedReviews.splice(index, 1);
        return {
          ...prevState,
          reviews: updatedReviews
        };
      });
      alert('Review removed successfully');
    } catch (error) {
      console.error('Error removing review:', error);
    }
  };
  return (
    <>
    <Navbar />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6"> Product Control</h1>

      {/* Add Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow-md">
          {/* Add form fields for all product properties */}
          {Object.keys(newProduct).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</label>
              <input
                type="text"
                name={key}
                value={newProduct[key]}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
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
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Search Product
          </button>
        </form>

        {productNotFound && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Product not found!</strong>
              <span className="block sm:inline"> Please search for a valid product ID.</span>
            </div>
          )}

        {editingProduct && !productNotFound && (
            <form onSubmit={handleUpdateProduct} className="bg-white p-4 rounded shadow-md mb-4">
              {Object.keys(editingProduct).map((key) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</label>
                  <input
                    type="text"
                    name={key}
                    value={editingProduct[key]}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              {/* review fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Reviews</label>
                {editingProduct.reviews.map((review, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      name="comment"
                      value={review.comment}
                      onChange={(e) => handleReviewChange(e, index)}
                      placeholder="Comment"
                      className="mr-2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="rating"
                      value={review.rating}
                      onChange={(e) => handleReviewChange(e, index)}
                      placeholder="Rating"
                      className="mr-2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="reviewer_name"
                      value={review.reviewer_name}
                      onChange={(e) => handleReviewChange(e, index)}
                      placeholder="Reviewer Name"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveReview(index)}
                      className="ml-2 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
          
              {/* Dimensions fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                <input
                  type="text"
                  name="width"
                  value={editingProduct.dimensions.width}
                  onChange={handleDimensionChange}
                  placeholder="Width"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  name="height"
                  value={editingProduct.dimensions.height}
                  onChange={handleDimensionChange}
                  placeholder="Height"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  name="depth"
                  value={editingProduct.dimensions.depth}
                  onChange={handleDimensionChange}
                  placeholder="Depth"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                Update Product
              </button>
            </form>
          )}
        </div>

      {/* Delete Product Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        <form onSubmit={handleDeleteProduct} className="bg-white p-4 rounded shadow-md mb-4">
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

export default ProductCRUD;

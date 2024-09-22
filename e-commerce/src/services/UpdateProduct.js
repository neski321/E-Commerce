import React, { useState } from 'react';
import axios from 'axios';
import { updateProduct, removeReview } from '../services/productService';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL;

const UpdateProduct = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [productNotFound, setProductNotFound] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({ ...prevState, [name]: value }));
    setChangedFields((prevState) => ({ ...prevState, [name]: value }));
  };

  // function to handle
  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      let response;
  
      if (searchType === 'id') {
        // Search by Product ID 
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

        setEditingProduct(searchType === 'id' ? response.data : response.data[0]);
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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...changedFields,
        // reviews: editingProduct.reviews || [],  // Include reviews
        // dimensions: editingProduct.dimensions || {},  // Include dimensions
      };
  
      // Debugging: 
      console.log('Sending PATCH request with:', updatedProduct);
  
      await updateProduct(editingProduct.id, updatedProduct);  // Call the PATCH method
      setEditingProduct(null);
      setChangedFields({});  // Reset the changed fields
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product with PATCH:', error);
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
  
    setEditingProduct((prevState) => ({
      ...prevState,
      dimensions: {
        ...prevState.dimensions,
        [name]: value,
      },
    }));
  
    // Track changed dimensions
    setChangedFields((prevState) => ({
      ...prevState,
      dimensions: {
        ...prevState.dimensions,
        [name]: value,
      },
    }));
  };

  const handleReviewChange = (e, index) => {
    const { name, value } = e.target;
    setEditingProduct(prevState => {
      const updatedReviews = [...prevState.reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        [name]: value
      };
      return {
        ...prevState,
        reviews: updatedReviews
      };
    });
  };

  const handleRemoveReview = async (index) => {
    const reviewId = editingProduct.reviews[index].id;
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

  const handleAddReview = () => {
    setEditingProduct((prevState) => ({
      ...prevState,
      reviews: [
        ...prevState.reviews,
        { rating: '', comment: '', reviewer_name: '', reviewer_email: '' },
      ],
    }));
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

        <h2 className="text-2xl font-bold mb-4">Update Product</h2>

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

        {productNotFound && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Product not found!</strong>
            <span className="block sm:inline"> Please search for a valid product ID or title.</span>
          </div>
        )}

        {editingProduct && !productNotFound && (
          <form onSubmit={handleUpdateProduct} className="bg-white p-4 rounded shadow-md mb-4">
            {Object.keys(editingProduct).map((key) => (
              key !== 'reviews' && key !== 'dimensions' && (
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
              )
            ))}
            <h3 className="text-xl font-bold mb-2">Dimensions</h3>
            {editingProduct.dimensions && Object.keys(editingProduct.dimensions).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</label>
                <input
                  type="text"
                  name={key}
                  value={editingProduct.dimensions[key]}
                  onChange={handleDimensionChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            ))}

            <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              Update Product
            </button>
          </form>
        )}

        {editingProduct && editingProduct.reviews && (
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            {editingProduct.reviews.map((review, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                <h4 className="text-lg font-semibold mb-2">Review {index + 1}</h4>
                {Object.keys(review).map((key) => (
                  <div className="mb-2" key={key}>
                    <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</label>
                    <input
                      type="text"
                      name={key}
                      value={review[key]}
                      onChange={(e) => handleReviewChange(e, index)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button onClick={() => handleRemoveReview(index)} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2">
                  Remove Review
                </button>
              </div>
            ))}
            <button onClick={handleAddReview} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2">
              Add Review
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;
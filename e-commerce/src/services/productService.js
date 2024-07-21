// src/services/productService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategoriesFromProducts = (products) => {
  const categories = [...new Set(products.map(product => product.category))];
  return categories;
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products/`, product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}/`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

export const removeReview = (productId, reviewId) => axios.delete(`${API_URL}/products/${productId}/reviews/${reviewId}`);
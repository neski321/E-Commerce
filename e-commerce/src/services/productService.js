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

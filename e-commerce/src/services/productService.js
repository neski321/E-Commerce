// src/services/productService.js
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products/');
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

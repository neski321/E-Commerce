// src/components/Product.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showFeaturedProducts, setShowFeaturedProducts] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    if (!loaded) {
      loadProducts();
      setLoaded(true);
    }
    loadProducts();
  }, [loaded]);

  const toggleFeaturedProducts = () => setShowFeaturedProducts(!showFeaturedProducts);


  return (
    <div className="px-6 py-8">
      <button onClick={toggleFeaturedProducts} className="bg-gray-200 text-2xl font-bold px-4 py-2 rounded hover:bg-gray-500">
        Featured Products
        </button>
      {showFeaturedProducts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 15).map(product => (
            <div key={product.id} className="border rounded p-4">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-700">{product.category}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mt-2"/>
              <br />
              <button className="bg-gray-200 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"><Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;

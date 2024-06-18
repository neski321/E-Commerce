import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700">Description: {product.description}</p>
        <p className="text-gray-700">Category: {product.category}</p>
        <p className="text-gray-900 font-bold">${product.price}</p>
        <img src={product.images} alt={product.title} className="mt-4" />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;

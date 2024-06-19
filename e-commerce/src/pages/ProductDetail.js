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
        <img src={product.images} alt={product.title} className="mt-4" />
        <p></p>
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">{product.description}</p>
        <p></p>
        <h3 className="text-xl font-semibold mb-4">Category</h3>
        <p className="text-gray-700">{product.category}</p>
        <p></p>
        <h3 className="text-xl font-semibold mb-4">Price</h3>
        <p className="text-gray-900 font-bold">${product.price}</p>
        <p></p>
        <h3 className="text-xl font-semibold mb-4">Availability</h3>
        <p className="text-gray-700">{product.availabilityStatus}</p>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;

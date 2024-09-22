import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductCRUD = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Product Control</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/add-product" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
            Add Product
          </Link>
          <Link to="/update-product" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 text-center">
            Update Product
          </Link>
          <Link to="/delete-product" className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-center">
            Delete Product
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCRUD;

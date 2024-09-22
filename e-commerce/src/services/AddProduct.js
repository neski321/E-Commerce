import React, { useState } from 'react';
import { addProduct } from '../services/productService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddProduct = () => {
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
    dimensions: {
      width: '',
      height: '',
      depth: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
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
        dimensions: {
          width: '',
          height: '',
          depth: ''
        }
      });
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow-md">
          {Object.keys(newProduct).map((key) => (
            key !== 'reviews' && key !== 'dimensions' && (
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
            )
          ))}
          <h3 className="text-xl font-bold mb-2">Dimensions</h3>
          {Object.keys(newProduct.dimensions).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</label>
              <input
                type="text"
                name={key}
                value={newProduct.dimensions[key]}
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
      <Footer />
    </>
  );
};

export default AddProduct;

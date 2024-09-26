import React, { useState } from 'react';
import { addProduct } from '../services/productService';
import { Link } from 'react-router-dom';
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

    // Debug: 
    console.log('Request Payload (New Product):', newProduct);

    const preparedProduct = {
      ...newProduct,
      title: newProduct.title || 'N/A',
      description: newProduct.description || 'N/A',
      category: newProduct.category || 'N/A',
      price: newProduct.price || 0,
      discount_percentage: newProduct.discount_percentage || 0,
      rating: newProduct.rating || 0,
      stock: newProduct.stock || 0,
      brand: newProduct.brand || 'N/A',
      sku: newProduct.sku || 'N/A',
      weight: newProduct.weight || 0,
      warranty_information: newProduct.warranty_information || 'N/A',
      shipping_information: newProduct.shipping_information || 'N/A',
      availability_status: newProduct.availability_status || 'N/A',
      return_policy: newProduct.return_policy || 'N/A',
      minimum_order_quantity: newProduct.minimum_order_quantity || 1,
      thumbnail: newProduct.thumbnail || 'https://via.placeholder.com/150',
      images: newProduct.images || {},
      dimensions: {
        width: newProduct.dimensions.width || 0.0,
        height: newProduct.dimensions.height || 0.0,
        depth: newProduct.dimensions.depth || 0.0,
      }
    };

    try {
      await addProduct(preparedProduct);
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
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto py-12 px-4 text-center">
          <Link to="/product-crud" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md transition duration-300 ease-in-out">
            Back to Product Control
          </Link>
          <br />
          <br />
          <h2 className="text-4xl font-bold mb-6">Add Product</h2>

          <form onSubmit={handleAddProduct} className="bg-white p-6 rounded shadow-md mx-auto w-full max-w-2xl text-left">
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
            <button type="submit" className="w-full bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
              Add Product
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;

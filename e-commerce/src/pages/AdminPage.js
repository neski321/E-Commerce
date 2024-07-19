import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPage = () => {
  const { currentUser, role } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', category: '', price: '', thumbnail: '' });
  const [updateProduct, setUpdateProduct] = useState({ id: '', title: '', category: '', price: '', thumbnail: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post('/api/products/', newProduct);
      setProducts([...products, newProduct]);
      setNewProduct({ title: '', category: '', price: '', thumbnail: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`/api/products/${updateProduct.id}/`, updateProduct);
      setProducts(products.map(product => (product.id === updateProduct.id ? updateProduct : product)));
      setUpdateProduct({ id: '', title: '', category: '', price: '', thumbnail: '' });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}/`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (role !== 'admin') {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <>
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Add New Product</h3>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={newProduct.thumbnail}
          onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button onClick={handleAddProduct} className="w-full py-2 px-4 bg-blue-500 text-white rounded">
          Add Product
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Update Product</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={updateProduct.id}
          onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={updateProduct.title}
          onChange={(e) => setUpdateProduct({ ...updateProduct, title: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={updateProduct.category}
          onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={updateProduct.price}
          onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={updateProduct.thumbnail}
          onChange={(e) => setUpdateProduct({ ...updateProduct, thumbnail: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button onClick={handleUpdateProduct} className="w-full py-2 px-4 bg-green-500 text-white rounded">
          Update Product
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded p-4">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-700">{product.category}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mt-2" />
              <button onClick={() => handleDeleteProduct(product.id)} className="w-full py-2 px-4 bg-red-500 text-white rounded mt-2">
                Remove Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminPage;

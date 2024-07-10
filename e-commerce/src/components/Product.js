// src/components/Product.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import { auth , db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showFeaturedProducts, setShowFeaturedProducts] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    const loadFavorites = async () => {
      const user = user.currentUser;
      if (user) {
        const favoritesRef = collection(db, 'favorites', user.uid, 'products');
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteProducts = querySnapshot.docs.map(doc => doc.data().productId);
        setFavorites(favoriteProducts);
      }
    }

    if (!loaded) {
      loadProducts();
      loadFavorites();
      setLoaded(true);
    }
    loadProducts();
  }, [loaded]);

  const toggleFeaturedProducts = () => setShowFeaturedProducts(!showFeaturedProducts);

  const addToFavorites = async (product) => {
    const user = user.currentUser;
    if (user) {
      try {
        const favoritesRef = collection(db, 'favorites', user.uid, 'products');
        await addDoc(favoritesRef, {
          productId: product.id,
          name: product.title,
          description: product.description,
          price: product.price,
          image: [product.thumbnail]
        });
        setFavorites([...favorites, product.id]);
        alert('Added to favorites');
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    }else {
      alert('You need to be logged in');
    }   
  };

  const isFavorite = (productId) => favorites.includes(productId);


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
              <br />
              <button
                onClick={() => addToFavorites(product)}
                className={`mt-2 text-white px-4 py-2 rounded ${isFavorite(product.id) ? 'bg-gray-500' : 'bg-red-500'}`}
                disabled={isFavorite(product.id)}
                >
                  {isFavorite(product.id) ? 'In favorites' : 'Add to favorites'}
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;

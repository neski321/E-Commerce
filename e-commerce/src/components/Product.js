import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import AlertModal from '../components/AlertModal';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showFeaturedProducts, setShowFeaturedProducts] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [checkoutList, setCheckoutList] = useState([]);
  const [alertMessage, setAlertMessage] = useState(''); // Alert message for modal

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
      const user = auth.currentUser;
      if (user) {
        const favoritesRef = collection(db, 'favorites', user.uid, 'products');
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteProducts = querySnapshot.docs.map(doc => doc.data().productId);
        setFavorites(favoriteProducts);
      }
    };

    const loadCheckoutList = async () => {
      const user = auth.currentUser;
      if (user) {
        const checkoutRef = collection(db, 'checkout', user.uid, 'items');
        const querySnapshot = await getDocs(checkoutRef);
        const checkoutProducts = querySnapshot.docs.map(doc => doc.data().productId);
        setCheckoutList(checkoutProducts);
      }
    };

    if (!loaded) {
      loadProducts();
      loadFavorites();
      loadCheckoutList();
      setLoaded(true);
    }
  }, [loaded]);

  const toggleFeaturedProducts = () => setShowFeaturedProducts(!showFeaturedProducts);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const addOrRemoveFromFavorites = async (product) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const favoritesRef = collection(db, 'favorites', user.uid, 'products');
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteItem = querySnapshot.docs.find(doc => doc.data().productId === product.id);

        if (favoriteItem) {
          await deleteDoc(doc(db, 'favorites', user.uid, 'products', favoriteItem.id));
          setFavorites(favorites.filter(id => id !== product.id));
          showAlert('Removed from favorites');
        } else {
          await addDoc(favoritesRef, {
            productId: product.id,
            name: product.title,
            price: product.price,
            images: [product.thumbnail]
          });
          setFavorites([...favorites, product.id]);
          showAlert('Added to favorites');
        }
      } catch (error) {
        console.error('Error updating favorites:', error);
        showAlert('Failed to update favorites');
      }
    } else {
      showAlert('You need to be logged in to manage favorites');
    }
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const addToCheckout = async (product) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const checkoutRef = collection(db, 'checkout', user.uid, 'items');
        await addDoc(checkoutRef, {
          productId: product.id,
          name: product.title,
          price: product.price,
          images: [product.thumbnail]
        });
        setCheckoutList([...checkoutList, product.id]);
        showAlert('Added to checkout list');
      } catch (error) {
        console.error('Error adding to checkout list:', error);
        showAlert('Failed to add to checkout list');
      }
    } else {
      showAlert('You need to be logged in to add items to checkout');
    }
  };

  const removeFromCheckout = async (product) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const checkoutRef = collection(db, 'checkout', user.uid, 'items');
        const querySnapshot = await getDocs(checkoutRef);
        const checkoutItem = querySnapshot.docs.find(doc => doc.data().productId === product.id);

        if (checkoutItem) {
          await deleteDoc(doc(db, 'checkout', user.uid, 'items', checkoutItem.id));
          setCheckoutList(checkoutList.filter(id => id !== product.id));
          showAlert('Removed from checkout list');
        }
      } catch (error) {
        console.error('Error removing from checkout list:', error);
        showAlert('Failed to remove from checkout list');
      }
    } else {
      showAlert('You need to be logged in to manage checkout list');
    }
  };

  const isInCheckout = (productId) => checkoutList.includes(productId);

  return (
    <div className="px-6 py-8">
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      <button onClick={toggleFeaturedProducts} className="bg-gray-200 text-2xl font-bold px-4 py-2 rounded hover:bg-gray-500">
        Featured Products
      </button>
      {showFeaturedProducts && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 15).map((product) => (
            <div key={product.id} className="border rounded p-4">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-700">{product.category}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mt-2" />
              <br />
              <button className="bg-gray-200 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </button>
              <br />
              <button 
                onClick={() => addOrRemoveFromFavorites(product)} 
                className={`mt-2 text-white px-4 py-2 rounded ${isFavorite(product.id) ? 'bg-gray-500' : 'bg-red-500'}`}
              >
                {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <br />
              <button 
                onClick={() => isInCheckout(product.id) ? removeFromCheckout(product) : addToCheckout(product)} 
                className={`mt-2 text-white px-4 py-2 rounded ${isInCheckout(product.id) ? 'bg-green-500' : 'bg-blue-500'}`} 
              >
                {isInCheckout(product.id) ? 'Remove from Checkout' : 'Add to Checkout'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;

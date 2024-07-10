import React, {useEffect, useState} from 'react';
import {auth, db} from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const user = auth.currentUser;
            if(user) {
                const favoritesRef = collection(db, 'favorites', user.uid, 'products');
                const favoritesSnapshot = await getDocs(favoritesRef);
                const favoritesList = favoritesSnapshot.docs.map(doc => doc.data());
                setFavorites(favoritesList);
            }
        };

        fetchFavorites();
    }, []);

    return(
        <>
        <Navbar />
        <div classname="container mx-auto p-4">
            <h1 classname="text-3xl font-bold mb-6 text-center">Your Favorites</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favorites.length > 0 ? (
                    favorites.map((product, index) => (
                        <div key={product.productId} className='border rounded p-4'>
                            <h3 className='text-xl font-semibold'>{product.title}</h3>
                            <p className='text-gray-700'>${product.price}</p>
                            <img src={product.images[0]} alt={product.title} className='w-full h-48 object-cover mt-2' />
                            <br />
                            <button className="bg-gray-200 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </button>
              </div>
                    ))
                ) : (
                    <p className='text-center text-gray-700'>No favorites yet</p>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default FavoritesPage;
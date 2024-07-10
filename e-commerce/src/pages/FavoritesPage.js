import React, {useEffect, useState} from 'react';
import {auth, db} from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Product from '../components/Product';

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
        <div classname="container mx-auto p-4">
            <h1 classname="text-3xl font-bold mb-6 text-center">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.length > 0 ? (
                    favorites.map((product, index) => (
                        <Product key={index} products={product}/>
                    ))
                ) : (
                    <p className='text-center text-gray-700'>No favorites yet</p>
                )}
            </div>
        </div>
        </>
    );
};

export default FavoritesPage;
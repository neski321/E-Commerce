import React, {useState} from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results , setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_URL}/products/?search=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('error fetching search results:',error);
        }
    };

    return(
        <>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Products</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded w-full p-2"
                placeholder="Search for products..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Search</button>
            </form>
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((product) => (
                            <div key={product.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
                            <h2 className="font-bold text-lg mb-2">{product.name}</h2>
                            <p className="text-gray-900 font-semibold mb-4">${product.price}</p>
                            <Link to={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View Details</Link>
                          </div>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-700">No product matching that search term was found</p>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default SearchPage;
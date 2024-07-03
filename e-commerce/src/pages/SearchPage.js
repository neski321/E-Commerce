import React, {useState} from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

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
        <div className="container mx-auto p-4">
            <Navbar />
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
                            <li key={product.id} className="border-b p-2">
                                <h2 className="font-bold">{product.title}</h2>
                                <p>{product.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
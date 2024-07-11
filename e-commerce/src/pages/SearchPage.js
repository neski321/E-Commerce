import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = async (e, searchType) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/products/`, {
      params: {
        search: query,
        type: searchType
      }
    });
    setResults(response.data);
    setCurrentPage(1); // Reset to first page on new search
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Products</h1>
      <form className="mb-6 flex flex-col items-center">
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-l p-2 w-full"
            placeholder="Search for products..."
          /> &nbsp;
          <button
            type="button"
            onClick={(e) => handleSearch(e, 'regular')}
            className="bg-blue-500 text-white py-2 px-6 rounded"
          >
            Search
          </button>&nbsp;&nbsp;
          
          <button
            type="button"
            onClick={(e) => handleSearch(e, 'advanced')}
            className="bg-green-500 text-white py-2 px-6 rounded"
          >
            Advanced Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
              <img src={product.images[0]} alt={product.title} className="w-32 h-32 object-cover mb-4 rounded" />
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-900 font-semibold mb-4">${product.price}</p>
              <button className="bg-gray-200 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"><Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link></button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No products matching your search were found</p>
        )}
      </div>
      {results.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="pagination flex">
              {[...Array(Math.ceil(results.length / itemsPerPage)).keys()].map(number => (
                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(number + 1)} className="page-link p-2 mx-1 border rounded">
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default SearchPage;

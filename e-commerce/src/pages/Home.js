import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts products={products} />
      <Footer />
    </div>
  );
}

export default Home;

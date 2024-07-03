// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-12">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 E-commerce Store by Neski. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/about" className="text-yellow-400 hover:underline mx-2">About</Link>
          <Link to="/contact" className="text-yellow-400 hover:underline mx-2">Contact</Link>
          <Link to="/privacy" className="text-yellow-400 hover:underline mx-2">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

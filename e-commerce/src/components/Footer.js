// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-12">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 E-commerce Store. All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="text-yellow-400 hover:underline mx-2">About</a>
          <a href="/contact" className="text-yellow-400 hover:underline mx-2">Contact</a>
          <a href="/privacy" className="text-yellow-400 hover:underline mx-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

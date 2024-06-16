import React from 'react';

function Hero() {
  return (
    <div className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://example.com/hero-image.jpg)' }}>
      <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-50">
        <h1 className="text-white text-4xl font-bold">Welcome to E-commerce Store</h1>
      </div>
    </div>
  );
}

export default Hero;

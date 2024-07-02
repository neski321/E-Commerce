import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
  try{
    await logout();
    navigate('/login');
    } catch {
      console.error("Failed to Logout");
    }
  }


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">E-commerce Store</Link>
        <div>
          <Link to="/server-status" className="text-gray-300 hover:text-white px-3 py-2">Server Status</Link>
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2">Contact</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">LogOut</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

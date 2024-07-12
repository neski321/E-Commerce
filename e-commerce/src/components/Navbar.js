import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';

function Navbar() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("Current User Object:", user); // Log the user object for debugging
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to Logout");
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getUserInitial = () => {
    if (currentUser && currentUser.email) {
      return currentUser.email.charAt(0).toUpperCase();
    } else {
      return 'U';
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">E-commerce Store</div>
        <div>
          <Link to="/server-status" className="text-gray-300 hover:text-white px-3 py-2">Server Status</Link>
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
          <Link to="/search" className="text-gray-300 hover:text-white px-3 py-2">Search</Link>
          
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="bg-gray-700 text-white text-xl font-bold py-2 px-4 rounded-full">
              {getUserInitial()}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <Link to="/favorites" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  My Favorites
                </Link>
                {role === 'admin' && (
                  <Link to="/admin" className="text-gray-800 hover:bg-gray-200 px-3 py-2">Admin Access</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {currentUser && (
            <div className="text-white ml-4">
              Hello, {currentUser.email.split('@')[0] || 'User'} you are logged in as ({role})!
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

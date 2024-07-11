import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryList from './pages/CategoryList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Contact from './pages/Contact';
import About from './pages/About';
import ServerStatus from './components/ServerStatus';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/server-status" element={<ServerStatus />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

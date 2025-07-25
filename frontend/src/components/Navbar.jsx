import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">ContestNotify</Link>
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center text-lg">
          <Link to="/preferences" className="hover:underline">Preferences</Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 flex flex-col items-start">
          <Link
            to="/preferences"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:underline"
          >
            Preferences
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 w-full text-left"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                setMenuOpen(false);
              }}
              className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 w-full text-left"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Search, User, LogOut, Menu, X, Heart, Crown, Home, Play, DollarSign } from 'lucide-react';
import Logo from './Logo.tsx';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="group">
            <Logo size="medium" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar animes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                />
              </div>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <Home size={20} />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/favorites"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <Heart size={20} />
              <span>Favoritos</span>
            </Link>
            
            <Link
              to="/free-content"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <Play size={20} />
              <span>Gratis</span>
            </Link>
            
            <Link
              to="/monetization"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 hover:scale-105"
            >
              <DollarSign size={20} />
              <span>Ingresos</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.premium_access_status === 'premium' && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Crown size={16} />
                    <span className="text-sm font-medium">Premium</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-200 hover:scale-105"
                >
                  <LogOut size={20} />
                  <span>Cerrar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn-outline"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/50 backdrop-blur-md rounded-xl mt-4 border border-gray-700/50">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar animes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Inicio</span>
              </Link>
              
              <Link
                to="/favorites"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Favoritos</span>
              </Link>
              
              <Link
                to="/free-content"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Play size={20} />
                <span>Contenido Gratis</span>
              </Link>
              
              <Link
                to="/monetization"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <DollarSign size={20} />
                <span>Dashboard de Ingresos</span>
              </Link>

              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{user.username}</span>
                      {user.premium_access_status === 'premium' && (
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Crown size={12} />
                          <span className="text-xs">Premium</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 w-full"
                  >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-3 py-2">
                  <Link
                    to="/login"
                    className="btn-outline w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
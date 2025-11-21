import React from 'react';
import { ShoppingCartIcon, UserIcon, CpuIcon } from './Icons';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur border-b border-red-900/30 shadow-lg shadow-red-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg">
              <CpuIcon className="text-white h-6 w-6" />
            </div>
            <span className="brand-font text-2xl font-bold text-white tracking-wider">
              CYBER<span className="text-red-600">TECH</span>
            </span>
          </div>

          {/* Search Bar (Hidden on mobile for simplicity of this demo) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <button className="text-neutral-400 hover:text-white transition">
              <UserIcon className="h-6 w-6" />
            </button>
            
            <button 
              onClick={toggleCart} 
              className="relative group text-neutral-400 hover:text-white transition"
            >
              <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md shadow-red-900/50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
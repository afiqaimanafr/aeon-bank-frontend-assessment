'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX, HiSearch } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const AEON_PINK = 'bg-pink-500'; 
const AEON_LIGHT_PINK = 'bg-pink-100';
const AEON_DARK_ACCENT = 'text-gray-900'; 
const TEXT_WHITE = 'text-white'; 

const navItems = [
  { name: 'Showcase', href: '/showcase' },
  { name: 'Docs', href: '/docs' },
  { name: 'Blog', href: '/blog' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Commerce', href: '/commerce' },
  { name: 'Templates', href: '/templates' },
  { name: 'Enterprise', href: '/enterprise' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const renderActionButton = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={() => {
            logout(); 
            if (window.location.pathname !== '/') {
              window.location.href = '/';
            }
          }}
          className={`px-4 py-2 text-sm font-medium rounded-full bg-white ${AEON_DARK_ACCENT} hover:bg-pink-100 transition-colors shadow-lg`}
        >
          Logout
        </button>
      );
    }

    return (
      <Link href="/login" passHref>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-full bg-white ${AEON_DARK_ACCENT} hover:bg-pink-100 transition-colors shadow-lg`}
        >
          Login
        </button>
      </Link>
    );
  };


  return (
    <nav className={`fixed top-0 left-0 w-full z-20 shadow-xl ${AEON_PINK}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${TEXT_WHITE} hidden md:flex h-16 items-center justify-between`}>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold tracking-wider hover:text-pink-100 transition-colors">
            AEON BANK
          </Link>
          <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-pink-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="py-1.5 pl-3 pr-10 text-sm rounded-full bg-pink-400 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-pink-200 transition-all w-48"
            />
            <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-100 pointer-events-none" />
          </div>

          {renderActionButton()}
        </div>
      </div>

      <div className={`mx-auto px-4 sm:px-6 h-16 flex items-center justify-between ${TEXT_WHITE} md:hidden`}>
        <Link href="/" className="text-xl font-bold tracking-wider">
          AEON BANK
        </Link>

        <div className="flex items-center space-x-4">
          <HiSearch className="h-6 w-6 cursor-pointer hover:text-pink-100" />

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <HiX className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <HiMenu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden ${AEON_LIGHT_PINK} pb-3`} id="mobile-menu">
          <div className="px-2 pt-2 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md ${AEON_DARK_ACCENT} hover:bg-pink-200 transition-colors`}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 px-3">
              <button
                onClick={isLoggedIn ? logout : () => window.location.href = '/login'}
                className={`w-full px-3 py-2 text-base font-medium rounded-full ${AEON_PINK} ${TEXT_WHITE} hover:bg-pink-600 transition-colors shadow-md`}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
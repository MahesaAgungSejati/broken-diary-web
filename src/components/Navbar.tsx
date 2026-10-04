import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Place', path: '/place' },
  { label: 'Food', path: '/food' },
  { label: 'People', path: '/people' },
  { label: 'Random', path: '/random' },
];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-extrabold tracking-tighter text-neutral-900 uppercase"
        >
          Broken Diary<span className="text-neutral-400">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-600">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className="hover:text-black transition-colors flex items-center gap-1"
            >
              <span className="text-neutral-300">0{index + 1}.</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden font-mono text-xs uppercase tracking-widest text-neutral-900 focus:outline-none"
        >
          {mobileMenuOpen ? '[ Close ]' : '[ Menu ]'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest text-neutral-800">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-black transition-colors"
            >
              <span className="text-neutral-400 mr-2">0{index + 1}.</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
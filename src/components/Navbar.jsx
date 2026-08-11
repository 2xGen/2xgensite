'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/wat-we-bouwen', label: 'Wat we bouwen' },
    { href: '/sectoren', label: 'Sectoren' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/prijzen', label: 'Prijzen' },
    { href: '/over-ons', label: 'Over ons' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${isScrolled || pathname !== '/' ? 'bg-white/95 backdrop-blur border-b border-[#09294c]/10 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-xl font-semibold text-[#09294c] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            2xGen
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? 'text-[#09294c]'
                    : 'text-[#09294c]/70 hover:text-[#09294c]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="/acquisitiecheck" className="xgen-btn xgen-btn-primary !py-2 !px-4 text-sm">
              Acquisitiecheck
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#09294c] p-1" aria-label="Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-white border-b border-[#09294c]/10"
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[#09294c] hover:bg-[#e8f1f8]"
            >
              {link.label}
            </a>
          ))}
          <a href="/acquisitiecheck" className="block px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#09294c] text-white mt-2">
            Acquisitiecheck
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

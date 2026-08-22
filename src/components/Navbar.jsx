'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || '/';
  const isHome = pathname === '/';

  const navLinks = [
    { href: isHome ? '#problem' : '/#problem', label: 'Problem' },
    { href: isHome ? '#who' : '/#who', label: 'Who it’s for' },
    { href: isHome ? '#solution' : '/#solution', label: 'Solution' },
    { href: isHome ? '#proof' : '/#proof', label: 'Live examples' },
    { href: isHome ? '#pricing' : '/#pricing', label: 'Pricing' },
    { href: isHome ? '#faq' : '/#faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled || !isHome
          ? 'bg-white/95 backdrop-blur border-b border-[#09294c]/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="/"
            className="text-xl font-semibold text-[#09294c] tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            2xGen
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === '/about' && link.href === '/about'
                    ? 'text-[#09294c]'
                    : 'text-[#09294c]/70 hover:text-[#09294c]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href={isHome ? '#contact' : '/#contact'} className="xgen-btn xgen-btn-primary !py-2 !px-4 text-sm">
              Get a Site for Your Tours
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-[#09294c]"
            aria-label="Menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-[#09294c]/10 bg-white px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[#09294c] hover:bg-[#f3f7fb]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={isHome ? '#contact' : '/#contact'}
            onClick={() => setIsOpen(false)}
            className="xgen-btn xgen-btn-primary w-full mt-2"
          >
            Get a Site for Your Tours
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

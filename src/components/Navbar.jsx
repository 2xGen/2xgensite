import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isNonHomePage = !isHomePage;

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'What We Build' },
    { href: '/#ventures', label: 'Our Ventures' },
    { href: '/#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="/"
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-[#09294c]' : 'text-[#09294c]'}`}>2xGen</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {isNonHomePage ? (
              /* Non-homepage navigation - simple back to home */
              <motion.a
                href="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#09294c] to-[#1a4b7a] text-white hover:from-[#1a4b7a] hover:to-[#2d6ba8] shadow-lg hover:shadow-xl transform hover:scale-105 font-medium transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </motion.a>
            ) : (
              /* Regular home page navigation */
              <>
                <div className="flex space-x-8">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="font-medium text-gray-700 hover:text-[#09294c] transition-colors duration-300"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + navLinks.indexOf(link) * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                
                {/* Special Insights button */}
                <motion.a
                  href="/insights"
                  className="px-4 py-2 rounded-full font-medium bg-gradient-to-r from-[#09294c] to-[#1a4b7a] text-white hover:from-[#1a4b7a] hover:to-[#2d6ba8] shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + navLinks.length * 0.1 }}
                >
                  Insights
                </motion.a>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-[#09294c]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`md:hidden overflow-hidden ${isScrolled || isOpen ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isNonHomePage ? (
            /* Non-homepage mobile navigation - simple back to home */
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-[#09294c] to-[#1a4b7a] text-white hover:from-[#1a4b7a] hover:to-[#2d6ba8] shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </a>
          ) : (
            /* Regular home page mobile navigation */
            <>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#09294c] hover:bg-gray-100 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Special Insights button at the bottom */}
              <a
                href="/insights"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-[#09294c] to-[#1a4b7a] text-white hover:from-[#1a4b7a] hover:to-[#2d6ba8] shadow-lg transform hover:scale-105 transition-all duration-300 mt-4"
              >
                Insights
              </a>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

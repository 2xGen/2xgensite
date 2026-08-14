'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, t, href, switchTo } = useLocale();

  const navLinks = [
    { href: href('/what-we-build'), label: t.nav.whatWeBuild },
    { href: href('/sectors'), label: t.nav.sectors },
    { href: href('/platforms'), label: t.nav.platforms },
    { href: href('/pricing'), label: t.nav.pricing },
    { href: href('/about'), label: t.nav.about },
    { href: href('/contact'), label: t.nav.contact },
  ];

  const homeHref = locale === 'nl' ? '/nl' : '/';
  const otherLocale = locale === 'nl' ? 'en' : 'nl';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === '/' || pathname === '/nl';

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
            href={homeHref}
            className="text-xl font-semibold text-[#09294c] tracking-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            2xGen
          </a>

          <div className="hidden lg:flex items-center gap-5">
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
            <a
              href={switchTo(otherLocale)}
              className="text-xs font-bold tracking-wide px-2.5 py-1 rounded-lg border border-[#09294c]/15 text-[#09294c]/70 hover:text-[#09294c] hover:border-[#09294c]/30"
              aria-label={t.lang.switchTo}
            >
              {otherLocale === 'nl' ? 'NL' : 'EN'}
            </a>
            <a href={href('/acquisition-check')} className="xgen-btn xgen-btn-primary !py-2 !px-4 text-sm">
              {t.nav.check}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <a
              href={switchTo(otherLocale)}
              className="text-xs font-bold tracking-wide px-2 py-1 rounded-lg border border-[#09294c]/15 text-[#09294c]"
            >
              {otherLocale === 'nl' ? 'NL' : 'EN'}
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#09294c] p-1" aria-label="Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
          <a
            href={href('/acquisition-check')}
            className="block px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#09294c] text-white mt-2"
          >
            {t.nav.check}
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

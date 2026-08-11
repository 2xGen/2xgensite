'use client';

import Link from 'next/link';

const Footer = () => {
  const links = [
    { href: '/wat-we-bouwen', label: 'Wat we bouwen' },
    { href: '/sectoren', label: 'Sectoren' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/prijzen', label: 'Prijzen' },
    { href: '/acquisitiecheck', label: 'Acquisitiecheck' },
    { href: '/over-ons', label: 'Over ons' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-[#0c1b2a] text-white py-14">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#3d8fd1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-3 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen
            </h3>
            <p className="text-[#3d8fd1] text-sm font-medium mb-3">
              Wij bouwen systemen die klanten vinden.
            </p>
            <p className="text-white/55 text-sm leading-relaxed max-w-md">
              Leadgeneratie · Data · Tools · Automatisering · AI
              <br />
              Digitale acquisitiesystemen — en eigen platforms als proeftuin.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end content-start">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} 2xGen LLC</span>
          <a href="mailto:matthijs@2xgen.com" className="hover:text-white/60 transition-colors">
            matthijs@2xgen.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

'use client';

import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const network = [
    { name: 'GozoQuadTours.fun', url: 'https://gozoquadtours.fun' },
    { name: 'TopTours.ai', url: 'https://toptours.ai' },
    { name: 'ArubaBuddies', url: 'https://arubabuddies.com' },
  ];

  return (
    <footer className="bg-[#0c1b2a] text-white">
      <div className="h-1 bg-[#3d8fd1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-3 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen
            </h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Managed Google acquisition for tour operators — Google Acquisition Sites that send
              bookings to your existing Viator or GetYourGuide listing.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">Our network</p>
            <ul className="space-y-2">
              {network.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">Company</p>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="mailto:matthijs@2xgen.com" className="text-sm text-white/70 hover:text-white transition-colors">
                  matthijs@2xgen.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/40">
          <p>© {year} 2xGen LLC. All rights reserved.</p>
          <p>Viator and GetYourGuide are trademarks of their respective owners. 2xGen is an independent site builder.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

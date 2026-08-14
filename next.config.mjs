import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // English-first: old /en/* → root English
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/what-we-build', destination: '/what-we-build', permanent: true },
      { source: '/en/sectors', destination: '/sectors', permanent: true },
      { source: '/en/sectors/:slug', destination: '/sectors/:slug', permanent: true },
      { source: '/en/platforms', destination: '/platforms', permanent: true },
      { source: '/en/pricing', destination: '/pricing', permanent: true },
      { source: '/en/about', destination: '/about', permanent: true },
      { source: '/en/contact', destination: '/contact', permanent: true },
      { source: '/en/acquisition-check', destination: '/acquisition-check', permanent: true },
      { source: '/en/privacy', destination: '/privacy', permanent: true },

      // Old Dutch roots → /nl/*
      { source: '/wat-we-bouwen', destination: '/nl/wat-we-bouwen', permanent: true },
      { source: '/sectoren', destination: '/nl/sectoren', permanent: true },
      { source: '/sectoren/:slug', destination: '/nl/sectoren/:slug', permanent: true },
      { source: '/prijzen', destination: '/nl/prijzen', permanent: true },
      { source: '/over-ons', destination: '/nl/over-ons', permanent: true },
      { source: '/acquisitiecheck', destination: '/nl/acquisitiecheck', permanent: true },
      { source: '/diensten', destination: '/nl/wat-we-bouwen', permanent: true },
      { source: '/diensten/:slug', destination: '/nl/wat-we-bouwen', permanent: true },
      { source: '/cases', destination: '/platforms', permanent: true },

      // Founder profile moved
      { source: '/about-matthijs', destination: '/founder', permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;

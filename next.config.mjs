import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // ── Keep product site: /, /about, /get-a-site, /privacy, /admin/* ──

      // Old English marketing pages → home
      { source: '/what-we-build', destination: '/', permanent: true },
      { source: '/sectors', destination: '/', permanent: true },
      { source: '/sectors/:path*', destination: '/', permanent: true },
      { source: '/platforms', destination: '/', permanent: true },
      { source: '/pricing', destination: '/', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
      { source: '/acquisition-check', destination: '/', permanent: true },
      { source: '/founder', destination: '/about', permanent: true },
      { source: '/about-matthijs', destination: '/about', permanent: true },
      { source: '/cases', destination: '/', permanent: true },

      // Insights / blog
      { source: '/insights', destination: '/', permanent: true },
      { source: '/insights/:path*', destination: '/', permanent: true },

      // Aruba microsite + survey + guides
      { source: '/aruba', destination: '/', permanent: true },
      { source: '/aruba/:path*', destination: '/', permanent: true },

      // Legacy /en/* (English-first era)
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/', permanent: true },

      // Dutch site + old Dutch roots
      { source: '/nl', destination: '/', permanent: true },
      { source: '/nl/:path*', destination: '/', permanent: true },
      { source: '/wat-we-bouwen', destination: '/', permanent: true },
      { source: '/sectoren', destination: '/', permanent: true },
      { source: '/sectoren/:path*', destination: '/', permanent: true },
      { source: '/prijzen', destination: '/', permanent: true },
      { source: '/over-ons', destination: '/about', permanent: true },
      { source: '/acquisitiecheck', destination: '/', permanent: true },
      { source: '/diensten', destination: '/', permanent: true },
      { source: '/diensten/:path*', destination: '/', permanent: true },

      // Static HTML leftovers
      { source: '/contact.html', destination: '/', permanent: true },
      { source: '/insights.html', destination: '/', permanent: true },

      // Admin convenience (keep admin; just shortcut paths)
      { source: '/admin', destination: '/admin/microsites', permanent: false },
      { source: '/admin/projects', destination: '/admin/microsites', permanent: false },
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

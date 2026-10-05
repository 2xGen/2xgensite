import {
  getTourOperatorGuideSlugs,
} from '@/data/tourOperatorGuides';

const BASE = 'https://2xgen.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    '',
    '/about',
    '/get-a-site',
    '/signup',
    '/login',
    '/privacy',
    '/terms',
    '/guides',
  ];

  const guideRoutes = getTourOperatorGuideSlugs().map((slug) => `/guides/${slug}`);

  return [...staticRoutes, ...guideRoutes].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/guides' ? 'weekly' : 'monthly',
    priority:
      path === ''
        ? 1
        : path === '/guides' || path === '/guides/seo-for-tour-operators'
          ? 0.8
          : path.startsWith('/guides/')
            ? 0.7
            : 0.5,
  }));
}

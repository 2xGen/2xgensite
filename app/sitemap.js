const BASE = 'https://2xgen.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    '',
    '/nl',
    '/what-we-build',
    '/nl/wat-we-bouwen',
    '/sectors',
    '/nl/sectoren',
    '/platforms',
    '/nl/platforms',
    '/pricing',
    '/nl/prijzen',
    '/acquisition-check',
    '/nl/acquisitiecheck',
    '/about',
    '/nl/over-ons',
    '/contact',
    '/nl/contact',
    '/founder',
    '/nl/about',
    '/privacy',
    '/nl/privacy',
    '/sectors/home-services',
    '/sectors/professional-services',
    '/sectors/financial-services',
    '/sectors/b2b',
    '/sectors/real-estate',
    '/sectors/recruitment',
    '/nl/sectoren/financiele-dienstverlening',
    '/nl/sectoren/recruitment',
    '/nl/sectoren/zakelijke-dienstverlening',
    '/nl/sectoren/industrie-techniek',
    '/nl/sectoren/vastgoed',
    '/nl/sectoren/energie',
  ];

  return staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/nl' ? 'weekly' : 'monthly',
    priority:
      path === '' || path === '/nl'
        ? 1
        : path.includes('/sectors/') || path.includes('/sectoren/')
          ? 0.8
          : 0.7,
  }));
}

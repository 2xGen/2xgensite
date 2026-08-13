const BASE = 'https://2xgen.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    '',
    '/en',
    '/wat-we-bouwen',
    '/en/what-we-build',
    '/sectoren',
    '/en/sectors',
    '/platforms',
    '/en/platforms',
    '/prijzen',
    '/en/pricing',
    '/acquisitiecheck',
    '/en/acquisition-check',
    '/over-ons',
    '/en/about',
    '/contact',
    '/en/contact',
    '/about',
    '/privacy',
    '/en/privacy',
    '/diensten/leadgeneratie',
    '/diensten/leadgeneratie-tools',
    '/diensten/data-prospecting',
    '/diensten/automatisering',
    '/diensten/leadgeneratie-websites',
    '/diensten/digitale-platforms',
    '/sectoren/financiele-dienstverlening',
    '/sectoren/recruitment',
    '/sectoren/zakelijke-dienstverlening',
    '/sectoren/industrie-techniek',
    '/sectoren/vastgoed',
    '/sectoren/energie',
    '/en/sectors/financiele-dienstverlening',
    '/en/sectors/recruitment',
    '/en/sectors/zakelijke-dienstverlening',
    '/en/sectors/industrie-techniek',
    '/en/sectors/vastgoed',
    '/en/sectors/energie',
  ];

  return staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/en' ? 'weekly' : 'monthly',
    priority:
      path === '' || path === '/en'
        ? 1
        : path.includes('/diensten') || path.includes('/sectors/') || path.includes('/sectoren/')
          ? 0.8
          : 0.7,
  }));
}

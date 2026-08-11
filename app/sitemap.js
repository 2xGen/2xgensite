const BASE = 'https://2xgen.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    '',
    '/wat-we-bouwen',
    '/sectoren',
    '/platforms',
    '/prijzen',
    '/acquisitiecheck',
    '/over-ons',
    '/contact',
    '/about',
    '/privacy',
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
  ];

  return staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/diensten') || path.startsWith('/sectoren/') ? 0.8 : 0.7,
  }));
}

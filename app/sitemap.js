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
    '/aruba',
    '/nl/aruba',
    '/aruba/guides',
    '/aruba/guides/how-to-get-more-customers-in-aruba',
    '/aruba/guides/local-seo-in-aruba',
    '/aruba/guides/seo-vs-google-ads-in-aruba',
    '/aruba/guides/getting-more-direct-bookings',
    '/aruba/guides/lead-generation-in-aruba',
    '/aruba/guides/website-costs-in-aruba',
    '/nl/aruba/guides',
    '/nl/aruba/guides/how-to-get-more-customers-in-aruba',
    '/nl/aruba/guides/local-seo-in-aruba',
    '/nl/aruba/guides/seo-vs-google-ads-in-aruba',
    '/nl/aruba/guides/getting-more-direct-bookings',
    '/nl/aruba/guides/lead-generation-in-aruba',
    '/nl/aruba/guides/website-costs-in-aruba',
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
    '/sectors/tourism-hospitality',
    '/sectors/car-rentals',
    '/sectors/retail',
    '/sectors/real-estate',
    '/sectors/professional-services',
    '/sectors/home-services',
    '/sectors/financial-services',
    '/sectors/b2b',
    '/sectors/recruitment',
    '/nl/sectoren/toerisme-horeca',
    '/nl/sectoren/autoverhuur',
    '/nl/sectoren/retail',
    '/nl/sectoren/vastgoed',
    '/nl/sectoren/zakelijke-dienstverlening',
    '/nl/sectoren/lokale-diensten',
    '/nl/sectoren/financiele-dienstverlening',
    '/nl/sectoren/industrie-techniek',
    '/nl/sectoren/recruitment',
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

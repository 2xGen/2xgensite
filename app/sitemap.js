import { INSIGHT_SLUGS } from '@/data/insightMeta';

const BASE_URL = 'https://2xgen.com';

export default function sitemap() {
  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  const insightRoutes = INSIGHT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...insightRoutes];
}

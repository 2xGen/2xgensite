const BASE = 'https://2xgen.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = ['', '/about', '/get-a-site', '/privacy'];

  return staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.5,
  }));
}

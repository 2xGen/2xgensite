export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: 'https://2xgen.com/sitemap.xml',
    host: 'https://2xgen.com',
  };
}

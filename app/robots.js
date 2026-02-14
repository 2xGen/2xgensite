const BASE_URL = 'https://2xgen.com';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/'] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

export const locales = ['nl', 'en'];

/** NL path → EN path */
export const pathMap = {
  '/': '/en',
  '/wat-we-bouwen': '/en/what-we-build',
  '/sectoren': '/en/sectors',
  '/platforms': '/en/platforms',
  '/prijzen': '/en/pricing',
  '/over-ons': '/en/about',
  '/contact': '/en/contact',
  '/acquisitiecheck': '/en/acquisition-check',
  '/privacy': '/en/privacy',
};

const enToNl = Object.fromEntries(
  Object.entries(pathMap).map(([nl, en]) => [en, nl])
);

export function getLocaleFromPath(pathname = '/') {
  if (!pathname) return 'nl';
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'nl';
}

export function stripLocale(pathname = '/') {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) {
    const rest = pathname.slice(3);
    return enToNl[`/en${rest}`] || rest;
  }
  return pathname;
}

/** Switch current path to the other locale */
export function switchLocalePath(pathname = '/', targetLocale) {
  const current = getLocaleFromPath(pathname);

  if (targetLocale === current) return pathname || '/';

  if (targetLocale === 'en') {
    // Exact match first
    if (pathMap[pathname]) return pathMap[pathname];
    // Sector detail: /sectoren/x → /en/sectors/x
    if (pathname.startsWith('/sectoren/')) {
      return `/en/sectors/${pathname.replace('/sectoren/', '')}`;
    }
    if (pathname.startsWith('/diensten/')) {
      return `/en/what-we-build`;
    }
    return '/en';
  }

  // to NL
  if (enToNl[pathname]) return enToNl[pathname];
  if (pathname.startsWith('/en/sectors/')) {
    return `/sectoren/${pathname.replace('/en/sectors/', '')}`;
  }
  if (pathname.startsWith('/en/')) {
    return '/';
  }
  return pathname || '/';
}

export function localizedHref(href, locale) {
  if (!href) return href;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return href;
  if (locale === 'en') {
    if (pathMap[href]) return pathMap[href];
    if (href.startsWith('/sectoren/')) return `/en/sectors/${href.replace('/sectoren/', '')}`;
    if (href.startsWith('/diensten/')) return '/en/what-we-build';
    if (href.startsWith('/#')) return `/en${href.slice(1)}`;
    return href.startsWith('/en') ? href : `/en${href === '/' ? '' : href}`;
  }
  return href;
}

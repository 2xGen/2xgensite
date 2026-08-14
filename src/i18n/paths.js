export const locales = ['en', 'nl'];

/** English (default) path → Dutch path */
export const pathMap = {
  '/': '/nl',
  '/what-we-build': '/nl/wat-we-bouwen',
  '/sectors': '/nl/sectoren',
  '/platforms': '/nl/platforms',
  '/pricing': '/nl/prijzen',
  '/about': '/nl/over-ons',
  '/contact': '/nl/contact',
  '/acquisition-check': '/nl/acquisitiecheck',
  '/privacy': '/nl/privacy',
  '/founder': '/nl/about',
};

const nlToEn = Object.fromEntries(
  Object.entries(pathMap).map(([en, nl]) => [nl, en])
);

export function getLocaleFromPath(pathname = '/') {
  if (!pathname) return 'en';
  return pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl' : 'en';
}

export function stripLocale(pathname = '/') {
  if (pathname === '/nl') return '/';
  if (pathname.startsWith('/nl/')) {
    const nlPath = pathname;
    if (nlToEn[nlPath]) return nlToEn[nlPath];
    if (pathname.startsWith('/nl/sectoren/')) {
      return `/sectors/${pathname.replace('/nl/sectoren/', '')}`;
    }
    if (pathname.startsWith('/nl/diensten/')) {
      return '/what-we-build';
    }
    return pathname.slice(3) || '/';
  }
  return pathname;
}

/** Switch current path to the other locale */
export function switchLocalePath(pathname = '/', targetLocale) {
  const current = getLocaleFromPath(pathname);
  if (targetLocale === current) return pathname || '/';

  if (targetLocale === 'nl') {
    if (pathMap[pathname]) return pathMap[pathname];
    if (pathname.startsWith('/sectors/')) {
      return '/nl/sectoren';
    }
    if (pathname.startsWith('/diensten/') || pathname.startsWith('/services/')) {
      return '/nl/wat-we-bouwen';
    }
    return '/nl';
  }

  // to EN
  if (nlToEn[pathname]) return nlToEn[pathname];
  if (pathname.startsWith('/nl/sectoren/')) {
    return '/sectors';
  }
  if (pathname.startsWith('/nl/')) {
    return '/';
  }
  return pathname || '/';
}

export function localizedHref(href, locale) {
  if (!href) return href;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return href;

  // Normalize legacy Dutch keys used in older calls
  const legacy = {
    '/wat-we-bouwen': '/what-we-build',
    '/sectoren': '/sectors',
    '/prijzen': '/pricing',
    '/over-ons': '/about',
    '/acquisitiecheck': '/acquisition-check',
  };
  const canonical = legacy[href] || href;

  if (locale === 'nl') {
    if (pathMap[canonical]) return pathMap[canonical];
    if (canonical.startsWith('/sectors/')) {
      return `/nl/sectoren/${canonical.replace('/sectors/', '')}`;
    }
    if (canonical.startsWith('/sectoren/')) {
      return `/nl/sectoren/${canonical.replace('/sectoren/', '')}`;
    }
    if (canonical.startsWith('/diensten/') || canonical.startsWith('/what-we-build')) {
      if (canonical.startsWith('/diensten/')) return '/nl/wat-we-bouwen';
    }
    if (canonical.startsWith('/#')) return `/nl${canonical.slice(1)}`;
    if (canonical === '/') return '/nl';
    return canonical.startsWith('/nl') ? canonical : `/nl${canonical}`;
  }

  // English default
  if (canonical.startsWith('/sectoren/')) {
    return `/sectors/${canonical.replace('/sectoren/', '')}`;
  }
  if (canonical.startsWith('/diensten/')) return '/what-we-build';
  return canonical;
}

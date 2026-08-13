'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizedHref, switchLocalePath } from '@/i18n/paths';
import { getMessages } from '@/i18n/messages';

const LocaleContext = createContext({
  locale: 'nl',
  t: getMessages('nl'),
  href: (path) => path,
  switchTo: (locale) => (locale === 'en' ? '/en' : '/'),
});

export function LocaleProvider({ children, locale: forcedLocale }) {
  const pathname = usePathname() || '/';
  const locale = forcedLocale || getLocaleFromPath(pathname);
  const t = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'en' ? 'en' : 'nl';
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t,
      href: (path) => localizedHref(path, locale),
      switchTo: (target) => switchLocalePath(pathname, target),
    }),
    [locale, t, pathname]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

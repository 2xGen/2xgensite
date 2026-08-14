'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import { openCookieSettings } from '@/components/CookieConsent';

const Footer = () => {
  const { t, href } = useLocale();

  const links = [
    { href: href('/what-we-build'), label: t.nav.whatWeBuild },
    { href: href('/sectors'), label: t.nav.sectors },
    { href: href('/platforms'), label: t.nav.platforms },
    { href: href('/pricing'), label: t.nav.pricing },
    { href: href('/acquisition-check'), label: t.nav.check },
    { href: href('/about'), label: t.nav.about },
    { href: href('/contact'), label: t.nav.contact },
    { href: href('/privacy'), label: t.footer.privacy },
  ];

  return (
    <footer className="relative bg-[#0c1b2a] text-white py-14">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#3d8fd1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-3 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              2xGen
            </h3>
            <p className="text-[#3d8fd1] text-sm font-medium mb-3">{t.footer.tag}</p>
            <p className="text-white/55 text-sm leading-relaxed max-w-md">
              {t.footer.line}
              <br />
              {t.footer.line2}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end content-start items-center">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {t.footer.cookies}
            </button>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/30">
          <span>
            © {new Date().getFullYear()} 2xGen LLC · Albuquerque, NM 87110
          </span>
          <a href="mailto:matthijs@2xgen.com" className="hover:text-white/60 transition-colors">
            matthijs@2xgen.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

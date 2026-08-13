'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

export default function PageCta({ title, text }) {
  const { t, href } = useLocale();
  const heading = title || t.cta.h2;
  const body = text || t.cta.body;

  return (
    <div className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 mt-16">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">{heading}</h2>
      <p className="text-white/65 mb-6 max-w-xl">{body}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={href('/acquisitiecheck')} className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8]">
          {t.nav.check}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href={href('/contact')} className="xgen-btn border border-white/25 text-white hover:bg-white/10">
          {t.nav.contact}
        </Link>
      </div>
    </div>
  );
}

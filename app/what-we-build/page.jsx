import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getServices } from '@/i18n/content';

export const metadata = {
  title: 'What we build | 2xGen',
  description:
    '2xGen builds acquisition systems: lead generation, tools, data & prospecting, automation, websites and digital platforms.',
  alternates: {
    canonical: '/what-we-build',
    languages: { en: '/what-we-build', nl: '/nl/wat-we-bouwen' },
  },
};

export default function WhatWeBuildPage() {
  const services = getServices('en');

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
            Building blocks of an acquisition system
          </h1>
          <p className="text-lg text-gray-600">
            You buy one thing: a system that generates and handles new customer opportunities. These are the parts we combine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.slug} className="xgen-card p-6 sm:p-7 h-full">
              <p className="text-sm font-semibold text-[#3d8fd1] mb-2">{service.eyebrow}</p>
              <h2 className="text-xl font-semibold tracking-tight mb-2">{service.title}</h2>
              <p className="text-gray-600 leading-relaxed">{service.summary}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Nederlands?{' '}
          <Link href="/nl/wat-we-bouwen" className="text-[#1a5f9e] hover:underline font-medium">
            Bekijk bouwstenen in het Nederlands →
          </Link>
        </p>

        <PageCta />
      </div>
    </PageShell>
  );
}

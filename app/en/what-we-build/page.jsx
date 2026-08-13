import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getServices } from '@/i18n/content';

export const metadata = {
  title: 'What we build | 2xGen',
  description:
    '2xGen builds acquisition systems: lead generation, tools, data & prospecting, automation, websites and digital platforms.',
  alternates: {
    canonical: '/en/what-we-build',
    languages: { nl: '/wat-we-bouwen', en: '/en/what-we-build' },
  },
};

export default function EnWhatWeBuildPage() {
  const services = getServices('en');

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">What we build for you</h1>
          <p className="text-lg text-gray-600">
            No standard package. No list of marketing services. Six ways to build acquisition — tuned to your market.
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
          Prefer Dutch detail pages?{' '}
          <Link href="/wat-we-bouwen" className="text-[#1a5f9e] hover:underline font-medium">
            View services in Dutch →
          </Link>
        </p>

        <PageCta />
      </div>
    </PageShell>
  );
}

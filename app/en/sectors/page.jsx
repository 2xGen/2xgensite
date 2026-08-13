import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getSectors } from '@/i18n/content';
import { getMessages } from '@/i18n/messages';

export const metadata = {
  title: 'Sectors | 2xGen',
  description:
    'Lead generation and acquisition systems for finance, recruitment, industry, real estate, energy and professional services.',
  alternates: { canonical: '/en/sectors', languages: { nl: '/sectoren', en: '/en/sectors' } },
};

export default function EnSectorsPage() {
  const t = getMessages('en').pages.sectors;
  const sectors = getSectors('en');

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.body}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, index) => (
            <Link
              key={sector.slug}
              href={`/en/sectors/${sector.slug}`}
              className="xgen-card p-6 group h-full"
            >
              <span className="text-sm font-bold text-[#3d8fd1]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="text-xl font-semibold tracking-tight mt-2 mb-2 group-hover:text-[#1a5f9e] transition-colors">
                {sector.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{sector.items}</p>
              <span className="text-sm font-semibold text-[#09294c]">{t.view}</span>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-[#09294c]/08 px-6 py-5 max-w-2xl mt-8">
          <p className="text-[#09294c] font-medium leading-relaxed">{t.other}</p>
        </div>

        <PageCta />
      </div>
    </PageShell>
  );
}

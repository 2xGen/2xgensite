import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getSector, sectors } from '@/data/siteContent';

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const sector = getSector(params.slug);
  if (!sector) return {};
  return {
    title: `${sector.headline} | 2xGen`,
    description: sector.intro,
    alternates: { canonical: `/nl/sectoren/${sector.slug}` },
  };
}

export default function SectorPage({ params }) {
  const sector = getSector(params.slug);
  if (!sector) notFound();

  return (
    <PageShell className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/nl/sectoren" className="text-sm font-medium text-[#1a5f9e] hover:underline">
          ← Alle sectoren
        </Link>

        <div className="max-w-3xl mt-6 mb-12">
          <p className="xgen-pill mb-4">{sector.title}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-5">
            {sector.headline}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{sector.intro}</p>
          <p className="text-lg text-[#09294c] font-medium leading-relaxed">{sector.angle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {sector.focus.map((item) => (
            <div key={item} className="xgen-card p-6">
              <p className="font-semibold text-[#09294c]">{item}</p>
            </div>
          ))}
        </div>

        <PageCta
          title={`Acquisitie in ${sector.title.toLowerCase()}?`}
          text="Vertel wie je zoekt. Wij kijken waar de digitale ingang zit."
        />
      </div>
    </PageShell>
  );
}


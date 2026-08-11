import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { sectors } from '@/data/siteContent';

export const metadata = {
  title: 'Sectoren | 2xGen',
  description: 'Leadgeneratie en acquisitiesystemen voor finance, recruitment, industrie, vastgoed, energie en zakelijke dienstverlening.',
  alternates: { canonical: '/sectoren' },
};

export default function SectorenPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
            Waar zit jouw kans?
          </h1>
          <p className="text-lg text-gray-600">
            Vooral interessant voor bedrijven waarbij één nieuwe klant daadwerkelijk waarde heeft.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, index) => (
            <Link
              key={sector.slug}
              href={`/sectoren/${sector.slug}`}
              className="xgen-card p-6 group h-full"
            >
              <span className="text-sm font-bold text-[#3d8fd1]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="text-xl font-semibold tracking-tight mt-2 mb-2 group-hover:text-[#1a5f9e] transition-colors">
                {sector.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{sector.items}</p>
              <span className="text-sm font-semibold text-[#09294c]">Bekijk sector →</span>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-[#09294c]/08 px-6 py-5 max-w-2xl mt-8">
          <p className="text-[#09294c] font-medium leading-relaxed">
            Andere branche? Geen probleem. De vraag is of we je potentiële klanten online kunnen vinden en bereiken.
          </p>
        </div>

        <PageCta />
      </div>
    </PageShell>
  );
}

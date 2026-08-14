import { ExternalLink } from 'lucide-react';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { platforms } from '@/data/siteContent';

export const metadata = {
  title: 'Platforms & cases | 2xGen',
  description: 'Wat 2xGen zelf bouwt en runt: FactuurBaas, TopTours.ai, TalentPad en meer — met het acquisitiemechanisme achter elk product.',
  alternates: { canonical: '/nl/platforms', languages: { nl: '/nl/platforms', en: '/platforms' } },
};

export default function PlatformsPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="rounded-3xl bg-white border border-[#09294c]/10 p-8 sm:p-10">
            <div className="accent-bar mb-4" />
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
              We doen het zelf ook.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Geen PowerPoint-cases. We runnen zelf websites en digitale producten — en laten zien welk acquisitiemechanisme erachter zit.
            </p>
          </div>
          <div className="rounded-3xl pattern-navy text-white p-8 sm:p-10 flex flex-col justify-center">
            <p className="text-[#3d8fd1] text-sm font-semibold mb-3">Onze proeftuin</p>
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">
              We bouwen. Publiceren. Meten. Aanpassen. Bouwen verder.
            </p>
            <p className="text-white/65">
              Wat we voor klanten bouwen, bouwen we zelf ook.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="xgen-card p-6 sm:p-7 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-semibold tracking-tight text-[#09294c]">{platform.name}</h2>
                <ExternalLink className="w-4 h-4 text-[#09294c]/25 group-hover:text-[#3d8fd1] shrink-0 mt-1" />
              </div>
              <p className="text-sm font-semibold text-[#3d8fd1] mb-3">{platform.angle}</p>
              <p className="text-gray-600 mb-4">{platform.blurb}</p>
              <p className="text-sm text-[#09294c]/75 leading-relaxed border-t border-[#09294c]/08 pt-4">
                {platform.mechanism}
              </p>
            </a>
          ))}
        </div>

        <PageCta
          title="Wil je zo’n acquisitie-asset?"
          text="Van tool tot platform — we kijken wat bij jouw markt past."
        />
      </div>
    </PageShell>
  );
}

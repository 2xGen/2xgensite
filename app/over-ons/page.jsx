import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';

const founderImageUrl =
  'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/One%20Happy%20Finance/matthijs%20van%20reek%202xGen.png';

export const metadata = {
  title: 'Over 2xGen | 2x Generatie',
  description: '2xGen — 2x Generatie. We bouwen digitale acquisitiesystemen waarmee bedrijven structureel nieuwe klanten vinden. Opgericht door Matthijs van Reek.',
  alternates: { canonical: '/over-ons' },
};

export default function OverOnsPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px,1fr] gap-10 lg:gap-14 items-start mb-16">
          <div className="space-y-4">
            <div className="xgen-card p-2 overflow-hidden">
              <img
                src={founderImageUrl}
                alt="Matthijs van Reek, oprichter van 2xGen"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="px-1 text-sm">
              <p className="font-semibold text-[#09294c]">Matthijs van Reek</p>
              <p className="text-gray-500">Oprichter van 2xGen</p>
              <Link href="/about" className="inline-block text-[#1a5f9e] hover:underline mt-2">
                Profielpagina →
              </Link>
            </div>
          </div>

          <div>
            <div className="accent-bar mb-4" />
            <p className="xgen-pill mb-4">Over 2xGen</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
              2xGen — 2x Generatie.
            </h1>
            <p className="text-xl font-semibold text-[#1a5f9e] mb-6">
              Meer leads. Meer klanten. Meer resultaat.
            </p>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                2xGen helpt bedrijven nieuwe klanten vinden met leadgeneratie, data, tools, websites, AI en automatisering.
              </p>
              <p>
                We bouwen geen losse campagnes die verdwijnen zodra het budget stopt. We bouwen systemen die blijven werken en steeds beter kunnen worden.
              </p>
              <p>
                Daarnaast bouwen en runnen we onze eigen digitale platforms. Zo testen we zelf wat werkt, wat niet werkt en waar de kansen liggen.
              </p>
              <p className="font-semibold text-[#09294c]">
                Wat we voor klanten bouwen, bouwen we zelf ook.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: 'Aanpak', d: 'Van losse kanalen naar één acquisitiesysteem.', href: '/#about' },
            { t: 'Platforms', d: 'Onze eigen producten als proeftuin.', href: '/platforms' },
            { t: 'Sectoren', d: 'Waar één nieuwe klant echt waarde heeft.', href: '/sectoren' },
          ].map((item) => (
            <Link key={item.t} href={item.href} className="xgen-card p-6 group">
              <h2 className="font-semibold text-[#09294c] mb-2 group-hover:text-[#1a5f9e]">{item.t}</h2>
              <p className="text-sm text-gray-600">{item.d}</p>
            </Link>
          ))}
        </div>

        <PageCta />
      </div>
    </PageShell>
  );
}

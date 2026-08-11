import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';

export const metadata = {
  title: 'Wat kost leadgeneratie? | 2xGen',
  description: 'Geen standaard pakketprijzen. Wel richtlijnen: vanaf €500 p/m voor leadgeneratie, vanaf €2.000 eenmalig voor een acquisitiesysteem.',
  alternates: { canonical: '/prijzen' },
};

const oneOff = [
  'Strategy / acquisitie-audit',
  'Leadgeneratie tool',
  'Website / landingsysteem',
  'Data-setup',
];

const ongoing = [
  'Leadgeneratie',
  'Prospecting',
  'Automatisering',
  'SEO / acquisitiesystemen',
  'Platformbeheer',
];

const packages = [
  {
    title: 'Leadgeneratie',
    price: 'Vanaf €500 p/m',
    text: 'Doorlopend werken aan bereik, conversie en opvolging.',
  },
  {
    title: 'Leadgeneratie systeem',
    price: 'Vanaf €2.000 eenmalig',
    text: 'Setup van pagina’s, tools, data of automatisering die blijft werken.',
  },
  {
    title: 'Maatwerk platform',
    price: 'Op aanvraag',
    text: 'Een acquisitie-asset die structureel verkeer en leads aantrekt.',
  },
];

export default function PrijzenPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
            Wat kost leadgeneratie?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            De juiste aanpak hangt af van je markt, doelgroep en waarde per klant. We beginnen daarom met de acquisitiekans — niet met een pakket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="xgen-card p-7">
            <h2 className="text-xl font-semibold mb-4">Eenmalig</h2>
            <ul className="space-y-3">
              {oneOff.map((item) => (
                <li key={item} className="text-gray-600 flex gap-2">
                  <span className="text-[#3d8fd1] font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="xgen-card p-7">
            <h2 className="text-xl font-semibold mb-4">Doorlopend</h2>
            <ul className="space-y-3">
              {ongoing.map((item) => (
                <li key={item} className="text-gray-600 flex gap-2">
                  <span className="text-[#3d8fd1] font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {packages.map((item) => (
            <div key={item.title} className="rounded-3xl bg-[#09294c] text-white p-7">
              <p className="text-[#3d8fd1] text-sm font-semibold mb-2">{item.title}</p>
              <p className="text-2xl font-semibold mb-3">{item.price}</p>
              <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-[#09294c]/10 p-7 max-w-3xl">
          <p className="text-[#09294c] font-medium leading-relaxed mb-4">
            Geen verborgen prijslijst — wel genoeg richting om te filteren. Past het niet? Dan zeggen we dat ook.
          </p>
          <Link href="/acquisitiecheck" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
            Begin met de acquisitiecheck →
          </Link>
        </div>

        <PageCta
          title="Wil je weten wat bij jou past?"
          text="Kort gesprek over markt, doelgroep en waarde per klant — zonder ellenlange salespitch."
        />
      </div>
    </PageShell>
  );
}

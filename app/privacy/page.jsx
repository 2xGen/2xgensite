import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata = {
  title: 'Privacy & cookies | 2xGen',
  description: 'Hoe 2xGen omgaat met privacy, cookies en analytics op 2xgen.com.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="accent-bar mb-4" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Privacy & cookies
        </h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Wie zijn wij?</h2>
            <p>
              2xGen LLC (2xGen) bouwt digitale acquisitiesystemen. Contact:{' '}
              <a href="mailto:matthijs@2xgen.com" className="text-[#1a5f9e] hover:underline">
                matthijs@2xgen.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Welke cookies gebruiken we?</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#09294c]">Noodzakelijk</strong> — om je cookievoorkeur te onthouden en de site goed te laten werken.
              </li>
              <li>
                <strong className="text-[#09294c]">Analytics (optioneel)</strong> — Vercel Analytics en Metricool, alleen als je “Alles accepteren” kiest. Zo zien we welke pagina’s werken, zonder advertentieprofilering.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Formulieren</h2>
            <p>
              Als je de acquisitiecheck invult, slaan we je antwoorden (naam, e-mail, bedrijf, keuzes) op in onze database om je te kunnen helpen. We gebruiken die gegevens niet voor nieuwsbrieven zonder toestemming.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Je rechten</h2>
            <p>
              Je mag je gegevens inzien, laten corrigeren of laten verwijderen. Stuur een mail naar matthijs@2xgen.com. Je cookiekeuze kun je wissen via de browserinstellingen (localStorage) en de site opnieuw laden.
            </p>
          </section>

          <p className="pt-4">
            <Link href="/" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
              ← Terug naar home
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

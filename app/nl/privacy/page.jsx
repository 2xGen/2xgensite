import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata = {
  title: 'Privacy & cookies | 2xGen',
  description: 'Hoe 2xGen omgaat met privacy, cookies en analytics op 2xgen.com.',
  alternates: { canonical: '/nl/privacy', languages: { nl: '/nl/privacy', en: '/privacy' } },
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
              <a href="mailto:hello@2xgen.com" className="text-[#1a5f9e] hover:underline">
                hello@2xgen.com
              </a>
              . Privacyverzoeken:{' '}
              <a href="mailto:legal@2xgen.com" className="text-[#1a5f9e] hover:underline">
                legal@2xgen.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Rechtsgrond & toestemming</h2>
            <p>
              Noodzakelijke cookies plaatsen we op basis van gerechtvaardigd belang / contractuele noodzaak
              om de site te laten werken. Analytics-cookies plaatsen we alleen na jouw expliciete toestemming
              (GDPR/ePrivacy). Je kunt toestemming weigeren of later intrekken via “Cookies beheren” in de footer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Welke cookies gebruiken we?</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#09294c]">Noodzakelijk</strong> — onthouden van je cookievoorkeur
                (localStorage) en basiswerking van de site.
              </li>
              <li>
                <strong className="text-[#09294c]">Analytics (optioneel)</strong> — Vercel Analytics en Metricool,
                alleen als je analytics accepteert. Doel: paginagebruik begrijpen. Geen advertentieprofilering.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">VS — California / state privacy</h2>
            <p>
              We verkopen je persoonsgegevens niet. Analytics kan als “sharing” van gebruiksgegevens worden gezien;
              je kunt dat uitzetten via “Cookies beheren” (opt-out). Voor verzoeken: legal@2xgen.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Formulieren</h2>
            <p>
              Als je de acquisitiecheck invult, slaan we je antwoorden (naam, e-mail, bedrijf, keuzes) op in onze
              database om je te kunnen helpen. We gebruiken die gegevens niet voor nieuwsbrieven zonder toestemming.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Je rechten</h2>
            <p>
              Afhankelijk van je locatie kun je gegevens inzien, corrigeren, laten verwijderen, beperken of
              bezwaar maken, en toestemming intrekken. Mail legal@2xgen.com. Cookiekeuze wijzig je via de footer
              of door localStorage te wissen en de pagina te herladen.
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

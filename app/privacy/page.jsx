import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata = {
  title: 'Privacy & cookies | 2xGen',
  description: 'How 2xGen handles privacy, cookies and analytics on 2xgen.com.',
  alternates: { canonical: '/privacy', languages: { en: '/privacy', nl: '/nl/privacy' } },
};

export default function EnPrivacyPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="accent-bar mb-4" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">Privacy & cookies</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Who we are</h2>
            <p>
              2xGen LLC (2xGen) builds digital acquisition systems. Contact:{' '}
              <a href="mailto:hello@2xgen.com" className="text-[#1a5f9e] hover:underline">
                hello@2xgen.com
              </a>
              . Privacy requests:{' '}
              <a href="mailto:legal@2xgen.com" className="text-[#1a5f9e] hover:underline">
                legal@2xgen.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Legal basis & consent</h2>
            <p>
              Necessary cookies are used so the site can function. Analytics cookies are loaded only after your
              explicit consent (GDPR/ePrivacy). You can refuse consent or withdraw it later via “Manage cookies” in
              the footer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Cookies we use</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong className="text-[#09294c]">Necessary</strong> — stores your cookie preference (localStorage)
                and basic site function.
              </li>
              <li>
                <strong className="text-[#09294c]">Analytics (optional)</strong> — Vercel Analytics and Metricool,
                only if you accept analytics. Purpose: understand page usage. No ad profiling.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">US — California / state privacy</h2>
            <p>
              We do not sell your personal information. Analytics may be considered “sharing” of usage data; you can
              opt out via “Manage cookies”. For requests: legal@2xgen.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Forms</h2>
            <p>
              If you complete the acquisition check, we store your answers (name, email, company, choices) to help
              you. We do not use that data for newsletters without consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">Your rights</h2>
            <p>
              Depending on your location, you may access, correct, delete, restrict, or object to processing, and
              withdraw consent. Email legal@2xgen.com. Change cookie choices via the footer, or clear localStorage
              and reload.
            </p>
          </section>

          <p className="pt-4">
            <Link href="/" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}

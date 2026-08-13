import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getMessages } from '@/i18n/messages';

export const metadata = {
  title: 'What does lead generation cost? | 2xGen',
  description:
    'No standard package prices. Guidelines: from $750 / month as Growth Partner, from $2,500 one-off for an Acquisition System.',
  alternates: { canonical: '/en/pricing', languages: { nl: '/prijzen', en: '/en/pricing' } },
};

export default function EnPricingPage() {
  const t = getMessages('en').pages.pricing;

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t.h1}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{t.body}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="xgen-card p-7">
            <h2 className="text-xl font-semibold mb-4">{t.once}</h2>
            <ul className="space-y-3">
              {t.onceItems.map((item) => (
                <li key={item} className="text-gray-600 flex gap-2">
                  <span className="text-[#3d8fd1] font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="xgen-card p-7">
            <h2 className="text-xl font-semibold mb-4">{t.ongoing}</h2>
            <ul className="space-y-3">
              {t.ongoingItems.map((item) => (
                <li key={item} className="text-gray-600 flex gap-2">
                  <span className="text-[#3d8fd1] font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {t.packages.map((item) => (
            <div key={item.title} className="rounded-3xl bg-[#09294c] text-white p-7">
              <p className="text-[#3d8fd1] text-sm font-semibold mb-2">{item.title}</p>
              <p className="text-2xl font-semibold mb-3">{item.price}</p>
              <p className="text-white/65 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-[#09294c]/10 p-7 max-w-3xl">
          <p className="text-[#09294c] font-medium leading-relaxed mb-4">{t.note}</p>
          <Link href="/en/acquisition-check" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
            {t.check}
          </Link>
        </div>

        <PageCta
          title="Want to know what fits you?"
          text="A short conversation about market, audience and value per customer — without a long sales pitch."
        />
      </div>
    </PageShell>
  );
}

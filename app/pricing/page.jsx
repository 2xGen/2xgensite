import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getMessages } from '@/i18n/messages';

export const metadata = {
  title: 'Pricing | Build once. Grow continuously. | 2xGen',
  description:
    'Start with an Acquisition System from $1,500. Then grow from $500/month — or Growth + Ads from $900/month including $250 ad spend. Commission-based partnerships available.',
  alternates: { canonical: '/pricing', languages: { en: '/pricing', nl: '/nl/prijzen' } },
};

function StepCard({ step }) {
  return (
    <div className="rounded-3xl border border-[#09294c]/10 bg-white text-[#09294c] p-6 sm:p-7 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center bg-[#e8f1f8] text-[#09294c]">
          {step.num}
        </span>
        <span className="text-xs font-semibold text-[#1a5f9e]">{step.badge}</span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-1">{step.title}</h2>
      <p className="text-lg font-semibold mb-4 text-[#1a5f9e]">{step.price}</p>
      <p className="text-sm mb-3 text-gray-500">{step.intro}</p>
      <ul className="space-y-2 flex-1">
        {step.items.map((item) => (
          <li key={item} className="text-sm flex gap-2 leading-snug text-gray-600">
            <span className="text-[#3d8fd1] font-bold shrink-0">·</span>
            {item}
          </li>
        ))}
      </ul>
      {step.footnote && <p className="text-xs mt-4 text-gray-400">{step.footnote}</p>}
    </div>
  );
}

export default function PricingPage() {
  const t = getMessages('en').pages.pricing;
  const steps = t.steps || [];

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t.h1}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{t.body}</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-stretch mb-10">
          {steps.map((step, i) => (
            <div key={step.title} className="contents">
              <div className="flex-1 min-w-0">
                <StepCard step={step} />
              </div>
              {i < steps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center justify-center shrink-0 px-2" aria-hidden>
                    <div className="w-10 h-10 rounded-full bg-white border border-[#09294c]/12 shadow-sm flex items-center justify-center text-[#3d8fd1]">
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex md:hidden items-center justify-center py-2" aria-hidden>
                    <div className="w-10 h-10 rounded-full bg-white border border-[#09294c]/12 shadow-sm flex items-center justify-center text-[#3d8fd1]">
                      <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border border-[#09294c]/10 p-7 sm:p-8 w-full space-y-5">
          <p className="text-[#09294c] font-medium leading-relaxed">{t.note}</p>
          {t.performanceTitle && (
            <div className="rounded-2xl bg-[#f3f7fb] border border-[#09294c]/08 px-5 py-4">
              <p className="text-sm font-semibold text-[#09294c] mb-1">{t.performanceTitle}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t.performanceBody}</p>
            </div>
          )}
          <Link href="/acquisition-check" className="inline-block text-sm font-semibold text-[#1a5f9e] hover:underline">
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

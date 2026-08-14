import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getMessages } from '@/i18n/messages';

const founderImageUrl =
  'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/One%20Happy%20Finance/matthijs%20van%20reek%202xGen.png';

export const metadata = {
  title: 'About 2xGen | 2x Generation',
  description:
    '2xGen — 2x Generation. We build digital acquisition systems that help companies find new customers structurally. Founded by Matthijs van Reek.',
  alternates: { canonical: '/about', languages: { en: '/about', nl: '/nl/over-ons' } },
};

export default function EnAboutPage() {
  const t = getMessages('en').pages.about;

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px,1fr] gap-10 lg:gap-14 items-start mb-16">
          <div className="space-y-4">
            <div className="xgen-card p-2 overflow-hidden">
              <img
                src={founderImageUrl}
                alt="Matthijs van Reek, founder of 2xGen"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="px-1 text-sm">
              <p className="font-semibold text-[#09294c]">Matthijs van Reek</p>
              <p className="text-gray-500">{t.role}</p>
            </div>
          </div>

          <div>
            <div className="accent-bar mb-4" />
            <p className="xgen-pill mb-4">{t.pill}</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t.h1}</h1>
            <p className="text-xl font-semibold text-[#1a5f9e] mb-6">{t.tag}</p>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
              <p className="font-semibold text-[#09294c]">{t.p4}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Approach', d: 'From loose channels to one acquisition system.', href: '/#distributie' },
            { title: 'Platforms', d: 'Our own products as a proving ground.', href: '/platforms' },
            { title: 'Sectors', d: 'Where one new customer truly has value.', href: '/sectors' },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="xgen-card p-6 group">
              <h2 className="font-semibold text-[#09294c] mb-2 group-hover:text-[#1a5f9e]">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.d}</p>
            </Link>
          ))}
        </div>

        <PageCta />
      </div>
    </PageShell>
  );
}

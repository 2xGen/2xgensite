import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { getService, services } from '@/data/siteContent';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | 2xGen`,
    description: service.summary,
    alternates: { canonical: `/diensten/${service.slug}` },
  };
}

export default function DienstPage({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <PageShell className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/wat-we-bouwen" className="text-sm font-medium text-[#1a5f9e] hover:underline">
          ← Wat we bouwen
        </Link>

        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 mt-6">
          <div>
            <p className="text-sm font-semibold text-[#3d8fd1] mb-3">{service.eyebrow}</p>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{service.title}</h1>
            <p className="text-lg text-[#09294c]/70 font-medium mb-6">{service.question}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{service.intro}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{service.summary}</p>

            <ul className="space-y-3 mb-8">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-2xl bg-[#f3f7fb] border border-[#09294c]/06 px-5 py-4"
                >
                  <span className="text-[#3d8fd1] font-bold">→</span>
                  <span className="font-medium text-[#09294c]">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-xl font-semibold text-[#09294c]">{service.outcome}</p>
          </div>

          <aside className="space-y-4">
            <div className="xgen-card p-6">
              <p className="text-sm font-semibold text-[#3d8fd1] mb-2">Onderdeel van</p>
              <p className="font-semibold text-[#09294c] mb-2">Find → Capture → Target → Automate → Convert → Scale</p>
              <p className="text-sm text-gray-600">
                Niet ieder bedrijf heeft alle stappen nodig. Wel een duidelijke route naar klanten.
              </p>
            </div>
            <div className="xgen-card p-6">
              <p className="text-sm font-semibold text-[#09294c] mb-3">Andere bouwstenen</p>
              <ul className="space-y-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/diensten/${item.slug}`} className="text-sm text-[#1a5f9e] hover:underline">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <PageCta />
      </div>
    </PageShell>
  );
}

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageCta from '@/components/PageCta';
import { services } from '@/data/siteContent';

export const metadata = {
  title: 'Wat we bouwen | 2xGen',
  description: '2xGen bouwt acquisitiesystemen: leadgeneratie, tools, data & prospecting, automatisering, websites en digitale platforms.',
  alternates: { canonical: '/wat-we-bouwen' },
};

export default function WatWeBouwenPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar mb-4" />
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
            Wat we voor je bouwen
          </h1>
          <p className="text-lg text-gray-600">
            Geen standaard pakket. Geen lijst met marketingdiensten. Zes manieren om acquisitie te bouwen — afgestemd op jouw markt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/diensten/${service.slug}`}
              className="xgen-card p-6 sm:p-7 group h-full"
            >
              <p className="text-sm font-semibold text-[#3d8fd1] mb-2">{service.eyebrow}</p>
              <h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-[#1a5f9e] transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{service.summary}</p>
              <span className="text-sm font-semibold text-[#09294c]">Meer →</span>
            </Link>
          ))}
        </div>

        <PageCta
          title="Welke bouwsteen heb jij nodig?"
          text="Doe de acquisitiecheck — of stuur een kort bericht over je markt."
        />
      </div>
    </PageShell>
  );
}

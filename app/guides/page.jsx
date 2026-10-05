import GuidesIndex from '@/components/GuidesIndex';
import { getTourOperatorGuides } from '@/data/tourOperatorGuides';

const BASE = 'https://2xgen.com';

export const metadata = {
  title: 'Tour Operator SEO & Marketing Guides',
  description:
    'Practical guides for tour operators covering SEO, Google traffic, Viator, GetYourGuide, direct bookings, websites and online marketing.',
  keywords:
    'SEO for tour operators, tour operator marketing, tour operator SEO, Viator SEO, GetYourGuide SEO, tour marketing, tour operator website',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Tour Operator SEO & Marketing Guides | 2xGen',
    description:
      'Practical guides for tour operators covering SEO, Google traffic, Viator, GetYourGuide, direct bookings, websites and online marketing.',
    url: '/guides',
    type: 'website',
  },
};

export default function GuidesPage() {
  const guides = getTourOperatorGuides();
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Guides for Tour Operators',
      description:
        'Practical guides for tour operators covering SEO, Google traffic, Viator, GetYourGuide, direct bookings, websites and online marketing.',
      url: `${BASE}/guides`,
      isPartOf: { '@type': 'WebSite', name: '2xGen', url: BASE },
      hasPart: guides.map((g) => ({
        '@type': 'Article',
        name: g.title,
        url: `${BASE}/guides/${g.slug}`,
        description: g.metaDescription || g.excerpt,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Guides',
          item: `${BASE}/guides`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuidesIndex />
    </>
  );
}

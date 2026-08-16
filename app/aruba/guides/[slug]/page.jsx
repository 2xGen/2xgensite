import ArubaGuideArticle from '@/components/ArubaGuideArticle';
import { getArubaGuide, getArubaGuideSlugs } from '@/data/arubaGuides';

const BASE = 'https://2xgen.com';

export function generateStaticParams() {
  return getArubaGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getArubaGuide(params.slug, 'en');
  if (!guide) return { title: 'Guide | 2xGen Aruba' };
  return {
    title: `${guide.title} | Aruba Growth Guides | 2xGen`,
    description: guide.excerpt,
    alternates: {
      canonical: `/aruba/guides/${guide.slug}`,
      languages: {
        en: `/aruba/guides/${guide.slug}`,
        nl: `/nl/aruba/guides/${guide.slug}`,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/aruba/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.date,
    },
  };
}

export default function Page({ params }) {
  const guide = getArubaGuide(params.slug);
  const jsonLd = guide
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.excerpt,
        datePublished: guide.date,
        author: { '@type': 'Organization', name: '2xGen' },
        publisher: { '@type': 'Organization', name: '2xGen LLC' },
        mainEntityOfPage: `${BASE}/aruba/guides/${guide.slug}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ArubaGuideArticle slug={params.slug} />
    </>
  );
}

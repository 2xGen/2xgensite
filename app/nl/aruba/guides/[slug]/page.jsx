import ArubaGuideArticle from '@/components/ArubaGuideArticle';
import { getArubaGuide, getArubaGuideSlugs } from '@/data/arubaGuides';

const BASE = 'https://2xgen.com';

export function generateStaticParams() {
  return getArubaGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getArubaGuide(params.slug, 'nl');
  if (!guide) return { title: 'Gids | 2xGen Aruba' };
  return {
    title: `${guide.title} | Aruba Growth Guides | 2xGen`,
    description: guide.excerpt,
    alternates: {
      canonical: `/nl/aruba/guides/${guide.slug}`,
      languages: {
        en: `/aruba/guides/${guide.slug}`,
        nl: `/nl/aruba/guides/${guide.slug}`,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: `/nl/aruba/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.date,
      locale: 'nl_NL',
    },
  };
}

export default function Page({ params }) {
  const guide = getArubaGuide(params.slug, 'nl');
  const jsonLd = guide
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.excerpt,
        datePublished: guide.date,
        inLanguage: 'nl',
        author: { '@type': 'Organization', name: '2xGen' },
        publisher: { '@type': 'Organization', name: '2xGen LLC' },
        mainEntityOfPage: `${BASE}/nl/aruba/guides/${guide.slug}`,
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

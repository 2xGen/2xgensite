import GuideArticle from '@/components/GuideArticle';
import {
  getTourOperatorGuide,
  getTourOperatorGuideSlugs,
} from '@/data/tourOperatorGuides';

const BASE = 'https://2xgen.com';

export function generateStaticParams() {
  return getTourOperatorGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getTourOperatorGuide(params.slug);
  if (!guide) return { title: 'Guide | 2xGen' };
  const title = guide.seoTitle || guide.title;
  const description = guide.metaDescription || guide.excerpt;
  const keywords = [guide.targetKeyword, ...(guide.secondaryKeywords || [])]
    .filter(Boolean)
    .join(', ');
  return {
    title: `${title} | 2xGen Guides`,
    description,
    keywords: keywords || undefined,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title,
      description,
      url: `/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.date,
    },
  };
}

export default function GuideSlugPage({ params }) {
  const guide = getTourOperatorGuide(params.slug);
  const jsonLd = [];

  if (guide) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.seoTitle || guide.title,
      description: guide.metaDescription || guide.excerpt,
      datePublished: guide.date,
      author: { '@type': 'Organization', name: '2xGen' },
      publisher: { '@type': 'Organization', name: '2xGen LLC' },
      mainEntityOfPage: `${BASE}/guides/${guide.slug}`,
    });

    const crumbs = [
      { name: 'Home', item: `${BASE}/` },
      { name: 'Guides', item: `${BASE}/guides` },
    ];
    if (!guide.isPillar) {
      crumbs.push({
        name: 'SEO for Tour Operators',
        item: `${BASE}/guides/seo-for-tour-operators`,
      });
    }
    crumbs.push({
      name: guide.title,
      item: `${BASE}/guides/${guide.slug}`,
    });

    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    });
  }

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <GuideArticle slug={params.slug} />
    </>
  );
}

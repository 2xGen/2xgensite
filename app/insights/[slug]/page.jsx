import BlogPost from '@/views/BlogPost';
import { getInsightBySlug } from '@/data/insightMeta';

const BASE_URL = 'https://2xgen.com';

export function generateMetadata({ params }) {
  const slug = params?.slug ?? '';
  const post = getInsightBySlug(slug);
  const title = post ? `${post.title} - 2xGen Insights` : (slug ? `${slug.replace(/-/g, ' ')} - 2xGen Insights` : 'Insight - 2xGen');
  const description = post ? post.excerpt : 'Read insights and guides from 2xGen on SaaS, product development, and digital strategy.';
  const url = `/insights/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: '2xGen',
      type: 'article',
      ...(post?.image && { images: [{ url: post.image }] }),
      ...(post?.date && { publishedTime: post.date }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function articleJsonLd(post, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: '2xGen LLC', logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/insights/${slug}` },
  };
}

export default function BlogPostPage({ params }) {
  const slug = params?.slug ?? '';
  const post = getInsightBySlug(slug);

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post, slug)) }}
        />
      )}
      <BlogPost slug={slug} />
    </>
  );
}

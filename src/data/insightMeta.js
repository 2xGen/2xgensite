/**
 * Shared meta for 2xGen Insights posts. Used by sitemap, generateMetadata, and Article JSON-LD.
 * Keep in sync with the posts in src/views/BlogPost.jsx when adding new insights.
 */
const INSIGHT_META = [
  {
    slug: 'ai-transforming-web-development',
    title: 'How AI Is Transforming Web Development in 2025',
    excerpt: 'Discover how artificial intelligence is reshaping the way websites and SaaS platforms are built — from automated coding to smarter user experiences.',
    date: '2025-01-30',
    image: 'https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/How%20AI%20Is%20Transforming%20Web%20Development%20in%202025.png',
    author: '2xGen Team',
  },
  {
    slug: 'how-we-build-products-at-2xgen',
    title: 'How We Build Products at 2xGen: Our Development Process',
    excerpt: 'From concept to launch, discover our systematic approach to building digital products that users love. Learn about our agile methodology, design thinking process, and quality assurance practices.',
    date: '2024-01-30',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    author: '2xGen Team',
  },
  {
    slug: '2xgen-tech-stack-modern-tools',
    title: 'The 2xGen Tech Stack: Modern Tools for Modern Solutions',
    excerpt: 'Explore the technologies and frameworks we use to build scalable, maintainable, and performant digital products. From React and Node.js to cloud infrastructure and deployment strategies.',
    date: '2024-01-28',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80',
    author: '2xGen Team',
  },
  {
    slug: 'product-development-timeline-2xgen',
    title: 'From Idea to Launch: Our Product Development Timeline',
    excerpt: "How long does it take to build a digital product? We break down our typical development phases, from initial concept and wireframing to testing, deployment, and post-launch optimization.",
    date: '2024-01-25',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    author: '2xGen Team',
  },
  {
    slug: 'why-we-choose-react-frontend-philosophy',
    title: 'Why We Choose React: Our Frontend Development Philosophy',
    excerpt: 'Discover why React has become our go-to framework for building user interfaces. Learn about component-based architecture, state management, and how we ensure optimal performance.',
    date: '2024-01-22',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    author: '2xGen Team',
  },
  {
    slug: 'building-for-scale-backend-architecture',
    title: 'Building for Scale: Our Backend Architecture Principles',
    excerpt: 'Learn how we design backend systems that can handle growth. From database design and API architecture to caching strategies and microservices, discover our approach to scalable development.',
    date: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    author: '2xGen Team',
  },
];

export const INSIGHT_SLUGS = INSIGHT_META.map((p) => p.slug);

export function getInsightBySlug(slug) {
  return INSIGHT_META.find((p) => p.slug === slug) ?? null;
}

export default INSIGHT_META;

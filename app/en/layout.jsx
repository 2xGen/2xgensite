export const metadata = {
  title: {
    default: '2xGen — We build systems that find customers',
    template: '%s | 2xGen',
  },
  description:
    '2xGen builds digital acquisition systems: lead generation, data, tools, automation and AI — so companies find new customers structurally.',
  alternates: {
    canonical: '/en',
    languages: { nl: '/', en: '/en' },
  },
};

export default function EnLayout({ children }) {
  return children;
}

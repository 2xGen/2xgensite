import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const title = 'Matthijs van Reek – Founder of 2xGen | Digital Venture Studio';
const description = 'Matthijs van Reek is the founder of 2xGen, a digital venture studio that builds and operates scalable platforms including TopTours.ai, ArubaBuddies, MyGoProfile, and FactuurBaas.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title,
    description,
    url: '/about',
    siteName: '2xGen',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const founderImageUrl = 'https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/One%20Happy%20Finance/matthijs%20van%20reek%202xGen.png';

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Matthijs van Reek',
            jobTitle: 'Founder',
            description: 'Founder of 2xGen, a digital venture studio that builds and operates scalable platforms including TopTours.ai, ArubaBuddies, MyGoProfile, and FactuurBaas.',
            worksFor: { '@type': 'Organization', name: '2xGen LLC', url: 'https://2xgen.com' },
            url: 'https://2xgen.com/about',
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://2xgen.com/about' },
            image: founderImageUrl,
            sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#eef4f9] hero-pattern-subtle pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-premium overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-[280px] sm:min-w-[280px] sm:shrink-0 bg-gradient-to-b from-[#09294c]/5 to-transparent flex flex-col items-center p-4 sm:p-6">
              <div className="w-full max-w-[240px] sm:max-w-none rounded-2xl overflow-hidden shadow-lg ring-1 ring-[#09294c]/10">
                <img
                  src={founderImageUrl}
                  alt="Matthijs van Reek, Founder of 2xGen"
                  className="w-full h-auto block"
                />
              </div>
              <div className="w-full max-w-[240px] sm:max-w-none mt-6 space-y-4 text-sm">
                <div>
                  <p className="font-medium text-[#09294c] mb-1">Email</p>
                  <p className="text-gray-700">matthijs@2xgen.com</p>
                  <a
                    href="mailto:matthijs@2xgen.com"
                    className="text-[#1a4b7a] font-medium hover:underline mt-1 inline-block"
                  >
                    Send email
                  </a>
                </div>
                <div>
                  <p className="font-medium text-[#09294c] mb-1">WhatsApp</p>
                  <p className="text-gray-700">+297 566 8844</p>
                  <a
                    href="https://wa.me/2975668844"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a4b7a] font-medium hover:underline mt-1 inline-block"
                  >
                    Send WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#09294c] tracking-tight mb-1">
                Matthijs van Reek
              </h1>
              <p className="text-[#1a4b7a] font-medium text-lg mb-6">Founder of 2xGen</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-[#09294c]">Matthijs van Reek</strong> is the founder of 2xGen, a digital venture studio that partners with founders and operators to architect scalable digital models and build the systems that allow them to grow.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                2xGen builds and operates platforms that combine strategic positioning, scalable architecture, and measurable impact — including TopTours.ai, ArubaBuddies, MyGoProfile, FactuurBaas, and the 365 destination sites. Every venture is structured around compounding digital leverage.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#09294c] font-semibold hover:text-[#1a4b7a] transition-colors group"
              >
                <span>Visit 2xGen</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const title = 'Matthijs van Reek – Oprichter van 2xGen | Leadgeneratie & Digitale Acquisitie';
const description = 'Matthijs van Reek is de oprichter van 2xGen, een digitaal leadgeneratie- en technologiebedrijf dat systemen bouwt waarmee Nederlandse bedrijven nieuwe klanten vinden.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/founder', languages: { en: '/founder', nl: '/nl/about' } },
  openGraph: {
    title,
    description,
    url: '/about',
    siteName: '2xGen',
    type: 'profile',
    locale: 'nl_NL',
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
            jobTitle: 'Oprichter',
            description: 'Oprichter van 2xGen, een digitaal leadgeneratie- en technologiebedrijf dat systemen bouwt waarmee Nederlandse bedrijven nieuwe klanten vinden.',
            worksFor: { '@type': 'Organization', name: '2xGen LLC', url: 'https://2xgen.com' },
            url: 'https://2xgen.com/about',
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://2xgen.com/about' },
            image: founderImageUrl,
            sameAs: ['https://www.linkedin.com/company/2xgen-com/'],
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen pattern-dots pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px,1fr] gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
              <div className="xgen-card p-2 overflow-hidden">
                <img
                  src={founderImageUrl}
                  alt="Matthijs van Reek, oprichter van 2xGen"
                  className="w-full h-auto block rounded-2xl"
                />
              </div>
              <div className="space-y-3 text-sm px-1">
                <div>
                  <p className="font-semibold text-[#09294c] mb-0.5">E-mail</p>
                  <a href="mailto:matthijs@2xgen.com" className="text-[#1a5f9e] hover:underline">
                    matthijs@2xgen.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-[#09294c] mb-0.5">WhatsApp</p>
                  <a
                    href="https://wa.me/2975668844"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a5f9e] hover:underline"
                  >
                    +297 566 8844
                  </a>
                </div>
              </div>
            </div>

            <div className="xgen-card p-7 sm:p-10">
              <div className="accent-bar mb-4" />
              <p className="xgen-pill mb-4">Oprichter</p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                Matthijs van Reek
              </h1>
              <p className="text-[#1a5f9e] font-semibold text-lg mb-6">Oprichter van 2xGen</p>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                <strong className="text-[#09294c] font-semibold">Matthijs van Reek</strong> is de oprichter van 2xGen — 2x Generatie. Hij bouwt systemen waarmee Nederlandse bedrijven structureel nieuwe klanten vinden.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                2xGen combineert leadgeneratie, websites, data, tools, automatisering en AI tot acquisitiesystemen die blijven werken. Daarnaast runnen we eigen digitale platforms — van FactuurBaas tot TopTours.ai — als proeftuin voor wat werkt.
              </p>
              <Link href="/" className="xgen-btn xgen-btn-primary">
                Naar 2xGen
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

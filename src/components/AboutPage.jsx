'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
};

const NETWORK = [
  { name: 'GozoQuadTours.fun', url: 'https://gozoquadtours.fun', line: 'Gozo off-road tours — quad, UTV, buggy, jeep & tuk tuk' },
  { name: 'StonehengeToursLondon.site', url: 'https://stonehengetourslondon.site', line: 'Stonehenge day trips from London' },
  { name: 'BestHelicopterFlights.com', url: 'https://besthelicopterflights.com', line: 'Helicopter tour discovery' },
  { name: 'Tyo365.com', url: 'https://tyo365.com', line: 'Mt. Fuji helicopter tours from Tokyo' },
  { name: 'PartyBusAruba.fun', url: 'https://partybusaruba.fun', line: 'Aruba party bus experiences' },
  { name: 'Prg365.com', url: 'https://prg365.com', line: 'Day trips from Prague' },
  { name: 'Aru365.com', url: 'https://aru365.com', line: 'Aruba tours and activities' },
  { name: 'TopTours.ai', url: 'https://toptours.ai', line: 'Multi-destination tour discovery' },
  { name: 'ArubaBuddies.com', url: 'https://arubabuddies.com', line: 'Aruba tourism discovery' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pattern-diagonal pt-24 md:pt-28 pb-14 md:pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#09294c]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="accent-bar mb-4" />
            <p className="xgen-pill mb-4">About 2xGen</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] mb-5">
              We built the system before we sold it.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              2xGen isn&apos;t a traditional SEO agency.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We build and operate our own tourism websites, learn which destinations and tour
              categories attract Google demand, and turn that experience into managed acquisition
              sites for tour operators.
            </p>
            <p className="text-lg font-semibold text-[#09294c] leading-relaxed">
              We don&apos;t just advise operators on Google. We operate the Google layer ourselves.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 pattern-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="accent-bar mb-4" />
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Built from the operator&apos;s side of the marketplace
              </h2>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="lg:col-span-7 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                Founder Matthijs van Reek has spent years building tourism websites and working with
                marketplace-based travel businesses.
              </p>
              <p>
                That started with our own tourism properties — building websites, testing destinations,
                finding search opportunities, sending travelers into booking platforms, and measuring
                what actually converts.
              </p>
              <p>Today, that experience powers 2xGen.</p>
              <p className="font-semibold text-[#09294c] pt-2">
                You run the tours.
                <br />
                Viator or GetYourGuide handles the checkout.
                <br />
                We build and manage the Google acquisition layer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#e8f1f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="accent-bar mb-4" />
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                We know what happens after the click
              </h2>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="lg:col-span-7 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                Our approach comes from actually operating tourism websites — not selling generic SEO
                packages.
              </p>
              <p>
                We have built sites around specific destinations and activities, connected them to
                marketplace inventory, monitored Google Search Console data, tested keywords, and
                learned which types of searches turn into commercial travel intent.
              </p>
              <p>
                That means we&apos;re interested in more than{' '}
                <span className="italic text-[#09294c]/70">&quot;Can we rank this page?&quot;</span>
              </p>
              <p className="font-semibold text-[#09294c]">
                We&apos;re interested in: &quot;Can we get the right traveler to the right tour and
                ultimately generate a booking?&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 pattern-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              The network we operate
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              2xGen operates a growing portfolio of tourism acquisition properties across destinations
              and activities — including Aruba, Curaçao, Malta, London, Prague, Tokyo and other
              markets.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {NETWORK.map((site, i) => (
              <motion.a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl bg-white border border-[#09294c]/10 px-5 py-4 hover:border-[#3d8fd1]/40 transition-colors"
              >
                <p className="font-semibold text-[#09294c]">{site.name}</p>
                <p className="text-sm text-gray-500 mt-1">{site.line}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl bg-[#09294c] text-white p-7 sm:p-9"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
              Real booking volume
            </p>
            <p className="text-4xl sm:text-5xl font-semibold tracking-tight mb-2">$135k+</p>
            <p className="text-white/70 max-w-xl leading-relaxed mb-4">
              in booking value through marketplace bookings generated by our tourism sites.
            </p>
            <p className="text-white/85 leading-relaxed max-w-xl">
              This isn&apos;t a theoretical SEO model. It&apos;s the system we already operate — now
              we&apos;re making it available to tour operators.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#e8f1f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="accent-bar mb-4" />
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Why we built 2xGen
              </h2>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="lg:col-span-7 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>Most tour operators already have the difficult parts figured out.</p>
              <p>
                They have the tour, the guides, the vehicles, the boats, the experience, the reviews,
                and the Viator or GetYourGuide listing.
              </p>
              <p>
                What they often don&apos;t have is a dedicated team working every day to capture the
                travelers searching Google for that exact activity.
              </p>
              <p className="font-semibold text-[#09294c]">That&apos;s the gap 2xGen fills.</p>
              <p>We don&apos;t replace your marketplace.</p>
              <p>We don&apos;t replace your booking system.</p>
              <p>We don&apos;t try to become your tour operator.</p>
              <p>
                We build the Google layer that brings more travelers into the booking system you
                already use.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 pattern-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="h-1 w-12 rounded-full bg-[#3d8fd1] mb-4" />
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Small team. Focused system.
              </h2>
            </motion.div>
            <motion.div
              {...fadeUp}
              className="lg:col-span-7 space-y-4 text-lg text-white/70 leading-relaxed"
            >
              <p>2xGen is deliberately lean.</p>
              <p>
                We don&apos;t sell large website projects, retainers, strategy decks or hours of
                consulting.
              </p>
              <p>
                We build focused acquisition properties, connect them to marketplace inventory,
                monitor their performance and keep improving them.
              </p>
              <p>That allows us to offer the entire system for $199/year.</p>
              <p className="font-semibold text-white pt-2">
                You run the tours.
                <br />
                We run the Google layer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 pattern-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="grid lg:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden border border-[#09294c]/10 bg-white shadow-[0_20px_50px_rgba(9,41,76,0.08)]"
          >
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-3">
                2xGen LLC
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#09294c] mb-4">
                Founded by Matthijs van Reek
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                2xGen LLC is founded by Matthijs van Reek, a marketer and tourism entrepreneur focused
                on building digital acquisition systems.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Registered in Albuquerque, New Mexico. 2xGen operates tourism websites across multiple
                destinations and markets.
              </p>
              <a
                href="mailto:matthijs@2xgen.com"
                className="text-[#1a5f9e] font-semibold hover:underline"
              >
                matthijs@2xgen.com
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/office.png"
              alt="2xGen office"
              className="w-full h-full object-cover min-h-[260px] max-h-[400px] lg:max-h-none"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#e8f1f8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="accent-bar mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              The philosophy
            </h2>
            <p className="text-xl font-semibold text-[#09294c] leading-snug mb-4">
              Own the Google layer.
              <br />
              Use the marketplace for the transaction.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              That&apos;s the model behind 2xGen — and the model we&apos;re now offering to tour
              operators on Viator and GetYourGuide.
            </p>
            <a href="/#contact" className="xgen-btn xgen-btn-primary inline-flex">
              Get your Google Acquisition Site · $199/year
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

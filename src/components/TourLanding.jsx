'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { listMicrosites } from '@/services/micrositeService';
import { imageForUrl } from '@/data/microsites';
import DashboardMockup from '@/components/DashboardMockup';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SITE_ACCENTS = ['#1a5f9e', '#0c6e6b', '#8b5a2b', '#3d5a80', '#2a6f97', '#5c4d7a'];

function siteAccent(seed = '') {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash + seed.charCodeAt(i) * (i + 1)) % SITE_ACCENTS.length;
  return SITE_ACCENTS[hash];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = (i = 0) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * 0.08 },
});

const STEPS = [
  {
    num: '01',
    title: 'Build',
    text: 'We build a dedicated site around your destination and tour type.',
  },
  {
    num: '02',
    title: 'Target',
    text: 'We target high-intent Google searches travelers are already making.',
  },
  {
    num: '03',
    title: 'Book',
    text: 'Visitors click through to your existing Viator or GetYourGuide listing and complete the booking there.',
  },
  {
    num: '04',
    title: 'Manage',
    text: 'We maintain the site, keep optimizing, and you track booking-link clicks in your dashboard.',
  },
];

const PROBLEMS = [
  {
    title: 'Your tour is on the marketplace',
    text: 'Viator and GetYourGuide handle booking, payment, reviews and trust.',
  },
  {
    title: 'Google is a different battlefield',
    text: 'Travelers search destination + activity before they ever reach a marketplace.',
  },
  {
    title: 'You run tours, not SEO',
    text: 'We handle the Google side.',
  },
];

const INCLUDED = [
  'Custom site built around your destination and tour type',
  'Keyword research for high-intent searches',
  'Editorial content built to attract bookers',
  'Hosting and technical upkeep',
  'Booking integration / marketplace links (Viator API or GYG links)',
  'Operator dashboard — site status & tracked link clicks',
  'Ongoing optimization through the year',
  'Connected to our tourism content network where relevant',
];

const TERMS = [
  'Domain and website remain 2xGen property',
  'Custom-built from scratch for the destination and tour type — no templates, no revisions',
  'Independent site — we do not copy your brand, use your logos, or pretend to be the operator',
  'Domain names are not based on your company name',
];

const FOR_WHO = [
  'Boat tours & charters',
  'Quad / ATV tours',
  'Safari & jeep tours',
  'Helicopter tours',
  'Hot air balloon rides',
  'Private excursions',
  'Water sports & diving',
  'City & walking tours',
  'Food & wine tours',
  'Adventure & outdoor',
];

const FLOW = ['Google search', 'Your site', 'Viator / GYG', 'Booking'];

const EXAMPLE_SEARCHES = [
  'best quad tours in Gozo',
  'Gozo quad bike tour',
  'things to do in Gozo',
  'sunset quad tour Gozo',
  'ATV Gozo',
];

const PROOF_SITES = [
  {
    name: 'ArubaBuddies',
    url: 'https://arubabuddies.com',
    line: 'High-traffic tourism discovery — proven marketplace booking volume.',
    image: imageForUrl('https://arubabuddies.com'),
  },
  {
    name: 'GozoQuadTours.fun',
    url: 'https://gozoquadtours.fun',
    line: 'The best Gozo off-road tours — five machines, one island → book on Viator.',
    image: imageForUrl('https://gozoquadtours.fun'),
  },
  {
    name: 'TopTours.ai',
    url: 'https://toptours.ai',
    line: 'Broader tour discovery across destinations.',
    image: imageForUrl('https://toptours.ai'),
  },
  {
    name: 'PartyBusAruba',
    url: 'https://partybusaruba.fun',
    line: 'Aruba party bus nightlife — compare operators, book on Viator.',
    image: imageForUrl('https://partybusaruba.fun'),
  },
  {
    name: 'Stonehenge Tours',
    url: 'https://stonehengetourslondon.site',
    line: 'Stonehenge day trips from London — coaches, private cars, cruise shore days.',
    image: imageForUrl('https://stonehengetourslondon.site'),
  },
  {
    name: 'Cur365',
    url: 'https://cur365.com',
    line: 'Klein Curaçao day trips — boats that actually land on the island.',
    image: imageForUrl('https://cur365.com'),
  },
  {
    name: 'Prg365',
    url: 'https://prg365.com',
    line: 'Day trips from Prague — Český Krumlov, Kutná Hora, Bohemian Switzerland, and more.',
    image: imageForUrl('https://prg365.com'),
  },
  {
    name: 'Aru365',
    url: 'https://aru365.com',
    line: 'Best tours in Aruba — catamarans, snorkeling, ATV, sunset cruises, and more.',
    image: imageForUrl('https://aru365.com'),
  },
];

const FAQS = [
  {
    q: 'Do I need to update the site?',
    a: 'No. We build and manage it. On Viator, pricing and availability stay current through their live API. On GetYourGuide, we maintain the site and booking links into your listing. We keep optimizing through the year — so you don’t have to.',
  },
  {
    q: 'Do I keep my Viator or GetYourGuide listing?',
    a: 'Yes. You keep selling where you already sell. We build a Google-facing site that sends qualified travelers into that same trusted booking flow.',
  },
  {
    q: 'Who owns the domain and website?',
    a: 'The domain and website are part of the 2xGen tourism network. That is how we keep the product fully managed — hosting, updates, the booking API where available, and ongoing optimization — at one annual price. You get a Google-facing site without the operational burden.',
  },
  {
    q: 'Will the site look like my company website?',
    a: 'An independent SEO site — built for high-intent Google searches and sent straight to your existing listing. We do not copy your brand, use your logos, or pretend to be the operator. You don’t need another booking channel.',
  },
  {
    q: 'Can I request design changes?',
    a: 'Each site is custom-built from scratch for your destination and tour type — not a template. We ship with an SEO-first layout and no revision rounds. That keeps quality high and pricing simple.',
  },
  {
    q: 'Can I create an account before paying?',
    a: 'Yes. Create a free account to join the waitlist and see your site status in the dashboard. Subscribe at $249/year when you’re ready to enter the build queue.',
  },
  {
    q: 'What does $249 / year include?',
    a: 'One dedicated SEO site for your tours, fully managed for the year: build, content, hosting, marketplace links, network connection where relevant, ongoing optimization, and tracked booking-link click stats when live. Same price for Viator or GetYourGuide. We sell the system and the work — not guaranteed rankings or booking quotas.',
  },
  {
    q: 'How fast is the site live after I order?',
    a: 'Once your order is placed, we build and launch your site so it is operational within 3 business days.',
  },
  {
    q: 'Why is it only $249 / year?',
    a: 'The annual fee isn’t our only revenue stream. Where we participate in the relevant affiliate program, we may earn a commission from qualifying bookings through our sites — separate from your marketplace economics. That gives us an ongoing reason to keep improving the site. We don’t guarantee rankings, traffic or bookings.',
  },
];

export default function TourLanding() {
  const [sites, setSites] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState('All');

  useEffect(() => {
    listMicrosites().then(setSites).catch(() => setSites([]));
  }, []);

  const featured = sites.filter((s) => s.featured !== false);
  const networkSites = featured.length ? featured : sites;
  const destinations = [
    'All',
    ...Array.from(new Set(networkSites.map((s) => s.destination).filter(Boolean))).sort(),
  ];
  const carouselSites =
    destinationFilter === 'All'
      ? networkSites
      : networkSites.filter((s) => s.destination === destinationFilter);
  const marqueeItems = [...FOR_WHO, ...FOR_WHO];

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative pattern-diagonal pt-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#09294c]" />
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#3d8fd1]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#09294c]/10 blur-3xl"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14 md:pt-10 md:pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <div className="accent-bar" />
              <p className="xgen-pill">For tour operators on Viator & GetYourGuide</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.05]">
                Your tour is on Viator.{' '}
                <span className="text-[#1a5f9e]">Now give it a presence on Google.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                We build and manage a dedicated SEO site around your tours, targeting destination and
                activity searches and sending travelers directly to your existing Viator or
                GetYourGuide checkout.
              </p>
              <p className="text-lg font-semibold text-[#09294c]">
                You run the tours. We run the Google side.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a href="/get-a-site" className="xgen-btn xgen-btn-primary">
                  Get a Site for Your Tours
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#proof" className="xgen-btn xgen-btn-secondary">
                  See Live Examples
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-3xl border border-[#09294c]/12 bg-white/90 backdrop-blur-sm p-6 sm:p-7 shadow-[0_24px_60px_rgba(9,41,76,0.14)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-3">
                  Dedicated SEO Site
                </p>
                <p className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#09294c] mb-1">
                  $249<span className="text-xl text-[#09294c]/45 font-medium"> / year</span>
                </p>
                <p className="text-sm text-[#09294c]/60 mb-5">
                  One site · fully managed · live in 3 business days
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'Built around your destination and tour type',
                    'Sends travelers to your Viator or GYG checkout',
                    'Dashboard with site status & link click stats',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-gray-600 leading-snug">
                      <Check className="w-4 h-4 text-[#3d8fd1] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/get-a-site"
                  className="xgen-btn xgen-btn-primary w-full inline-flex justify-center"
                >
                  Get a Site for Your Tours
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#09294c]/08 bg-[#09294c]/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              {FLOW.map((label, i) => (
                <React.Fragment key={label}>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#09294c]/10 text-xs sm:text-sm font-semibold text-[#09294c] whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                  {i < FLOW.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#3d8fd1] shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="py-16 md:py-20 pattern-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <div className="h-1 w-12 rounded-full bg-[#3d8fd1] mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3 text-white">
              Your tour is already on Viator. But Google is a different battlefield.
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">
              Marketplace exposure is one channel. Search demand is another — and most operators leave
              it on the table.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {PROBLEMS.map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger(i)}
                className="rounded-3xl bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
              >
                <h3 className="font-semibold text-[#09294c] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who — marquee */}
      <section id="who" className="py-12 md:py-14 pattern-dots overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <motion.p {...fadeUp} className="text-sm font-semibold text-[#09294c]/55 tracking-wide">
            Built for operators selling boat tours, quads, helicopters, safaris, and more
          </motion.p>
        </div>
        <div className="relative">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f3f7fb] to-transparent z-10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f3f7fb] to-transparent z-10"
            aria-hidden
          />
          <div className="flex w-max gap-3 ventures-marquee-track py-1">
            {marqueeItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex-shrink-0 px-5 py-3 rounded-2xl border border-[#09294c]/10 bg-white text-sm font-semibold text-[#09294c] whitespace-nowrap shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Solution + How it works */}
      <section id="solution" className="py-16 md:py-20 bg-[#e8f1f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              We build the Google layer on top of your existing marketplace listing.
            </h2>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-[#09294c] leading-snug mb-4">
              Viator handles the booking.
              <br />
              We handle the Google side.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              An independent SEO site — built for high-intent Google searches and sent straight into
              the checkout travelers already trust. You don&apos;t need another booking channel.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                {...stagger(i)}
                whileHover={{ y: -4 }}
                className="rounded-3xl bg-white border border-[#09294c]/10 p-6 shadow-[0_12px_32px_rgba(9,41,76,0.06)]"
              >
                <p className="text-sm font-bold text-[#3d8fd1] mb-3">{step.num}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operator dashboard */}
      <section id="dashboard" className="py-16 md:py-20 pattern-dots overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="max-w-xl">
              <div className="accent-bar mb-4" />
              <p className="xgen-pill mb-4">Operator dashboard</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
                See status and booking-link clicks in one place.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Create a free account to join the waitlist. After your site is live, your dashboard
                shows site status and how many travelers clicked through your tracked Viator /
                GetYourGuide links — for 7 days, 30 days, 90 days, and all time.
              </p>
              <ul className="space-y-2.5 mb-7">
                {[
                  'Waitlist → queued → building → live',
                  'Tracked /go links on your SEO site',
                  'Click counts without another analytics tool',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-gray-600 leading-snug">
                    <Check className="w-4 h-4 text-[#3d8fd1] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/signup" className="xgen-btn xgen-btn-primary">
                  Create free account
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/login" className="xgen-btn xgen-btn-secondary">
                  Sign in
                </a>
              </div>
            </motion.div>

            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Why not just Viator */}
      <section id="why" className="py-16 md:py-20 pattern-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <div className="h-1 w-12 rounded-full bg-[#3d8fd1] mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              You&apos;re already on Viator. Now reach travelers searching on Google.
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">
              Viator gives you marketplace exposure. We help you reach travelers who are searching
              outside the marketplace.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div {...fadeUp}>
              <p className="text-white/70 leading-relaxed mb-6">
                Instead of competing for visibility only inside the marketplace, your tour can also
                appear in searches travelers already type — for example:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_SEARCHES.map((q) => (
                  <span
                    key={q}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/85"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-5">
                The product in one line
              </p>
              <div className="flex flex-col gap-3">
                {FLOW.map((label, i) => (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-xl bg-[#3d8fd1]/20 text-[#3d8fd1] text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-white font-medium">{label}</span>
                    </div>
                    {i < FLOW.length - 1 && (
                      <div className="ml-4 h-4 w-px bg-white/15" aria-hidden />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof — $135k first, then live examples */}
      <section id="proof" className="py-16 md:py-20 pattern-dots overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mb-8">
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Proven on our own sites
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We already operate this model ourselves. Our sites attract travelers through Google and
              send them into marketplace checkouts — now we&apos;re making the same system available
              to tour operators.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl bg-[#09294c] text-white p-7 sm:p-9 mb-8 shadow-[0_24px_60px_rgba(9,41,76,0.2)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-2">
              Network proof
            </p>
            <p className="text-4xl sm:text-5xl font-semibold tracking-tight mb-2">$135k+</p>
            <p className="text-white/70 max-w-xl leading-relaxed">
              in booking value through our tourism network. We already operate tourism sites that send
              travelers into marketplace bookings. 2xGen is now packaging the system for tour
              operators.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {PROOF_SITES.map((site, i) => (
              <motion.a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                {...stagger(i)}
                className="group rounded-3xl bg-white border border-[#09294c]/10 overflow-hidden hover:border-[#3d8fd1]/40 hover:-translate-y-1 transition-all shadow-[0_10px_28px_rgba(9,41,76,0.06)]"
              >
                {site.image && (
                  <div className="relative h-36 overflow-hidden bg-[#e8f1f8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={site.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-lg font-semibold text-[#09294c] mb-2">{site.name}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{site.line}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Live projects</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Some of our tourism sites — part of the same content network your site can connect to.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="tour-proof-prev h-11 w-11 rounded-2xl bg-white border border-[#09294c]/12 text-[#09294c] flex items-center justify-center hover:border-[#3d8fd1] hover:text-[#1a5f9e] transition-colors"
                aria-label="Previous projects"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="tour-proof-next h-11 w-11 rounded-2xl bg-white border border-[#09294c]/12 text-[#09294c] flex items-center justify-center hover:border-[#3d8fd1] hover:text-[#1a5f9e] transition-colors"
                aria-label="Next projects"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {destinations.length > 2 && (
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
              {destinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setDestinationFilter(dest)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
                    destinationFilter === dest
                      ? 'bg-[#09294c] text-white border-[#09294c]'
                      : 'bg-white text-[#09294c]/70 border-[#09294c]/10 hover:border-[#09294c]/25'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          )}

          {carouselSites.length > 0 ? (
            <Swiper
              key={destinationFilter}
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1.15}
              loop={carouselSites.length > 3}
              navigation={{
                prevEl: '.tour-proof-prev',
                nextEl: '.tour-proof-next',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                480: { slidesPerView: 1.4 },
                640: { slidesPerView: 2.1 },
                900: { slidesPerView: 2.6 },
                1100: { slidesPerView: 3.2 },
              }}
              className="tour-proof-swiper !pb-12"
            >
              {carouselSites.map((site) => {
                const accent = siteAccent(site.destination || site.domain);
                return (
                  <SwiperSlide key={site.id} className="!h-auto">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl bg-white border border-[#09294c]/08 shadow-[0_10px_30px_rgba(9,41,76,0.07)] hover:shadow-[0_18px_40px_rgba(9,41,76,0.12)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: accent }} />
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#09294c]/45 truncate">
                              {site.destination}
                            </p>
                            <h3 className="text-lg font-semibold tracking-tight text-[#09294c] group-hover:text-[#1a5f9e] transition-colors truncate">
                              {site.title || site.domain}
                            </h3>
                          </div>
                          <span className="h-8 w-8 rounded-xl bg-[#f3f7fb] text-[#09294c]/35 group-hover:bg-[#e8f1f8] group-hover:text-[#3d8fd1] flex items-center justify-center shrink-0 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <span
                          className="inline-flex self-start mb-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                          style={{ backgroundColor: `${accent}14`, color: accent }}
                        >
                          {site.category}
                        </span>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mt-auto">
                          {site.blurb}
                        </p>
                      </div>
                    </a>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p className="text-sm text-gray-500">Loading live projects…</p>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 pattern-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center mb-10">
            <div className="h-1 w-12 rounded-full bg-[#3d8fd1] mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3 text-white">
              One product. One annual price.
            </h2>
            <p className="text-lg text-white/65 leading-relaxed">
              One dedicated site for your destination and tour type — fully managed for the year. No
              setup fee. No monthly retainer.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-5 max-w-4xl mx-auto items-stretch">
            <motion.div
              {...fadeUp}
              className="rounded-3xl bg-white text-[#0c1b2a] p-7 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            >
              <p className="xgen-pill mb-4">Dedicated SEO Site</p>
              <p className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#09294c] mb-1">
                $249<span className="text-xl text-[#09294c]/45 font-medium"> / year</span>
              </p>
              <p className="text-sm text-[#09294c]/60 mb-6">
                One site · one destination/activity focus · fully managed
              </p>
              <p className="text-sm font-semibold text-[#09294c] mb-3">What&apos;s included</p>
              <ul className="space-y-2.5 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-gray-600 leading-snug">
                    <Check className="w-4 h-4 text-[#3d8fd1] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/get-a-site" className="xgen-btn xgen-btn-primary w-full inline-flex justify-center">
                Get a Site for Your Tours
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                We sell the system and the work — not guaranteed rankings or booking quotas. Results
                depend on destination, competition, and demand.
              </p>
            </motion.div>

            <motion.div
              {...stagger(1)}
              className="rounded-3xl bg-[#0c1b2a] border border-white/10 text-white p-7 sm:p-8 flex flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3d8fd1] mb-3">
                How it works
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">
                You run the tours. We run the Google side.
              </h3>
              <ul className="space-y-3 text-sm text-white/70 leading-relaxed mb-8 flex-1">
                <li>
                  Your operator dashboard shows site status and click stats for the tracked booking
                  links we place on your site — so you can see travelers moving from Google toward
                  checkout.
                </li>
                <li>
                  Every Book Now path links to your Viator or GetYourGuide tours — you keep the
                  marketplace checkout travelers already trust.
                </li>
                <li>
                  The domain and website are part of the 2xGen tourism network. That is how we keep
                  the service fully managed at one annual price — instead of roughly $500 / month
                  from a typical website agency.
                </li>
                <li>
                  Each site is custom-built from scratch for the destination and tour type — not a
                  template. No revision rounds.
                </li>
                <li>
                  We do not copy your brand, use your logos, or pretend to be the operator. Domains
                  are not based on your company name.
                </li>
              </ul>
              <div className="space-y-2 pt-2 border-t border-white/10">
                {TERMS.map((item) => (
                  <p key={item} className="text-xs text-white/55 flex gap-2">
                    <span className="text-[#3d8fd1]">→</span>
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why $249 */}
      <section id="why-price" className="py-16 md:py-20 pattern-dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="accent-bar mb-4" />
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Why is it only $249/year?
              </h2>
              <p className="text-lg font-semibold text-[#09294c] leading-snug">
                Because the annual fee isn&apos;t our only source of revenue.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="lg:col-span-7 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                You pay $249/year for us to build and manage your site. Where we participate in the
                relevant affiliate program, we may also earn a commission when travelers book through
                our sites — separate from your Viator or GetYourGuide economics.
              </p>
              <p>
                That gives us an ongoing commercial incentive to improve the site&apos;s content,
                visibility and user experience.
              </p>
              <p className="font-semibold text-[#09294c]">
                You get a fully managed site. We have a reason to keep working on it.
              </p>
              <p>The model is simple:</p>
              <ul className="space-y-2 text-base sm:text-lg">
                <li>
                  <span className="font-semibold text-[#09294c]">Traveler</span> → discovers your tour
                  on Google
                </li>
                <li>
                  <span className="font-semibold text-[#09294c]">You</span> → get a potential customer
                </li>
                <li>
                  <span className="font-semibold text-[#09294c]">Viator / GetYourGuide</span> → handles
                  the booking
                </li>
                <li>
                  <span className="font-semibold text-[#09294c]">2xGen</span> → may earn affiliate
                  commission
                </li>
              </ul>
              <p className="text-sm text-gray-500 leading-relaxed pt-1">
                We don&apos;t guarantee rankings, traffic or bookings. Results depend on destination,
                competition, demand and Google&apos;s algorithms.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Example */}
      <section id="example" className="py-16 md:py-20 bg-[#e8f1f8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">A simple example</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Gozo → a site for Gozo quad tours → appears for searches like “quad biking Gozo” →
              visitor clicks Book Now → Viator checkout → the operator gets the booking.
            </p>
            <p className="text-lg font-semibold text-[#09294c] leading-relaxed">
              That is a Google-facing site on top of the marketplace you already use — not another
              brand website to maintain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 pattern-dots">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <div className="accent-bar mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">FAQ</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <motion.div
                key={item.q}
                {...stagger(i)}
                className="rounded-2xl bg-white border border-[#09294c]/10 px-5 py-4 shadow-sm"
              >
                <h3 className="font-semibold text-[#09294c] mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="get-a-site" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-[#3d8fd1]/12 blur-3xl"
          aria-hidden
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div {...fadeUp}>
            <div className="accent-bar mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
              Get a site built around your tours
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
              Tell us about your tours on Viator or GetYourGuide — we build and manage the Google
              side for the year.
            </p>
            <a href="/get-a-site" className="xgen-btn xgen-btn-primary inline-flex">
              Get a Site for Your Tours
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-[#09294c]/55 font-medium mt-4">$249 / year · fully managed</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

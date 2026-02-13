import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Code, TrendingUp, ExternalLink, Rocket, RefreshCw, Building2, Handshake } from 'lucide-react';

const ServicesSection = () => {
  const whatWeBuild = [
    {
      icon: <Layout className="w-12 h-12 text-[#09294c]" />,
      title: "Venture Architecture",
      intro: "Before code, before design, before marketing — we define:",
      items: ["Scalable models", "Leverage points", "Monetization structures", "Long-term positioning"],
      closing: "Clarity drives build decisions."
    },
    {
      icon: <Code className="w-12 h-12 text-[#09294c]" />,
      title: "Platform & SaaS Development",
      intro: "We craft scalable digital infrastructure:",
      items: [
        "SaaS applications",
        "Marketplaces",
        "Subscription ecosystems",
        "AI-powered platforms",
        "Automation tools",
        "Data dashboards"
      ],
      closing: "Built lean. Structured to scale. Designed for long-term ownership."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#09294c]" />,
      title: "Growth Systems",
      intro: "We embed growth into the product:",
      items: [
        "Capture high-intent demand",
        "Build owned audiences",
        "Convert efficiently",
        "Drive recurring engagement"
      ],
      closing: "Growth becomes a feature, not a campaign."
    }
  ];

  const ventures = [
    { name: "TopTours.ai", description: "AI-powered discovery for global travel experiences", domain: "toptours.ai", url: "https://toptours.ai", cta: "Visit TopTours.ai" },
    { name: "ArubaBuddies.com", description: "Curated local trip planning & itineraries", domain: "arubabuddies.com", url: "https://arubabuddies.com", cta: "Visit ArubaBuddies.com" },
    { name: "FactuurBaas", description: "Streamlined invoicing for freelancers & small businesses", domain: "factuurbaas.nl", url: "https://factuurbaas.nl", cta: "Visit FactuurBaas" },
    { name: "OneHappyFinance", description: "Transparent, actionable financial information for Aruba", domain: "onehappyfinance.com", url: "https://onehappyfinance.com", cta: "Visit OneHappyFinance" },
    { name: "AruList", description: "Community-driven marketplace supporting sustainable second-hand commerce", domain: "arulist.com", url: "https://arulist.com", cta: "Visit AruList" },
    { name: "TOF Sports", description: "Digital and physical ecosystem for youth tennis & padel development", domain: "tofsports.nl", url: "https://tofsports.nl", cta: "Visit TOF Sports" },
    { name: "MyGoProfile", description: "AI-driven local profile management for businesses", domain: "mygoprofile.com", url: "https://mygoprofile.com", cta: "Visit MyGoProfile" },
    { name: "BiteReserve", description: "Track exactly which guest sources send revenue, no guessing", domain: "bitereserve.com", url: "https://bitereserve.com", cta: "Visit BiteReserve" }
  ];

  return (
    <>
      {/* What We Build */}
      <section id="services" className="py-24 md:py-32 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60 mb-6">What We Build</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-premium-gradient">What We Build</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {whatWeBuild.map((block, index) => (
              <motion.div
                key={index}
                className="card-premium p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-5 rounded-xl w-fit mb-6 shadow-inner">
                  {block.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{block.title}</h3>
                <p className="text-gray-700 mb-4 font-medium text-sm leading-relaxed">{block.intro}</p>
                <ul className="space-y-2 mb-4">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-[#09294c] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 text-sm font-medium italic">{block.closing}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ventures */}
      <section id="ventures" className="py-24 md:py-32 bg-[#f8fafc] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60 mb-6">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-premium-gradient">Our Ventures</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              2xGen builds and operates digital platforms that combine strategic positioning, scalable architecture, and measurable impact.
            </p>
          </motion.div>

          <div className="space-y-3">
            {ventures.map((venture, index) => (
              <motion.div
                key={index}
                className="card-premium flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="font-bold text-gray-900">{venture.name}</span>
                  <span className="text-gray-600"> – {venture.description}</span>
                  <span className="text-gray-500 text-sm"> ({venture.domain})</span>
                </div>
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#09294c] font-semibold hover:text-[#1a4b7a] shrink-0 transition-colors"
                >
                  {venture.cta}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-gray-600 mt-10 max-w-xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Each platform reflects our philosophy: strategic positioning, compounding digital leverage, and long-term impact.
          </motion.p>
        </div>
      </section>

      {/* Who We Work With */}
      <section id="who" className="py-24 md:py-32 bg-[#f8fafc] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60 mb-4">Audience</p>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-premium-gradient">Who We Work With</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {[
              { icon: <Rocket className="w-8 h-8 text-[#09294c]" />, text: "Founders building scalable digital platforms" },
              { icon: <RefreshCw className="w-8 h-8 text-[#09294c]" />, text: "Operators ready to transition from service to system" },
              { icon: <Building2 className="w-8 h-8 text-[#09294c]" />, text: "Businesses seeking structural, long-term digital growth" },
              { icon: <Handshake className="w-8 h-8 text-[#09294c]" />, text: "Partners aligned with strategic, selective thinking" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card-premium flex items-center gap-5 p-6 text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-4 rounded-xl">
                  {item.icon}
                </div>
                <p className="text-lg font-semibold text-gray-800 leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-gray-600 text-lg font-medium max-w-2xl mx-auto py-5 px-6 rounded-2xl bg-white/80 border border-[#09294c]/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are deliberate in what we build — quality and leverage over quantity.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;

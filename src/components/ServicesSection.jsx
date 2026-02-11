import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Users, Link, ArrowRight, ExternalLink, BarChart } from 'lucide-react';

const ServicesSection = () => {
  const products = [
    {
      icon: <Globe className="w-12 h-12 text-[#09294c]" />,
      name: "TopTours.ai",
      tagline: "Where Travelers Choose What to Do",
      description: "AI-driven tour and activity discovery platform that helps travelers find the perfect experiences worldwide. Get exposure before travelers arrive, at the decision-making stage.",
      problem: "Travelers struggle to find the right tours and activities",
      solution: "AI-powered discovery with personalized recommendations",
      features: [
        "AI-driven tour discovery",
        "Personalized one-line summaries",
        "Smart filtering and itinerary suggestions",
        "Premium visibility for partners"
      ],
      url: "https://toptours.ai/",
      cta: "Visit TopTours.ai"
    },
    {
      icon: <Globe className="w-12 h-12 text-[#09294c]" />,
      name: "ArubaBuddies.com",
      tagline: "Aruba's Local Trip Planning Platform",
      description: "Helps travelers plan Aruba trips with curated local recommendations and shared itineraries. For Aruba-based businesses, this means local credibility and high-intent exposure.",
      problem: "Aruba businesses need better visibility in trip planning",
      solution: "Local trip planning platform with curated recommendations",
      features: [
        "Curated local recommendations",
        "Shared trip itineraries",
        "High-intent traveler exposure",
        "Priority placement for partners"
      ],
      url: "https://arubabuddies.com/",
      cta: "Visit ArubaBuddies.com"
    },
    {
      icon: <Link className="w-12 h-12 text-[#09294c]" />,
      name: "BiteReserve",
      tagline: "Know Where Your Restaurant Guests Come From",
      description: "A demand-tracking platform for restaurants. Track calls, directions, clicks, and booking attempts to see which sources actually send diners. Stop guessing — know what works.",
      problem: "Restaurants can't prove which sources actually send guests — clicks don't pay bills",
      solution: "Track all guest actions to see what actually converts",
      features: [
        "Track calls, directions, clicks, and booking attempts",
        "Works with OpenTable, Resy, WhatsApp, Instagram, and more",
        "Customizable tracking page",
        "See which sources convert in one dashboard"
      ],
      url: "https://bitereserve.com/",
      cta: "Visit BiteReserve"
    },
    {
      icon: <Search className="w-12 h-12 text-[#09294c]" />,
      name: "MyGoProfile",
      tagline: "Smarter Google Business Profile Visibility",
      description: "AI-powered Google Business Profile management that improves local search visibility. Get stronger local rankings, better review management, and increased discovery.",
      problem: "Managing Google Business Profile is time-consuming and complex",
      solution: "AI-powered profile management and optimization",
      features: [
        "AI-powered review replies",
        "Optimization insights and recommendations",
        "Centralized profile management",
        "Stronger local rankings"
      ],
      url: "https://mygoprofile.com/",
      cta: "Visit MyGoProfile"
    }
  ];

  const managedServices = [
    {
      icon: <Users className="w-12 h-12 text-[#09294c]" />,
      title: "Active Human Recommendations",
      description: "We are active every day in travel communities and Facebook groups. When travelers ask 'Where should we eat?' or 'Which tour should we book?', we personally recommend partner businesses we trust.",
      benefits: [
        "Daily presence in travel communities",
        "Personal recommendations in real conversations",
        "Credibility that ads simply can't buy"
      ]
    },
    {
      icon: <Search className="w-12 h-12 text-[#09294c]" />,
      title: "Digital Visibility Review & Recommendations",
      description: "We evaluate how your business appears across Google Business Profile, Viator, OpenTable, and booking platforms. We identify what's limiting your visibility and provide clear, actionable recommendations.",
      benefits: [
        "Google Business Profile evaluation",
        "Booking platform optimization",
        "Website and booking flow review"
      ]
    },
    {
      icon: <Globe className="w-12 h-12 text-[#09294c]" />,
      title: "Ongoing Exposure to High-Intent Travelers",
      description: "Your business is promoted through private traveler newsletters, lead-capture systems, and pre-arrival planning platforms. Travelers see your business while they are actively deciding, not after.",
      benefits: [
        "Private traveler newsletters",
        "Lead-capture systems",
        "Pre-arrival planning platforms"
      ]
    },
    {
      icon: <Link className="w-12 h-12 text-[#09294c]" />,
      title: "Landing Page & Website Development",
      description: "We build high-converting landing pages and websites designed to turn visitors into bookings. Modern, mobile-responsive designs that showcase your business and make it easy for travelers to book.",
      benefits: [
        "Custom landing pages for campaigns",
        "Full website development and redesign",
        "Mobile-responsive design",
        "Booking integration and optimization"
      ]
    },
    {
      icon: <Search className="w-12 h-12 text-[#09294c]" />,
      title: "Restaurant Listing SEO Optimization",
      description: "We optimize your restaurant listings across Google Business Profile, OpenTable, TripAdvisor, and other platforms for maximum local SEO visibility. Get found when travelers search for dining options.",
      benefits: [
        "Google Business Profile optimization",
        "OpenTable and TripAdvisor optimization",
        "Local SEO keyword optimization",
        "Review management and response strategy"
      ]
    },
    {
      icon: <BarChart className="w-12 h-12 text-[#09294c]" />,
      title: "Analytics & Performance Reporting",
      description: "We analyze your data across all platforms and products to identify trends, opportunities, and areas for improvement. Get monthly reports that show what's working and what needs attention.",
      benefits: [
        "Monthly performance reports",
        "Cross-platform analytics",
        "Trend analysis and insights",
        "Actionable recommendations based on data"
      ]
    }
  ];

  return (
    <>
      {/* Products Section */}
      <section id="products" className="py-28 bg-gradient-to-br from-white via-slate-50/50 to-gray-50 hero-pattern-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8]">Our Products</span>
            </h2>
            <p className="text-2xl sm:text-3xl text-gray-800 max-w-4xl mx-auto leading-tight mb-6 font-semibold">
              Tools built specifically for tours and restaurants
            </p>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              We've built four SaaS products that work together to help hospitality businesses get found, trusted, and booked.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-[#09294c]/20 transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {product.icon}
                    </div>
                    {product.url !== "#" && (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#09294c] hover:text-[#1a4b7a] transition-colors group-hover:scale-110 transform duration-300"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-lg text-gray-600 italic font-medium mb-4">
                    {product.tagline}
                  </p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#09294c] mb-2">Problem:</p>
                    <p className="text-gray-700 mb-4">{product.problem}</p>
                    <p className="text-sm font-semibold text-[#09294c] mb-2">Solution:</p>
                    <p className="text-gray-700 mb-4">{product.solution}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <ul className="space-y-3">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-[#09294c] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700 text-base font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {product.url !== "#" && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-[#09294c] text-white rounded-xl font-semibold hover:bg-[#1a4b7a] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {product.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed Services Section */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8]">Managed Services</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
              Need hands-on help? We also offer managed services to complement our products.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {managedServices.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-[#09294c]/20 transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="mb-8 bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 text-center sm:text-left tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-8 text-center sm:text-left text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3 w-full mb-6">
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-[#09294c] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700 text-base font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#contact"
                      className="w-full text-center py-3 px-6 bg-[#09294c] text-white rounded-xl font-semibold hover:bg-[#1a4b7a] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;

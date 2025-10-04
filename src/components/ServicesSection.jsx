import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Smartphone, Zap, Link, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: <Globe className="w-12 h-12 text-[#09294c]" />,
      title: "Websites That Convert",
      description: "Your website is your digital front door. We design fast, modern, and mobile-friendly websites that look great and get results.",
      features: [
        "Custom business websites",
        "Online booking systems",
        "Landing pages for lead generation"
      ]
    },
    {
      icon: <Search className="w-12 h-12 text-[#09294c]" />,
      title: "SEO & Growth Optimization",
      description: "Being online isn't enough — you need to be found. We help you get discovered by the right people.",
      features: [
        "Local SEO to rank in your city",
        "Content strategies that attract traffic",
        "Analytics to measure what's working"
      ]
    },
    {
      icon: <Smartphone className="w-12 h-12 text-[#09294c]" />,
      title: "Custom Apps & Tools",
      description: "Need something more than a website? We create smart tools and apps tailored to your needs.",
      features: [
        "Customer dashboards",
        "Scheduling & booking apps",
        "Business management tools"
      ]
    },
    {
      icon: <Zap className="w-12 h-12 text-[#09294c]" />,
      title: "Marketing Automation",
      description: "Save time and focus on what you do best while automations work in the background.",
      features: [
        "Email campaigns & reminders",
        "CRM workflows",
        "Smart chatbots and lead nurturing"
      ]
    },
    {
      icon: <Link className="w-12 h-12 text-[#09294c]" />,
      title: "Platform Integrations",
      description: "Expand your reach by connecting to the platforms your customers already use.",
      features: [
        "Tourism businesses → Viator integration",
        "Restaurants → OpenTable connections",
        "Service providers → Google Business, Stripe, and other tools"
      ]
    },
    {
      icon: <Palette className="w-12 h-12 text-[#09294c]" />,
      title: "Digital Branding & Content",
      description: "Your brand is more than a logo — it's how people remember and trust you. We help you create a professional digital presence that stands out.",
      features: [
        "Brand identity & logo design",
        "Social media setup & content planning",
        "Copywriting that converts visitors into customers"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-slate-50 to-gray-100 hero-pattern-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">What We Do</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Smart digital solutions that help your business grow.
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At 2xGen, we don't just talk about the future — we build it. Whether you're a local business, a startup, or an established brand, we create tools that make your work easier, your reach wider, and your growth faster.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col items-center sm:items-start">
                  <div className="mb-6 bg-[#E5F5FC] p-4 rounded-lg shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center sm:text-left">
                    {service.description}
                  </p>
                  <div className="space-y-2 w-full">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-4 h-4 text-[#09294c] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why 2xGen Section */}
        <motion.div
          className="mt-20 text-center p-8 bg-gradient-to-r from-[#09294c] to-[#1a4b7a] rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">Why 2xGen?</h3>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We combine startup-level innovation with real-world business needs. That means solutions that are simple, effective, and built for the long run.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

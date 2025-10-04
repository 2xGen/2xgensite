import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Layers } from 'lucide-react';

const stats = [
  {
    value: "Reliability First",
    label: "Pragmatic Tech",
    description: "Pragmatic tech, simple architecture, secure by default.",
    icon: <Shield className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "User-Led Growth",
    label: "Data-Driven",
    description: "Talk to users, measure activation and retention, then scale.",
    icon: <Users className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "Focused Bets",
    label: "Smart Scaling",
    description: "Launch fast, double down on what works, sunset what doesn't.",
    icon: <Target className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "Compounding Systems",
    label: "Shared Tooling",
    description: "Shared tooling for analytics, growth, and ops across all brands.",
    icon: <Layers className="w-8 h-8 text-[#09294c]" />
  }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">Our Approach</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium">
            Our systematic approach to building and scaling SaaS products that deliver real value.
          </p>
        </motion.div>

        <div className="grid gap-8 grid-cols-2 lg:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover-lift text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#E5F5FC] p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#09294c] mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-[#1a4b7a] mb-3">{stat.label}</p>
              <p className="text-gray-800 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

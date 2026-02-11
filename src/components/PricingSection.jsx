import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';

const PricingSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#09294c]" />,
      title: "More Traffic",
      description: "Get found by travelers actively planning their trip"
    },
    {
      icon: <Users className="w-8 h-8 text-[#09294c]" />,
      title: "More Bookings",
      description: "Turn visibility into actual reservations and revenue"
    },
    {
      icon: <Target className="w-8 h-8 text-[#09294c]" />,
      title: "Better Results",
      description: "Work with a partner who understands your industry"
    }
  ];

  return (
    <section id="pricing" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] via-[#1a4b7a] to-[#2d6ba8]">Want More Traffic & Bookings?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Contact us to see how we can work together. We combine our products with managed services to help hospitality businesses get found, trusted, and booked.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-5 rounded-xl shadow-lg">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center p-12 bg-gradient-to-br from-[#09294c] via-[#1a4b7a] to-[#2d6ba8] rounded-3xl shadow-2xl border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">Let's Work Together</h3>
          <p className="text-xl text-blue-50 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
            Whether you need our products, managed services, or a combination of both — we'll create a solution that fits your business.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center px-10 py-5 text-lg font-bold text-white bg-white/20 hover:bg-white/30 rounded-full transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transform hover:scale-105 hover:-translate-y-1 border border-white/30"
          >
            Contact Us to Get Started
            <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

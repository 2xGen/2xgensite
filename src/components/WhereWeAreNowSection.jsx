import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Handshake, Rocket } from 'lucide-react';

const WhereWeAreNowSection = () => {
  const statusItems = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#09294c]" />,
      title: "Growing Initial Products",
      description: "We're actively scaling our current portfolio of digital products and SaaS brands."
    },
    {
      icon: <Rocket className="w-8 h-8 text-[#09294c]" />,
      title: "Preparing New Launches",
      description: "New products are in development and readying for market launch."
    },
    {
      icon: <Handshake className="w-8 h-8 text-[#09294c]" />,
      title: "Selective Partnerships",
      description: "Open to strategic partnerships that align with our vision and values."
    },
    {
      icon: <Users className="w-8 h-8 text-[#09294c]" />,
      title: "Co-Build Opportunities",
      description: "Interested in white-label and co-build opportunities with like-minded innovators."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">Where We Are Now</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're actively growing our initial products and preparing new launches.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
            Open to selective partnerships, white-label, and co-build opportunities.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statusItems.map((item, index) => (
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
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#09294c] mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhereWeAreNowSection;

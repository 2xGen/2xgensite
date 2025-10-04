import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Target } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#09294c]" />,
      title: "Build from the Ground Up",
      description: "We design, build, and scale ventures from the ground up—creating digital products and SaaS brands that make a real impact."
    },
    {
      icon: <Users className="w-8 h-8 text-[#09294c]" />,
      title: "Partnerships & Opportunities",
      description: "We explore partnerships and opportunities with others who share our vision, building a network of innovators and builders."
    },
    {
      icon: <Target className="w-8 h-8 text-[#09294c]" />,
      title: "Builders, Operators, Innovators",
      description: "At our core, we are builders, operators, and innovators, driven by technology and focused on sustainable growth."
    }
  ];

  const founderImageUrl = "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/founder%202xGen.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL2ZvdW5kZXIgMnhHZW4ucG5nIiwiaWF0IjoxNzU3MjM5NjYxLCJleHAiOjQyODAxMTk2NjF9.LeDtfzNJq5ny7A3MFdeeZb4wYii53V7tBut9vSoLrkc";

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">About 2xGen:</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a4b7a] to-[#2d6ba8]">Building the Next Generation of Digital Brands</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Founded by Matthijs, 2xGen was built with a simple mission: to turn bold ideas into successful digital ventures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center px-4">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#09294c] to-[#2d6ba8] rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative p-1 bg-white rounded-xl shadow-xl overflow-hidden">
              <img 
                src={founderImageUrl} 
                alt="Matthijs, Founder of 2xGen" 
                className="h-auto w-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-sm font-semibold text-[#09294c] text-center">
                    Matthijs, Founder 2xGen
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 sm:space-y-8 md:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">What We Do:</h3>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 bg-[#E5F5FC] p-4 rounded-lg shadow-sm mx-auto sm:mx-0">
                  {feature.icon}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="mt-20 text-center p-8 bg-gradient-to-r from-[#09294c] to-[#1a4b7a] rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            To launch and grow digital products that make a real impact, building the next generation of digital brands through technology, innovation, and smart execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "CTO, TechFlow Solutions",
      content: "2xGen transformed our entire digital infrastructure. Their innovative approach and cutting-edge solutions helped us scale our operations by 300% in just 6 months.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      company: "CEO, InnovateNow",
      content: "Working with 2xGen was a game-changer. They don't just deliver solutions; they anticipate future needs and build systems that grow with your business.",
      rating: 5
    },
    {
      name: "Elena Volkov",
      company: "Director of Operations, DataSync Corp",
      content: "The team at 2xGen truly understands next-generation technology. Their AI-powered solutions have revolutionized how we process and analyze our data.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 pb-2 leading-tight">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. See how we've helped businesses transform and thrive in the digital landscape.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gray-50 shadow-lg rounded-xl group hover-lift overflow-hidden">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#09294c]/30 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#09294c]/60" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

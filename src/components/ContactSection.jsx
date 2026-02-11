import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';

const ContactSection = () => {

  const contactInfo = [
    { icon: <Mail className="w-7 h-7 text-[#09294c]" />, title: "Company Name", lines: ["2xGen LLC"], subtext: "" },
    { icon: <MapPin className="w-7 h-7 text-[#09294c]" />, title: "Registered in", lines: ["Albuquerque, New Mexico, USA"], subtext: "" },
    { icon: <Mail className="w-7 h-7 text-[#09294c]" />, title: "Email", lines: ["matthijs@2xgen.com"], subtext: "" }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 pb-2 leading-tight">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let's talk about how we can work together to help your hospitality business get found, trusted, and booked.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-50 shadow-lg p-6 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLScbp2xgWmerblN_dTrPO46R3RPM6dUIlHIZNZDpWsZnd0-eBQ/viewform?embedded=true" 
                    width="100%" 
                    height="600" 
                    frameBorder="0" 
                    marginHeight="0" 
                    marginWidth="0"
                    className="rounded-lg"
                  >
                    Loading…
                  </iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-50 shadow-lg p-6 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 mb-4">Get in Touch</CardTitle>
                <CardDescription className="text-gray-600">
                  Whether you're interested in our products, managed services, or both — we'd love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-[#E5F5FC] p-3 rounded-lg shadow-sm">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{info.title}</h4>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-gray-600">{line}</p>
                      ))}
                      <p className="text-sm text-gray-500">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, MessageCircle, Building2 } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    { icon: <Building2 className="w-7 h-7 text-[#09294c]" />, title: "Company", lines: ["2xGen LLC"], subtext: "" },
    { icon: <MapPin className="w-7 h-7 text-[#09294c]" />, title: "Location", lines: ["Albuquerque, New Mexico, USA"], subtext: "" },
    { icon: <Mail className="w-7 h-7 text-[#09294c]" />, title: "Email", lines: ["matthijs@2xgen.com"], subtext: "" },
    {
      icon: <MessageCircle className="w-7 h-7 text-[#09294c]" />,
      title: "WhatsApp",
      lines: ["+297 566 8844"],
      subtext: "",
      href: "https://wa.me/2975668844",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f8fafc] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#09294c]/10 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#09294c]/60 mb-6">Get in touch</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="text-premium-gradient">Contact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every scalable venture begins with architecture. Contact us to start the conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="card-premium border-0 p-0 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScbp2xgWmerblN_dTrPO46R3RPM6dUIlHIZNZDpWsZnd0-eBQ/viewform?embedded=true"
                  width="100%"
                  height="520"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="rounded-xl"
                  title="Contact form"
                >
                  Loading…
                </iframe>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="card-premium border-0 p-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">Get in touch</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  2xGen LLC · Albuquerque, New Mexico, USA · matthijs@2xgen.com · WhatsApp +297 566 8844
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                const content = (
                  <>
                    <div className="flex-shrink-0 bg-gradient-to-br from-[#E5F5FC] to-[#D0E8F5] p-3 rounded-xl">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{info.title}</h4>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-gray-800 font-medium">{line}</p>
                      ))}
                    </div>
                  </>
                );
                return info.href ? (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-90 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={index} className="flex items-start gap-4">{content}</div>
                );
              })}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

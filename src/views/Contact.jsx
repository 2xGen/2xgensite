'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

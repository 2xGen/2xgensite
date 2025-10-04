import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
  useEffect(() => {
    // Update document title
    document.title = "Contact - 2xGen | Get in Touch for Your Digital Project";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions. Get in touch today.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions. Get in touch today.';
      document.head.appendChild(meta);
    }

    // Add canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://2xgen.com/contact');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://2xgen.com/contact';
      document.head.appendChild(link);
    }

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Contact - 2xGen | Get in Touch for Your Digital Project');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions. Get in touch today.');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://2xgen.com/contact');
    }

    // Add Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Contact - 2xGen | Get in Touch for Your Digital Project');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions. Get in touch today.');
    }

    // Add ContactPage structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact 2xGen",
      "description": "Contact 2xGen for your next digital project. We build AI-powered SaaS platforms, web applications, and digital solutions.",
      "url": "https://2xgen.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "2xGen",
        "url": "https://2xgen.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "matthijs@2xgen.com",
          "contactType": "business",
          "areaServed": "Worldwide",
          "availableLanguage": ["English", "Dutch"]
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://2xgen.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://2xgen.com/contact"
          }
        ]
      }
    };

    // Add structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"][data-contact]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-contact', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Reset title on component unmount
      document.title = "2xGen - Custom Digital Solutions";
      // Remove structured data script
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-contact]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

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

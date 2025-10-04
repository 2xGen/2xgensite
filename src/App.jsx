import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import ProjectsSection from '@/components/ProjectsSection';
import AdminProjects from '@/components/AdminProjects';
import Login from '@/pages/Login';
import Insights from '@/pages/Insights';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';

const HomePage = () => (
  <>
    {/* Organization Schema with Subsidiaries */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "2xGen",
          "alternateName": "2xGen LLC",
          "url": "https://2xgen.com",
          "logo": "https://2xgen.com/logo.png",
          "description": "2xGen LLC is a venture studio building and scaling the next generation of digital products.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Albuquerque",
            "addressRegion": "New Mexico",
            "addressCountry": "USA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "matthijs@2xgen.com",
            "contactType": "business"
          },
          "sameAs": [
            "https://www.linkedin.com/company/2xgen-com/"
          ],
          "subOrganization": [
            {
              "@type": "Organization",
              "name": "MyGoProfile",
              "url": "https://mygoprofile.com",
              "description": "AI-powered Google Business Profile management platform that helps businesses optimize their local SEO and manage reviews efficiently."
            },
            {
              "@type": "Organization",
              "name": "ArubaBuddies",
              "url": "https://arubabuddies.com",
              "description": "AI-powered travel planning and booking platform specializing in Aruba tours, activities, and experiences."
            },
            {
              "@type": "Organization",
              "name": "TopTours.ai",
              "url": "https://toptours.ai",
              "description": "AI-powered tour and activity discovery platform that helps travelers find the perfect experiences worldwide."
            },
            {
              "@type": "Organization",
              "name": "FactuurBaas",
              "url": "https://factuurbaas.nl",
              "description": "AI-powered invoicing platform designed for freelancers and small businesses to streamline their billing process."
            }
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Web Development",
            "SaaS Platforms",
            "Digital Products",
            "Venture Studio",
            "Local SEO",
            "Travel Technology",
            "Business Automation"
          ]
        })
      }}
    />
    
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <StatsSection />
    <CallToActionSection 
      title="We're building the next generation of digital brands"
      description="Explore our ventures or reach out to discuss partnership opportunities."
      buttonText="Start Your Project | Get in Touch"
      buttonLink="#contact"
    />
    <ContactSection />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#E5F5FC] text-gray-800">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

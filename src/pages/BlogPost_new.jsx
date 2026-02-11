import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Insights = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Blog posts data from all brands
  const blogPosts = [
    {
      id: 1,
      title: "AI and Local SEO: How Artificial Intelligence is Changing Google Business Management",
      excerpt: "Artificial Intelligence is no longer just a buzzword — it's a practical tool that's changing how businesses approach local SEO. This guide shows how AI can draft personalized review responses, turn complex analytics into plain-English insights, and save hours of manual work every week.",
      content: "Artificial Intelligence is no longer a buzzword—it's a practical tool that is fundamentally changing how small businesses approach marketing. Here's how AI is becoming the ultimate assistant for local SEO and Google Business Profile management...",
      author: "2xGen Team",
      date: "2024-01-15",
      category: "Local SEO",
      brand: "MyGoProfile",
      readTime: "8 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/AI%20and%20Local%20SEO.jpg",
      featured: true,
      externalUrl: "https://mygoprofile.com/resources/ai-and-local-seo"
    },
    {
      id: 2,
      title: "Multi-Location SEO: How to Manage Google Business Profiles at Scale",
      excerpt: "Managing one Google Business Profile is a task. Managing 2, 3, or 10+ can feel overwhelming. This article breaks down how to balance brand consistency with local relevance, and how to use centralization tools to keep your sanity while growing visibility.",
      content: "For businesses with multiple locations, managing Google Business Profiles can quickly become overwhelming. Learn how to maintain consistency while optimizing for local relevance...",
      author: "2xGen Team",
      date: "2024-01-10",
      category: "Local SEO",
      brand: "MyGoProfile",
      readTime: "6 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/Multi-Location%20SEO%20How%20to%20Manage%20Google%20Business%20Profiles%20at%20Scale.jpg",
      featured: false,
      externalUrl: "https://mygoprofile.com/resources/multi-location-seo-management"
    },
    {
      id: 3,
      title: "Does Responding to Google Reviews Boost Your Local SEO?",
      excerpt: "Does replying to every customer review really impact your rankings? The answer is yes — and this article explains why. Learn how consistent engagement builds trust with Google and customers, and how to reply effectively without burning time.",
      content: "The relationship between Google review responses and local SEO rankings is stronger than many businesses realize. Discover the science behind review engagement and its impact on visibility...",
      author: "2xGen Team",
      date: "2024-01-05",
      category: "Local SEO",
      brand: "MyGoProfile",
      readTime: "5 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/Does%20Responding%20to%20Google%20Reviews%20Boost%20Your%20Local%20SEO.jpg",
      featured: false,
      externalUrl: "https://mygoprofile.com/resources/does-responding-to-google-reviews-boost-seo"
    },
    {
      id: 4,
      title: "Top Google Business Profile Mistakes That Are Costing You Customers",
      excerpt: "From inconsistent business information to ignoring reviews, small mistakes on your Google Business Profile can lead to lost customers. Learn the most common pitfalls and how to avoid them to stay visible and trusted in local search.",
      content: "Small mistakes on your Google Business Profile can have big consequences. Learn about the most common errors that drive customers away and how to fix them...",
      author: "2xGen Team",
      date: "2023-12-28",
      category: "Local SEO",
      brand: "MyGoProfile",
      readTime: "7 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/Top%20Google%20Business%20Profile%20Mistakes%20That%20Are%20Costing%20You%20Customers.jpg",
      featured: false,
      externalUrl: "https://mygoprofile.com/resources/top-google-business-profile-mistakes"
    },
    {
      id: 5,
      title: "The Complete Guide to Google Business Profile Optimization (2025)",
      excerpt: "Your step-by-step resource for turning your Google Business Profile into a customer magnet. From optimizing your information and photos to mastering Q&A and leveraging reviews, this comprehensive guide walks you through everything you need for GBP success.",
      content: "Transform your Google Business Profile into a powerful customer acquisition tool with this comprehensive 2025 optimization guide. Covering everything from basic setup to advanced strategies...",
      author: "2xGen Team",
      date: "2023-12-20",
      category: "Local SEO",
      brand: "MyGoProfile",
      readTime: "12 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/Why%20Your%20Google%20Business%20Profile%20is%20Non-Negotiable.jpg",
      featured: false,
      externalUrl: "https://mygoprofile.com/resources/google-business-profile-optimization-2025"
    },
    // ArubaBuddies blog posts
    {
      id: 6,
      title: "Sunset Cruises in Aruba",
      excerpt: "Experience the magic of Aruba's golden hour aboard luxury catamarans and sailing vessels. From intimate trimarans to pirate-themed adventures, discover your perfect sunset cruise.",
      content: "Experience the magic of Aruba's golden hour aboard luxury catamarans and sailing vessels. From intimate trimarans to pirate-themed adventures, discover your perfect sunset cruise...",
      author: "2xGen Team",
      date: "2024-01-20",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "5 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//sunset%20cruise.webp",
      featured: false,
      externalUrl: "https://arubabuddies.com/sunset-cruises-in-aruba"
    },
    {
      id: 7,
      title: "Sea Glass Island Aruba",
      excerpt: "Perfect for travelers who love hunting hidden treasures along the shore. Discover the magical world of sea glass collecting in Aruba's hidden gem.",
      content: "Perfect for travelers who love hunting hidden treasures along the shore. Discover the magical world of sea glass collecting in Aruba's hidden gem...",
      author: "2xGen Team",
      date: "2024-01-18",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "4 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//sea%20glass.webp",
      featured: false,
      externalUrl: "https://arubabuddies.com/sea-glass-island-aruba"
    },
    {
      id: 8,
      title: "Best Half-Day, Full-Day & Night Tours in Aruba",
      excerpt: "From Island Sightseeing to Barhopping — Your Complete Guide to Aruba's Top Tours",
      content: "From Island Sightseeing to Barhopping — Your Complete Guide to Aruba's Top Tours...",
      author: "2xGen Team",
      date: "2024-01-15",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "8 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images/aruba.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/half-day-full-day-night-tours-in-aruba"
    },
    {
      id: 9,
      title: "Aruba Party Buses",
      excerpt: "Meet, dance, and explore safely aboard Aruba's most exciting party buses. From karaoke nights to DJ-driven adventures, discover your perfect nightlife experience.",
      content: "Meet, dance, and explore safely aboard Aruba's most exciting party buses. From karaoke nights to DJ-driven adventures, discover your perfect nightlife experience...",
      author: "2xGen Team",
      date: "2024-01-12",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "6 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/tour/party%20bus%20in%20Aruba.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-party-buses"
    },
    {
      id: 10,
      title: "Aruba Essentials",
      excerpt: "9 Must-Have Items for Your Perfect Island Vacation",
      content: "9 Must-Have Items for Your Perfect Island Vacation...",
      author: "2xGen Team",
      date: "2024-01-10",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "7 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/must-haves//reef%20safe%20sunscreen.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-essentials"
    },
    {
      id: 11,
      title: "Beach Gear Rentals",
      excerpt: "Rent everything you need for the perfect beach day in Aruba. From comfortable beach chairs and umbrellas to snorkeling gear and beach games.",
      content: "Rent everything you need for the perfect beach day in Aruba. From comfortable beach chairs and umbrellas to snorkeling gear and beach games...",
      author: "2xGen Team",
      date: "2024-01-08",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "5 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/beach-gear//coconutrentals_beachchair.png",
      featured: false,
      externalUrl: "https://arubabuddies.com/beach-gear-rentals-in-aruba"
    },
    {
      id: 12,
      title: "Baby Equipment Rentals",
      excerpt: "Rent everything you need for your baby's comfort in Aruba. From strollers and car seats to cribs and high chairs, we make traveling with little ones easy and stress-free.",
      content: "Rent everything you need for your baby's comfort in Aruba. From strollers and car seats to cribs and high chairs, we make traveling with little ones easy and stress-free...",
      author: "2xGen Team",
      date: "2024-01-05",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "4 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/babyquip//baby%20quip%20aruba.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-baby-equipment-rentals"
    },
    {
      id: 13,
      title: "ATV, UTV & Jeep Tours in Aruba",
      excerpt: "Experience the thrill of off-road adventure across Aruba's rugged terrain. From guided ATV tours to private Jeep expeditions, discover the island's hidden gems.",
      content: "Experience the thrill of off-road adventure across Aruba's rugged terrain. From guided ATV tours to private Jeep expeditions, discover the island's hidden gems...",
      author: "2xGen Team",
      date: "2024-01-03",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "6 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images//atv%20off%20road.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/atv-utv-jeep-tours-in-aruba"
    },
    {
      id: 14,
      title: "Family-Friendly Activities in Aruba",
      excerpt: "Create unforgettable family memories with exciting adventures, educational experiences, and fun activities designed for the whole family. From water sports to animal encounters, discover your perfect family adventure.",
      content: "Create unforgettable family memories with exciting adventures, educational experiences, and fun activities designed for the whole family. From water sports to animal encounters, discover your perfect family adventure...",
      author: "2xGen Team",
      date: "2024-01-01",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "8 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//aruba%20family%20on%20beach.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/best-family-friendly-activities"
    },
    {
      id: 15,
      title: "A Complete Guide to Visiting Aruba for First-Time Travelers",
      excerpt: "Everything You Need to Know for Your Perfect Caribbean Vacation (2025)",
      content: "Everything You Need to Know for Your Perfect Caribbean Vacation (2025)...",
      author: "2xGen Team",
      date: "2023-12-28",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "12 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images//ArubaBuddies%20Beach%20Shade.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-first-time-travelers-guide"
    },
    {
      id: 16,
      title: "Best Snorkeling Spots in Aruba",
      excerpt: "Complete Guide to Underwater Adventures — Discover Crystal-Clear Waters & Vibrant Marine Life",
      content: "Complete Guide to Underwater Adventures — Discover Crystal-Clear Waters & Vibrant Marine Life...",
      author: "2xGen Team",
      date: "2023-12-25",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "7 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//snorkeling.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/snorkeling-in-aruba"
    },
    {
      id: 17,
      title: "Top Private Tours in Aruba",
      excerpt: "Exclusive Experiences & Personalized Adventures — Your Complete Guide to Aruba's Best Private Tours",
      content: "Exclusive Experiences & Personalized Adventures — Your Complete Guide to Aruba's Best Private Tours...",
      author: "2xGen Team",
      date: "2023-12-22",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "9 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours/private%20island%20tours%20aruba.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/top-private-tours-in-aruba"
    },
    {
      id: 18,
      title: "Aruba Airport VIP Arrival & Departure Services (2025)",
      excerpt: "Skip the Lines and Start Sooner — Fast Track Immigration & VIP Lounge Access",
      content: "Skip the Lines and Start Sooner — Fast Track Immigration & VIP Lounge Access...",
      author: "2xGen Team",
      date: "2023-12-20",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "5 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/images//Airport%20VIP%20Meet%20and%20Greet%20Arrival%20Assistance%20Service.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-vip-airport-service"
    },
    {
      id: 19,
      title: "Aruba ED Card & $20 Sustainability Fee",
      excerpt: "Apply Online — Don't Get Scammed by Fake Websites Charging $100+",
      content: "Apply Online — Don't Get Scammed by Fake Websites Charging $100+...",
      author: "2xGen Team",
      date: "2023-12-18",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "6 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//aruba%20airport%20ed.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/aruba-ed-card"
    },
    {
      id: 20,
      title: "Deep Sea Fishing in Aruba",
      excerpt: "Book the best private fishing charter in Aruba for an unforgettable deep sea fishing experience. From marlin and mahi-mahi to tuna and barracuda, discover your perfect fishing adventure.",
      content: "Book the best private fishing charter in Aruba for an unforgettable deep sea fishing experience. From marlin and mahi-mahi to tuna and barracuda, discover your perfect fishing adventure...",
      author: "2xGen Team",
      date: "2023-12-15",
      category: "Travel",
      brand: "ArubaBuddies",
      readTime: "7 min read",
      image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/new-tours//Private%20Afternoon%20Fishing%20Charter%20in%20Aruba%201.jpg",
      featured: false,
      externalUrl: "https://arubabuddies.com/fishing-in-aruba"
    },
    // 2xGen blog posts
    {
      id: 21,
      title: "How AI Is Transforming Web Development in 2025",
      excerpt: "Discover how artificial intelligence is reshaping the way websites and SaaS platforms are built — from automated coding to smarter user experiences.",
      content: "Web development is evolving at lightning speed. In 2025, artificial intelligence isn't just an add-on — it's becoming the backbone of how websites, SaaS platforms, and digital products are created...",
      author: "2xGen Team",
      date: "2025-01-30",
      category: "Technology",
      brand: "2xGen",
      readTime: "5 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/How%20AI%20Is%20Transforming%20Web%20Development%20in%202025.png",
      featured: true,
      slug: "ai-transforming-web-development"
    },
    {
      id: 22,
      title: "How We Build Products at 2xGen: Our Development Process",
      excerpt: "From concept to launch, discover our systematic approach to building digital products that users love. Learn about our agile methodology, design thinking process, and quality assurance practices.",
      content: "At 2xGen, we believe that great products are built through a combination of systematic processes, user-centric design, and continuous iteration. Our development methodology has evolved over years of building successful digital platforms...",
      author: "2xGen Team",
      date: "2024-01-30",
      category: "Development Process",
      brand: "2xGen",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: true,
      slug: "how-we-build-products-at-2xgen"
    },
    {
      id: 23,
      title: "The 2xGen Tech Stack: Modern Tools for Modern Solutions",
      excerpt: "Explore the technologies and frameworks we use to build scalable, maintainable, and performant digital products. From React and Node.js to cloud infrastructure and deployment strategies.",
      content: "Choosing the right technology stack is crucial for building products that can scale and evolve. At 2xGen, we've carefully selected our tools based on performance, developer experience, and long-term maintainability...",
      author: "2xGen Team",
      date: "2024-01-28",
      category: "Technology",
      brand: "2xGen",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      featured: false,
      slug: "2xgen-tech-stack-modern-tools"
    },
    {
      id: 24,
      title: "From Idea to Launch: Our Product Development Timeline",
      excerpt: "How long does it take to build a digital product? We break down our typical development phases, from initial concept and wireframing to testing, deployment, and post-launch optimization.",
      content: "One of the most common questions we receive is: 'How long will it take to build my product?' While every project is unique, we follow a structured timeline that ensures quality and efficiency...",
      author: "2xGen Team",
      date: "2024-01-25",
      category: "Project Management",
      brand: "2xGen",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      slug: "product-development-timeline-2xgen"
    },
    {
      id: 25,
      title: "Why We Choose React: Our Frontend Development Philosophy",
      excerpt: "Discover why React has become our go-to framework for building user interfaces. Learn about component-based architecture, state management, and how we ensure optimal performance.",
      content: "React has revolutionized how we build user interfaces. Its component-based architecture, virtual DOM, and rich ecosystem make it the perfect choice for building scalable web applications...",
      author: "2xGen Team",
      date: "2024-01-22",
      category: "Frontend Development",
      brand: "2xGen",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      slug: "why-we-choose-react-frontend-philosophy"
    },
    {
      id: 26,
      title: "Building for Scale: Our Backend Architecture Principles",
      excerpt: "Learn how we design backend systems that can handle growth. From database design and API architecture to caching strategies and microservices, discover our approach to scalable development.",
      content: "Building a backend that can scale with your business is crucial for long-term success. Our architecture principles focus on modularity, performance, and maintainability...",
      author: "2xGen Team",
      date: "2024-01-20",
      category: "Backend Development",
      brand: "2xGen",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      slug: "building-for-scale-backend-architecture"
    },
    // TopTours.ai blog posts
    {
      id: 27,
      title: "How TopTours.ai Works",
      excerpt: "Discover how our AI-powered platform transforms the way you plan and book travel experiences.",
      content: "Discover how our AI-powered platform transforms the way you plan and book travel experiences...",
      author: "2xGen Team",
      date: "2024-01-25",
      category: "AI & Technology",
      brand: "TopTours.ai",
      readTime: "6 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/destinations//Antigua.jpg",
      featured: false,
      externalUrl: "https://toptours.ai/how-it-works"
    },
    {
      id: 28,
      title: "About TopTours.ai",
      excerpt: "We're revolutionizing travel planning with AI-powered recommendations that help you discover the perfect tours and activities for your unique travel style.",
      content: "We're revolutionizing travel planning with AI-powered recommendations that help you discover the perfect tours and activities for your unique travel style...",
      author: "2xGen Team",
      date: "2024-01-22",
      category: "AI & Technology",
      brand: "TopTours.ai",
      readTime: "5 min read",
      image: "https://images.unsplash.com/flagged/photo-1564445477052-8a3787406bbf",
      featured: false,
      externalUrl: "https://toptours.ai/about"
    },
    {
      id: 29,
      title: "Popular Destinations on TopTours.ai",
      excerpt: "Discover incredible tours and activities in the world's most captivating destinations.",
      content: "Discover incredible tours and activities in the world's most captivating destinations...",
      author: "2xGen Team",
      date: "2024-01-20",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "7 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/destinations//Amalfi%20Coast.webp",
      featured: false,
      externalUrl: "https://toptours.ai/destinations"
    }
  ];

  // Get unique brands for filter
  const brands = ['all', ...new Set(blogPosts.map(post => post.brand))];
  
  // Filter posts by selected brand
  const filteredPosts = selectedBrand === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.brand === selectedBrand);

  // SEO meta tags
  useEffect(() => {
    // Update document title
    document.title = "Insights - 2xGen | Knowledge from All Our Brands & Projects";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the latest blogs, news updates, and insights shared across all our brands and projects. Discover strategies from MyGoProfile, ArubaBuddies, TopTours.ai and more.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Read the latest blogs, news updates, and insights shared across all our brands and projects. Discover strategies from MyGoProfile, ArubaBuddies, TopTours.ai and more.';
      document.head.appendChild(meta);
    }

    // Add canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://2xgen.com/insights');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://2xgen.com/insights';
      document.head.appendChild(link);
    }

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Insights - 2xGen | Knowledge from All Our Brands & Projects');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Read the latest blogs, news updates, and insights shared across all our brands and projects. Discover strategies from MyGoProfile, ArubaBuddies, TopTours.ai and more.');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://2xgen.com/insights');
    }

    // Add Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Insights - 2xGen | Knowledge from All Our Brands & Projects');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Read the latest blogs, news updates, and insights shared across all our brands and projects. Discover strategies from MyGoProfile, ArubaBuddies, TopTours.ai and more.');
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Insights - 2xGen",
      "description": "Read the latest blogs, news updates, and insights shared across all our brands and projects. Discover strategies from MyGoProfile, ArubaBuddies, TopTours.ai and more.",
      "url": "https://2xgen.com/insights",
      "mainEntity": {
        "@type": "ItemList",
        "name": "2xGen Brand Insights",
        "description": "Collection of insights, blogs, and updates from all 2xGen brands and projects",
        "numberOfItems": blogPosts.length,
        "itemListElement": blogPosts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "url": post.externalUrl,
            "author": {
              "@type": "Organization",
              "name": "2xGen Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "2xGen",
              "url": "https://2xgen.com"
            },
            "datePublished": post.date,
            "image": post.image
          }
        }))
      }
    };

    // Add structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"][data-insights]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-insights', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Reset title on component unmount
      document.title = "2xGen - Custom Digital Solutions";
      // Remove structured data script
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-insights]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [blogPosts]);

  return (
    <div className="min-h-screen bg-[#E5F5FC]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">
                Insights
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
              <strong>Knowledge from All Our Brands & Projects</strong>
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Read the latest blogs, news updates, and insights shared across all our brands and projects.
            </p>
            
            {/* Brand Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedBrand === brand
                      ? 'bg-[#09294c] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </button>
              ))}
            </div>
            
            {/* Blog Posts Grid */}
            <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#09294c] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.brand}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#09294c] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-4">{post.excerpt}</p>
                  </div>
                  
                  {post.brand === '2xGen' ? (
                    <a 
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center justify-center bg-[#09294c] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1a4b7a] transition-colors group w-fit"
                    >
                      Read More
                    </a>
                  ) : (
                    <a 
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#09294c] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1a4b7a] transition-colors group w-fit"
                    >
                      Read More <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">No posts found for the selected brand.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Insights;

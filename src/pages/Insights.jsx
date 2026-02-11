import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Insights = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');

  // Brand homepage URLs
  const brandHomepages = {
    'MyGoProfile': 'https://mygoprofile.com',
    'ArubaBuddies': 'https://arubabuddies.com',
    'TopTours.ai': 'https://toptours.ai',
    'FactuurBaas': 'https://factuurbaas.nl'
  };

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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "insights",
      slug: "ai-transforming-web-development"
    },
    {
      id: 22,
      title: "Validating SaaS Ideas Before You Build: Our Process at 2xGen",
      excerpt: "Learn how we reduce risk by validating SaaS ideas before writing a single line of code — saving time, money, and maximizing chances of success.",
      content: "Launching a SaaS product is exciting, but also risky. Too often, founders jump straight into development without knowing if people actually want their solution. At 2xGen, we believe the smartest way to build is to validate first, code later...",
      author: "2xGen Team",
      date: "2025-01-30",
      category: "Business Strategy",
      brand: "2xGen",
      readTime: "7 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/Validating%20SaaS%20Ideas%20Before%20You%20Build.png",
      featured: true,
      contentType: "insights",
      slug: "validating-saas-ideas"
    },
           {
             id: 23,
             title: "Integrating Viator and OpenAI APIs: Powering Smarter Travel Experiences",
             excerpt: "See how we combined Viator's travel data with OpenAI's intelligence to create next-gen platforms like ArubaBuddies and TopTours.ai.",
             content: "At 2xGen, we've built two innovative travel platforms — ArubaBuddies.com and TopTours.ai — using the power of APIs to deliver smarter, more personalized travel experiences...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Technology",
             brand: "2xGen",
             readTime: "8 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/Integrating%20Viator%20and%20OpenAI%20APIs.png",
             featured: true,
             contentType: "insights",
             slug: "viator-openai-integration",
             relatedBrands: ["ArubaBuddies", "TopTours.ai"]
           },
           {
             id: 24,
             title: "MyGoProfile: 100% Built on Google, Powered by AI",
             excerpt: "Learn how MyGoProfile was built entirely on Google's ecosystem — Firebase, Firestore, Gemini, and verified APIs — making it the ultimate digital profile tool.",
             content: "Learn how MyGoProfile was built entirely on Google's ecosystem — Firebase, Firestore, Gemini, and verified APIs — making it the ultimate digital profile tool...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Technology",
             brand: "2xGen",
             readTime: "9 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/MyGoProfile%20100%20Built%20on%20Google,%20Powered%20by%20AI.png",
             featured: true,
             contentType: "insights",
             slug: "mygoprofile-built-on-google",
             relatedBrands: ["MyGoProfile"],
             externalUrl: "/insights/mygoprofile-built-on-google"
           },
           {
             id: 25,
             title: "Changing the Way People Book in Aruba With ArubaBuddies",
             excerpt: "ArubaBuddies is transforming local tourism by connecting travelers directly with businesses. Here's how we're building a smarter booking future.",
             content: "ArubaBuddies is transforming local tourism by connecting travelers directly with businesses. Here's how we're building a smarter booking future...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Technology",
             brand: "2xGen",
             readTime: "8 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/Changing%20the%20Way%20People%20Book%20in%20Aruba%20With%20ArubaBuddies.png",
             featured: true,
             contentType: "insights",
             slug: "arubabuddies-changing-bookings",
             relatedBrands: ["ArubaBuddies"],
             externalUrl: "/insights/arubabuddies-changing-bookings"
           },
           {
             id: 26,
             title: "From Idea to Clicks: The Story Behind TopTours.ai",
             excerpt: "It all started with a simple idea: in two clicks, travelers should see the best tours and attractions. Here's how TopTours.ai came to life.",
             content: "It all started with a simple idea: in two clicks, travelers should see the best tours and attractions. Here's how TopTours.ai came to life...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Technology",
             brand: "2xGen",
             readTime: "7 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/The%20Story%20Behind%20TopTours.png",
             featured: true,
             contentType: "insights",
             slug: "story-behind-toptours-ai",
             relatedBrands: ["TopTours.ai"],
             externalUrl: "/insights/story-behind-toptours-ai"
           },
           {
             id: 30,
             title: "Why Starting Free Isn't a Bad Idea for SaaS Growth",
             excerpt: "Offering a free plan can feel risky, but it's one of the smartest ways to build trust, grow adoption, and turn users into paying customers. Here's why we launched FactuurBaas with a free invoicing tool.",
             content: "Offering a free plan can feel risky, but it's one of the smartest ways to build trust, grow adoption, and turn users into paying customers. Here's why we launched FactuurBaas with a free invoicing tool...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Business Strategy",
             brand: "2xGen",
             readTime: "6 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/Why%20Starting%20Free%20Isnt%20a%20Bad%20Idea%20for%20SaaS%20Growth.png",
             featured: true,
             contentType: "insights",
             slug: "starting-free-saas-growth",
             relatedBrands: ["FactuurBaas"],
             externalUrl: "/insights/starting-free-saas-growth"
           },
           {
             id: 31,
               title: "Building SaaS With \"Long Breath\": Why Persistence Wins",
             excerpt: "SaaS is not a sprint — it's a marathon. Here's how staying consistent and adapting over time creates lasting, scalable businesses.",
             content: "SaaS is not a sprint — it's a marathon. Here's how staying consistent and adapting over time creates lasting, scalable businesses...",
             author: "2xGen Team",
             date: "2025-01-30",
             category: "Business Strategy",
             brand: "2xGen",
             readTime: "7 min read",
             image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/2xGen%20Blogs/SaaS%20is%20not%20a%20sprint.png",
             featured: true,
             contentType: "insights",
             slug: "persistence-in-saas",
             externalUrl: "/insights/persistence-in-saas"
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
      contentType: "external",
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
      contentType: "external",
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
      contentType: "external",
      externalUrl: "https://toptours.ai/destinations"
    },
    {
      id: 44,
      title: "How to Use AI to Find the Best Tours for Your Next Trip",
      excerpt: "Discover how AI helps you find the best tours and activities worldwide. TopTours.ai connects you to Viator's 300,000+ experiences in seconds — fast, free, and personalized.",
      content: "Discover how AI helps you find the best tours and activities worldwide. TopTours.ai connects you to Viator's 300,000+ experiences in seconds — fast, free, and personalized...",
      author: "2xGen Team",
      date: "2025-01-28",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "6 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/How%20to%20Use%20AI%20to%20Create%20Your%20Dream%20Travel%20Itinerary.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/ai-travel-itinerary-planning"
    },
    {
      id: 45,
      title: "Private vs Group Tours: Which One Is Right for You?",
      excerpt: "Compare private vs group tours and discover which travel style fits you best. Learn the pros, cons, and smart ways to find the perfect tour with TopTours.ai.",
      content: "Compare private vs group tours and discover which travel style fits you best. Learn the pros, cons, and smart ways to find the perfect tour with TopTours.ai...",
      author: "2xGen Team",
      date: "2025-01-26",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "7 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/Private%20vs%20Group%20Tours.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/private-vs-group-tours"
    },
    {
      id: 46,
      title: "How to Plan a Multi-Destination Trip Without the Stress",
      excerpt: "Learn how to plan a seamless multi-destination trip with smart route planning, flexible tour booking, and AI-powered tools from TopTours.ai.",
      content: "Learn how to plan a seamless multi-destination trip with smart route planning, flexible tour booking, and AI-powered tools from TopTours.ai...",
      author: "2xGen Team",
      date: "2025-01-24",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "8 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/How%20to%20Plan%20a%20Multi-Destination%20Trip%20Without%20the%20Stress.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/multi-destination-trip-planning"
    },
    {
      id: 47,
      title: "7 Smart Ways to Save Money on Tours and Activities",
      excerpt: "Discover how to find affordable tours and activities worldwide. Learn 7 proven ways to save money on travel experiences with AI-powered recommendations.",
      content: "Discover how to find affordable tours and activities worldwide. Learn 7 proven ways to save money on travel experiences with AI-powered recommendations...",
      author: "2xGen Team",
      date: "2025-01-22",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "6 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/7%20Smart%20Ways%20to%20Save%20Money%20on%20Tours%20and%20Activities.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/save-money-on-tours-activities"
    },
    {
      id: 48,
      title: "What to Pack for a Beach Vacation: The Ultimate Checklist",
      excerpt: "Get the ultimate beach vacation packing checklist with essential items, beach gear, and travel tips. Discover what to pack for a perfect beach getaway.",
      content: "Get the ultimate beach vacation packing checklist with essential items, beach gear, and travel tips. Discover what to pack for a perfect beach getaway...",
      author: "2xGen Team",
      date: "2025-01-20",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "5 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/What%20to%20Pack%20for%20a%20Beach%20Vacation.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/beach-vacation-packing-list"
    },
    {
      id: 49,
      title: "How to Choose the Best Tour for Your Next Vacation",
      excerpt: "Learn how to choose the best tour for your vacation. Compare guided tours vs private tours, find the right tour types, and discover what makes a tour experience unforgettable.",
      content: "Learn how to choose the best tour for your vacation. Compare guided tours vs private tours, find the right tour types, and discover what makes a tour experience unforgettable...",
      author: "2xGen Team",
      date: "2025-01-18",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "7 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/How%20to%20Choose%20the%20Best%20Tour%20for%20Your%20Next%20Vacation.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/how-to-choose-a-tour"
    },
    {
      id: 50,
      title: "Best Time to Book Tours and Activities for the Lowest Prices",
      excerpt: "Discover the best time to book tours and activities for the lowest prices. Learn when to book tours, find tour discounts, and save money on your travel experiences.",
      content: "Discover the best time to book tours and activities for the lowest prices. Learn when to book tours, find tour discounts, and save money on your travel experiences...",
      author: "2xGen Team",
      date: "2025-01-16",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "6 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/Best%20Time%20to%20Book%20Tours%20and%20Activities.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/when-to-book-tours"
    },
    {
      id: 51,
      title: "10 Common Mistakes Travelers Make (and How to Avoid Them)",
      excerpt: "Discover the 10 most common travel mistakes and learn how to avoid them. Make every trip smoother, smarter, and stress-free with these expert travel insights.",
      content: "Discover the 10 most common travel mistakes and learn how to avoid them. Make every trip smoother, smarter, and stress-free with these expert travel insights...",
      author: "2xGen Team",
      date: "2025-01-14",
      category: "Travel",
      brand: "TopTours.ai",
      readTime: "8 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/10%20Common%20Mistakes%20Travelers%20Make%20and%20How%20to%20Avoid%20Them.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/travel-mistakes-to-avoid"
    },
    {
      id: 52,
      title: "How to Plan a Trip with AI: The Future of Smart Travel",
      excerpt: "Discover how AI trip planners revolutionize travel planning with personalized recommendations, smart itineraries, and automated booking. The complete guide to AI-powered travel planning.",
      content: "Discover how AI trip planners revolutionize travel planning with personalized recommendations, smart itineraries, and automated booking. The complete guide to AI-powered travel planning...",
      author: "2xGen Team",
      date: "2025-01-12",
      category: "AI & Technology",
      brand: "TopTours.ai",
      readTime: "9 min read",
      image: "https://ouqeoizufbofdqbuiwvx.supabase.co/storage/v1/object/public/blogs/How%20to%20Plan%20a%20Trip%20with%20AI.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://www.toptours.ai/travel-guides/ai-travel-planning-guide"
    },
    // FactuurBaas blog posts
    {
      id: 32,
      title: "Free Invoice Maker: Create Online Invoices with FactuurBaas",
      excerpt: "Comparison of free invoicing software for freelancers, including tips to use FactuurBaas effectively.",
      content: "Comparison of free invoicing software for freelancers, including tips to use FactuurBaas effectively...",
      author: "2xGen Team",
      date: "2024-01-15",
      category: "Invoicing",
      brand: "FactuurBaas",
      readTime: "5 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Gratis%20factuur%20maken%20Factuurbaas%20gratis%20online%20facturen%20maken.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/gratis-factuur-zzp"
    },
    {
      id: 33,
      title: "How to Create an Invoice as a Freelancer (Step-by-Step + Free Example)",
      excerpt: "A practical guide for starting freelancers on how to create an invoice, including required elements and useful tips.",
      content: "A practical guide for starting freelancers on how to create an invoice, including required elements and useful tips...",
      author: "2xGen Team",
      date: "2024-01-12",
      category: "Invoicing",
      brand: "FactuurBaas",
      readTime: "7 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Hoe%20maak%20je%20een%20factuur%20als%20zzp%20er.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factuur-maken-zzp"
    },
    {
      id: 34,
      title: "7 Common Invoice Mistakes and How to Avoid Them",
      excerpt: "Many freelancers make mistakes on invoices without realizing it. Learn how to prevent them and always invoice professionally.",
      content: "Many freelancers make mistakes on invoices without realizing it. Learn how to prevent them and always invoice professionally...",
      author: "2xGen Team",
      date: "2024-01-10",
      category: "Invoicing",
      brand: "FactuurBaas",
      readTime: "6 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/7%20veelgemaakte%20fouten%20op%20facturen%20en%20hoe%20je%20ze%20voorkomt.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factuur-fouten-voorkomen"
    },
    {
      id: 35,
      title: "VAT on Your Invoice: How Freelancers Can Get It Right",
      excerpt: "Clear explanation of how VAT works on invoices, including the small business scheme (KOR) and invoicing international clients.",
      content: "Clear explanation of how VAT works on invoices, including the small business scheme (KOR) and invoicing international clients...",
      author: "2xGen Team",
      date: "2024-01-08",
      category: "Tax & Finance",
      brand: "FactuurBaas",
      readTime: "8 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Btw%20op%20je%20factuur%20zo%20doe%20je%20het%20goed%20als%20zzp%20er.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/btw-factuur-zzp"
    },
    {
      id: 36,
      title: "Invoicing Foreign Clients: VAT, Currency, and Rules",
      excerpt: "How to create invoices for international clients, including VAT regulations and currency adjustments.",
      content: "How to create invoices for international clients, including VAT regulations and currency adjustments...",
      author: "2xGen Team",
      date: "2024-01-05",
      category: "International Business",
      brand: "FactuurBaas",
      readTime: "6 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Buitenlandse%20klanten%20factureren.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/buitenlandse-klanten-factureren"
    },
    {
      id: 37,
      title: "The Best Way for Freelancers to Get Paid Faster",
      excerpt: "Tips and strategies to receive payments quicker, from payment terms to smart payment methods.",
      content: "Tips and strategies to receive payments quicker, from payment terms to smart payment methods...",
      author: "2xGen Team",
      date: "2024-01-03",
      category: "Business Tips",
      brand: "FactuurBaas",
      readTime: "5 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/De%20beste%20manier%20om%20sneller%20betaald%20te%20krijgen%20als%20zzp%20er.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/sneller-betalen-factuur"
    },
    {
      id: 38,
      title: "Invoicing as a Starting Freelancer: Everything You Need to Know",
      excerpt: "From Chamber of Commerce number to payment terms: a complete overview of invoicing for beginners.",
      content: "From Chamber of Commerce number to payment terms: a complete overview of invoicing for beginners...",
      author: "2xGen Team",
      date: "2024-01-01",
      category: "Beginner Guide",
      brand: "FactuurBaas",
      readTime: "9 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Factureren%20als%20startende%20zzp%20er.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factureren-startende-zzper"
    },
    {
      id: 39,
      title: "Invoicing Without an Account: Start Immediately with FactuurBaas",
      excerpt: "Discover how to create a professional invoice instantly with FactuurBaas — no registration required.",
      content: "Discover how to create a professional invoice instantly with FactuurBaas — no registration required...",
      author: "2xGen Team",
      date: "2023-12-28",
      category: "Quick Start",
      brand: "FactuurBaas",
      readTime: "4 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Factureren%20zonder%20account.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factureren-zonder-account"
    },
    {
      id: 40,
      title: "Useful Invoice Templates for Freelancers",
      excerpt: "Free templates and examples to create professional invoices quickly with FactuurBaas.",
      content: "Free templates and examples to create professional invoices quickly with FactuurBaas...",
      author: "2xGen Team",
      date: "2023-12-25",
      category: "Templates",
      brand: "FactuurBaas",
      readTime: "6 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Handige%20factuur%20templates%20voor%20zzp%20ers.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factuur-templates-zzp"
    },
    {
      id: 41,
      title: "How to Easily Download and Send an Invoice PDF",
      excerpt: "Step-by-step explanation on how to create and send a PDF invoice directly with FactuurBaas.",
      content: "Step-by-step explanation on how to create and send a PDF invoice directly with FactuurBaas...",
      author: "2xGen Team",
      date: "2023-12-22",
      category: "How-to Guide",
      brand: "FactuurBaas",
      readTime: "5 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Hoe%20je%20eenvoudig%20een%20factuur%20PDF%20downloadt%20en%20verstuurt.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factuur-pdf-downloaden"
    },
    {
      id: 42,
      title: "Smart Invoice Management: Keep Track of All Your Income",
      excerpt: "Tips and tools to manage your invoices, payment statuses, and income in an organized way.",
      content: "Tips and tools to manage your invoices, payment statuses, and income in an organized way...",
      author: "2xGen Team",
      date: "2023-12-20",
      category: "Management",
      brand: "FactuurBaas",
      readTime: "7 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Slim%20factuurbeheer.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/factuurbeheer-overzicht"
    },
    {
      id: 43,
      title: "What's the Difference Between an Invoice and a Quote?",
      excerpt: "Explanation of when to use a quote or invoice, and how to combine them effectively with FactuurBaas.",
      content: "Explanation of when to use a quote or invoice, and how to combine them effectively with FactuurBaas...",
      author: "2xGen Team",
      date: "2023-12-18",
      category: "Business Basics",
      brand: "FactuurBaas",
      readTime: "6 min read",
      image: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Blogs/Wat%20is%20het%20verschil%20tussen%20een%20factuur%20en%20een%20offerte.png",
      featured: false,
      contentType: "external",
      externalUrl: "https://factuurbaas.nl/blogs/verschil-factuur-offerte"
    }
  ];

  // Get unique brands for filter (including relatedBrands)
  const allBrands = blogPosts.flatMap(post => [
    post.brand,
    ...(post.relatedBrands || [])
  ]);
  const brands = ['all', ...new Set(allBrands)];
  
  // Content type options
  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'external', label: 'External Blogs' },
    { value: 'insights', label: '2xGen Insights' }
  ];

  // Helper function to get count for a specific brand
  const getBrandCount = (brand) => {
    return blogPosts.filter(post => 
      brand === 'all' || 
      post.brand === brand || 
      (post.relatedBrands && post.relatedBrands.includes(brand))
    ).length;
  };

  // Helper function to get count for a specific brand with content type
  const getBrandContentTypeCount = (brand, contentType) => {
    return blogPosts.filter(post => {
      const brandMatch = brand === 'all' || 
        post.brand === brand || 
        (post.relatedBrands && post.relatedBrands.includes(brand));
      const contentTypeMatch = contentType === 'all' || post.contentType === contentType;
      return brandMatch && contentTypeMatch;
    }).length;
  };

  // Helper function to get count for a specific content type
  const getContentTypeCount = (contentType) => {
    return blogPosts.filter(post => 
      contentType === 'all' || post.contentType === contentType
    ).length;
  };
  
  // Filter posts by selected brand and content type
  const filteredPosts = blogPosts.filter(post => {
    const brandMatch = selectedBrand === 'all' || 
      post.brand === selectedBrand || 
      (post.relatedBrands && post.relatedBrands.includes(selectedBrand));
    
    const contentTypeMatch = selectedContentType === 'all' || 
      post.contentType === selectedContentType;
    
    return brandMatch && contentTypeMatch;
  });

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
                   <div className="flex flex-wrap gap-2 justify-center mb-4">
                     <span className="text-sm font-medium text-gray-600 mb-2 w-full text-center">Filter by Brand:</span>
                     {brands.map((brand) => (
                       <button
                         key={brand}
                         onClick={() => setSelectedBrand(brand)}
                         className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                           selectedBrand === brand
                             ? 'bg-[#09294c] text-white'
                             : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                         }`}
                       >
                         {brand === 'all' ? 'All Brands' : brand}
                       </button>
                     ))}
                   </div>
                   
                   {/* Content Type Filter */}
                   <div className="flex flex-wrap gap-2 justify-center mb-8">
                     <span className="text-sm font-medium text-gray-600 mb-2 w-full text-center">Content Type:</span>
                     {contentTypes.map((contentType) => {
                       const count = getBrandContentTypeCount(selectedBrand, contentType.value);
                       if (count === 0) return null;
                       
                       return (
                         <button
                           key={contentType.value}
                           onClick={() => setSelectedContentType(contentType.value)}
                           className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                             selectedContentType === contentType.value
                               ? 'bg-[#1a4b7a] text-white'
                               : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                           }`}
                         >
                           {contentType.label}
                         </button>
                       );
                     })}
                   </div>
            
                   {/* Results Count */}
                   <div className="text-center mb-8">
                     <p className="text-gray-600">
                       Showing <span className="font-semibold text-[#09294c]">{filteredPosts.length}</span> 
                       {filteredPosts.length === 1 ? ' article' : ' articles'}
                       {selectedBrand !== 'all' && (
                         <span> from <span className="font-semibold text-[#09294c]">{selectedBrand}</span></span>
                       )}
                       {selectedContentType !== 'all' && (
                         <span> - <span className="font-semibold text-[#09294c]">{contentTypes.find(ct => ct.value === selectedContentType)?.label}</span></span>
                       )}
                     </p>
                   </div>
            
            {/* Blog Posts Grid */}
            <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                <div className="relative w-full h-48 flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center mb-3">
                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        {post.brand === '2xGen' ? (
                          <span className="bg-[#09294c] text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.brand}
                          </span>
                        ) : (
                          <a 
                            href={brandHomepages[post.brand] || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-transform hover:scale-105"
                          >
                            <span className="bg-[#09294c] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#1a4b7a] transition-colors cursor-pointer">
                              {post.brand}
                            </span>
                          </a>
                        )}
                        {post.relatedBrands && post.relatedBrands.map((brand, index) => (
                          <a 
                            key={index}
                            href={brandHomepages[brand] || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-transform hover:scale-105"
                          >
                            <span className="bg-[#1a4b7a] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#2d6ba8] transition-colors cursor-pointer">
                              {brand}
                            </span>
                          </a>
                        ))}
                        {post.contentType === 'external' && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            External Blog
                          </span>
                        )}
                        {post.contentType === 'case-study' && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Case Study
                          </span>
                        )}
                        {post.contentType === 'insights' && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                            2xGen Insights
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#09294c] transition-colors text-center">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-4 text-center">{post.excerpt}</p>
                  </div>
                  
                  <div className="flex justify-center">
                    {post.brand === '2xGen' ? (
                      <a 
                        href={post.slug ? `/insights/${post.slug}` : '#'}
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
                        Read on {post.brand} <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
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

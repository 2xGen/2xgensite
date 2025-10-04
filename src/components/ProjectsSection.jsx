import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Hardcoded projects data
  const projects = [
    {
      id: 1,
      title: "ArubaBuddies.com",
      thumbnail: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/Screenshot%202025-06-16%20151003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL1NjcmVlbnNob3QgMjAyNS0wNi0xNiAxNTEwMDMucG5nIiwiaWF0IjoxNzUwMDkzOTQxLCJleHAiOjE5MDc3NzM5NDF9.uK6Hg29YlEqmJe1AFSJW_4Zhr3P3TdWLY_M1zMXg9ZI",
      excerpt: "ArubaBuddies is a smart trip planning platform for Aruba.",
      description: "ArubaBuddies is a smart trip planning platform that helps travelers effortlessly design personalized Aruba vacations with curated local recommendations and an interactive itinerary builder. It connects users to handpicked tours, restaurants, and hidden gems, making every Aruba trip unforgettable and easy to share.",
      websiteUrl: "https://arubabuddies.com/",
      technologies: ["React", "Node.js", "MongoDB", "Supabase"],
      date: "2024-03-20"
    },
    {
      id: 3,
      title: "FactuurBaas.nl",
      thumbnail: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/Screenshot%202025-06-16%20150605.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL1NjcmVlbnNob3QgMjAyNS0wNi0xNiAxNTA2MDUucG5nIiwiaWF0IjoxNzUwMDk0MzAzLCJleHAiOjE5MDc3NzQzMDN9.T6m86b-T281nZePGSM2IH-AeYjYSq5oQIhTrKNEmvvg",
      excerpt: "FactuurBaas is a simple invoicing tool for freelancers and small businesses.",
      description: "FactuurBaas is a fast and easy invoicing tool designed for freelancers and small businesses to create professional invoices in minutes without registration. It offers a no-login-needed experience with clean layouts and instant PDF downloads.",
      websiteUrl: "https://factuurbaas.nl/",
      technologies: ["PHP", "JavaScript", "HTML", "CSS"],
      date: "2024-01-10"
    },
    {
      id: 4,
      title: "MyGoProfile.com",
      thumbnail: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/MGP/Screenshot%202025-09-27%20212746.png",
      excerpt: "Dominate Local Search With AI-Powered GBP Management",
      description: "MyGoProfile takes the hassle out of managing Google Business Profiles by automating review responses, providing actionable optimization insights, and centralizing multi-location management in one intuitive dashboard. With AI working 24/7, businesses save hours each week while gaining up to 40% more local search traffic. It's local marketing simplified — built to turn profiles into powerful customer-generating tools.",
      websiteUrl: "https://mygoprofile.com/",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      date: "2024-05-30"
    },
    {
      id: 5,
      title: "TopTours.ai",
      thumbnail: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/sign/foto/Screenshot%202025-06-24%20102145.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83YjkxZGZkZC1hYTQ1LTQ3NTUtODZiMy1iZDBhY2QyMjlkMjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3RvL1NjcmVlbnNob3QgMjAyNS0wNi0yNCAxMDIxNDUucG5nIiwiaWF0IjoxNzUwNzUzMzQ2LCJleHAiOjE5MDg0MzMzNDZ9.28bDE7pLgNEKv7_5ystmLMQigixQ7HzUenzevGRrDWI",
      excerpt: "TopTours.ai is an AI-powered platform for smart global tour discovery.",
      description: "TopTours.ai helps travelers discover and book curated tours and activities worldwide, powered by AI-driven suggestions. With personalized one-liners, interactive itinerary generation, and smart filters, it simplifies travel planning and enhances decision-making for every kind of traveler.",
      websiteUrl: "https://toptours.ai/",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "WordPress", "OpenAI", "Viator API", "Supabase"],
      date: "2025-06-24"
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09294c] to-[#1a4b7a]">Our Portfolio:</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a4b7a] to-[#2d6ba8]">Ventures in Action</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            These are some of the products we've launched and are scaling under the 2xGen umbrella:
          </motion.p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="projects-swiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="relative h-48 cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">
                      <a 
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">{project.excerpt}</p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 items-center">
                        {project.technologies.slice(0, 2).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                            onClick={() => handleProjectClick(project)}
                          >
                            + {project.technologies.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">
                  <a 
                    href={selectedProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  >
                    {selectedProject.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-6">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 
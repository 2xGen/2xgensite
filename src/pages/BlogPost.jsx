import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Blog posts data (same as in Insights.jsx)
  const blogPosts = [
    {
      id: 21,
      title: "How AI Is Transforming Web Development in 2025",
      excerpt: "Discover how artificial intelligence is reshaping the way websites and SaaS platforms are built — from automated coding to smarter user experiences.",
      content: `Web development is evolving at lightning speed. In 2025, artificial intelligence isn't just an add-on — it's becoming the backbone of how websites, SaaS platforms, and digital products are created. At 2xGen, we've seen this firsthand while developing MyGoProfile, FactuurBaas, ArubaBuddies, and TopTours.ai.

## Introduction

AI is changing how code is written, how designs are generated, and how users interact with the web. Let's dive into the biggest shifts.

## 1. AI Is Writing Code Faster Than Developers

Tools like GitHub Copilot and Google's Gemini Code Assist generate code from natural language prompts, drastically reducing development time. Instead of spending hours on boilerplate code, developers can focus on solving core problems.

For us at 2xGen, this means we can launch MVPs for platforms like FactuurBaas in weeks instead of months, making validation and scaling far more efficient.

## 2. Smarter, Personalized User Experiences

Websites are no longer static. AI makes it possible to adapt in real time, learning from user behavior to personalize layouts, recommendations, and content.

For example, TopTours.ai uses AI to recommend tours instantly based on user input. Travelers don't waste time browsing — they get relevant results in just two clicks.

## 3. Automation in Testing and Deployment

Quality assurance has always been time-consuming, but AI is automating testing, bug detection, and performance optimization. This makes launches smoother and platforms more reliable.

With FactuurBaas, we rely on these efficiencies to keep the invoicing platform stable while adding new features for freelancers and small businesses.

## 4. AI-Powered APIs Are Expanding Possibilities

AI isn't just accelerating workflows — it's creating entirely new product categories through APIs.

• ArubaBuddies integrates Viator's data with OpenAI to make trip planning conversational and intelligent.
• MyGoProfile is built entirely on Google's ecosystem (Firebase, Firestore, Gemini), creating a verified, AI-enhanced digital identity platform.

These kinds of integrations would have taken years to develop manually. Today, AI-powered APIs make them possible in months.

## 5. The Human + AI Partnership

Does this mean developers and designers are being replaced? Not at all. AI speeds up the process, but it's still humans who shape the vision, strategy, and creativity behind every product.

At 2xGen, we believe the future belongs to teams that combine human insight with AI efficiency — building products that solve real-world problems while scaling smarter.

## Conclusion

AI isn't just transforming web development — it's redefining what's possible. From automated coding to personalized user experiences, it's enabling studios like 2xGen to launch faster, build smarter, and scale better.

**2025 is the year AI becomes essential. The businesses that embrace it will lead the next era of digital innovation.**`,
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
      content: `At 2xGen, we believe that great products are built through a combination of systematic processes, user-centric design, and continuous iteration. Our development methodology has evolved over years of building successful digital platforms.

## Our Development Philosophy

We follow a user-first approach that prioritizes:
- **User Research**: Understanding your target audience's needs and pain points
- **Rapid Prototyping**: Quick iterations to validate ideas before full development
- **Agile Methodology**: Flexible development cycles that adapt to changing requirements
- **Quality Assurance**: Comprehensive testing at every stage

## Phase 1: Discovery & Planning

The journey begins with a thorough discovery phase where we:
1. **Stakeholder Interviews**: Understanding your vision and business goals
2. **User Research**: Analyzing your target audience and their behaviors
3. **Competitive Analysis**: Studying market trends and competitor solutions
4. **Technical Assessment**: Evaluating feasibility and technology requirements

## Phase 2: Design & Prototyping

Our design process focuses on creating intuitive user experiences:
- **Wireframing**: Low-fidelity layouts to establish information architecture
- **UI Design**: High-fidelity designs that align with your brand
- **Interactive Prototypes**: Clickable demos to test user flows
- **Design System**: Consistent components and patterns

## Phase 3: Development

We use modern development practices to ensure code quality:
- **Version Control**: Git-based workflow with feature branches
- **Code Reviews**: Peer review process for all code changes
- **Automated Testing**: Unit, integration, and end-to-end tests
- **Continuous Integration**: Automated builds and deployments

## Phase 4: Testing & Launch

Before launch, we conduct comprehensive testing:
- **Functionality Testing**: Ensuring all features work as expected
- **Performance Testing**: Optimizing for speed and scalability
- **Security Testing**: Protecting against vulnerabilities
- **User Acceptance Testing**: Final validation with stakeholders

## Our Tech Stack

We leverage modern technologies to build robust solutions:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Python, PostgreSQL, MongoDB
- **Cloud**: AWS, Vercel, Supabase
- **Tools**: Docker, GitHub Actions, Figma

## Post-Launch Support

Our relationship doesn't end at launch:
- **Monitoring**: Real-time performance and error tracking
- **Maintenance**: Regular updates and security patches
- **Enhancements**: Feature additions based on user feedback
- **Analytics**: Data-driven insights for continuous improvement

## Why This Process Works

Our systematic approach ensures:
- **Faster Time to Market**: Efficient processes reduce development time
- **Higher Quality**: Rigorous testing prevents bugs and issues
- **Better User Experience**: User-centric design leads to higher satisfaction
- **Scalable Solutions**: Built to grow with your business

Ready to start your project? Let's discuss how our development process can bring your vision to life.`,
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
      id: 22,
      title: "The 2xGen Tech Stack: Modern Tools for Modern Solutions",
      excerpt: "Explore the technologies and frameworks we use to build scalable, maintainable, and performant digital products. From React and Node.js to cloud infrastructure and deployment strategies.",
      content: `Choosing the right technology stack is crucial for building products that can scale and evolve. At 2xGen, we've carefully selected our tools based on performance, developer experience, and long-term maintainability.

## Frontend Technologies

### React & Next.js
We use React for building dynamic user interfaces and Next.js for:
- Server-side rendering (SSR) for better SEO
- Static site generation (SSG) for optimal performance
- API routes for full-stack applications
- Built-in optimization features

### TypeScript
TypeScript provides:
- Type safety to catch errors early
- Better developer experience with IntelliSense
- Easier refactoring and maintenance
- Self-documenting code

### Tailwind CSS
For styling, we use Tailwind CSS because it:
- Provides utility-first approach
- Ensures consistent design system
- Enables rapid prototyping
- Reduces CSS bundle size

## Backend Technologies

### Node.js
Our primary backend runtime offers:
- JavaScript everywhere (frontend and backend)
- Large ecosystem of packages
- Excellent performance for I/O operations
- Easy integration with frontend

### Database Solutions
We work with various databases:
- **PostgreSQL**: For complex relational data
- **MongoDB**: For flexible document storage
- **Redis**: For caching and session management
- **Supabase**: For rapid development and real-time features

## Cloud & Infrastructure

### AWS Services
We leverage AWS for:
- **EC2**: Virtual servers for applications
- **S3**: Object storage for files and assets
- **RDS**: Managed database services
- **CloudFront**: CDN for global content delivery
- **Lambda**: Serverless functions

### Vercel
For frontend deployment:
- Automatic deployments from Git
- Global CDN for fast loading
- Preview deployments for testing
- Built-in analytics and monitoring

## Development Tools

### Version Control
- **Git**: Source code management
- **GitHub**: Code hosting and collaboration
- **GitHub Actions**: CI/CD pipelines

### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Jest**: Unit testing framework

### Design & Prototyping
- **Figma**: UI/UX design and prototyping
- **Storybook**: Component development and testing
- **Framer Motion**: Animation library

## Why This Stack?

Our technology choices are driven by:
- **Performance**: Fast loading and smooth user experience
- **Scalability**: Ability to handle growth
- **Developer Experience**: Productive development environment
- **Community Support**: Large, active communities
- **Future-Proof**: Technologies with long-term viability

## Continuous Learning

We stay updated with:
- Latest framework updates
- New tools and libraries
- Best practices and patterns
- Security updates and patches

This tech stack enables us to deliver high-quality, scalable solutions that meet modern web standards and user expectations.`,
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
      id: 23,
      title: "From Idea to Launch: Our Product Development Timeline",
      excerpt: "How long does it take to build a digital product? We break down our typical development phases, from initial concept and wireframing to testing, deployment, and post-launch optimization.",
      content: `One of the most common questions we receive is: 'How long will it take to build my product?' While every project is unique, we follow a structured timeline that ensures quality and efficiency.

## Typical Development Timeline

### Week 1-2: Discovery & Planning
- Stakeholder interviews and requirements gathering
- User research and competitive analysis
- Technical feasibility assessment
- Project roadmap creation

### Week 3-4: Design Phase
- Information architecture and user flows
- Wireframing and prototyping
- UI design and brand integration
- Design system development

### Week 5-8: Development Phase
- Frontend development and component creation
- Backend API development and database setup
- Third-party integrations
- Basic functionality implementation

### Week 9-10: Testing & Refinement
- Quality assurance testing
- Bug fixes and performance optimization
- User acceptance testing
- Security and accessibility audits

### Week 11-12: Launch Preparation
- Final testing and bug fixes
- Deployment and hosting setup
- Documentation and training materials
- Go-live preparation

## Factors That Affect Timeline

### Project Complexity
- **Simple Website**: 4-6 weeks
- **Web Application**: 8-12 weeks
- **E-commerce Platform**: 12-16 weeks
- **Custom Enterprise Solution**: 16+ weeks

### Team Size
- **Solo Developer**: Longer timeline, lower cost
- **Small Team (2-3)**: Balanced timeline and cost
- **Large Team (4+)**: Faster development, higher cost

### Client Involvement
- **High Involvement**: Faster decision-making, quicker iterations
- **Low Involvement**: Longer approval cycles, potential delays

## Our Agile Approach

### Sprint Planning
- 2-week development sprints
- Clear deliverables and milestones
- Regular progress updates
- Flexible scope adjustments

### Daily Standups
- Progress tracking
- Issue identification
- Team coordination
- Client communication

### Sprint Reviews
- Demo of completed features
- Client feedback collection
- Next sprint planning
- Timeline adjustments if needed

## Risk Mitigation

### Early Prototyping
- Quick validation of core concepts
- Early feedback incorporation
- Reduced development risk
- Clearer project scope

### Regular Communication
- Weekly progress reports
- Immediate issue escalation
- Transparent timeline updates
- Proactive problem solving

### Phased Delivery
- MVP (Minimum Viable Product) first
- Core features prioritized
- Additional features in later phases
- Continuous value delivery

## Post-Launch Timeline

### Week 1-2: Launch Support
- Immediate bug fixes
- Performance monitoring
- User feedback collection
- Initial optimization

### Month 1-3: Optimization
- User behavior analysis
- Performance improvements
- Feature enhancements
- Security updates

### Ongoing: Maintenance
- Regular updates and patches
- New feature development
- Performance monitoring
- Security maintenance

## Tips for Faster Development

### Clear Requirements
- Detailed project specifications
- Well-defined user stories
- Clear acceptance criteria
- Minimal scope changes

### Good Communication
- Regular check-ins
- Quick decision-making
- Clear feedback
- Proactive problem-solving

### Quality Focus
- Thorough testing
- Code reviews
- Performance optimization
- Security best practices

Remember, rushing development often leads to technical debt and poor user experience. Our timeline balances speed with quality to deliver products that truly serve your users.`,
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
      id: 24,
      title: "Why We Choose React: Our Frontend Development Philosophy",
      excerpt: "Discover why React has become our go-to framework for building user interfaces. Learn about component-based architecture, state management, and how we ensure optimal performance.",
      content: `React has revolutionized how we build user interfaces. Its component-based architecture, virtual DOM, and rich ecosystem make it the perfect choice for building scalable web applications.

## Why React?

### Component-Based Architecture
React's component system allows us to:
- Build reusable UI elements
- Create maintainable code structures
- Enable team collaboration
- Simplify testing and debugging

### Virtual DOM
React's virtual DOM provides:
- Better performance through efficient updates
- Predictable rendering behavior
- Optimized re-rendering
- Smooth user interactions

### Rich Ecosystem
React's ecosystem includes:
- Extensive library support
- Strong community backing
- Regular updates and improvements
- Excellent developer tools

## Our React Best Practices

### Component Design
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Well-defined prop types and interfaces
- **Composition over Inheritance**: Building complex UIs through component composition
- **Controlled Components**: Managing form state through React state

### State Management
- **Local State**: Using useState for component-specific state
- **Context API**: Sharing state across component trees
- **Custom Hooks**: Reusable stateful logic
- **External State**: Redux or Zustand for complex applications

### Performance Optimization
- **React.memo**: Preventing unnecessary re-renders
- **useMemo & useCallback**: Optimizing expensive calculations
- **Code Splitting**: Lazy loading components
- **Bundle Optimization**: Minimizing JavaScript bundle size

## Modern React Features

### Hooks
We leverage React hooks for:
- **useState**: Managing component state
- **useEffect**: Handling side effects
- **useContext**: Accessing context values
- **Custom Hooks**: Reusable stateful logic

### Concurrent Features
- **Suspense**: Handling loading states
- **Error Boundaries**: Graceful error handling
- **Concurrent Rendering**: Better user experience
- **Automatic Batching**: Optimized updates

## Development Workflow

### Development Environment
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and better DX
- **ESLint & Prettier**: Code quality and formatting
- **Hot Module Replacement**: Instant updates during development

### Testing Strategy
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Storybook**: Component development and testing

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Modules**: Scoped styling
- **Styled Components**: CSS-in-JS solution
- **Design System**: Consistent component library

## React in Our Projects

### E-commerce Platforms
- Product catalogs with filtering
- Shopping cart functionality
- User authentication flows
- Payment processing interfaces

### Content Management
- Dynamic content rendering
- Rich text editing
- Media management
- User role management

### Data Visualization
- Interactive charts and graphs
- Real-time data updates
- Responsive dashboards
- Custom data components

## Future of React

### Upcoming Features
- **Server Components**: Better performance
- **Concurrent Features**: Enhanced user experience
- **Improved Developer Tools**: Better debugging
- **Better TypeScript Support**: Enhanced type safety

### Staying Current
- Regular updates and new features
- Community best practices
- Performance improvements
- Security enhancements

React continues to evolve, and we stay at the forefront of these changes to deliver the best possible user experiences for our clients.`,
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
      id: 25,
      title: "Building for Scale: Our Backend Architecture Principles",
      excerpt: "Learn how we design backend systems that can handle growth. From database design and API architecture to caching strategies and microservices, discover our approach to scalable development.",
      content: `Building a backend that can scale with your business is crucial for long-term success. Our architecture principles focus on modularity, performance, and maintainability.

## Scalability Principles

### Horizontal Scaling
- **Load Balancing**: Distributing traffic across multiple servers
- **Database Sharding**: Splitting data across multiple databases
- **Microservices**: Breaking applications into independent services
- **Container Orchestration**: Managing scalable deployments

### Vertical Scaling
- **Resource Optimization**: Maximizing server efficiency
- **Caching Strategies**: Reducing database load
- **Query Optimization**: Improving database performance
- **Memory Management**: Efficient resource utilization

## Database Design

### Relational Databases (PostgreSQL)
- **Normalization**: Reducing data redundancy
- **Indexing**: Optimizing query performance
- **ACID Properties**: Ensuring data consistency
- **Foreign Keys**: Maintaining referential integrity

### NoSQL Databases (MongoDB)
- **Document Storage**: Flexible schema design
- **Horizontal Scaling**: Easy distribution across servers
- **JSON-like Structure**: Natural fit for web applications
- **Aggregation Pipelines**: Complex data processing

### Caching Layers
- **Redis**: In-memory data storage
- **CDN**: Global content distribution
- **Application Caching**: Reducing computation
- **Database Query Caching**: Optimizing repeated queries

## API Architecture

### RESTful Design
- **Resource-Based URLs**: Clear endpoint structure
- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE
- **Status Codes**: Meaningful response codes
- **JSON Format**: Consistent data exchange

### GraphQL
- **Single Endpoint**: Unified API interface
- **Client-Specified Queries**: Request only needed data
- **Type System**: Strong typing and validation
- **Real-time Subscriptions**: Live data updates

### API Security
- **Authentication**: JWT tokens and OAuth
- **Authorization**: Role-based access control
- **Rate Limiting**: Preventing abuse
- **Input Validation**: Sanitizing user data

## Microservices Architecture

### Service Decomposition
- **Domain-Driven Design**: Services based on business domains
- **Single Responsibility**: Each service has one purpose
- **Loose Coupling**: Independent service development
- **High Cohesion**: Related functionality grouped together

### Communication Patterns
- **Synchronous**: HTTP/REST for real-time communication
- **Asynchronous**: Message queues for background processing
- **Event-Driven**: Pub/sub patterns for loose coupling
- **API Gateway**: Centralized request routing

### Data Management
- **Database per Service**: Independent data storage
- **Event Sourcing**: Storing state changes as events
- **CQRS**: Separating read and write operations
- **Saga Pattern**: Managing distributed transactions

## Performance Optimization

### Database Optimization
- **Query Optimization**: Efficient SQL queries
- **Connection Pooling**: Managing database connections
- **Read Replicas**: Distributing read operations
- **Partitioning**: Splitting large tables

### Caching Strategies
- **Application-Level Caching**: In-memory data storage
- **Distributed Caching**: Shared cache across servers
- **CDN Caching**: Static content delivery
- **Database Caching**: Query result caching

### Monitoring & Observability
- **Application Metrics**: Performance monitoring
- **Log Aggregation**: Centralized logging
- **Distributed Tracing**: Request flow tracking
- **Alerting**: Proactive issue detection

## Security Considerations

### Data Protection
- **Encryption at Rest**: Protecting stored data
- **Encryption in Transit**: Securing data transmission
- **Access Controls**: Limiting data access
- **Audit Logging**: Tracking data access

### API Security
- **Authentication**: Verifying user identity
- **Authorization**: Controlling access to resources
- **Input Validation**: Preventing injection attacks
- **Rate Limiting**: Protecting against abuse

## Cloud Infrastructure

### AWS Services
- **EC2**: Virtual servers for applications
- **RDS**: Managed database services
- **ElastiCache**: Managed caching service
- **Lambda**: Serverless functions

### Containerization
- **Docker**: Application containerization
- **Kubernetes**: Container orchestration
- **Service Mesh**: Managing microservice communication
- **CI/CD Pipelines**: Automated deployment

## Monitoring & Maintenance

### Performance Monitoring
- **Application Performance Monitoring (APM)**: Real-time performance tracking
- **Database Monitoring**: Query performance analysis
- **Infrastructure Monitoring**: Server and network metrics
- **User Experience Monitoring**: Frontend performance tracking

### Log Management
- **Centralized Logging**: Aggregating logs from all services
- **Log Analysis**: Identifying patterns and issues
- **Alerting**: Notifying about critical events
- **Retention Policies**: Managing log storage

Our backend architecture ensures your application can grow with your business while maintaining performance, security, and reliability.`,
      author: "2xGen Team",
      date: "2024-01-20",
      category: "Backend Development",
      brand: "2xGen",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      featured: false,
      slug: "building-for-scale-backend-architecture"
    },
  ];

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      setLoading(false);
      
      // Update document title and meta tags
      document.title = `${foundPost.title} - 2xGen Insights`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', foundPost.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = foundPost.excerpt;
        document.head.appendChild(meta);
      }
    } else {
      setLoading(false);
    }
  }, [slug, blogPosts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E5F5FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09294c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#E5F5FC]">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/insights')}
              className="bg-[#09294c] text-white px-6 py-3 rounded-lg hover:bg-[#1a4b7a] transition-colors"
            >
              Back to Insights
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(9, 41, 76, 0.05) 2px, transparent 0),
            radial-gradient(circle at 75px 75px, rgba(26, 75, 122, 0.03) 1px, transparent 0);
          background-size: 100px 100px;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #09294c 0%, #1a4b7a 50%, #09294c 100%);
          position: relative;
        }
        
        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.03) 1px, transparent 0),
            radial-gradient(circle at 60px 60px, rgba(255, 255, 255, 0.02) 1px, transparent 0),
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          background-size: 40px 40px, 80px 80px, 100% 100%, 100% 100%, 100% 100%;
          border-radius: inherit;
        }
        
        .content-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .prose h2 {
          color: #09294c;
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: #1a4b7a;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose ul {
          margin-bottom: 1.25rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #09294c;
          font-weight: 600;
        }
        .prose a {
          transition: all 0.2s ease;
          border-radius: 4px;
          padding: 2px 4px;
          margin: 0 1px;
        }
        .prose a:hover {
          background-color: rgba(9, 41, 76, 0.1);
          transform: translateY(-1px);
        }
      `}</style>
      <div className="min-h-screen bg-[#E5F5FC] bg-pattern">
        <Navbar />
      
      {/* Back Button */}
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex items-center text-[#09294c] hover:text-[#1a4b7a] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </button>
        </div>
      </div>

      {/* Blog Post */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-[#09294c] text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.brand}
              </span>
              <span className="text-sm text-gray-500">{post.category}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[#09294c] mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>
            
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none content-card rounded-2xl p-8">
            <div className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </div>
            
            <div className="text-gray-800 leading-relaxed">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  const heading = line.replace('## ', '');
                  return (
                    <h2 key={index} className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-[#09294c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {heading}
                    </h2>
                  );
                } else if (line.startsWith('### ')) {
                  const heading = line.replace('### ', '');
                  return (
                    <h3 key={index} className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-[#1a4b7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {heading}
                    </h3>
                  );
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  // Process links in the text
                  const processTextWithLinks = (text) => {
                    return text.split(/(\bMyGoProfile\b|\bFactuurBaas\b|\bArubaBuddies\b|\bTopTours\.ai\b)/).map((part, partIndex) => {
                      if (part === 'MyGoProfile') {
                        return (
                          <a
                            key={partIndex}
                            href="https://mygoprofile.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#09294c] hover:text-[#1a4b7a] font-semibold underline"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === 'FactuurBaas') {
                        return (
                          <a
                            key={partIndex}
                            href="https://factuurbaas.nl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#09294c] hover:text-[#1a4b7a] font-semibold underline"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === 'ArubaBuddies') {
                        return (
                          <a
                            key={partIndex}
                            href="https://arubabuddies.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#09294c] hover:text-[#1a4b7a] font-semibold underline"
                          >
                            {part}
                          </a>
                        );
                      } else if (part === 'TopTours.ai') {
                        return (
                          <a
                            key={partIndex}
                            href="https://toptours.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#09294c] hover:text-[#1a4b7a] font-semibold underline"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    });
                  };
                  
                  return <p key={index}>{processTextWithLinks(line)}</p>;
                }
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 gradient-bg rounded-xl text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ready to Build with AI?</h3>
              <p className="text-lg mb-6 opacity-90">
                Let's discuss how AI can accelerate your next digital project.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-[#09294c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Start Your AI-Powered Project
              </a>
            </div>
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
    </>
  );
};

export default BlogPost;

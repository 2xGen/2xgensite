import { Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const handleNavigation = (section) => {
    if (location.pathname === '/') {
      // If already on homepage, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to homepage with hash
      window.location.href = `/#${section}`;
    }
  };

  return (
    <footer className="bg-[#09294c] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">2xGen</h3>
            <p className="text-blue-200 mb-4">
              2xGen is proudly building the next generation of digital platforms, including{' '}
              <a
                href="https://mygoprofile.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:underline transition-colors"
              >
                MyGoProfile
              </a>
              ,{' '}
              <a
                href="https://arubabuddies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:underline transition-colors"
              >
                ArubaBuddies
              </a>
              ,{' '}
              <a
                href="https://factuurbaas.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:underline transition-colors"
              >
                FactuurBaas
              </a>
              , and{' '}
              <a
                href="https://toptours.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:underline transition-colors"
              >
                TopTours.ai
              </a>
              .
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <a href="mailto:matthijs@2xgen.com" className="text-blue-200 hover:text-white transition-colors">
                  matthijs@2xgen.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span className="text-blue-200">Albuquerque, New Mexico, USA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('about')} 
                  className="text-blue-200 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('services')} 
                  className="text-blue-200 hover:text-white transition-colors cursor-pointer"
                >
                  What We Do
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('projects')} 
                  className="text-blue-200 hover:text-white transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800">
          <p className="text-center text-blue-200">
            © {new Date().getFullYear()} 2xGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

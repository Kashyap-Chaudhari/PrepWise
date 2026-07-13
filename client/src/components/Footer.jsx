import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-dark-900/80 border-t border-dark-700/30">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="text-xl font-bold gradient-text">PlacementPro</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Your AI-powered companion for acing placement interviews. Practice, learn, and succeed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-200 mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Dashboard', 'Aptitude', 'Technical'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="text-sm font-semibold text-dark-200 mb-4 uppercase tracking-wider">Practice</h3>
            <ul className="space-y-2">
              {['DSA', 'Coding', 'Mock Interview', 'Analytics'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-dark-200 mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center text-dark-400 hover:text-blue-400 hover:bg-dark-700 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center text-dark-400 hover:text-sky-400 hover:bg-dark-700 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-dark-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {currentYear} PlacementPro. All rights reserved.
          </p>
          <p className="text-xs text-dark-500 flex items-center gap-1">
            Made with <FaHeart className="w-3 h-3 text-red-500" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

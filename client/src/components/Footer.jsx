import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-dark-950 border-t border-white/[0.06]">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-glow-indigo">
                P
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Placement<span className="text-primary-400">Pro</span></span>
            </Link>
            <p className="text-dark-400 text-xs leading-relaxed max-w-xs">
              AI-powered technical interview and placement preparation platform engineered for software developers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {['Home', 'Dashboard', 'Aptitude', 'Technical'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-xs text-dark-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Practice</h3>
            <ul className="space-y-2.5">
              {['DSA', 'Coding', 'Mock Interview', 'Analytics'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-xs text-dark-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/[0.08] transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-dark-400 hover:text-cyan-400 hover:bg-white/[0.08] transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-dark-400 hover:text-primary-300 hover:bg-white/[0.08] transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-dark-400">
            © {currentYear} PlacementPro. All rights reserved.
          </p>
          <p className="text-[11px] text-dark-400 flex items-center gap-1">
            Made with <FaHeart className="w-3 h-3 text-rose-500" /> for tech candidates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

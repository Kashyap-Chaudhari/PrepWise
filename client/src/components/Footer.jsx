import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#09090B] border-t border-white/[0.06] relative z-10">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-[#5B5CF6] via-[#4F50E2] to-[#22D3EE] flex items-center justify-center text-white font-extrabold text-base shadow-[0_0_20px_rgba(91,92,246,0.4)]">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Aurora<span className="cyan-accent-text font-extrabold">OS</span></span>
            </Link>
            <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-xs">
              AI-powered engineering placement & technical assessment workspace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5">
              {['Home', 'Dashboard', 'Aptitude', 'Technical'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-xs text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Practice Modules</h3>
            <ul className="space-y-2.5">
              {['DSA', 'Coding', 'Mock Interview', 'Analytics'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-xs text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Community</h3>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-white/[0.08] transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A1A1AA] hover:text-[#22D3EE] hover:bg-white/[0.08] transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#A1A1AA] hover:text-[#5B5CF6] hover:bg-white/[0.08] transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#A1A1AA]">
            © {currentYear} Aurora OS • PlacementPro Engine. All rights reserved.
          </p>
          <p className="text-[11px] text-[#A1A1AA] flex items-center gap-1">
            Engineered with <FaHeart className="w-3 h-3 text-rose-500" /> for software candidates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

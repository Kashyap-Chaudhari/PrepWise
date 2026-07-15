import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun, HiOutlineLogout } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { generateAvatar } from '../utils/helpers';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Aptitude', path: '/aptitude' },
        { name: 'Technical', path: '/technical' },
        { name: 'DSA', path: '/dsa' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/#features' },
        { name: 'FAQ', path: '/#faq' },
      ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-1.5' : 'bg-dark-950/40 backdrop-blur-md border-b border-white/[0.04] py-2.5'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-glow-indigo group-hover:scale-105 transition-transform duration-200">
              P
            </div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 hidden sm:flex">
              Placement<span className="text-primary-400">Pro</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-dark-900/60 p-1 rounded-full border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/[0.1] shadow-inner-glow'
                      : 'text-dark-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-dark-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <HiOutlineSun className="w-4 h-4" /> : <HiOutlineMoon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/[0.06] transition-all duration-200 border border-white/[0.06]"
                >
                  <img
                    src={user?.avatar || generateAvatar(user?.name)}
                    alt={user?.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="hidden sm:block text-xs font-medium text-dark-200 pr-1.5">{user?.name?.split(' ')[0]}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card border border-white/[0.1] py-2 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-white/[0.06]">
                      <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-dark-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-xs text-dark-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-xs text-dark-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/analytics"
                      className="block px-4 py-2 text-xs text-dark-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      Analytics
                    </Link>
                    <div className="my-1 border-t border-white/[0.06]" />
                    <button
                      id="logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <HiOutlineLogout className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient text-xs !px-4 !py-1.5"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-dark-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              {isOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-card rounded-2xl mt-2 p-4 animate-fade-in-down border border-white/[0.08]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-primary-300 bg-primary-500/15'
                      : 'text-dark-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <div className="my-2 border-t border-white/[0.06]" />
                  <Link to="/login" className="px-4 py-2.5 text-xs font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">
                    Login
                  </Link>
                  <Link to="/register" className="btn-gradient text-xs text-center mt-1">
                    Get Started
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <div className="my-2 border-t border-white/[0.06]" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl"
                  >
                    <HiOutlineLogout className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

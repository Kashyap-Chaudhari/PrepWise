import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun, HiOutlineLogout } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { generateAvatar } from '../utils/helpers';
import Logo from './Logo';

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
        scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Logo to={isAuthenticated ? '/dashboard' : '/'} />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 dark:text-dark-400 dark:hover:text-dark-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-dark-800/50 transition-all duration-200"
                >
                  <img
                    src={user?.avatar || generateAvatar(user?.name)}
                    alt={user?.name}
                    className="w-8 h-8 rounded-lg object-cover border border-dark-600/50"
                  />
                  <span className="hidden sm:block text-sm font-medium text-dark-200">{user?.name?.split(' ')[0]}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl border border-dark-700/50 py-2 animate-scale-in">
                    <div className="px-4 py-2 border-b border-dark-700/30">
                      <p className="text-sm font-semibold text-dark-100">{user?.name}</p>
                      <p className="text-xs text-dark-400">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/30 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/30 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/analytics"
                      className="block px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700/30 transition-colors"
                    >
                      Analytics
                    </Link>
                    <hr className="my-1 border-dark-700/30" />
                    <button
                      id="logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-dark-100 rounded-xl hover:bg-dark-800/50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient text-sm !px-5 !py-2"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 transition-all duration-200"
            >
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-card rounded-xl mt-2 p-4 animate-fade-in-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <hr className="my-2 border-dark-700/30" />
                  <Link to="/login" className="px-4 py-3 text-sm font-medium text-dark-300 hover:text-dark-100 rounded-xl hover:bg-dark-800/50">
                    Login
                  </Link>
                  <Link to="/register" className="btn-gradient text-sm text-center mt-1">
                    Get Started
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <hr className="my-2 border-dark-700/30" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
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

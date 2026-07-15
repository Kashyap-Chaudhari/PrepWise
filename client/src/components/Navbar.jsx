import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun, HiOutlineLogout } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { generateAvatar } from '../utils/helpers';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        { name: 'Mock Interview', path: '/mock-interview' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/#features' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'FAQ', path: '/#faq' },
      ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
    >
      <div className="floating-glass-nav rounded-[24px] px-4 py-2.5 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#5B5CF6] via-[#4F50E2] to-[#22D3EE] text-white font-extrabold text-lg shadow-[0_0_20px_rgba(91,92,246,0.5)] group-hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">A</span>
            <div className="absolute inset-0 rounded-2xl bg-[#5B5CF6] blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white dark:text-[#FAFAFA] flex items-center gap-1.5">
              Aurora<span className="cyan-accent-text font-extrabold">OS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            </span>
            <span className="text-[10px] text-[#A1A1AA] tracking-wide uppercase font-medium">Placement Platform</span>
          </div>
        </Link>

        {/* Desktop Nav Links with Floating Active Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] dark:bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-1.5 text-xs font-medium transition-colors rounded-full text-[#A1A1AA] hover:text-white"
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#5B5CF6]/30 border border-[#5B5CF6]/50 rounded-full shadow-[0_0_15px_rgba(91,92,246,0.3)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : ''}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Options */}
        <div className="flex items-center gap-3">
          {/* Apple-style Light / Dark Theme Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[#FAFAFA] dark:text-[#FAFAFA] transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <HiOutlineSun className="w-4 h-4 text-[#F59E0B]" /> : <HiOutlineMoon className="w-4 h-4 text-[#5B5CF6]" />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
              >
                <img
                  src={user?.avatar || generateAvatar(user?.name)}
                  alt={user?.name}
                  className="w-7 h-7 rounded-xl object-cover"
                />
                <span className="hidden sm:block text-xs font-semibold text-white truncate max-w-[100px]">{user?.name?.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 aurora-card border border-white/[0.1] py-2 z-50 shadow-2xl"
                  >
                    <div className="px-4 py-2.5 border-b border-white/[0.06]">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-[#A1A1AA] truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-xs text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      Dashboard Overview
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-xs text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      Profile & Badges
                    </Link>
                    <Link
                      to="/analytics"
                      className="block px-4 py-2 text-xs text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      Performance Analytics
                    </Link>
                    <div className="my-1 border-t border-white/[0.06]" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-apple-primary !px-5 !py-2 text-xs"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white"
          >
            {isOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden aurora-card rounded-[24px] mt-2 p-4 border border-white/[0.1]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-white bg-[#5B5CF6]/20 border border-[#5B5CF6]/40'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-2 mt-2 border-t border-white/[0.06] flex flex-col gap-2">
                  <Link to="/login" className="px-4 py-2 text-xs text-center font-medium text-[#A1A1AA]">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-apple-primary text-xs text-center">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

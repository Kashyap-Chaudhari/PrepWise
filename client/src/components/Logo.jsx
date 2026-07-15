import { Link } from 'react-router-dom';

const Logo = ({ to = '/', showText = true, className = '' }) => {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 group transition-transform duration-200 active:scale-[0.98] ${className}`}>
      {/* Handcrafted Animated Logo Badge */}
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#5B5CF6] via-[#7C3AED] to-[#22D3EE] opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Main Logo Box */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5B5CF6] via-[#7C3AED] to-[#22D3EE] p-[1px] shadow-lg flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-[#0A0A0B]/85 backdrop-blur-md rounded-[11px] sm:rounded-[15px] flex items-center justify-center group-hover:bg-[#0A0A0B]/60 transition-colors duration-300">
            {/* Geometric Glowing P Icon */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white transform group-hover:scale-105 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#FAFAFA" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <path
                d="M7 4.5H14C16.4853 4.5 18.5 6.51472 18.5 9C18.5 11.4853 16.4853 13.5 14 13.5H7V4.5Z"
                stroke="url(#logoGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4.5V19.5"
                stroke="url(#logoGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="14" cy="9" r="1.5" fill="#22D3EE" />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Name */}
      {showText && (
        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white dark:text-white flex items-center gap-1">
          Placement
          <span className="bg-gradient-to-r from-[#5B5CF6] via-[#7C3AED] to-[#22D3EE] bg-clip-text text-transparent font-black">
            Pro
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse ml-0.5" />
        </span>
      )}
    </Link>
  );
};

export default Logo;

const Timer = ({ formatted, progress, isRunning, timeLeft, size = 'md' }) => {
  const isWarning = timeLeft < 60;
  const isDanger = timeLeft < 30;

  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-sm', ring: 44 },
    md: { container: 'w-24 h-24', text: 'text-xl', ring: 72 },
    lg: { container: 'w-32 h-32', text: 'text-2xl', ring: 100 },
  };

  const { container, text, ring } = sizes[size];
  const circumference = 2 * Math.PI * (ring / 2 - 4);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${container} flex items-center justify-center`}>
      {/* Background Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${ring} ${ring}`}>
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={ring / 2 - 4}
          fill="none"
          stroke="rgba(51, 65, 85, 0.3)"
          strokeWidth="3"
        />
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={ring / 2 - 4}
          fill="none"
          stroke={isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#6366f1'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      {/* Time Display */}
      <div className="relative text-center">
        <span
          className={`${text} font-bold font-mono ${
            isDanger ? 'text-red-400 animate-pulse' : isWarning ? 'text-amber-400' : 'text-dark-100'
          }`}
        >
          {formatted}
        </span>
      </div>
    </div>
  );
};

export default Timer;

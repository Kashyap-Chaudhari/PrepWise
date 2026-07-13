const Loader = ({ fullScreen = false, size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-dark-700/50"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin"></div>
      </div>
      {text && <p className="text-sm text-dark-400 animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>;
};

// Skeleton loader variants
export const SkeletonCard = () => (
  <div className="glass-card p-6 animate-pulse">
    <div className="skeleton h-4 w-3/4 mb-4 rounded"></div>
    <div className="skeleton h-3 w-full mb-2 rounded"></div>
    <div className="skeleton h-3 w-5/6 mb-4 rounded"></div>
    <div className="flex gap-2">
      <div className="skeleton h-6 w-16 rounded-full"></div>
      <div className="skeleton h-6 w-20 rounded-full"></div>
    </div>
  </div>
);

export const SkeletonLine = ({ width = 'w-full', height = 'h-4' }) => (
  <div className={`skeleton ${width} ${height} rounded`}></div>
);

export default Loader;

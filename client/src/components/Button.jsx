import { HiOutlineRefresh } from 'react-icons/hi';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: 'btn-gradient',
    secondary: 'bg-dark-700/50 text-dark-200 hover:bg-dark-600/60 border border-dark-600/50 rounded-xl',
    outline: 'btn-outline',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 rounded-xl',
    ghost: 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/50 rounded-xl',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 rounded-xl',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && <HiOutlineRefresh className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};

export default Button;

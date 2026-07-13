const Card = ({ children, className = '', hover = true, gradient = '', onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card p-6 ${hover ? 'cursor-pointer' : ''} ${
        gradient ? `bg-gradient-to-br ${gradient} border-0` : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

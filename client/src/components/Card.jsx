const Card = ({ children, className = '', hover = true, gradient = '', onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`aurora-card p-6 ${hover ? 'cursor-pointer hover:scale-[1.01]' : ''} ${
        gradient ? `bg-gradient-to-br ${gradient} border-0` : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

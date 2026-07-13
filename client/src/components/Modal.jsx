import { useEffect, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizes[size]} glass-card rounded-2xl border border-dark-700/50 animate-scale-in max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-dark-700/30">
            {title && <h2 className="text-lg font-bold text-dark-100">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-dark-400 hover:text-dark-100 hover:bg-dark-700/50 transition-all"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

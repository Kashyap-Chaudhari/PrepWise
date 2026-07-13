import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 text-center">
      {/* 404 Illustration */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-dark-800 tracking-widest animate-pulse">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider rotate-12 shadow-glow">
          Page Not Found
        </div>
      </div>

      <h2 className="text-2xl font-bold text-dark-100 mb-3">Lost in the Code?</h2>
      <p className="text-dark-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily
        unavailable.
      </p>

      <Link to="/">
        <Button variant="primary" size="lg">
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineUser } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
  const { login, loginAsDemo, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFillDemo = (type = 'student') => {
    if (type === 'student') {
      setFormData({ email: 'demo@prepwise.com', password: 'demo123456' });
    } else {
      setFormData({ email: 'admin@prepwise.com', password: 'admin123456' });
    }
    setErrors({});
  };

  const handleDirectDemoLogin = async (role = 'student') => {
    setLoading(true);
    const res = loginAsDemo(role);
    if (res.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-2xl shadow-glow">
              P
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-dark-100">Welcome Back</h1>
          <p className="text-sm text-dark-400 mt-1">Sign in to continue your preparation</p>
        </div>

        {/* 1-Click Quick Demo Login Banner */}
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <HiOutlineSparkles className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Instant Demo Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDirectDemoLogin('student')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg transition-all shadow-sm hover:shadow-glow active:scale-95"
            >
              <HiOutlineUser className="w-3.5 h-3.5" />
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleDirectDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg transition-all active:scale-95"
            >
              <HiOutlineShieldCheck className="w-3.5 h-3.5 text-accent-400" />
              Demo Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8" id="login-form-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="login-email"
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={HiOutlineMail}
              required
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={HiOutlineLockClosed}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
                />
                <span className="text-sm text-dark-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Helper Box */}
          <div className="mt-5 p-3.5 rounded-xl bg-dark-800/80 border border-dark-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-primary-400">Demo Credentials</p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillDemo('student')}
                  className="text-[11px] px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-colors"
                >
                  Auto-fill Student
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin')}
                  className="text-[11px] px-2 py-0.5 rounded bg-dark-700 text-dark-300 hover:text-white transition-colors"
                >
                  Auto-fill Admin
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-dark-400">
              <div className="p-2 rounded bg-dark-900/60 border border-dark-700/50">
                <div className="text-dark-300 font-medium">Student:</div>
                <div>demo@prepwise.com</div>
                <div className="text-dark-500 font-mono">demo123456</div>
              </div>
              <div className="p-2 rounded bg-dark-900/60 border border-dark-700/50">
                <div className="text-dark-300 font-medium">Admin:</div>
                <div>admin@prepwise.com</div>
                <div className="text-dark-500 font-mono">admin123456</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-dark-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


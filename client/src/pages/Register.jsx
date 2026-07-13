import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineAcademicCap } from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    college: '', branch: '', graduationYear: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { confirmPassword, ...data } = formData;
    const result = await register(data);
    if (result.success) navigate('/dashboard');
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-2xl shadow-glow">
              P
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-dark-100">Create Account</h1>
          <p className="text-sm text-dark-400 mt-1">Start your placement preparation journey</p>
        </div>

        <div className="glass-card p-8" id="register-form-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="register-name"
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={HiOutlineUser}
              required
            />

            <Input
              id="register-email"
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

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="register-password"
                label="Password"
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={HiOutlineLockClosed}
                required
              />
              <Input
                id="register-confirm"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={HiOutlineLockClosed}
                required
              />
            </div>

            <Input
              id="register-college"
              label="College (Optional)"
              name="college"
              placeholder="Your college name"
              value={formData.college}
              onChange={handleChange}
              icon={HiOutlineAcademicCap}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="register-branch"
                label="Branch (Optional)"
                name="branch"
                placeholder="e.g., CSE"
                value={formData.branch}
                onChange={handleChange}
              />
              <Input
                id="register-year"
                label="Grad Year (Optional)"
                type="number"
                name="graduationYear"
                placeholder="e.g., 2025"
                value={formData.graduationYear}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full !mt-6"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-dark-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

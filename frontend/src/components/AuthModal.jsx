import { useState } from 'react';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await API.post('/auth/register', {
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
        });

        if (res.data.success) {
          alert('Account created successfully! Logging you in...');
          await login(formData.email, formData.password);
          onClose();
        }
      } else {
        const result = await login(formData.email, formData.password);
        if (result?.success) {
          onClose();
        } else {
          setError(result?.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check backend auth endpoint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#22120C] border border-amber-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-amber-50">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200/60 hover:text-amber-100 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CakeBakers Account</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-amber-100">
            {isSignUp ? 'Create Your Account 🍰' : 'Welcome Back 🧁'}
          </h2>
          <p className="text-xs text-amber-200/60 mt-1">
            {isSignUp ? 'Sign up to place and track cake orders' : 'Login to access your orders'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-200 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-amber-200/80 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-amber-500/60" />
                <input
                  type="text"
                  required
                  placeholder="Anshu Gupta"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-[#120805] border border-amber-900/50 rounded-xl text-xs text-amber-100 placeholder-amber-900/60 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-amber-200/80 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-amber-500/60" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 bg-[#120805] border border-amber-900/50 rounded-xl text-xs text-amber-100 placeholder-amber-900/60 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200/80 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-amber-500/60" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 bg-[#120805] border border-amber-900/50 rounded-xl text-xs text-amber-100 placeholder-amber-900/60 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold py-3 rounded-xl shadow-lg transition cursor-pointer text-xs disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-amber-200/60">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-amber-400 hover:underline font-bold cursor-pointer"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
}
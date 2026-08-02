import React, { useState } from 'react';
import axios from 'axios';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthModal = ({ isOpen, onClose, setUser, setIsLoggedIn }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/signup';

    try {
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
      console.log('Auth Response:', res.data);

      if (!res.data.success) {
        setErrorMsg(res.data.message || 'Authentication failed.');
        setLoading(false);
        return;
      }

      const token = res.data.session?.access_token || res.data.token;
      const user = res.data.user || {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
      };

      if (token) {
        localStorage.setItem('token', token);
      }
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));

      if (setUser) setUser(user);
      if (setIsLoggedIn) setIsLoggedIn(true);

      alert(isLoginTab ? 'Login Successful! 🎉' : 'Account Created Successfully! 🎉');
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('Auth Error:', err);
      setLoading(false);
      setErrorMsg(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-6 text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 pb-3 text-center font-semibold text-lg transition ${
              isLoginTab ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-400'
            }`}
            onClick={() => { setIsLoginTab(true); setErrorMsg(''); }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 pb-3 text-center font-semibold text-lg transition ${
              !isLoginTab ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-400'
            }`}
            onClick={() => { setIsLoginTab(false); setErrorMsg(''); }}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl shadow-lg transition duration-200 mt-2"
          >
            {loading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
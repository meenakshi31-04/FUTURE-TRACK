// src/components/Modals/LoginModal.jsx
import React, { useState } from 'react';

const LoginModal = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    const userData = {
      firstName: 'User',
      email: formData.email
    };
    onLoginSuccess(userData);
  };

  const RobotIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
      <rect x="8" y="10" width="16" height="14" rx="3" fill="currentColor"/>
      <circle cx="12" cy="16" r="2" fill="white"/>
      <circle cx="20" cy="16" r="2" fill="white"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
      <circle cx="20" cy="16" r="1" fill="currentColor"/>
      <rect x="14" y="20" width="4" height="1" rx="0.5" fill="white"/>
      <path d="M6 14 Q6 8 16 8 Q26 8 26 14" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="4" y="12" width="4" height="6" rx="2" fill="currentColor"/>
      <rect x="24" y="12" width="4" height="6" rx="2" fill="currentColor"/>
      <line x1="6" y1="18" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-blue-500 rounded-2xl p-8 max-w-md w-full relative">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <RobotIcon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-300">Login to continue your career journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <label className="text-white font-medium w-24 text-right">
              Email:
            </label>
            <div className="flex-1">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
              {formData.email && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ You entered: <span className="font-medium">{formData.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="flex items-center space-x-4">
            <label className="text-white font-medium w-24 text-right">
              Password:
            </label>
            <div className="flex-1">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  )}
                </button>
              </div>
              {formData.password && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ Password entered: <span className="font-medium">{showPassword ? formData.password : '••••••••'}</span>
                </p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pl-28">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <span className="text-gray-300 text-sm">Remember me</span>
            </label>
            <button type="button" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 transform"
          >
            Login to FutureTrack
          </button>
        </form>
        
        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
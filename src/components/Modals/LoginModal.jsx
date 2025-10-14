import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const LoginModal = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })
      .then(async (res) => {
        setLoading(false);
        const data = await res.json();
        if (!res.ok) throw data;
        if (data.token) localStorage.setItem('ft_token', data.token);
        setPopup({ type: 'success', message: 'Login successful!' });
        setTimeout(() => {
          setPopup(null);
          onLoginSuccess(data.user || { email: formData.email });
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setPopup({ type: 'error', message: err.detail || 'Login failed' });
        setError(err.detail || 'Login failed');
        setTimeout(() => setPopup(null), 2500);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {popup &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999
            }}
            className={`px-6 py-3 rounded-lg shadow-lg font-semibold text-lg ${
              popup.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {popup.message}
          </div>,
          document.body
        )}

      <div className="flex bg-white rounded-2xl overflow-hidden shadow-2xl w-[700px] h-[550px] relative">
        {/* Left Blue Gradient Section */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col justify-center items-center w-[45%] p-6">
          <h1 className="text-2xl font-extrabold mb-2">Future Track</h1>
          <p className="text-center text-xs opacity-90 px-2 leading-snug">
            Track your progress, plan your career, and achieve your goals.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-[55%] bg-white p-6 relative flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-xs mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-600 text-xs mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 py-1 focus:outline-none focus:border-blue-500 pr-8 text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 text-sm"
            >
              {loading ? 'Logging in...' : 'SIGN IN'}
            </button>
          </form>

          {/* Switch to Signup */}
          <p className="text-gray-500 text-xs text-center mt-4">
            Don’t have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

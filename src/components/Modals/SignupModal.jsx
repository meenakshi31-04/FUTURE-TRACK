// src/components/Modals/SignupModal.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const SignupModal = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        password: formData.password
      })
    })
      .then(async (res) => {
        setLoading(false);
        const data = await res.json();
        if (!res.ok) throw data;
        setPopup({ type: 'success', message: 'Signup successful!' });
        setTimeout(() => {
          setPopup(null);
          onSignupSuccess(data.user || { firstName: formData.firstName, email: formData.email });
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setPopup({ type: 'error', message: err.detail || err.email || 'Signup failed' });
        setError(err.detail || err.email || 'Signup failed');
        setTimeout(() => setPopup(null), 2500);
      });
  };

    return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Success/Error popup */}
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

      <div 
        className="flex bg-white rounded-2xl overflow-hidden shadow-2xl w-[700px] h-[560px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Gradient Section */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col justify-center items-center w-5/12 p-8">
          <h1 className="text-3xl font-extrabold mb-2">Future Track</h1>
          <p className="text-center text-sm opacity-90 px-4">
            Start your journey today and take the next step toward your goals.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-7/12 bg-white p-8 relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            />

            {/* Phone Field */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            />

            {/* Education Field */}
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500 bg-transparent text-gray-700"
            >
              <option value="">Select Education Level</option>
              <option value="10th">10th Class</option>
              <option value="12th">12th Class</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Post Graduate</option>
            </select>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                  className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-center text-sm text-gray-600 space-x-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="accent-blue-500"
              />
              <span>
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:underline">
                  Terms
                </button>{' '}
                &{' '}
                <button type="button" className="text-blue-600 hover:underline">
                  Privacy Policy
                </button>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              {loading ? 'Signing up...' : 'SIGN UP'}
            </button>
          </form>

          {/* Switch to Login */}
          <p className="text-gray-500 text-sm text-center mt-6">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;

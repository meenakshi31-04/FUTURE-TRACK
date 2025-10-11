// src/components/Modals/SignupModal.jsx
import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup
    const userData = {
      firstName: formData.firstName,
      email: formData.email
    };
    onSignupSuccess(userData);
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
      <div className="bg-gray-900 border-2 border-purple-500 rounded-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button - Positioned absolutely at top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-gray-800 rounded-full p-2 hover:bg-gray-700"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <RobotIcon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Join FutureTrack</h2>
          <p className="text-gray-300">Create your account to start your career journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24 text-right">
                First Name:
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="Enter first name"
                />
                {formData.firstName && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ You entered: <span className="font-medium">{formData.firstName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24 text-right">
                Last Name:
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="Enter last name"
                />
                {formData.lastName && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ You entered: <span className="font-medium">{formData.lastName}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <label className="text-white font-medium w-24 text-right">
              Email:
            </label>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-colors"
                placeholder="Enter your email"
              />
              {formData.email && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ You entered: <span className="font-medium">{formData.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="flex items-center space-x-4">
            <label className="text-white font-medium w-24 text-right">
              Phone:
            </label>
            <div className="flex-1">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-colors"
                placeholder="Enter your phone number"
              />
              {formData.phone && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ You entered: <span className="font-medium">{formData.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Education Level Field */}
          <div className="flex items-center space-x-4">
            <label className="text-white font-medium w-24 text-right">
              Education:
            </label>
            <div className="flex-1">
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select your education level</option>
                <option value="10th" className="text-white bg-gray-800">10th Class</option>
                <option value="12th" className="text-white bg-gray-800">12th Class</option>
                <option value="undergraduate" className="text-white bg-gray-800">Undergraduate</option>
                <option value="graduate" className="text-white bg-gray-800">Graduate</option>
                <option value="postgraduate" className="text-white bg-gray-800">Post Graduate</option>
              </select>
              {formData.education && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ Selected: <span className="font-medium">{formData.education}</span>
                </p>
              )}
            </div>
          </div>

          {/* Password Fields - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 pr-12 transition-colors"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.password && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ Password: <span className="font-medium">{showPassword ? formData.password : '••••••••'}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-white font-medium w-24 text-right">
                Confirm:
              </label>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-select w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 pr-12 transition-colors"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ Confirmed: <span className="font-medium">{showConfirmPassword ? formData.confirmPassword : '••••••••'}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center space-x-3 pl-28">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="input-select rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900 cursor-pointer transition-colors"
            />
            <span className="text-gray-300 text-sm">
              I agree to the{' '}
              <button type="button" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                Privacy Policy
              </button>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="input-select w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 transform border border-transparent hover:border-purple-400"
          >
            Create Account
          </button>
        </form>
        
        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
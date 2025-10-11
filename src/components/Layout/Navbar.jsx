// src/components/Layout/Navbar.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const Navbar = ({ activeSection, setActiveSection, setShowLogin, setShowSignup, isLoggedIn, user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();

  // Navigation items configuration
  const getNavItems = () => {
    if (isLoggedIn) {
      return [
        { key: 'nav_home', section: 'home', label: 'Home' },
        { key: 'nav_ai_quiz', section: 'ai-quiz', label: 'AI Quiz' },
        { key: 'nav_courses', section: 'courses', label: 'Courses' },
        { key: 'nav_forum', section: 'forum', label: 'Discussion Forum' },
        { key: 'nav_colleges', section: 'colleges', label: 'Colleges' },
        { key: 'nav_success_stories', section: 'success-stories', label: 'Success Stories' },
        { key: 'nav_contact', section: 'contact', label: 'Contact' }
      ];
    } else {
      return [];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const RobotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
      <rect x="6" y="8" width="12" height="10" rx="2" fill="currentColor"/>
      <circle cx="9" cy="12" r="1.5" fill="white"/>
      <circle cx="15" cy="12" r="1.5" fill="white"/>
      <circle cx="9" cy="12" r="0.5" fill="currentColor"/>
      <circle cx="15" cy="12" r="0.5" fill="currentColor"/>
      <rect x="10.5" y="15" width="3" height="0.5" rx="0.25" fill="white"/>
      <path d="M4 10 Q4 6 12 6 Q20 6 20 10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="2" y="9" width="3" height="4" rx="1.5" fill="currentColor"/>
      <rect x="19" y="9" width="3" height="4" rx="1.5" fill="currentColor"/>
    </svg>
  );

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-xl border-b-2 border-blue-500 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <RobotIcon />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FutureTrack</h1>
              <p className="text-xs text-blue-300 hidden sm:block">AI Career Guide</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`font-medium transition-all duration-300 py-2 px-3 rounded-lg border-b-2 whitespace-nowrap text-sm ${
                    activeSection === item.section
                      ? 'text-blue-400 border-blue-400 bg-blue-900/30 scale-105'
                      : 'text-gray-300 border-transparent hover:text-blue-400 hover:border-blue-400 hover:bg-blue-900/30 hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg border border-blue-500 text-sm bg-gray-900 text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>

            {/* Auth Buttons / User Info */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-blue-300 text-sm">Welcome, {user?.firstName}</span>
                <button
                  onClick={onLogout}
                  className="px-3 py-2 rounded-lg border border-red-500 text-red-300 hover:bg-red-900/30 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-3 py-2 rounded-lg border border-blue-500 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200 transition-colors font-medium text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:shadow-lg hover:from-blue-400 hover:to-blue-600 transition-all text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-300 p-2 rounded-lg hover:bg-blue-900/30 hover:text-blue-300 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-blue-500 shadow-xl w-full fixed top-16 left-0 right-0">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Language Selector */}
            <div className="pb-3 border-b border-blue-500">
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-500 text-sm bg-gray-900 text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>

            {/* Navigation Items */}
            {isLoggedIn && (
              <>
                {navItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => handleNavClick(item.section)}
                    className="block w-full text-left text-gray-300 hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-900/30 transition-all duration-300 font-medium text-sm"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-blue-500"></div>
              </>
            )}
            
            {/* Mobile Auth Buttons / User Info */}
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-3 py-2 text-blue-300 text-sm">
                  Welcome, {user?.firstName}
                </div>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg border border-red-500 text-red-300 hover:bg-red-900/30 transition-colors font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg border border-blue-500 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200 transition-colors font-medium text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:shadow-lg hover:from-blue-400 hover:to-blue-600 transition-all text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
// src/components/Layout/Navbar.jsx
import React, { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";

const Navbar = ({
  activeSection,
  setActiveSection,
  setShowLogin,
  setShowSignup,
  isLoggedIn,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const navItems = [
    { key: "nav_home", section: "home" },
    { key: "nav_ai_quiz", section: "ai-quiz" },
    { key: "nav_courses", section: "courses" },
    { key: "nav_forum", section: "forum" },
    { key: "nav_colleges", section: "colleges" },
    { key: "nav_success_stories", section: "success-stories" },
    { key: "nav_contact", section: "contact" },
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-purple-900/90 via-gray-950/80 to-purple-900/90 backdrop-blur-xl border-b border-blue-500/30 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-blue-700 shadow-lg overflow-hidden border border-blue-400/40">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 tracking-wide drop-shadow-sm">
              {t("brand_name")}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                  ${
                    activeSection === item.section
                      ? "text-blue-400 bg-blue-950/30 border-b-2 border-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)] scale-105"
                      : "text-gray-300 hover:text-blue-300 hover:bg-blue-900/20"
                  }`}
              >
                {t(item.key)}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="hidden sm:block px-3 py-2 rounded-lg border border-blue-400/40 bg-gray-900/60 text-blue-300 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center">
                <button onClick={() => handleNavClick('dashboard')} className="p-0 m-0 bg-transparent border-none">
                  <img 
                    src={user?.avatar_url || '/assets/profile-avatar.svg'} 
                    alt="profile" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400 cursor-pointer" 
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = '/assets/profile-avatar.svg';
                    }} 
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-3 py-2 text-sm font-medium border border-blue-400/50 text-blue-300 rounded-lg hover:bg-blue-900/20 hover:text-blue-200 transition-all"
                >
                  {t("auth_login")}
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-3 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-400 hover:to-blue-600 hover:shadow-lg transition-all"
                >
                  {t("auth_signup")}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-300 p-2 rounded-lg hover:bg-blue-900/20 hover:text-blue-300 transition-all"
            >
              {mobileMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-950/95 backdrop-blur-md border-t border-blue-500/40 shadow-xl">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-blue-400/40 bg-gray-900 text-blue-300 text-sm focus:ring-2 focus:ring-blue-400"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>

            {/* Mobile Nav Items */}
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.section
                    ? "text-blue-400 bg-blue-950/40 border-l-4 border-blue-400"
                    : "text-gray-300 hover:text-blue-300 hover:bg-blue-900/20"
                }`}
              >
                {t(item.key)}
              </button>
            ))}

            {/* Mobile Auth */}
            <div className="pt-3 border-t border-blue-500/40 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3">
                    <img 
                      src={user?.avatar_url || '/assets/profile-avatar.svg'} 
                      alt="profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/profile-avatar.svg';
                      }} 
                    />
                    <div className="text-blue-300 text-sm">{user?.firstName}</div>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('dashboard'); }}
                    className="block w-full text-left px-3 py-2 rounded-lg border border-blue-400/50 text-blue-300 hover:bg-blue-900/20 transition-all text-sm"
                  >
                    {t('nav_dashboard')}
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-3 py-2 rounded-lg border border-red-400/50 text-red-300 hover:bg-red-900/30 transition-all text-sm"
                  >
                    {t("auth_logout")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg border border-blue-400/50 text-blue-300 hover:bg-blue-900/20 transition-all text-sm"
                  >
                    {t("auth_login")}
                  </button>
                  <button
                    onClick={() => {
                      setShowSignup(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:from-blue-400 hover:to-blue-600 transition-all text-sm"
                  >
                    {t("auth_signup")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

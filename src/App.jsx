// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import ProblemSection from './components/Sections/ProblemSection';
import QuizSection from './components/Sections/QuizSection';
import CareerPlan from './components/Sections/CareerPlan';
import Features from './components/Sections/Features';
import Reviews from './components/Sections/Reviews';
import CTA from './components/Sections/CTA';
import Footer from './components/Layout/Footer';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import CareerGuide from './components/Sections/CareerGuide';
import Colleges from './components/Sections/Colleges';
import SuccessStories from './components/Sections/SuccessStories';
import Contact from './components/Sections/Contact';
import DiscussionForum from './components/Sections/DiscussionForum';
import CourseEnquiry from './components/Sections/CourseEnquiry';
import Dashboard from './pages/Dashboard';
import { LanguageProvider } from './hooks/useLanguage';
import { LocationProvider } from './hooks/useLocation';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCareerPlan, setShowCareerPlan] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // Normalize token value from localStorage to avoid 'null'/'undefined' strings
  const getStoredToken = () => {
    const t = localStorage.getItem('ft_token');
    if (!t || t === 'null' || t === 'undefined') return null;
    return t;
  };

  const [token, setToken] = useState(getStoredToken());

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const profileData = await response.json();
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('futuretrack_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Check if user is logged in on app load and setup event listeners
  useEffect(() => {
    const savedUser = localStorage.getItem('futuretrack_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }

    // handle global auth-failure events dispatched by safeFetch wrappers
    const onAuthFail = (e) => {
      // clear local login state and prompt login
      localStorage.removeItem('ft_token');
      localStorage.removeItem('futuretrack_user');
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
      setShowLogin(true);
    };

    const onNavigate = (e) => {
      const section = e?.detail?.section;
      if (section) setActiveSection(section);
    };

    // Setup event listeners
    window.addEventListener('ft:auth-failed', onAuthFail);
    window.addEventListener('ft:navigate', onNavigate);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('ft:auth-failed', onAuthFail);
      window.removeEventListener('ft:navigate', onNavigate);
    };
  }, []);

  // Keep profile in sync when token changes
  useEffect(() => {
    if (token && isLoggedIn) {
      fetchUserProfile();
    }
  }, [token, isLoggedIn]);

  const handleLogin = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('futuretrack_user', JSON.stringify(userData));
    // Ensure token state is set — LoginModal stores token in localStorage but may not pass it back
    const rawStored = localStorage.getItem('ft_token') || userData?.token || null;
    const storedToken = rawStored && rawStored !== 'null' && rawStored !== 'undefined' ? rawStored : null;
    if (storedToken) {
      localStorage.setItem('ft_token', storedToken);
      setToken(storedToken);
      // Fetch complete profile data including avatar_url
      try {
        const response = await fetch('http://localhost:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        if (response.ok) {
          const profileData = await response.json();
          const updatedUser = { ...userData, ...profileData };
          localStorage.setItem('futuretrack_user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    } else {
      localStorage.removeItem('ft_token');
      setToken(null);
    }
    setShowLogin(false);
    setActiveSection('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('futuretrack_user');
    localStorage.removeItem('ft_token');
    setToken(null);
    setActiveSection('home');
  };

  const handleNavClick = (section) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setActiveSection(section);
  };

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      setActiveSection('home');
    }
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setSelectedCareer(result.career);
    setShowQuiz(false);
    setShowCareerPlan(true);
  };

  const handleGetPlan = (career) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setSelectedCareer(career);
    setShowCareerPlan(true);
  };

  // Redirect to AI Quiz page
  const handleStartQuiz = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setActiveSection('ai-quiz');
    setShowQuiz(true);
  };

  // Redirect to Courses page
  const handleViewCourses = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setActiveSection('courses');
  };

  // Handle footer link clicks
  const handleFooterLink = (linkName) => {
    const sectionMap = {
      'Career Quiz': 'ai-quiz',
      'College Reviews': 'colleges',
      'Student Forum': 'forum',
      'Success Stories': 'success-stories',
      'Contact Us': 'contact',
      'Help Center': 'contact',
      'Engineering': 'home',
      'Medical': 'home',
      'Civil Services': 'home',
      'Teaching': 'home',
      'Privacy Policy': 'home',
      'Terms of Service': 'home'
    };
    const section = sectionMap[linkName];
    if (section) {
      handleNavClick(section);
    }
  };

  // Render content based on active section and login status
  const renderContent = () => {
    if (!isLoggedIn) {
      switch (activeSection) {
        case 'home':
          return (
            <>
              <Hero 
                onGetStarted={handleGetStarted}
                onStartQuiz={handleStartQuiz}
                onViewCourses={handleViewCourses}
              />
              <div id="problem-section">
                <ProblemSection />
              </div>
              <Features />
              <Reviews />
              <CTA 
                onGetStarted={handleGetStarted} 
                onTakeQuiz={() => setShowLogin(true)} 
              />
            </>
          );
        default:
          setShowLogin(true);
          return (
            <>
              <Hero 
                onGetStarted={handleGetStarted}
                onStartQuiz={handleStartQuiz}
                onViewCourses={handleViewCourses}
              />
              <div id="problem-section">
                <ProblemSection />
              </div>
            </>
          );
      }
    }

    // Show different sections based on active section for logged in users
    switch (activeSection) {
      case 'home':
        return (
          <>
            <CareerGuide 
              setShowCareerPlan={handleGetPlan}
              onStartQuiz={handleStartQuiz}
              onViewCourses={handleViewCourses}
            />
            <Features />
          </>
        );
      case 'ai-quiz':
        return (
          <>
            {showQuiz ? (
              <QuizSection 
                onQuizComplete={handleQuizComplete}
                onClose={() => setShowQuiz(false)}
              />
            ) : (
              <div className="w-full px-4 py-12">
                <div className="text-center max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-4">🧠 AI Career Quiz</h2>
                  <p className="text-lg text-gray-300 mb-8">Discover your perfect career path with our intelligent quiz</p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            )}
          </>
        );
      case 'courses':
        return <CourseEnquiry />;
      case 'forum':
        return <DiscussionForum />;
      case 'colleges':
        return <Colleges />;
      case 'success-stories':
        return <SuccessStories />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <Dashboard
          token={token}
          onUpdateUser={(updatedProfile) => {
            // update local user representation if available
            if (updatedProfile && updatedProfile.email) {
              const newUser = { ...user, firstName: updatedProfile.firstName || updatedProfile.first_name, lastName: updatedProfile.lastName || updatedProfile.last_name, email: updatedProfile.email };
              setUser(newUser);
              localStorage.setItem('futuretrack_user', JSON.stringify(newUser));
            }
          }}
          onLogout={handleLogout}
        />;
      default:
        return (
          <>
            <CareerGuide 
              setShowCareerPlan={handleGetPlan}
              onStartQuiz={handleStartQuiz}
              onViewCourses={handleViewCourses}
            />
            <Features />
          </>
        );
    }
  };

  return (
    <LanguageProvider>
      <LocationProvider>
        <div className="min-h-screen bg-black text-white w-full full-width">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#18181b',
                color: '#fff',
                border: '1px solid #3b82f6',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Navbar 
            activeSection={activeSection}
            setActiveSection={handleNavClick}
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
          
          <main className="w-full full-width">
            {renderContent()}
            
            {/* Show career plan if active */}
            {showCareerPlan && isLoggedIn && (
              <CareerPlan 
                career={selectedCareer}
                quizResult={quizResult}
                onClose={() => setShowCareerPlan(false)}
              />
            )}
          </main>

          <Footer onFooterLink={handleFooterLink} />

          {/* Auth Modals */}
          {showLogin && (
            <LoginModal 
              onClose={() => setShowLogin(false)}
              onSwitchToSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              onLoginSuccess={handleLogin}
            />
          )}

          {showSignup && (
            <SignupModal 
              onClose={() => setShowSignup(false)}
              onSwitchToLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              onSignupSuccess={handleLogin}
            />
          )}
        </div>
      </LocationProvider>
    </LanguageProvider>
  );
}

export default App;
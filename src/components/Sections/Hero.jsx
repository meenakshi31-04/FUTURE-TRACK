// src/components/Sections/Hero.jsx
import React from 'react';

const Hero = ({ onGetStarted, onStartQuiz, onViewCourses }) => {
  const RobotIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" className="text-white drop-shadow-lg">
      <rect x="35" y="60" width="50" height="45" rx="8" fill="currentColor" opacity="0.9"/>
      <rect x="30" y="25" width="60" height="50" rx="12" fill="currentColor"/>
      <circle cx="45" cy="45" r="6" fill="#3b82f6"/>
      <circle cx="75" cy="45" r="6" fill="#3b82f6"/>
      <circle cx="45" cy="45" r="3" fill="white"/>
      <circle cx="75" cy="45" r="3" fill="white"/>
      <rect x="52" y="58" width="16" height="3" rx="1.5" fill="#3b82f6"/>
      <path d="M15 40 Q15 15 60 15 Q105 15 105 40" stroke="currentColor" strokeWidth="4" fill="none"/>
      <rect x="8" y="32" width="14" height="20" rx="7" fill="currentColor"/>
      <rect x="98" y="32" width="14" height="20" rx="7" fill="currentColor"/>
      <line x1="15" y1="48" x2="25" y2="55" stroke="currentColor" strokeWidth="3"/>
      <circle cx="25" cy="55" r="4" fill="currentColor"/>
      <rect x="20" y="70" width="8" height="25" rx="4" fill="currentColor" opacity="0.8"/>
      <rect x="92" y="70" width="8" height="25" rx="4" fill="currentColor" opacity="0.8"/>
      <line x1="60" y1="25" x2="60" y2="15" stroke="currentColor" strokeWidth="2"/>
      <circle cx="60" cy="12" r="3" fill="#fbbf24"/>
      <circle cx="40" cy="85" r="2" fill="#10b981"/>
      <circle cx="50" cy="85" r="2" fill="#f59e0b"/>
      <circle cx="70" cy="85" r="2" fill="#ef4444"/>
      <circle cx="80" cy="85" r="2" fill="#3b82f6"/>
    </svg>
  );

  return (
    <header className="gradient-bg text-white py-12 md:py-20 px-4 w-full">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="relative">
              <RobotIcon />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xs">🤖</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Welcome to FutureTrack</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6 md:mb-8">Your AI-Powered Career Guidance Platform</p>
          <p className="text-lg md:text-xl opacity-80 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            FutureTrack helps 10th class students discover their perfect career path with 
            AI-powered recommendations, personalized guidance, and comprehensive college information.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              Get Started Free
            </button>
            <button 
              onClick={onStartQuiz}
              className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              Start AI Quiz
            </button>
            <button 
              onClick={onViewCourses}
              className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              View Courses
            </button>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-base md:text-lg mb-2">AI Career Matching</h3>
              <p className="text-sm opacity-80">Smart recommendations based on your interests</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-base md:text-lg mb-2">Student Forum</h3>
              <p className="text-sm opacity-80">Ask questions and connect with peers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-base md:text-lg mb-2">Course Guidance</h3>
              <p className="text-sm opacity-80">Find the right courses for your goals</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
// src/components/Sections/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

const Hero = ({ onGetStarted, onStartQuiz, onViewCourses }) => {
  const RobotIcon = () => (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="text-white drop-shadow-lg"
    >
      <rect x="35" y="60" width="50" height="45" rx="8" fill="currentColor" opacity="0.9" />
      <rect x="30" y="25" width="60" height="50" rx="12" fill="currentColor" />
      <circle cx="45" cy="45" r="6" fill="#3b82f6" />
      <circle cx="75" cy="45" r="6" fill="#3b82f6" />
      <circle cx="45" cy="45" r="3" fill="white" />
      <circle cx="75" cy="45" r="3" fill="white" />
      <rect x="52" y="58" width="16" height="3" rx="1.5" fill="#3b82f6" />
      <path
        d="M15 40 Q15 15 60 15 Q105 15 105 40"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <rect x="8" y="32" width="14" height="20" rx="7" fill="currentColor" />
      <rect x="98" y="32" width="14" height="20" rx="7" fill="currentColor" />
      <line x1="15" y1="48" x2="25" y2="55" stroke="currentColor" strokeWidth="3" />
      <circle cx="25" cy="55" r="4" fill="currentColor" />
      <rect x="20" y="70" width="8" height="25" rx="4" fill="currentColor" opacity="0.8" />
      <rect x="92" y="70" width="8" height="25" rx="4" fill="currentColor" opacity="0.8" />
      <line x1="60" y1="25" x2="60" y2="15" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="12" r="3" fill="#fbbf24" />
      <circle cx="40" cy="85" r="2" fill="#10b981" />
      <circle cx="50" cy="85" r="2" fill="#f59e0b" />
      <circle cx="70" cy="85" r="2" fill="#ef4444" />
      <circle cx="80" cy="85" r="2" fill="#3b82f6" />
    </svg>
  );

  const features = [
    {
      icon: "🎯",
      title: "AI Career Matching",
      desc: "Smart recommendations based on your interests",
      glow: "from-blue-500/40 to-cyan-400/10",
    },
    {
      icon: "💬",
      title: "Student Forum",
      desc: "Ask questions and connect with peers",
      glow: "from-purple-500/40 to-pink-400/10",
    },
    {
      icon: "📚",
      title: "Course Guidance",
      desc: "Find the right courses for your goals",
      glow: "from-green-500/40 to-emerald-400/10",
    },
  ];

  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a0f1f] via-[#0c1220] to-[#0e1622] text-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Robot Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-8 md:mb-10"
        >
          <div className="relative">
            <RobotIcon />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse shadow-md">
              <span className="text-xs">🤖</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
        >
          Welcome to FutureTrack
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-6 md:mb-8"
        >
          Your AI-Powered Career Guidance Platform
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          FutureTrack helps 10th class students discover their perfect career path with
          AI-powered recommendations, personalized guidance, and comprehensive college
          information.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl font-semibold text-lg 
                     hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started Free
          </button>
          <button
            onClick={onStartQuiz}
            className="bg-transparent border-2 border-blue-400 text-blue-300 px-8 py-4 rounded-xl font-semibold text-lg 
                     hover:bg-blue-500/10 hover:text-white hover:scale-105 transition-all duration-300"
          >
            Start AI Quiz
          </button>
          <button
            onClick={onViewCourses}
            className="bg-transparent border-2 border-cyan-400 text-cyan-300 px-8 py-4 rounded-xl font-semibold text-lg 
                     hover:bg-cyan-400/10 hover:text-white hover:scale-105 transition-all duration-300"
          >
            View Courses
          </button>
        </motion.div>

        {/* Feature Cards (Unified Look) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/60 
                         rounded-2xl p-6 shadow-lg group text-center transition-all duration-300 
                         hover:border-blue-400/70 hover:shadow-blue-400/30"
            >
              {/* Glowing background behind icon */}
              <div
                className={`absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl 
                           bg-gradient-to-b ${feature.glow} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
              />
              <div className="relative text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Background Blurs */}
      <div className="absolute -top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
    </header>
  );
};

export default Hero;

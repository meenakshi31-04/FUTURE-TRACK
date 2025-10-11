// src/components/Sections/CTA.jsx
import React from 'react';

const CTA = ({ onGetStarted, onTakeQuiz }) => {
  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="gradient-bg rounded-2xl p-6 md:p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 border border-blue-300 text-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-pulse">Ready to Plan Your Future? 🚀</h2>
          <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8">Join thousands of students who found their perfect career path</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform hover:shadow-lg text-base md:text-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={onTakeQuiz}
              className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 transform hover:shadow-lg text-base md:text-lg"
            >
              Take AI Career Quiz
            </button>
          </div>
          <p className="text-blue-100 mt-4 text-sm md:text-base">
            No credit card required • Start in 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
// src/components/Sections/CareerGuide.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocation } from '../../hooks/useLocation';
import { motion } from 'framer-motion';

const CareerGuide = ({ setShowCareerPlan, onStartQuiz, onViewCourses }) => {
  const { t } = useLanguage();
  const {
    states, districts, cities,
    selectedState, selectedDistrict, selectedCity,
    updateDistricts, updateCities, updateSelectedCity
  } = useLocation();

  const [careerInput, setCareerInput] = useState('');

  const handleGetPlan = () => {
    if (!careerInput.trim()) {
      toast.error('Please enter your career goal first!');
      return;
    }
    if (!selectedState || !selectedDistrict || !selectedCity) {
      toast.error('Please select your State, District, and City for personalized recommendations!');
      return;
    }
    setShowCareerPlan(careerInput);
  };

  const popularCareers = [
    'Software Engineer', 'Doctor', 'IAS Officer', 'Teacher',
    'Data Scientist', 'Civil Engineer', 'Architect', 'CA',
    'Pilot', 'Lawyer', 'Entrepreneur', 'Scientist'
  ];

  return (
    <section className="relative w-full px-4 py-16 bg-gradient-to-b from-[#060b16] via-[#0a1225] to-[#0f1c35] overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-3">
            Career Guidance
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Shape your future with personalized career insights
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Career Input Card */}
          <div className="relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-blue-500/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent opacity-70 group-hover:opacity-100 transition-all duration-500 blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl font-semibold text-white mb-6 text-center tracking-wide">
              What do you want to become?
            </h2>

            <div className="space-y-4 relative z-10">
              <input
                type="text"
                value={careerInput}
                onChange={(e) => setCareerInput(e.target.value)}
                placeholder="Enter your dream career"
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={selectedState}
                  onChange={(e) => updateDistricts(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.value} value={state.value}>{state.name}</option>
                  ))}
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => updateCities(e.target.value)}
                  disabled={!selectedState}
                  className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.value} value={district.value}>{district.name}</option>
                  ))}
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) => updateSelectedCity(e.target.value)}
                  disabled={!selectedDistrict}
                  className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                >
                  <option value="">Select City/Area</option>
                  {cities.map(city => (
                    <option key={city.value} value={city.value}>{city.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGetPlan}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 text-base md:text-lg"
              >
                Get Career Plan
              </button>
            </div>

            {/* Popular Career Buttons */}
            <div className="mt-8 relative z-10">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-4 text-center">
                Popular Career Choices
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularCareers.map((career, index) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    key={index}
                    onClick={() => setCareerInput(career)}
                    className="px-3 py-2 rounded-full text-sm md:text-base text-cyan-200 bg-cyan-900/40 hover:bg-cyan-800/60 hover:text-white border border-cyan-500/30 hover:border-cyan-400 shadow-md transition-all duration-300"
                  >
                    {career}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                title: "AI Career Quiz",
                desc: "Discover your ideal career through an interactive AI-powered quiz that learns from your interests.",
                gradient: "from-red-500/80 via-green-400/70 to-transparent",
                glow: "shadow-cyan-400/40",
                btnText: "Start Quiz",
                action: onStartQuiz,
              },
              {
                title: "Explore Courses",
                desc: "Explore the best courses tailored to your goals and interests — handpicked for your dream career.",
                gradient: "from-purple-500/80 via-pink-400/70 to-transparent",
                glow: "shadow-pink-400/40",
                btnText: "View Courses",
                action: onViewCourses,
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotateY: 3 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`relative overflow-hidden rounded-2xl p-6 bg-white/10 backdrop-blur-lg border border-white/20 hover:${card.glow} transition-all duration-500 group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 group-hover:opacity-100 transition-all duration-700 blur-2xl`} />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-200 text-sm md:text-base mb-5">{card.desc}</p>
                  <button
                    onClick={card.action}
                    className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    {card.btnText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerGuide;

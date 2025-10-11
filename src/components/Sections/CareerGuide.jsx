// src/components/Sections/CareerGuide.jsx
import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocation } from '../../hooks/useLocation';

const CareerGuide = ({ setShowCareerPlan, onStartQuiz, onViewCourses }) => {
  const { t } = useLanguage();
  const { 
    states, 
    districts, 
    cities, 
    selectedState, 
    selectedDistrict, 
    selectedCity, 
    updateDistricts, 
    updateCities,
    updateSelectedCity 
  } = useLocation();
  
  const [careerInput, setCareerInput] = useState('');

  const handleGetPlan = () => {
    if (!careerInput.trim()) {
      alert('Please enter your career goal first!');
      return;
    }
    if (!selectedState || !selectedDistrict || !selectedCity) {
      alert('Please select your State, District, and City for personalized recommendations!');
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
    <section className="w-full px-4 py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">🎯 Career Guidance</h1>
          <p className="text-lg md:text-xl text-gray-300">Plan your future with personalized career guidance</p>
        </div>

        {/* Career Input Section */}
        <div className="bg-gray-900/90 rounded-2xl p-4 md:p-8 mb-6 md:mb-8 border border-blue-500 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
            {t('career_question')}
          </h2>
          
          <div className="max-w-2xl mx-auto w-full">
            <div className="space-y-4">
              <input
                type="text"
                value={careerInput}
                onChange={(e) => setCareerInput(e.target.value)}
                placeholder={t('career_placeholder')}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={selectedState}
                  onChange={(e) => updateDistricts(e.target.value)}
                  className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => updateCities(e.target.value)}
                  disabled={!selectedState}
                  className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.value} value={district.value}>
                      {district.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCity}
                  onChange={(e) => updateSelectedCity(e.target.value)}
                  disabled={!selectedDistrict}
                  className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  <option value="">Select City/Area</option>
                  {cities.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGetPlan}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-base md:text-lg"
              >
                {t('get_plan_btn')}
              </button>
            </div>
          </div>

          {/* Popular Careers */}
          <div className="mt-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 text-center">Popular Career Choices</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularCareers.map((career, index) => (
                <button
                  key={index}
                  onClick={() => setCareerInput(career)}
                  className="px-3 py-2 bg-blue-900/50 text-blue-200 rounded-full hover:bg-blue-800 transition-colors text-sm"
                >
                  {career}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🧠</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">AI Career Quiz</h3>
            <p className="text-blue-100 text-sm md:text-base mb-3 md:mb-4">Not sure about your career? Take our intelligent quiz</p>
            <button
              onClick={onStartQuiz}
              className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              Start Quiz
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">📚</div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Explore Courses</h3>
            <p className="text-purple-100 text-sm md:text-base mb-3 md:mb-4">Discover various courses and educational paths</p>
            <button 
              onClick={onViewCourses}
              className="bg-white text-purple-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              View Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGuide;
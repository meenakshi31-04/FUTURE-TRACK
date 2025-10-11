// src/components/Sections/Colleges.jsx
import React, { useState } from 'react';
import { useLocation } from '../../hooks/useLocation';

const Colleges = () => {
  const { states, selectedState, updateDistricts } = useLocation();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [feeRange, setFeeRange] = useState('');

  const courses = [
    'Engineering',
    'Medical',
    'Arts & Science',
    'Commerce',
    'Law',
    'Architecture',
    'Pharmacy',
    'Management'
  ];

  const feeRanges = [
    'Under ₹1 Lakh',
    '₹1-3 Lakhs',
    '₹3-5 Lakhs',
    '₹5-10 Lakhs',
    'Above ₹10 Lakhs'
  ];

  const sampleColleges = [
    {
      name: 'Indian Institute of Technology (IIT)',
      location: 'Multiple Locations',
      courses: ['Engineering', 'Science', 'Architecture'],
      fee: '₹2-3 L/year',
      rating: '⭐⭐⭐⭐⭐',
      entrance: 'JEE Advanced'
    },
    {
      name: 'National Institute of Technology (NIT)',
      location: 'Multiple Locations',
      courses: ['Engineering', 'Science'],
      fee: '₹1-2 L/year',
      rating: '⭐⭐⭐⭐',
      entrance: 'JEE Main'
    },
    {
      name: 'AIIMS',
      location: 'Multiple Locations',
      courses: ['Medical'],
      fee: '₹50K-1 L/year',
      rating: '⭐⭐⭐⭐⭐',
      entrance: 'NEET'
    },
    {
      name: 'University of Delhi',
      location: 'Delhi',
      courses: ['Arts', 'Science', 'Commerce', 'Law'],
      fee: '₹20-50K/year',
      rating: '⭐⭐⭐⭐',
      entrance: 'DUET'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">🏫 Find Your Perfect College</h1>
        <p className="text-xl text-gray-300">Discover colleges that match your career goals and preferences</p>
      </div>

      {/* Search Filters */}
      <div className="bg-gray-900/90 rounded-2xl p-8 mb-8 border border-blue-500">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">🔍 College Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => updateDistricts(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.value} value={state.value}>{state.name}</option>
            ))}
          </select>

          <select
            value={feeRange}
            onChange={(e) => setFeeRange(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Fee Range</option>
            {feeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Search Colleges
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Filter by location, course, and budget to find your ideal college
          </p>
        </div>
      </div>

      {/* College Listings */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Colleges</h2>
        
        {sampleColleges.map((college, index) => (
          <div key={index} className="bg-gray-900/80 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{college.name}</h3>
                  <span className="text-yellow-400">{college.rating}</span>
                </div>
                <p className="text-gray-300 mb-3">📍 {college.location}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {college.courses.map((course, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm">
                      {course}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>💰 {college.fee}</span>
                  <span>🎯 {college.entrance}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">5000+</div>
          <p className="text-blue-100">Colleges Listed</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">100+</div>
          <p className="text-purple-100">Courses Available</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">50+</div>
          <p className="text-green-100">Cities Covered</p>
        </div>
      </div>
    </section>
  );
};

export default Colleges;
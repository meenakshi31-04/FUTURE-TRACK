// src/components/Sections/CourseEnquiry.jsx
import React, { useState } from 'react';

const CourseEnquiry = () => {
  const [formData, setFormData] = useState({
    careerGoal: '',
    interests: '',
    budget: '',
    duration: '',
    learningStyle: ''
  });

  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const coursesData = {
    'Software Engineer': [
      { name: 'Full Stack Web Development', duration: '6 months', cost: '₹50,000', provider: 'Coding Ninjas' },
      { name: 'Data Structures & Algorithms', duration: '4 months', cost: '₹35,000', provider: 'GeeksforGeeks' },
      { name: 'Machine Learning Specialization', duration: '8 months', cost: '₹75,000', provider: 'Coursera' }
    ],
    'Doctor': [
      { name: 'NEET Preparation Course', duration: '2 years', cost: '₹1,50,000', provider: 'Aakash Institute' },
      { name: 'Medical Foundation Course', duration: '1 year', cost: '₹80,000', provider: 'Allen Career Institute' }
    ],
    'Data Scientist': [
      { name: 'Python for Data Science', duration: '3 months', cost: '₹25,000', provider: 'Udemy' },
      { name: 'Advanced Machine Learning', duration: '6 months', cost: '₹60,000', provider: 'UpGrad' }
    ],
    'Civil Engineer': [
      { name: 'JEE Main Preparation', duration: '2 years', cost: '₹1,20,000', provider: 'FIITJEE' },
      { name: 'Civil Engineering Fundamentals', duration: '6 months', cost: '₹40,000', provider: 'NPTEL' }
    ]
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate course recommendation based on career goal
    const courses = coursesData[formData.careerGoal] || [];
    setRecommendedCourses(courses);
    setShowResults(true);
  };

  const resetForm = () => {
    setFormData({
      careerGoal: '',
      interests: '',
      budget: '',
      duration: '',
      learningStyle: ''
    });
    setShowResults(false);
  };

  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">📚 Course Recommendation</h1>
          <p className="text-lg md:text-xl text-gray-300">Find the perfect courses for your career goals</p>
        </div>

        {!showResults ? (
          <div className="bg-gray-900/90 rounded-2xl p-6 md:p-8 border border-blue-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Career Goal *</label>
                  <select
                    name="careerGoal"
                    value={formData.careerGoal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your career goal</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Civil Engineer">Civil Engineer</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Your Interests</label>
                  <select
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your interests</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Business">Business</option>
                    <option value="Creative Arts">Creative Arts</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select budget</option>
                    <option value="Under ₹50,000">Under ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                    <option value="Above ₹2,00,000">Above ₹2,00,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="Under 3 months">Under 3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="Above 2 years">Above 2 years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Learning Style Preference</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Self-paced Online', 'Live Online Classes', 'Classroom'].map(style => (
                    <label key={style} className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-blue-500 cursor-pointer">
                      <input
                        type="radio"
                        name="learningStyle"
                        value={style}
                        onChange={handleChange}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-white">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Find Recommended Courses
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-900/90 rounded-2xl p-6 md:p-8 border border-green-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recommended Courses</h2>
              <button
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Search Again
              </button>
            </div>

            <div className="space-y-4">
              {recommendedCourses.length > 0 ? (
                recommendedCourses.map((course, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-6 border border-blue-500 hover:border-blue-400 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{course.name}</h3>
                        <div className="flex flex-wrap gap-4 text-gray-300">
                          <span>⏱️ {course.duration}</span>
                          <span>💰 {course.cost}</span>
                          <span>🏢 {course.provider}</span>
                        </div>
                      </div>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300 text-lg">No courses found for your criteria. Please try different preferences.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseEnquiry;
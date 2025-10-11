// src/components/Sections/CareerPlan.jsx
import React from 'react';
import { useLocation } from '../../hooks/useLocation';
import { getCollegesByCareerAndLocation, getIntermediateColleges, getAlternativeColleges } from '../../data/collegeData';

const CareerPlan = ({ career, quizResult, onClose }) => {
  const { getCurrentLocation, selectedCity } = useLocation();

  const currentLocation = getCurrentLocation();
  const colleges = getCollegesByCareerAndLocation(career, selectedCity);
  const intermediateColleges = getIntermediateColleges(selectedCity);
  const alternativeColleges = getAlternativeColleges(selectedCity);

  const downloadPlan = () => {
    const planText = `
FutureTrack Career Plan - ${career}

📚 Course After 10th: Intermediate (MPC/BiPC based on career)
📝 Entrance Exams: ${quizResult?.entranceExams?.join(', ') || 'Relevant entrance exams'}
🏫 Top Colleges: ${colleges.slice(0, 3).map(c => c.name).join(', ')}
🏠 Hostel: Available with mess facilities
💰 Total Cost: ₹12-15L for 4 years (approx.)

Visit FutureTrack for detailed guidance!
    `;

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FutureTrack-Plan-${career}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const steps = [
    {
      number: 1,
      title: "📚 Course After 10th",
      content: (
        <div>
          <div className="bg-blue-900/50 rounded-lg p-4 mb-4">
            <p className="font-medium text-blue-200">
              Recommended: {career === 'Doctor' ? 'Intermediate (BiPC - Biology, Physics, Chemistry)' : 'Intermediate (MPC - Maths, Physics, Chemistry)'}
            </p>
            <p className="text-blue-300 text-sm mt-1">Duration: 2 years | Focus on entrance exam preparation</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-200 mb-3">🏫 Best Intermediate Colleges in Your Area:</h4>
            <div className="space-y-2">
              {intermediateColleges.slice(0, 3).map((college, index) => (
                <div key={index} className="bg-blue-900/30 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-blue-200 text-sm">{college.name}</p>
                        <span className="text-xs">{college.rating}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-blue-300 mb-1">
                        <span>📚 {college.type}</span>
                        <span>💰 {college.fee}</span>
                      </div>
                      <p className="text-xs text-blue-400">{college.features}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-green-900/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-200 mb-2">
              <span className="font-medium">💡 Alternative Paths:</span>
            </p>
            <div className="grid md:grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-800 rounded p-2">
                <p className="font-medium text-green-300">🎓 Diploma (3 years)</p>
                <p className="text-green-400">→ Direct 2nd year Engineering</p>
                <p className="text-green-400">Cost: ₹50K-1L total</p>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <p className="font-medium text-green-300">🔧 ITI (2 years)</p>
                <p className="text-green-400">→ Skilled technical jobs</p>
                <p className="text-green-400">Cost: ₹20K-40K total</p>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <p className="font-medium text-green-300">⚙️ Polytechnic</p>
                <p className="text-green-400">→ Practical engineering</p>
                <p className="text-green-400">Cost: ₹60K-1.2L total</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-200 mb-3">🏭 Alternative Path Colleges:</h4>
            <div className="space-y-2">
              {alternativeColleges.slice(0, 2).map((college, index) => (
                <div key={index} className="bg-green-900/30 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-green-200 text-sm">{college.name}</p>
                        <span className="text-xs">{college.rating}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-green-300 mb-1">
                        <span>🎓 {college.type}</span>
                        <span>💰 {college.fee}</span>
                      </div>
                      <p className="text-xs text-green-400">{college.features}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "📝 Entrance Exams",
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {quizResult?.entranceExams?.map((exam, index) => (
            <div key={index} className="bg-green-900/50 rounded-lg p-4">
              <p className="font-medium text-green-200">{exam}</p>
              <p className="text-green-300 text-sm">
                {exam.includes('JEE') ? 'For engineering colleges' : 
                 exam.includes('NEET') ? 'For medical colleges' : 
                 exam.includes('UPSC') ? 'For civil services' : 'Relevant for this career'}
              </p>
            </div>
          )) || (
            <>
              <div className="bg-green-900/50 rounded-lg p-4">
                <p className="font-medium text-green-200">Relevant Entrance Exam 1</p>
                <p className="text-green-300 text-sm">Based on your career choice</p>
              </div>
              <div className="bg-green-900/50 rounded-lg p-4">
                <p className="font-medium text-green-200">Relevant Entrance Exam 2</p>
                <p className="text-green-300 text-sm">Based on your career choice</p>
              </div>
            </>
          )}
        </div>
      )
    },
    {
      number: 3,
      title: "🏫 Best Colleges in Your Area",
      content: (
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>📍</span>
              <span>{currentLocation ? `Showing colleges in ${currentLocation.fullLocation}` : 'Select location to see colleges'}</span>
            </div>
          </div>
          <div className="space-y-3">
            {colleges.slice(0, 4).map((college, index) => (
              <div key={index} className="bg-yellow-900/30 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-yellow-200">{college.name}</p>
                      <span className="text-sm">{college.rating}</span>
                    </div>
                    <p className="text-yellow-300 text-sm mb-1">{college.rank}</p>
                    <div className="flex items-center space-x-4 text-xs text-yellow-400">
                      <span>📍 {currentLocation?.city}</span>
                      <span>🏠 {college.hostel ? 'Hostel Available' : 'No Hostel'}</span>
                      <span>🍽️ {college.mess ? 'Mess Facility' : 'No Mess'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-300 font-semibold">{college.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-900/50 rounded-lg">
            <p className="text-sm text-blue-200">
              <span className="font-medium">💡 Pro Tip:</span> Consider distance from home, climate, language, and local culture when choosing colleges.
            </p>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "🏠 Hostel & Living",
      content: (
        <div className="bg-purple-900/50 rounded-lg p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-purple-200">Hostel Facilities</p>
              <ul className="text-purple-300 text-sm mt-1 space-y-1">
                <li>• AC/Non-AC rooms available</li>
                <li>• 24/7 security and WiFi</li>
                <li>• Common room and library</li>
                <li>• Laundry facilities</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-purple-200">Food & Mess</p>
              <ul className="text-purple-300 text-sm mt-1 space-y-1">
                <li>• Vegetarian and non-veg options</li>
                <li>• Regional cuisine available</li>
                <li>• Cost: ₹3,000-5,000/month</li>
                <li>• Hygienic kitchen</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: "💰 Total Cost Breakdown",
      content: (
        <div className="bg-red-900/50 rounded-lg p-4">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-300">₹12-15L</p>
              <p className="text-red-200 text-sm">Total 4-year cost</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-300">₹2-3L</p>
              <p className="text-red-200 text-sm">Per year (including hostel)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-300">₹50K</p>
              <p className="text-red-200 text-sm">Coaching (2 years)</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-red-200 text-sm">
              *Costs may vary based on college and location
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 mb-16 fade-in">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-500">
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Your Complete Career Plan</h2>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full">
              {career}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Step-by-step plan */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="step-indicator active">{step.number}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  {step.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={downloadPlan}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            📄 Save This Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerPlan;
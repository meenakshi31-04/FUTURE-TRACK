// src/components/Sections/SuccessStories.jsx
import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      name: 'Rahul Sharma',
      from: 'Hyderabad, Telangana',
      achievement: 'Got into IIT Bombay - Computer Science',
      story: 'FutureTrack helped me understand the right preparation strategy for JEE. The personalized guidance and college recommendations were spot on!',
      image: 'R',
      bgColor: 'bg-blue-500',
      before: 'Average student in 10th',
      after: 'IIT Bombay CSE Student'
    },
    {
      name: 'Priya Patel',
      from: 'Ahmedabad, Gujarat',
      achievement: 'Cleared NEET with AIR 1245',
      story: 'The career quiz helped me realize my passion for medicine. The study plan and college suggestions made my journey much smoother.',
      image: 'P',
      bgColor: 'bg-pink-500',
      before: 'Science student confused about career',
      after: 'MBBS Student at AIIMS Delhi'
    },
    {
      name: 'Arjun Kumar',
      from: 'Bangalore, Karnataka',
      achievement: 'Built successful tech startup',
      story: 'FutureTrack showed me alternative paths beyond traditional engineering. The entrepreneurship guidance changed my life!',
      image: 'A',
      bgColor: 'bg-green-500',
      before: 'Wanted to be engineer',
      after: 'Tech Entrepreneur'
    },
    {
      name: 'Sneha Reddy',
      from: 'Chennai, Tamil Nadu',
      achievement: 'IAS Officer - UPSC 2023',
      story: 'The platform helped me discover my interest in civil services. The step-by-step guidance was invaluable for my UPSC preparation.',
      image: 'S',
      bgColor: 'bg-purple-500',
      before: 'Arts student without direction',
      after: 'IAS Officer'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">🌟 Success Stories</h1>
        <p className="text-xl text-gray-300">Inspiring journeys of students who found their path with FutureTrack</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {stories.map((student, index) => (
          <div key={index} className="bg-gray-900/90 rounded-2xl p-6 border border-blue-500 hover:border-blue-300 transition-all duration-300 group">
            <div className="flex items-start space-x-4 mb-4">
              <div className={`w-16 h-16 ${student.bgColor} rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
                {student.image}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {student.name}
                </h3>
                <p className="text-gray-400 text-sm">{student.from}</p>
                <div className="mt-2 px-3 py-1 bg-green-900/50 text-green-200 rounded-full text-sm inline-block">
                  {student.achievement}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 italic">"{student.story}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-red-900/30 rounded-lg p-3">
                <p className="text-red-300 font-semibold mb-1">Before</p>
                <p className="text-red-200">{student.before}</p>
              </div>
              <div className="bg-green-900/30 rounded-lg p-3">
                <p className="text-green-300 font-semibold mb-1">After</p>
                <p className="text-green-200">{student.after}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
              <div className="flex text-yellow-400">
                ⭐⭐⭐⭐⭐
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                Read Full Story →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Write Your Success Story?</h2>
        <p className="text-blue-100 mb-6">Join thousands of students who found their perfect career path with FutureTrack</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default SuccessStories;
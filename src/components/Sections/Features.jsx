// src/components/Sections/Features.jsx
import React from 'react';

const Features = () => {
  const features = [
    {
      emoji: "🧠",
      title: "AI Career Quiz",
      description: "Smart recommendations based on your interests and skills"
    },
    {
      emoji: "🗣️",
      title: "Indian Languages",
      description: "Available in Hindi, Telugu, Tamil, and more regional languages"
    },
    {
      emoji: "⭐",
      title: "Real Reviews",
      description: "Honest feedback from current students in different colleges"
    },
    {
      emoji: "💬",
      title: "Student Forum",
      description: "Connect with peers, ask doubts, and get guidance"
    }
  ];

  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">🌟 Why Choose FutureTrack?</h2>
          <p className="text-base md:text-lg text-gray-300">Complete career guidance designed for Indian students</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg card-hover text-center border border-blue-500 hover:border-blue-300 group w-full"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>
              <h3 className="font-semibold text-white text-base md:text-lg mb-2 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
// src/components/Sections/Reviews.jsx
import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      initial: "R",
      name: "Ravi Kumar",
      location: "From Karimnagar, Now at NIT Warangal",
      review: "FutureTrack helped me choose the right path after 10th. The cost breakdown was very helpful for my family planning. Now I'm studying CSE at NIT!",
      bgColor: "bg-blue-500"
    },
    {
      initial: "P",
      name: "Priya Sharma",
      location: "From Guntur, Now at AIIMS Delhi",
      review: "The NEET preparation plan was perfect. I got clear guidance about coaching, colleges, and even hostel facilities. Cleared NEET in first attempt!",
      bgColor: "bg-pink-500"
    },
    {
      initial: "A",
      name: "Arjun Reddy",
      location: "From Nizamabad, Preparing for UPSC",
      review: "I was confused between engineering and civil services. The career quiz helped me realize my passion for public service. Now preparing for UPSC!",
      bgColor: "bg-green-500"
    }
  ];

  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">💬 What Students Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg card-hover border border-blue-500 hover:border-blue-300 group w-full"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${review.bgColor} rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-300`}>
                  {review.initial}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white text-sm md:text-base group-hover:text-blue-400 transition-colors">
                    {review.name}
                  </p>
                  <p className="text-gray-300 text-xs md:text-sm group-hover:text-gray-200 transition-colors">
                    {review.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors">
                {review.review}
              </p>
              <div className="flex text-yellow-400 mt-3 group-hover:animate-pulse text-sm md:text-base">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
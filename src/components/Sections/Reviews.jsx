// src/components/Sections/Reviews.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Reviews = () => {
  const reviews = [
    {
      initial: "R",
      name: "Ravi Kumar",
      location: "From Karimnagar, Now at NIT Warangal",
      review: "FutureTrack helped me choose the right path after 10th. The cost breakdown was very helpful for my family planning. Now I'm studying CSE at NIT!",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      initial: "P",
      name: "Priya Sharma",
      location: "From Guntur, Now at AIIMS Delhi",
      review: "The NEET preparation plan was perfect. I got clear guidance about coaching, colleges, and even hostel facilities. Cleared NEET in first attempt!",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      initial: "A",
      name: "Arjun Reddy",
      location: "From Nizamabad, Preparing for UPSC",
      review: "I was confused between engineering and civil services. The career quiz helped me realize my passion for public service. Now preparing for UPSC!",
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            💬 What Students Say
          </h2>
          <p className="text-gray-300 text-base md:text-lg opacity-80">
            Hear from students who discovered their dream career with FutureTrack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative bg-gray-900/70 border border-blue-500/30 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] 
                         hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Accent gradient ring */}
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${review.gradient} rounded-full blur-xl opacity-30`} />

              {/* Header */}
              <div className="flex items-center mb-4 relative z-10">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${review.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {review.initial}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white text-base md:text-lg">{review.name}</p>
                  <p className="text-gray-400 text-sm md:text-base">{review.location}</p>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="flex text-yellow-400 mt-4 relative z-10">
                ⭐⭐⭐⭐⭐
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

// src/components/Sections/SuccessStories.jsx
import React from "react";
import { motion } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      name: "Rahul Sharma",
      from: "Hyderabad, Telangana",
      achievement: "Got into IIT Bombay - Computer Science",
      story:
        "FutureTrack helped me understand the right preparation strategy for JEE. The personalized guidance and college recommendations were spot on!",
      image: "R",
      bgColor: "from-blue-500 to-cyan-400",
      before: "Average student in 10th",
      after: "IIT Bombay CSE Student",
    },
    {
      name: "Priya Patel",
      from: "Ahmedabad, Gujarat",
      achievement: "Cleared NEET with AIR 1245",
      story:
        "The career quiz helped me realize my passion for medicine. The study plan and college suggestions made my journey much smoother.",
      image: "P",
      bgColor: "from-pink-500 to-purple-400",
      before: "Science student confused about career",
      after: "MBBS Student at AIIMS Delhi",
    },
    {
      name: "Arjun Kumar",
      from: "Bangalore, Karnataka",
      achievement: "Built successful tech startup",
      story:
        "FutureTrack showed me alternative paths beyond traditional engineering. The entrepreneurship guidance changed my life!",
      image: "A",
      bgColor: "from-green-500 to-emerald-400",
      before: "Wanted to be engineer",
      after: "Tech Entrepreneur",
    },
    {
      name: "Sneha Reddy",
      from: "Chennai, Tamil Nadu",
      achievement: "IAS Officer - UPSC 2023",
      story:
        "The platform helped me discover my interest in civil services. The step-by-step guidance was invaluable for my UPSC preparation.",
      image: "S",
      bgColor: "from-purple-500 to-pink-400",
      before: "Arts student without direction",
      after: "IAS Officer",
    },
  ];

  return (
    <section className="relative w-full px-6 py-16 bg-gradient-to-b from-[#080d17] via-[#0c1424] to-[#10182f] overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
          Success Stories
        </h2>
        <p className="text-gray-300 mt-3 text-lg">
          Inspiring journeys of students who found their path with{" "}
          <span className="text-blue-400 font-semibold">FutureTrack</span>
        </p>
      </motion.div>

      {/* Success Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {stories.map((student, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl 
                       shadow-lg overflow-hidden group hover:border-blue-400/50 hover:shadow-blue-500/20 
                       transition-all duration-300"
          >
            {/* Soft Glow */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-gradient-to-r ${student.bgColor} 
                          blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
            />

            {/* Header Info */}
            <div className="relative flex items-center space-x-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${student.bgColor} flex items-center justify-center 
                            text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {student.image}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {student.name}
                </h3>
                <p className="text-gray-400 text-sm">{student.from}</p>
                <div className="mt-2 px-3 py-1 bg-green-900/40 text-green-200 rounded-full text-xs inline-block">
                  {student.achievement}
                </div>
              </div>
            </div>

            {/* Story Text */}
            <p className="relative text-gray-300 italic leading-relaxed mb-4">
              “{student.story}”
            </p>

            {/* Before & After */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gradient-to-r from-red-900/30 to-red-700/20 rounded-lg p-3">
                <p className="text-red-300 font-semibold mb-1">Before</p>
                <p className="text-red-100">{student.before}</p>
              </div>
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-700/20 rounded-lg p-3">
                <p className="text-green-300 font-semibold mb-1">After</p>
                <p className="text-green-100">{student.after}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
                Read Full Story →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-10 max-w-5xl mx-auto shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to Write Your Success Story?
        </h2>
        <p className="text-blue-100 mb-6 text-lg">
          Join thousands of students who found their perfect career path with{" "}
          <span className="font-semibold text-white">FutureTrack</span>
        </p>
        <button className="bg-white/90 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-md">
          Start Your Journey
        </button>
      </motion.div>
    </section>
  );
};

export default SuccessStories;

// src/components/Sections/Features.jsx
import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      emoji: "🧠",
      title: "AI Career Quiz",
      description:
        "Smart recommendations based on your interests and skills using AI-driven insights.",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      emoji: "🗣️",
      title: "Indian Languages",
      description:
        "Available in Hindi, Telugu, Tamil, Kannada and more regional languages for every student.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      emoji: "⭐",
      title: "Real Reviews",
      description:
        "Honest feedback from students studying in top Indian colleges and universities.",
      gradient: "from-yellow-400 to-amber-600",
    },
    {
      emoji: "💬",
      title: "Student Forum",
      description:
        "Connect with peers, ask doubts, and get real-time guidance from experienced mentors.",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            🌟 Why Choose FutureTrack?
          </h2>
          <p className="text-gray-300 text-base md:text-lg opacity-80">
            Empowering Indian students with complete, personalized career guidance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-gray-900/70 border border-blue-500/30 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] 
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500 hover:-translate-y-2 text-center"
            >
              {/* Glow Accent */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl opacity-30`}
              ></div>

              {/* Icon */}
              <div
                className={`relative z-10 text-4xl mb-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.emoji}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white text-lg md:text-xl mb-2 relative z-10 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

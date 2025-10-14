// src/components/Sections/ProblemSection.jsx
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';

const ProblemSection = () => {
  const { t } = useLanguage();

  const problems = [
    {
      emoji: "🤔",
      title: t('career_confusion'),
      description: t('career_confusion_desc'),
      glow: "from-blue-500/40 to-cyan-400/10"
    },
    {
      emoji: "📚",
      title: t('course_selection'),
      description: t('course_selection_desc'),
      glow: "from-purple-500/40 to-pink-400/10"
    },
    {
      emoji: "🏫",
      title: t('college_choice'),
      description: t('college_choice_desc'),
      glow: "from-green-500/40 to-emerald-400/10"
    },
    {
      emoji: "💰",
      title: t('cost_planning'),
      description: t('cost_planning_desc'),
      glow: "from-yellow-500/40 to-orange-400/10"
    },
  ];

  return (
    <section className="w-full px-4 py-12 md:py-16 bg-gradient-to-b from-[#0a0f1a] via-[#0c1220] to-[#0e1628] relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
             {t('problem_title')}
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            {t('problem_subtitle')}
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 md:p-6 
                         shadow-lg card-hover border border-blue-500 hover:border-blue-300 
                         group text-center transition-all duration-300"
            >
              {/* Glowing Circle Behind Emoji */}
              <div
                className={`absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 
                            rounded-full blur-2xl bg-gradient-to-b ${problem.glow} 
                            opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
              />

              {/* Emoji */}
              <div className="relative text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                {problem.emoji}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white text-base md:text-lg mb-2 group-hover:text-blue-400 transition-colors">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Background Blurs */}
      <div className="absolute -top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
    </section>
  );
};

export default ProblemSection;

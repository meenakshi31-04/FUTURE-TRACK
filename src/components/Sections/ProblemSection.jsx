// src/components/Sections/ProblemSection.jsx
import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const ProblemSection = () => {
  const { t } = useLanguage();

  const problems = [
    {
      emoji: "🤔",
      title: t('career_confusion'),
      description: t('career_confusion_desc')
    },
    {
      emoji: "📚",
      title: t('course_selection'),
      description: t('course_selection_desc')
    },
    {
      emoji: "🏫",
      title: t('college_choice'),
      description: t('college_choice_desc')
    },
    {
      emoji: "💰",
      title: t('cost_planning'),
      description: t('cost_planning_desc')
    }
  ];

  return (
    <section id="problem-section" className="w-full px-4 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{t('problem_title')}</h2>
          <p className="text-base md:text-lg text-gray-300 px-4">{t('problem_subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg card-hover border border-blue-500 hover:border-blue-300 group w-full"
            >
              <div className="text-2xl md:text-3xl mb-3 md:mb-4 group-hover:animate-bounce">{problem.emoji}</div>
              <h3 className="font-semibold text-white text-base md:text-lg mb-2 group-hover:text-blue-400 transition-colors">
                {problem.title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
// src/components/Sections/QuizSection.jsx
import React from 'react';
import { useQuiz } from '../../hooks/useQuiz';

const QuizSection = ({ onQuizComplete, onClose }) => {
  const {
    currentQuestion,
    quizQuestions,
    progress,
    selectedAnswer,
    selectAnswer,
    nextQuestion,
    showResult,
    quizResult
  } = useQuiz();

  if (showResult && quizResult) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8 mb-16 fade-in">
        <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Your Career Match!</h2>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full mb-4">
              {quizResult.career}
            </div>
            <p className="text-gray-300">{quizResult.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">📚 Recommended Courses</h3>
              <ul className="text-gray-300 space-y-2">
                {quizResult.courses.map((course, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">🎯 Entrance Exams</h3>
              <ul className="text-gray-300 space-y-2">
                {quizResult.entranceExams.map((exam, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {exam}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onQuizComplete(quizResult)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Get Detailed Plan
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion - 1];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 mb-16 fade-in">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-blue-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🧠 AI Career Discovery Quiz</h2>
          <p className="text-gray-300">Answer a few simple questions to discover your ideal career path</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-300">
                Question {currentQuestion} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-300">{progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-white">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option.value)}
                  className={`quiz-option w-full text-left p-4 rounded-lg border-2 transition-colors text-gray-200 hover:text-white ${
                    selectedAnswer === option.value
                      ? 'border-blue-400 bg-blue-900/30 text-white'
                      : 'border-gray-600 hover:border-blue-400 hover:bg-blue-900/30'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedAnswer
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === quizQuestions.length ? 'See Results' : 'Next Question'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
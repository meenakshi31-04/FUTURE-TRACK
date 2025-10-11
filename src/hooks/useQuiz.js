// src/hooks/useQuiz.js
import { useState } from 'react';
import { quizQuestions, careerRecommendations } from '../data/quizData';

export const useQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const progress = Math.round((currentQuestion / quizQuestions.length) * 100);

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate career recommendation
        const result = calculateCareer(newAnswers);
        setQuizResult(result);
        setShowResult(true);
      }
    }
  };

  const calculateCareer = (userAnswers) => {
    const scores = {};
    
    userAnswers.forEach(answer => {
      careerRecommendations.forEach(career => {
        if (career.matchingAnswers.includes(answer)) {
          scores[career.career] = (scores[career.career] || 0) + 1;
        }
      });
    });

    // Find career with highest score
    let topCareer = 'Software Engineer';
    let highestScore = 0;

    Object.entries(scores).forEach(([career, score]) => {
      if (score > highestScore) {
        highestScore = score;
        topCareer = career;
      }
    });

    return careerRecommendations.find(c => c.career === topCareer) || careerRecommendations[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResult(null);
  };

  return {
    currentQuestion,
    quizQuestions,
    progress,
    selectedAnswer,
    selectAnswer,
    nextQuestion,
    showResult,
    quizResult,
    resetQuiz
  };
};
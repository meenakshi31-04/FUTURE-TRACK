// src/data/quizData.js
export const quizQuestions = [
  {
    id: 1,
    question: "What subjects do you enjoy the most?",
    options: [
      { text: "🔬 Science subjects (Physics, Chemistry, Biology)", value: "science" },
      { text: "📊 Mathematics and logical thinking", value: "math" },
      { text: "🎨 Arts, literature, and creative subjects", value: "arts" },
      { text: "🌍 Social studies and current affairs", value: "social" }
    ]
  },
  {
    id: 2,
    question: "What type of work environment appeals to you?",
    options: [
      { text: "🏥 Hospitals and healthcare facilities", value: "healthcare" },
      { text: "💻 Tech companies and startups", value: "tech" },
      { text: "🏛️ Government offices and public service", value: "government" },
      { text: "🎭 Creative studios and artistic spaces", value: "creative" }
    ]
  },
  {
    id: 3,
    question: "How do you prefer to help others?",
    options: [
      { text: "👨‍⚕️ Treating patients and saving lives", value: "medical" },
      { text: "👨‍🏫 Teaching and sharing knowledge", value: "education" },
      { text: "⚖️ Ensuring justice and law enforcement", value: "law" },
      { text: "🔧 Building and creating solutions", value: "engineering" }
    ]
  },
  {
    id: 4,
    question: "What motivates you the most?",
    options: [
      { text: "💰 Good salary and financial stability", value: "money" },
      { text: "🌟 Recognition and social status", value: "status" },
      { text: "❤️ Helping society and making a difference", value: "service" },
      { text: "🚀 Innovation and creating new things", value: "innovation" }
    ]
  },
  {
    id: 5,
    question: "How do you handle pressure and challenges?",
    options: [
      { text: "💪 I thrive under pressure and deadlines", value: "pressure" },
      { text: "🧘 I prefer steady, predictable work", value: "steady" },
      { text: "🎯 I like solving complex problems", value: "problem" },
      { text: "🤝 I work best in team environments", value: "team" }
    ]
  }
];

export const careerRecommendations = [
  {
    career: "Doctor",
    description: "Perfect for science enthusiasts who want to help people and work in healthcare.",
    matchingAnswers: ["science", "healthcare", "medical", "service", "pressure"],
    courses: ["Intermediate (BiPC)", "MBBS", "BDS", "BAMS"],
    entranceExams: ["NEET", "AIIMS", "JIPMER"]
  },
  {
    career: "Software Engineer",
    description: "Ideal for problem-solvers who love technology and innovation.",
    matchingAnswers: ["math", "tech", "engineering", "innovation", "problem"],
    courses: ["Intermediate (MPC)", "B.Tech CSE", "BCA", "B.Sc CS"],
    entranceExams: ["JEE Main", "JEE Advanced", "State CETs"]
  },
  {
    career: "IAS Officer",
    description: "Great for those interested in public service and governance.",
    matchingAnswers: ["social", "government", "law", "service", "pressure"],
    courses: ["Any Graduation", "Public Administration", "Political Science"],
    entranceExams: ["UPSC Civil Services", "State PSCs"]
  },
  {
    career: "Teacher",
    description: "Perfect for those who love sharing knowledge and working with people.",
    matchingAnswers: ["arts", "education", "service", "steady", "team"],
    courses: ["B.Ed", "D.Ed", "Subject-specific Graduation"],
    entranceExams: ["CTET", "State TETs"]
  },
  {
    career: "Graphic Designer",
    description: "Ideal for creative minds who love visual communication.",
    matchingAnswers: ["arts", "creative", "innovation", "steady"],
    courses: ["BFA", "B.Des", "Diploma in Graphic Design"],
    entranceExams: ["NID", "NIFT", "CEED"]
  }
];
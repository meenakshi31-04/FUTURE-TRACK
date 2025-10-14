// src/components/Sections/CareerPlan.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "../../hooks/useLocation";
import {
  getCollegesByCareerAndLocation,
  getIntermediateColleges,
  getAlternativeColleges,
} from "../../data/collegeData";

const CareerPlan = ({ career, quizResult, onClose }) => {
  const { getCurrentLocation, selectedCity } = useLocation();
  const currentLocation = getCurrentLocation();
  const colleges = getCollegesByCareerAndLocation(career, selectedCity);
  const intermediateColleges = getIntermediateColleges(selectedCity);
  const alternativeColleges = getAlternativeColleges(selectedCity);

  const downloadPlan = () => {
    const planText = `
FutureTrack Career Plan - ${career}

📚 Course After 10th: Intermediate (MPC/BiPC based on career)
📝 Entrance Exams: ${quizResult?.entranceExams?.join(", ") || "Relevant exams"}
🏫 Top Colleges: ${colleges
        .slice(0, 3)
        .map((c) => c.name)
        .join(", ")}
💰 Total Cost: ₹12-15L for 4 years (approx.)

Visit FutureTrack for more details!
    `;
    const blob = new Blob([planText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FutureTrack-Plan-${career}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const steps = [
    {
      number: 1,
      title: "Course After 10th",
      color: "from-blue-500 to-blue-700",
      content: (
        <>
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-blue-600/20">
            <p className="font-medium text-blue-200">
              Recommended:{" "}
              {career === "Doctor"
                ? "Intermediate (BiPC - Biology, Physics, Chemistry)"
                : "Intermediate (MPC - Maths, Physics, Chemistry)"}
            </p>
            <p className="text-blue-300 text-sm mt-1">
              Duration: 2 years | Focus on entrance exams
            </p>
          </div>

          <h4 className="font-semibold text-gray-100 mb-3">
            Best Intermediate Colleges
          </h4>
          <div className="space-y-3">
            {intermediateColleges.slice(0, 3).map((college, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-blue-900/20 rounded-lg p-3 border border-blue-600/10 hover:border-blue-500/40 transition-all"
              >
                <p className="font-medium text-blue-200">{college.name}</p>
                <p className="text-blue-300 text-sm">{college.features}</p>
                <p className="text-blue-400 text-xs mt-1">
                  {college.type} • {college.fee}
                </p>
              </motion.div>
            ))}
          </div>

          <h4 className="font-semibold text-gray-100 mt-6 mb-2">
            Alternative Career Paths
          </h4>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: "Diploma", desc: "3 years → Direct 2nd year Engineering" },
              { title: "ITI", desc: "2 years → Skilled Technical Jobs" },
              { title: "Polytechnic", desc: "Practical Engineering" },
            ].map((alt, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-green-900/20 p-3 rounded-lg text-center border border-green-700/30"
              >
                <p className="text-green-300 font-semibold">{alt.title}</p>
                <p className="text-green-400 text-sm">{alt.desc}</p>
              </motion.div>
            ))}
          </div>
        </>
      ),
    },
    {
      number: 2,
      title: "Entrance Exams",
      color: "from-green-500 to-emerald-700",
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          {(quizResult?.entranceExams || ["JEE", "NEET"]).map((exam, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-green-900/30 rounded-lg p-4 border border-green-700/30"
            >
              <p className="font-medium text-green-200">{exam}</p>
              <p className="text-green-300 text-sm">
                {exam.includes("JEE")
                  ? "For engineering colleges"
                  : exam.includes("NEET")
                  ? "For medical colleges"
                  : "Relevant to your career path"}
              </p>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      number: 3,
      title: "Top Colleges in Your Area",
      color: "from-yellow-500 to-amber-700",
      content: (
        <>
          {colleges.slice(0, 4).map((college, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-700/30"
            >
              <p className="text-yellow-200 font-semibold">{college.name}</p>
              <p className="text-yellow-400 text-sm">{college.rank}</p>
              <p className="text-yellow-300 text-xs mt-1">
                {college.type} • {college.fee}
              </p>
            </motion.div>
          ))}
        </>
      ),
    },
    {
      number: 4,
      title: "Hostel & Living",
      color: "from-purple-500 to-fuchsia-700",
      content: (
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/40">
          <ul className="text-purple-200 text-sm space-y-1">
            <li>🏠 Hostel with AC/Non-AC rooms</li>
            <li>🍽️ Mess with regional cuisines</li>
            <li>📶 Wi-Fi, Laundry & Security</li>
            <li>💰 ₹3,000–5,000/month (approx.)</li>
          </ul>
        </div>
      ),
    },
    {
      number: 5,
      title: "Estimated Cost",
      color: "from-red-500 to-rose-700",
      content: (
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-700/40">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-300">₹12-15L</p>
              <p className="text-red-200 text-sm">Total 4-year Cost</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-300">₹2-3L</p>
              <p className="text-red-200 text-sm">Per Year</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-300">₹50K</p>
              <p className="text-red-200 text-sm">Coaching</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-2xl border border-blue-500/30 rounded-3xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 text-center">
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Your Personalized Career Plan
            </h2>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg">
              {career}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✖
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative pl-8 border-l-4 border-transparent hover:border-blue-500 transition-all"
            >
              <div
                className={`absolute -left-5 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center font-bold text-white shadow-md`}
              >
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              {step.content}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={downloadPlan}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Save This Plan
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CareerPlan;

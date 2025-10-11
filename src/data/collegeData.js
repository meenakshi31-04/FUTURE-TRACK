// src/data/collegeData.js
export const intermediateCollegeDatabase = {
  hyderabad_city: [
    { name: 'Sri Chaitanya Junior College', type: 'MPC/BiPC', fee: '₹85K/year', rating: '⭐⭐⭐⭐⭐', features: 'IIT-JEE Coaching, NEET Prep' },
    { name: 'Narayana Junior College', type: 'MPC/BiPC', fee: '₹75K/year', rating: '⭐⭐⭐⭐⭐', features: 'Integrated Coaching, Hostel' },
    { name: 'Govt Junior College', type: 'MPC/BiPC/CEC', fee: '₹15K/year', rating: '⭐⭐⭐⭐', features: 'Affordable, Good Faculty' }
  ],
  warangal_city: [
    { name: 'Kakatiya Junior College', type: 'MPC/BiPC', fee: '₹35K/year', rating: '⭐⭐⭐⭐', features: 'Local Reputation, Good Results' },
    { name: 'Sri Chaitanya Warangal', type: 'MPC/BiPC', fee: '₹65K/year', rating: '⭐⭐⭐⭐⭐', features: 'Branch of Top Chain' }
  ],
  bangalore: [
    { name: 'Deeksha PU College', type: 'PCMC/PCMB', fee: '₹95K/year', rating: '⭐⭐⭐⭐⭐', features: 'JEE/NEET Coaching, Modern Labs' },
    { name: 'BASE PU College', type: 'PCMC/PCMB', fee: '₹85K/year', rating: '⭐⭐⭐⭐⭐', features: 'Integrated Coaching' }
  ]
};

export const alternativeCollegeDatabase = {
  hyderabad_city: [
    { name: 'Government Polytechnic Hyderabad', type: 'Diploma - All Branches', fee: '₹25K/year', rating: '⭐⭐⭐⭐', features: 'Government, Affordable' },
    { name: 'CBIT Polytechnic', type: 'Diploma - CSE/ECE/Mech', fee: '₹45K/year', rating: '⭐⭐⭐⭐⭐', features: 'Excellent Placement' }
  ],
  warangal_city: [
    { name: 'Government Polytechnic Warangal', type: 'Diploma - All Branches', fee: '₹20K/year', rating: '⭐⭐⭐⭐', features: 'Established Institution' },
    { name: 'KITS Polytechnic', type: 'Diploma - Technical', fee: '₹55K/year', rating: '⭐⭐⭐⭐', features: 'Good Infrastructure' }
  ]
};

export const collegeDatabase = {
  hyderabad_city: {
    'Doctor': [
      { name: 'AIIMS Hyderabad - MBBS', rank: 'NEET: Top 100', fee: '₹1.4L/year', rating: '⭐⭐⭐⭐⭐', hostel: true, mess: true },
      { name: 'Osmania Medical College', rank: 'NEET: 1000-5000', fee: '₹50K/year', rating: '⭐⭐⭐⭐', hostel: true, mess: true }
    ],
    'Software Engineer': [
      { name: 'IIIT Hyderabad - CSE', rank: 'JEE Main: 500-1500', fee: '₹3.2L/year', rating: '⭐⭐⭐⭐⭐', hostel: true, mess: true },
      { name: 'CBIT Hyderabad - CSE', rank: 'TS EAMCET: 1-5000', fee: '₹1.2L/year', rating: '⭐⭐⭐⭐', hostel: true, mess: true }
    ],
    'IAS Officer': [
      { name: 'NALSAR University of Law', rank: 'CLAT: Top 100', fee: '₹2.5L/year', rating: '⭐⭐⭐⭐⭐', hostel: true, mess: true },
      { name: 'University of Hyderabad', rank: 'CUET/Entrance', fee: '₹45K/year', rating: '⭐⭐⭐⭐', hostel: true, mess: true }
    ]
  },
  warangal_city: {
    'Doctor': [
      { name: 'Kakatiya Medical College', rank: 'NEET: 3000-12000', fee: '₹55K/year', rating: '⭐⭐⭐⭐', hostel: true, mess: true }
    ],
    'Software Engineer': [
      { name: 'NIT Warangal - CSE', rank: 'JEE Main: 1000-3000', fee: '₹1.8L/year', rating: '⭐⭐⭐⭐⭐', hostel: true, mess: true },
      { name: 'KITS Warangal - CSE', rank: 'TS EAMCET: 5000-15000', fee: '₹1.8L/year', rating: '⭐⭐⭐⭐', hostel: true, mess: true }
    ]
  }
};

export const getCollegesByCareerAndLocation = (career, location) => {
  return collegeDatabase[location]?.[career] || [];
};

export const getIntermediateColleges = (location) => {
  return intermediateCollegeDatabase[location] || [];
};

export const getAlternativeColleges = (location) => {
  return alternativeCollegeDatabase[location] || [];
};
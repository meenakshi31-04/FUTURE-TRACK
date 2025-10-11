// src/components/Layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const quickLinks = [
    { name: "Career Quiz", href: "#" },
    { name: "College Reviews", href: "#" },
    { name: "Student Forum", href: "#" },
    { name: "Success Stories", href: "#" }
  ];

  const popularCareers = [
    { name: "Engineering", href: "#" },
    { name: "Medical", href: "#" },
    { name: "Civil Services", href: "#" },
    { name: "Teaching", href: "#" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" }
  ];

  return (
    <footer className="bg-gray-900/95 backdrop-blur-md text-white py-12 px-4 mt-16 border-t border-blue-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✨</span>
              <span className="text-xl font-bold">FutureTrack</span>
            </div>
            <p className="text-gray-400">
              Empowering students to make informed career decisions after 10th class.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="hover:text-blue-300 transition-all duration-300 hover:scale-105 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Careers */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Careers</h3>
            <ul className="space-y-2 text-gray-400">
              {popularCareers.map((career, index) => (
                <li key={index}>
                  <a 
                    href={career.href}
                    className="hover:text-blue-300 transition-all duration-300 hover:scale-105 transform inline-block"
                  >
                    {career.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="hover:text-blue-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FutureTrack. Made with ❤️ for Indian students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
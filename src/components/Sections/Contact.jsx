// src/components/Sections/Contact.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }
    
    // Handle form submission
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'support@futuretrack.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📱',
      title: 'Call Us',
      details: '+91 98765 43210',
      description: 'Mon to Sat from 9AM to 6PM'
    },
    {
      icon: '💬',
      title: 'Chat with us',
      details: 'Live Chat',
      description: 'Instant support via chat'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: 'RGUKT ONGOLE, AP',
      description: 'Come say hello at our office'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">📞 Contact Us</h1>
        <p className="text-xl text-gray-300">Get in touch with our career counselors and support team</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-8">
            Have questions about career guidance, college admissions, or our services? 
            We're here to help you make the best decisions for your future.
          </p>

          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors">
                <div className="text-2xl">{method.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{method.title}</h3>
                  <p className="text-blue-300 font-medium">{method.details}</p>
                  <p className="text-gray-400 text-sm">{method.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Office Hours */}
          <div className="mt-8 p-6 bg-blue-900/30 rounded-lg border border-blue-500">
            <h3 className="font-semibold text-white mb-3">🕒 Office Hours</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-blue-300">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-blue-300">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-red-300">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900/90 rounded-2xl p-8 border border-blue-500">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select a subject</option>
                <option value="career-guidance">Career Guidance</option>
                <option value="college-admission">College Admission</option>
                <option value="technical-support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Send Message
            </button>

            <p className="text-gray-400 text-sm text-center">
              We typically respond within 24 hours
            </p>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "How does FutureTrack help in career guidance?",
              answer: "We use AI-powered assessments, personalized recommendations, and expert counseling to help you discover the perfect career path."
            },
            {
              question: "Is FutureTrack free to use?",
              answer: "Yes, our basic career guidance and college search features are completely free. We offer premium services for detailed personalized plans."
            },
            {
              question: "Do you provide college admission assistance?",
              answer: "Yes, we provide comprehensive guidance on college admissions, entrance exams, and application processes."
            },
            {
              question: "Can I change my career plan later?",
              answer: "Absolutely! You can update your preferences and get new recommendations anytime as your interests evolve."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors">
              <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
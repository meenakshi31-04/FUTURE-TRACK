// src/components/Sections/DiscussionForum.jsx
import React, { useState, useEffect } from 'react';

const DiscussionForum = () => {
  // The initial posts that load if the user has nothing saved
  const initialPosts = [
    {
      id: 1,
      title: "Which programming language should I learn first?",
      author: "Rahul K.",
      content: "I'm new to programming and want to start with the right language.",
      replies: 15,
      views: 120,
      timestamp: "2 hours ago",
      category: "Technology"
    },
    {
      id: 2,
      title: "How to prepare for medical entrance exams?",
      author: "Priya S.",
      content: "I want to pursue MBBS. What should be my study plan?",
      replies: 23,
      views: 180,
      timestamp: "5 hours ago",
      category: "Medical"
    }
  ];

  // 1. Initialize state from Local Storage or with initial data
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('discussionPosts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  // 2. Use useEffect to save posts to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('discussionPosts', JSON.stringify(posts));
  }, [posts]); // This hook runs every time the 'posts' state updates

  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General'
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    const post = {
      // Use a more unique ID like a timestamp
      id: Date.now(), 
      title: newPost.title,
      author: "Current User",
      content: newPost.content,
      replies: 0,
      views: 0,
      timestamp: "Just now",
      category: newPost.category
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'General' });
    setShowNewPostForm(false);
  };

  const filteredPosts = selectedCategory === 'All Topics'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">💬 Student Discussion Forum</h1>
          <p className="text-lg md:text-xl text-gray-300">Ask questions, share knowledge, and connect with peers</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-900/90 rounded-2xl p-6 border border-blue-500">
              <button onClick={() => setShowNewPostForm(true)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all mb-6">
                + New Discussion
              </button>
              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Categories</h3>
                <div className="space-y-2">
                  {['All Topics', 'Career Guidance', 'Technology', 'Medical', 'Engineering', 'Arts & Humanities', 'Science'].map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-gray-300 hover:bg-blue-900/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {showNewPostForm && (
              <div className="bg-gray-900/90 rounded-2xl p-6 border border-green-500 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Create New Discussion</h3>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <input type="text" placeholder="Enter discussion title..." value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="Technology">Technology</option>
                      <option value="Medical">Medical</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Arts & Humanities">Arts & Humanities</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>
                  <div>
                    <textarea placeholder="Describe your question or topic..." value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} rows="4" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">Post Discussion</button>
                    <button type="button" onClick={() => setShowNewPostForm(false)} className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-gray-900/90 rounded-2xl p-6 border border-blue-500 hover:border-blue-400 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>By {post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>💬 {post.replies} replies</span>
                      <span>👁️ {post.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscussionForum;

"use client";

import React, { useState } from "react";

export default function FeedbackForm({ theme }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, message }),
      });

      if (res.ok) {
        setFullName('');
        setEmail('');
        setMessage('');
        fetchFeedbacks();
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      alert('Error submitting feedback');
    }
    setLoading(false);
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleToggle = () => {
    setShowFeedbacks(!showFeedbacks);
    if (!showFeedbacks) {
      fetchFeedbacks();
    }
  };

  return (
    <div className={`space-y-6 p-4  md:p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
     
      <div className="flex justify-center mb-6">
        <button
          onClick={handleToggle}
          className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all duration-300 ${theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-blue-600'}`}
        >
          {showFeedbacks ? "Hide Feedbacks" : "View Submitted Feedback"}
        </button>
      </div>

      {!showFeedbacks && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={`border p-3 w-full rounded-md transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`border p-3 w-full rounded-md transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          />
          <textarea
            placeholder="Your Feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={`border p-3 w-full rounded-md h-32 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50 transition-all duration-300 ${theme === 'dark' ? 'hover:bg-green-500' : 'hover:bg-green-600'}`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}

      {showFeedbacks && (
        <div className="space-y-4">
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, idx) => (
              <div
              key={idx}
              className={`border p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
            >
              <h3 className={`font-semibold text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {fb.fullName} ({fb.email})
              </h3>
              <p className={`mt-2 font-serif ${theme==='light' ?'text-gray-700' : 'text-white'} break-words`}>{fb.message}</p> {/* Handle overflow and word wrapping */}
              <small className="text-gray-500 block mt-4">
                {new Date(fb.timestamp).toLocaleString()}
              </small>
            </div>
            
            ))
          ) : (
            <p className="text-center text-gray-400">
              No feedbacks submitted yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

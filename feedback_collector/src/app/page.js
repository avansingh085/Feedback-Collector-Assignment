"use client";

import React, { useState, useEffect } from "react";
import FeedbackForm from "../../components/FeedbackForm";

export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <main className={`min-h-screen transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} flex flex-col justify-between`}>
      
      <div className="max-w-3xl w-full mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold text-center w-full ${theme === 'dark' ? 'text-white' : 'text-black'} animate-fade-in`}>
            Feedback Collector
          </h1>

          <div className="flex items-center ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-12 h-7 bg-gray-200 rounded-full dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition peer-checked:bg-blue-600 relative">
                <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-md"></span>
              </div>
            </label>
          </div>
        </div>

        <div className={`bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500`}>
          <FeedbackForm theme={theme} />
        </div>
      </div>

      <footer className={`text-center text-sm pb-6 animate-fade-in ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        Made by Avan Singh - Candidate Task Submission
      </footer>
    </main>
  );
}

import React from 'react';
import { AiOutlineEye, AiOutlineLike, AiOutlineComment } from 'react-icons/ai';

const ReadingPage = () => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Title */}
      <div className="max-w-3xl mx-auto">
      <div className="px-6 sm:px-8 pt-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Bringing Farmers to the Table for Conversations about River Health
        </h1>
      </div>

      {/* Author Info */}
      <div className="px-6 sm:px-8 py-4 flex items-center space-x-4 border-b border-green-100">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
          alt="Victor Shape"
          className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
        />
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-green-800">Victor Shape</h2>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Expert</span>
          </div>
          <p className="text-green-600 text-sm">Published on 9th November 2024</p>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="px-6 sm:px-8 py-4 flex items-center space-x-6 text-green-600 border-b border-green-100">
        <div className="flex items-center space-x-2">
          <AiOutlineLike className="text-xl" />
          <span>1.3K</span>
        </div>
        <div className="flex items-center space-x-2">
          <AiOutlineEye className="text-xl" />
          <span>2.1K</span>
        </div>
        <div className="flex items-center space-x-2">
          <AiOutlineComment className="text-xl" />
          <span>24</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200"
          alt="River Waterfall"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="px-6 sm:px-8 py-8">
        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            "I'm sick of the D word," says Kyler Brown. As a small farmer and
            rancher in Del Norte, Colorado, he spends a lot of time talking about
            drought. "To say you're in a drought of 19 or 20 years, it seems like
            you're not in a drought anymore."
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            The conversation about water scarcity in the West is shifting, and
            farmers like Brown are at the forefront of new approaches to water
            conservation and river health management.
          </p>
        </div>
      </div>
      </div>
    </article>
  );
};

export default ReadingPage;
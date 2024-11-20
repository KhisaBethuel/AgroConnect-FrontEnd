/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import React from "react";

const ReadingPage = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // fetch(`/api/blogs/${id}`).then(response => response.json()).then(data => setBlog(data));

    setBlog({
      title:
        "Bringing Farmers to the Table for Conversations about River Health",
      author: "Victor Shape",
      content: `Water scarcity has become an increasingly pressing issue across the globe, and nowhere is it more evident than in the Western United States. Farmers, often the stewards of our land and resources, are at the frontlines of finding sustainable solutions to ensure water remains accessible for agriculture while also safeguarding the health of our rivers and ecosystems. 

      Kyler Brown, a small farmer and rancher in Del Norte, Colorado, has spent much of his career discussing the realities of drought. "I'm sick of the D word," he says. "To say you're in a drought of 19 or 20 years, it seems like you're not in a drought anymore." As water resources continue to dwindle, the conversation is shifting from survival to innovation. Farmers like Kyler are exploring new approaches to water conservation, river health management, and crop resilience in the face of a changing climate. 
  
      Through collaboration, education, and the sharing of innovative practices, farmers are bringing fresh perspectives to the table to tackle one of the most crucial challenges of our time: the health of our rivers. The discussions taking place today are not just about conserving water, but about preserving the lifeblood of agriculture and ensuring that future generations will have access to the resources they need to thrive.

      The conversation is far from over, and as Kyler puts it, "We have a responsibility to future generations of farmers to take care of the land and water now."`,
      likes: 1300,
      views: 2100,
      comments: 24,
      image: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200",
    });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden pt-20">
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
              <h2 className="text-lg font-semibold text-green-800">
                Victor Shape
              </h2>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Expert
              </span>
            </div>
            <p className="text-green-600 text-sm">
              Published on 9th November 2024
            </p>
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

        <div className="px-6 sm:px-8 py-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              `Im sick of the D word, says Kyler Brown. As a small farmer and
              rancher in Del Norte, Colorado, he spends a lot of time talking
              about drought. To say youre in a drought of 19 or 20 years, it
              seems like youre not in a drought anymore.
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

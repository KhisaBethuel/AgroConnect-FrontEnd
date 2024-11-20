/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "../Components/Navbar";
import React from "react";
const BlogPublishForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [story, setStory] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleStoryChange = (e) => setStory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("story", story);
    if (image) {
      formData.append("image", image);
    }

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="pt-20">
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center py-8">
        <div className="bg-darkgreen w-full max-w-xl p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-center text-white font-bold mb-6">
            Publish Your Blog
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blog Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg text-white font-medium mb-2">
                Blog Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
                placeholder="Enter your blog title"
                className="w-full p-3 rounded-md border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-lg text-white font-medium mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-md border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Story Textarea */}
            <div>
              <label
                htmlFor="story"
                className="block text-lg text-white font-medium mb-2">
                Tell Your Story:
              </label>
              <textarea
                id="story"
                name="story"
                value={story}
                onChange={handleStoryChange}
                required
                placeholder="Write your story here"
                rows="6"
                className="w-full p-3 rounded-md border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPublishForm;

/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "../Components/Navbar";
import React from "react";
import { Upload, Image as ImageIcon, Send, X } from "lucide-react";

const BlogPublishForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    story: "",
    tags: [],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    "Crop Farming",
    "Livestock",
    "Agricultural Technology",
    "Sustainable Farming",
    "Market Insights",
    "Farm Management",
    "Weather Updates",
    "Success Stories",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        }));
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, story } = formData;

    const submissionData = new FormData();
    submissionData.append("title", title);
    submissionData.append("story", story);
    if (image) {
      submissionData.append("image", image);
    }

    console.log("Form Submitted:", {
      ...formData,
      image,
    });
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
                value={formData.title}
                onChange={handleInputChange}
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
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-full h-auto rounded-lg"
                />
              )}
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
                value={formData.story}
                onChange={handleInputChange}
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

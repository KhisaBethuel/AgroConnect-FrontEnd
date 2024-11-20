/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import React from "react";
import { Upload, Image as ImageIcon, Send, X } from 'lucide-react';

const BlogPublishForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    story: '',
    tags: []
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'Crop Farming',
    'Livestock',
    'Agricultural Technology',
    'Sustainable Farming',
    'Market Insights',
    'Farm Management',
    'Weather Updates',
    'Success Stories'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, 
        key === 'tags' ? JSON.stringify(formData[key]) : formData[key]
      );
    });
    if (image) {
      submitData.append('image', image);
    }
    console.log('Form Submitted:', submitData);
  };

return (
  <div className='pt-20'>
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
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags Input */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press Enter to add tags"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Story Content */}
              <div className="mb-6">
                <label htmlFor="story" className="block text-lg font-semibold text-gray-700 mb-2">
                  Your Story
                </label>
                <textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  rows="8"
                  placeholder="Share your agricultural knowledge and experiences..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
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
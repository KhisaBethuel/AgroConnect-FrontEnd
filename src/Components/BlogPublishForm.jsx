import { useState } from 'react';
import Navbar from '../Components/Navbar';
import React from "react";

const MAX_TITLE_LENGTH = 100;
const MAX_STORY_LENGTH = 5000;

const BlogPublishForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        story: '',
        imageUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > MAX_TITLE_LENGTH) {
            newErrors.title = `Title must be less than ${MAX_TITLE_LENGTH} characters`;
        }

        if (!formData.story.trim()) {
            newErrors.story = 'Story content is required';
        } else if (formData.story.length > MAX_STORY_LENGTH) {
            newErrors.story = `Story must be less than ${MAX_STORY_LENGTH} characters`;
        }

        if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid image URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const formDataToSend = {
                title: formData.title.trim(),
                story: formData.story.trim(),
                imageUrl: formData.imageUrl.trim()
            };

            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form Submitted:', formDataToSend);
            
            setFormData({ title: '', story: '', imageUrl: '' });
        } catch (error) {
            console.error('Submission error:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to publish blog. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-darkgreen">
            <Navbar />
            <div className="container mx-auto px-4 py-12 pt-24">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-700">
                        <h1 className="text-3xl text-center text-green-400 font-bold mb-8">
                            Share Your Agricultural Story
                        </h1>
                        
                        {errors.submit && (
                            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg">
                                {errors.submit}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-lg text-green-400 font-medium">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    maxLength={MAX_TITLE_LENGTH}
                                    placeholder="Enter your blog title"
                                    className={`w-full p-4 rounded-lg bg-gray-900/50 border-2 ${
                                        errors.title ? 'border-red-500' : 'border-gray-600'
                                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all`}
                                />
                                <div className="flex justify-between">
                                    {errors.title && (
                                        <p className="text-red-400 text-sm">{errors.title}</p>
                                    )}
                                    <p className="text-gray-400 text-sm">
                                        {formData.title.length}/{MAX_TITLE_LENGTH}
                                    </p>
                                </div>
                            </div>

                            {/* Image URL Input */}
                            <div className="space-y-2">
                                <label htmlFor="imageUrl" className="block text-lg text-green-400 font-medium">
                                    Cover Image URL
                                </label>
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                    className={`w-full p-4 rounded-lg bg-gray-900/50 border-2 ${
                                        errors.imageUrl ? 'border-red-500' : 'border-gray-600'
                                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all`}
                                />
                                {errors.imageUrl && (
                                    <p className="text-red-400 text-sm">{errors.imageUrl}</p>
                                )}
                                {formData.imageUrl && !errors.imageUrl && (
                                    <div className="mt-4 relative h-48 rounded-lg overflow-hidden">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={() => {
                                                setErrors(prev => ({
                                                    ...prev,
                                                    imageUrl: 'Failed to load image. Please check the URL.'
                                                }));
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Story Textarea */}
                            <div className="space-y-2">
                                <label htmlFor="story" className="block text-lg text-green-400 font-medium">
                                    Your Story
                                </label>
                                <textarea
                                    id="story"
                                    name="story"
                                    value={formData.story}
                                    onChange={handleInputChange}
                                    maxLength={MAX_STORY_LENGTH}
                                    rows="12"
                                    placeholder="Share your agricultural experience..."
                                    className={`w-full p-4 rounded-lg bg-gray-900/50 border-2 ${
                                        errors.story ? 'border-red-500' : 'border-gray-600'
                                    } text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all`}
                                />
                                <div className="flex justify-between">
                                    {errors.story && (
                                        <p className="text-red-400 text-sm">{errors.story}</p>
                                    )}
                                    <p className="text-gray-400 text-sm">
                                        {formData.story.length}/{MAX_STORY_LENGTH}
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] ${
                                        isSubmitting
                                            ? 'bg-green-800/50 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-500'
                                    } text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </span>
                                    ) : (
                                        'Publish Story'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPublishForm;
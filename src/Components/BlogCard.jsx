import React from 'react';

const BlogCard = ({ image, category, title, likes, views }) => {
    return (
        <div className="blog-card shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105 bg-white"> {/* White background */}
            <img src={image} alt={title} className="blog-image w-full h-48 object-cover" />
            <div className="blog-content p-4">
                <span className="category text-sm text-green-700 font-medium">{category}</span>
                <h2 className="blog-title text-lg font-semibold mt-2">{title}</h2>
                <div className="blog-stats mt-4 flex justify-between items-center text-gray-600">
                    <span className="likes flex items-center space-x-1">
                        <button className="text-blue-500 hover:text-blue-700">👍</button>
                        <span>{likes}</span>
                    </span>
                    <span className="views flex items-center space-x-1">
                        <button className="text-gray-500 hover:text-gray-700">👀</button>
                        <span>{views}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;

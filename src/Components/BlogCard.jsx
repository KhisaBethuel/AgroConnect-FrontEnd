/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const BlogCard = ({
  id,
  image,
  title,
  content,
  created_at,
  user_id,
  expert_id,
  comments = [],
  likes = [],
}) => {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikesAndComments = async () => {
      try {
        const likesResponse = await fetch(
          `https://agritech-backend-922n.onrender.com/likes/post/${id}`
        );
        const likesData = await likesResponse.json();
        setLikeCount(likesData.length); 

        const commentsResponse = await fetch(
          `https://agritech-backend-922n.onrender.com/comments/${id}`
        );
        const commentsData = await commentsResponse.json();
        setCommentCount(commentsData.length); 
      } catch (error) {
        console.error("Error fetching likes/comments:", error);
      }
    };

    fetchLikesAndComments();
  }, [id]);

  const handleNavigate = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-card shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105 bg-white">
      <img
        src={image}
        alt={title}
        className="blog-image w-full h-48 object-cover cursor-pointer"
        onClick={handleNavigate}
      />

      <div className="blog-content p-4">
        <h2
          className="blog-title text-lg font-semibold mt-2 cursor-pointer hover:underline"
          onClick={handleNavigate}>
          {title}
        </h2>
        <div className="blog-stats mt-4 flex justify-between items-center text-gray-600 border-t pt-4">
          <span className="likes flex items-center space-x-1 text-gray-500">
            <i className="fas fa-heart"></i>
            <span className="ml-2">{likeCount}</span>
          </span>

          <span className="comments flex items-center space-x-1 text-gray-500">
            <i className="fas fa-comment-dots"></i>{" "}
            <span>{commentCount}</span> 
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AiOutlineEye,
  AiFillHeart,
  AiOutlineComment,
  AiFillDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import React from "react";

const ReadingPage = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://agritech-backend-lbq8.onrender.com/blogs/public/${id}`
        );
        const data = await response.json();
        setBlog(data);
        setLikeCount(data.likes);
        setIsLiked(data.isLiked);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const toggleLike = async () => {
    if (isLiked) {
      await deleteLike();
    } else {
      await likePost();
    }
  };

  const likePost = async () => {
    try {
      const response = await fetch(
        `https://agritech-backend-lbq8.onrender.com/likes`,
        {
          method: "POST",
          body: JSON.stringify({ post_id: id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error liking post:", errorData?.msg || "Unknown error");
        return;
      }

      const updatedData = await response.json();
      setLikeCount(updatedData.likeCount || likeCount + 1); // Fallback to incrementing
      setIsLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const deleteLike = async () => {
    try {
      const response = await fetch(
        `https://agritech-backend-lbq8.onrender.com/likes`,
        {
          method: "DELETE",
          body: JSON.stringify({ post_id: id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error unliking post:",
          errorData?.msg || "Unknown error"
        );
        return;
      }

      const updatedData = await response.json();
      setLikeCount(updatedData.likeCount || Math.max(0, likeCount - 1));
      setIsLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCommentToggle = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleNewComment = async () => {
    if (!commentText.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://agritech-backend-lbq8.onrender.com/comments`,
        {
          method: "POST",
          body: JSON.stringify({ content: commentText, post_id: id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setCommentText(""); // Clear input field
        setError(null); // Reset error
      } else {
        const errorData = await response.json();
        setError(errorData?.error || "Error posting comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Error adding comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `https://agritech-backend-lbq8.onrender.com/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      const response = await fetch(
        `https://agritech-backend-lbq8.onrender.com/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({ content: newContent }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden pt-20">
      {/* Blog content */}
      <div className="max-w-3xl mx-auto">
        <div className="px-6 sm:px-8 pt-8">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            {blog.title}
          </h1>
        </div>

        {/* Author Info */}
        <div className="px-6 sm:px-8 py-4 flex items-center space-x-4 border-b border-green-100">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-green-800">
                {blog.author}
              </h2>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Expert
              </span>
            </div>
            <p className="text-green-600 text-sm">
              Published on {blog.created_at}
            </p>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="px-6 sm:px-8 py-4 flex items-center space-x-6 text-green-600 border-b border-green-100">
          <div className="flex items-center space-x-2">
            <AiFillHeart
              className={`text-xl cursor-pointer ${
                isLiked ? "text-red-600" : "text-gray-500"
              }`}
              onClick={toggleLike}
            />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineEye className="text-xl" />
            <span>{blog.views}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineComment
              className="text-xl cursor-pointer"
              onClick={handleCommentToggle}
            />
            <span>{comments.length}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] w-full">
          <img
            src={blog.image}
            alt="Blog featured"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog content */}
        <div className="px-6 sm:px-8 py-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {blog.content}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar for comments */}
      {isSidebarVisible && (
        <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-lg p-6 z-50">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="comments-list space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="comment p-2 border-b">
                <p className="text-sm text-gray-600">{comment.content}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <AiOutlineEdit
                    className="cursor-pointer"
                    onClick={() =>
                      handleEditComment(
                        comment.id,
                        prompt("Edit comment:", comment.content)
                      )
                    }
                  />
                  <AiFillDelete
                    className="cursor-pointer"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="comment-input mt-4">
            <textarea
              className="w-full p-2 border rounded-md"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleNewComment}>
              Save
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default ReadingPage;

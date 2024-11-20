/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const initialComments = [
  {
    id: 1,
    author: "Victor Shape",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    text: "To say you're in a drought of 15 or 20 years, it seems like you're not in a drought anymore.",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    author: "Victor Shape",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    text: "To say you're in a drought of 15 or 20 years, it seems like you're not in a drought anymore.",
    timestamp: "3 hours ago"
  },
  {
    id: 3,
    author: "Victor Shape",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    text: "To say you're in a drought of 15 or 20 years, it seems like you're not in a drought anymore.",
    timestamp: "4 hours ago"
  }
];

function Article() {
  return (
    <div className="flex-1 p-8">
      <div className="bg-gray-200 h-[600px] rounded-lg flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-600">ARTICLE</span>
      </div>
    </div>
  );
}

function Comment({ author, avatar, text, timestamp }) {
  return (
    <div className="flex gap-3">
      <img
        src={avatar}
        alt={author}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{author}</h3>
        <p className="text-gray-700 mt-1">{text}</p>
        <span className="text-sm text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}

function CommentForm({ newComment, setNewComment, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave comment!!!"
          className="w-full p-3 pr-12 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
        />
        <button
          type="submit"
          className="absolute bottom-3 right-3 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function CommentHeader({ commentCount, onClose }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Comments ({commentCount})</h2>
      </div>
      <button 
        onClick={onClose}
        className="p-2 hover:bg-gray-300 rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function CommentSection() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "Victor Shape",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
      text: newComment,
      timestamp: "Just now"
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Article />
      
      <div className="w-[400px] bg-gray-200 p-6 relative">
        <CommentHeader 
          commentCount={comments.length} 
          onClose={() => setIsOpen(!isOpen)} 
        />
        
        <CommentForm 
          newComment={newComment}
          setNewComment={setNewComment}
          onSubmit={handleSubmit}
        />
        
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)]">
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
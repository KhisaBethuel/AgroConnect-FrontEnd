import React from 'react';

interface BlogCardProps {
  title: string;
  reads: string;
  imageUrl: string;
}

export default function BlogCard({ title, reads, imageUrl }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:transform hover:translate-y-[-5px] transition-all duration-200 ease-in-out">
    <img src={imageUrl} alt={title} className="w-full object-cover h[200px] " />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">{title}</h3>
      <p className="text-sm text-gray-600 mt-2 text-center">{reads} reads</p>
    </div>
  </div>
);
}
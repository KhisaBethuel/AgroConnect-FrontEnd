import React from 'react';

interface BlogCardProps {
  title: string;
  reads: string;
  imageUrl: string;
}

export default function BlogCard({ title, reads, imageUrl }: BlogCardProps) {
  return (
    <div className="blog-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{reads} reads</p>
    </div>
  );
}
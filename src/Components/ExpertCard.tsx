import React from 'react';

interface ExpertCardProps {
  name: string;
  title: string;
  imageUrl: string;
}


export function ExpertCard({ name, title, imageUrl }: ExpertCardProps) {
  return (
    <div className="expert-card">
      <img src={imageUrl} alt={`${name} - ${title}`} />
      <h3>{name}</h3>
      <p>{title}</p>
      
    </div>
  );
}
import React from 'react';
import { ExpertCard } from './ExpertCard';



const experts = [
  {
    name: 'Eng Norah Seini',
    title: 'Agricultural Engineer',
    imageUrl: 'https://i.pinimg.com/236x/94/50/29/945029307ecdb00b8c83475f9a32e1e5.jpg'
  },
  {
    name: 'leo messi',
    title: 'Soil Engineer',
    imageUrl: 'https://i.pinimg.com/236x/af/2f/f5/af2ff5bbac0fc1b41277173f7f7e807e.jpg'
  },
  {
    name: 'Victor Shape',
    title: 'Agricultural Engineer',
    imageUrl: 'https://i.pinimg.com/236x/fe/17/ed/fe17ed25cb823cef881cd6eb3490d77b.jpg'
  }
];

export function ExpertsSection() {
  return (
    <div className="container">
    <h1 className="title">Learn from Top Agricultural Experts</h1>
    <p className="subtitle">Connect with leading professionals who are shaping the future of agriculture.</p>
    
    <div className="experts-grid">
      {experts.map((expert, index) => (
        <div key={index} className="expert-card">
          <img 
            src={expert.imageUrl} 
            alt={expert.name} 
            className="profile-image"
          />
          <h2 className="expert-name">{expert.name}</h2>
          <p className="expert-title">{expert.title}</p>
          <button className="follow-button">Follow</button>
        </div>
      ))}
    </div>
  </div>
);
}
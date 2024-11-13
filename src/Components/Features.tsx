import React from 'react';
import { Users, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function Features() {
  const features = [
    {
      Icon: Users,
      title: "Expert Network",
      description: "Connect with agricultural experts, researchers, and experienced farmers worldwide."
    },
    {
      Icon: BookOpen,
      title: "Knowledge Base",
      description: "Access a vast library of research papers, best practices, and farming techniques."
    },
    {
      Icon: MessageSquare,
      title: "Community Forums",
      description: "Engage in discussions, ask questions, and share experiences with the community."
    },
    {
      Icon: TrendingUp,
      title: "Market Insights",
      description: "Stay updated with agricultural market trends, prices, and demand forecasts."
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">
            Empowering Agricultural Innovation
          </h2>
          <p className="features-subtitle">
            Our platform provides the tools and connections you need to succeed in modern agriculture.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
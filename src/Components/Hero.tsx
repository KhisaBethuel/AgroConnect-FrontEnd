import React from 'react';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Agricultural field"
          className="hero-image"
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Connecting<br />Agricultural Minds
        </h1>
        <p className="hero-subtitle">
          Join the world's largest network of agricultural experts, farmers, and researchers
        </p>
        <p className="hero-description">
          Share knowledge, get advice, and grow together
        </p>
        <button className="cta-button">
          GET STARTED
        </button>
      </div>
    </div>
  );
}
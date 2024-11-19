import React from 'react';
import { Sprout } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src="https://png.pngtree.com/element_our/sm/20180411/sm_5ace0628840fa.png" alt="" className='logo' />
          <span className="logo-text">AgroConnect</span>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Experts</a>
          <a href="#" className="nav-link">Community</a>
          <button className="join-button">Join Network</button>
        </div>
      </div>
    </nav>
  );
}
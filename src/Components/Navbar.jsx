import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white py-4 px-92 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-9xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src="https://png.pngtree.com/element_our/sm/20180411/sm_5ace0628840fa.png" alt="AgroConnect" className="h-20 w-20" />
          <span className="text-xl font-semibold text-green-800">AgroConnect</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-800 hover:text-green-700 transition-colors">Home</a>
          <a href="#" className="text-gray-800 hover:text-green-700 transition-colors">Experts</a>
          <a href="#" className="text-gray-800 hover:text-green-700 transition-colors">Community</a>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-900 transition-colors font-medium">
            Join Network
          </button>
        </div>
      </div>
    </nav>
  );
}
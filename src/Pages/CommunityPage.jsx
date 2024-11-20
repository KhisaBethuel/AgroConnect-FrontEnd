/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import React from "react";

function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const communities = [
    {
      name: 'FarmTech',
      description: 'Agriculture & Tech',
      imageUrl: 'https://foursite-pape-production.s3.amazonaws.com/agriculture.papemachinery.com/a5e2ec15-dfdd-4004-9b2a-5312e62a6bea.jpg',
    },
    {
        name: 'Farmfinance',
        description: 'Farm & Finance',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp9B8tw41xeXrvG9B3rj0TR5w8l1PwG1vKrQ&s',
      },
      {
        name: 'Farming Buisness',
        description: 'buisness',
        imageUrl: 'data:image/jpeg;base64,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',
      },
      {
        name: 'Farming Management',
        description: 'management',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQqu5R3k4yxcbVhynXAJQXhxmBOYwe9rPYA&s',
      },
    // ... other communities ...
  ];

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className='pt-20'>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-green-700 text-white shadow p-4">
          <h1 className="text-2xl font-bold text-center">
            List Of Communities
          </h1>
          <h2 className="text-lg font-semibold text-center">AgroConnect</h2>
        </header>

        <div className="container mx-auto py-8 px-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Get to know and here from our communities
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="border border-gray-300 rounded-l-lg px-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-r-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredCommunities.map((community, index) => (
                  <div className="flex items-center mb-4" key={index}>
                    <img
                      src={community.imageUrl}
                      alt={community.name}
                      className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{community.name}</h2>
                      <p className="text-gray-600">{community.description}</p>
                    </div>
                    <div className="ml-4">
                      <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
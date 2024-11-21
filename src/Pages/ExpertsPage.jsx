import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Search, MapPin, UserPlus } from 'lucide-react';

function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const experts = [
    {
      name: 'Dr. Victor Shape',
      expertise: 'Soil Science Expert',
      location: 'Nairobi, Kenya',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661508620175-3ae20da61cda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D',
      specialization: 'Soil Analysis and Fertility Management',
      experience: '15+ years',
      rating: 4.8
    },
    {
      name: 'Dr. Mulu Katungi',
      expertise: 'Irrigation Specialist',
      location: 'Kampala, Uganda',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661760813289-43a21a00cc1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbiUyMGZhcm1lcnN8ZW58MHx8MHx8fDA%3D',
      specialization: 'Modern Irrigation Systems',
      experience: '12+ years',
      rating: 4.9
    },
    {
      name: 'Prof. Jane Wairimu',
      expertise: 'Agricultural Finance',
      location: 'Dar es Salaam, Tanzania',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661302885821-083e5add3791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBmYXJtZXJzfGVufDB8fDB8fHww',
      specialization: 'Farm Business Management',
      experience: '18+ years',
      rating: 4.7
    },
    {
      name: 'Dr. Larry Onyango',
      expertise: 'Agribusiness Expert',
      location: 'Kigali, Rwanda',
      imageUrl: 'https://images.unsplash.com/photo-1495603889488-42d1d66e5523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbnxlbnwwfHwwfHx8MA%3D%3D',
      specialization: 'Agricultural Sales & Marketing',
      experience: '10+ years',
      rating: 4.6
    }
  ];

  const filteredExperts = experts.filter((expert) =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="bg-green-700 text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-center mb-4">Agricultural Experts Directory</h1>
            <p className="text-4xl text-center font-bold text-green-100 mb-8">Connect with leading agricultural specialists across East Africa</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-green-300" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-green-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperts.map((expert, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 m-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    ⭐ {expert.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{expert.name}</h3>
                  <p className="text-green-700 font-semibold mb-2">{expert.expertise}</p>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{expert.location}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p><strong>Specialization:</strong> {expert.specialization}</p>
                    <p><strong>Experience:</strong> {expert.experience}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    
                    <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300">
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertsPage;
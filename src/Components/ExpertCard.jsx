import React, { useState } from 'react';

function ExpertCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const experts = [
    {
      name: 'Eng Victor Shape',
      expertise: 'Expert - Soil Eng',
      imageUrl: 'data:image/jpeg;base64,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',
    },
    {
        name: 'Eng Mulu Katungi',
        expertise: 'Expert - Irrigation',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpXCc5Hrz94pIXVH-fozPffN1xKDLQ1NEVMw&s',
      },
      {
        name: 'Eng Jane Wairimu',
        expertise: 'Expert - Farm Finance',
        imageUrl: 'data:image/jpeg;base64,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',
      },
      {
        name: 'Eng Larry Onyango',
        expertise: 'Expert - Sales',
        imageUrl: 'data:image/jpeg;base64,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',
      },
    // ... other experts ...
  ];

  const filteredExperts = experts.filter((expert) =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-green-700 text-white shadow p-4">
        <h1 className="text-2xl font-bold text-center">List Of Experts</h1>
        <h2 className="text-lg font-semibold text-center">AgroConnect</h2>
     
      </header>

      <div className="container mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold text-center mb-4">Get to know and hear from the experts</h2>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredExperts.map((expert, index) => (
                <div className="flex items-center mb-4" key={index}>
                  <img src={expert.imageUrl} alt={expert.name} className="w-20 h-20 rounded-full mr-4" />
                  <div>
                    <h2 className="text-lg font-bold">{expert.name}</h2>
                    <p className="text-gray-600">{expert.expertise}</p>
                  </div>
                  <div className="ml-4">
                  <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertCard;
import React from 'react';

function ProfilePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white text-green-600 shadow">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-green hover:text-gray-700">Home</a></li>
              <li><a href="#" className="text-green hover:text-gray-700">Community</a></li>
              <li><a href="#" className="text-green hover:text-gray-700">experts</a></li>
              {/* ... other navigation items ... */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Profile Section */}
      
      
      <section className="bg-green-200 rounded-lg shadow p-12 w-4/4 md:w-3/3">
      <div className="text-center">
      <div className="flex">
      
     
          
          <div className="mb-6">
            <img src="data:image/jpeg;base64,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" alt="User Profile Image"  className="w-48 h-48 rounded-full" />
            </div>
             
          <div className="w-3/4 ml-8">
            <h2 className="text-2xl font-bold text-green-700 mb-10">Eng Terry Otieno <button className="bg-green-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Edit Profile</button></h2>
            <p className="text-gray-600 mb-10">Followers: 50 <span className="mx-4">|</span> Following: 50 <span className="mx-4">|</span> Communities</p>
            
            {/* ... other profile information ... */}
          </div>
          </div>
          </div>
          
          

          
          
        </section>
        
      

      {/* Posts Section */}
      <section className="container mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">   Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4">
            <img src="data:image/jpeg;base64,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" alt="Post 1 Image" className="w-full rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Sustainable Farming Practice</h3>
            <p className="text-gray-600 mt-2">Likes: 1.3K<span className="mx-4">|</span> Views: 2.1K<span className="mx-4">|</span> <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Delete</button></p>
            
          </div>
          {/* ... other posts ... */}
          <div className="bg-white rounded shadow p-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTohw6mrUBl8GTN_eEyqEbjjosh5PaEpvGQ&s" alt="Post 1 Image" className="w-full rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Pest and Pesticide Management</h3>
            <p className="text-gray-600 mt-2">Likes: 1.3K <span className="mx-4">|</span> Views: 2.1K<span className="mx-4">|</span> <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Delete</button></p>
            
          </div>
          
          <div className="bg-white rounded shadow p-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_UhSa5gzw554t8-CkQ8q9exLeFkVnvnnxQ&s" alt="Post 1 Image" className="w-full rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Plant distribution</h3>
            <p className="text-gray-600 mt-2">Likes: 1.3K <span className="mx-4">|</span> Views: 2.1K<span className="mx-4">|</span><button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Delete</button></p>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
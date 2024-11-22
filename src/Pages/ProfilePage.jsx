import React from "react";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, Share2, Heart, Eye, Edit2, Trash2 } from 'lucide-react';

function ProfilePage() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    const saved = localStorage.getItem('joinedCommunities');
    return saved ? JSON.parse(saved) : [];
  });
  const [followedExperts, setFollowedExperts] = useState(() => {
    const saved = localStorage.getItem('followedExperts');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Profile state
  const [name, setName] = useState('Eng Terry Otieno');
  const [bio, setBio] = useState('Agricultural Engineer | Sustainable Farming Expert | Tech Enthusiast');
  const [profileImage, setProfileImage] = useState('https://thumbs.dreamstime.com/b/happy-african-farmer-working-countryside-holding-wood-box-fresh-vegetables-215052594.jpg');

  const stats = [
    { label: 'Posts', value: '23' },
    { label: 'Following', value: followedExperts.length.toString(), onClick: () => navigate("/experts") },
    { label: 'Communities', value: joinedCommunities.length.toString(), onClick: () => navigate("/communities") },
    { label: 'Followers', value: '12' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Sustainable Farming Practice',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854',
      likes: '1.3K',
      views: '2.1K',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Pest and Pesticide Management',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
      likes: '892',
      views: '1.5K',
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Plant Distribution Techniques',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6',
      likes: '654',
      views: '1.2K',
      date: '2 weeks ago'
    }
  ];

  useEffect(() => {
    const handleStorageChange = () => {
      const savedCommunities = localStorage.getItem('joinedCommunities');
      const savedExperts = localStorage.getItem('followedExperts');
      
      if (savedCommunities) {
        setJoinedCommunities(JSON.parse(savedCommunities));
      }
      if (savedExperts) {
        setFollowedExperts(JSON.parse(savedExperts));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (tempImage) {
      setProfileImage(tempImage);
    }
    setShowEditModal(false);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setTempImage(null);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-green-700 pt-24 pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm" />
        
        {/* Profile Info */}
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-white">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <button 
                onClick={() => setShowEditModal(true)}
                className="absolute bottom-0 right-0 p-2 bg-green-600 rounded-full hover:bg-green-700 transition-all duration-200 shadow-lg"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <p className="text-green-100 mb-4">{bio}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {stats.map((stat, index) => (
                  <button
                    key={index}
                    onClick={stat.onClick}
                    className="flex flex-col items-center hover:bg-white/10 rounded-lg p-2 transition-colors duration-200"
                  >
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-green-100 text-sm">{stat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
          <button
            onClick={() => navigate("/publish")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Create Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-sm">
                  {post.date}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h3>
                
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={tempImage || profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors duration-200"
                  >
                    <Upload className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
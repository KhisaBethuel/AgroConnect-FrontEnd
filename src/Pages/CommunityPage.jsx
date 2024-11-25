/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Sprout,
  Users,
  Wheat,
  Tractor,
  Cloud,
  Sun,
  Leaf,
  MessageCircle,
  Share2,
  Filter,
  UserPlus,
  UserMinus,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import React from "react";

function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    const saved = localStorage.getItem("joinedCommunities");
    return saved ? JSON.parse(saved) : [];
  });
  const [communities, setCommunities] = useState([]); // State to hold fetched communities

  useEffect(() => {
    // Fetch community data from the backend on page load
    const fetchCommunities = async () => {
      try {
        const response = await fetch("https://agritech-backend-922n.onrender.com/communities"); // Your backend endpoint here
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  const categories = [
    { id: "all", name: "All Communities", icon: <Sprout /> },
    { id: "tech", name: "AgTech", icon: <Tractor /> },
    { id: "sustainable", name: "Sustainable", icon: <Leaf /> },
    { id: "weather", name: "Weather", icon: <Cloud /> },
    { id: "crops", name: "Crops", icon: <Wheat /> },
  ];

  useEffect(() => {
    localStorage.setItem(
      "joinedCommunities",
      JSON.stringify(joinedCommunities)
    );
  }, [joinedCommunities]);

  const handleJoinCommunity = (communityId) => {
    setJoinedCommunities((prev) => {
      const isJoined = prev.includes(communityId);
      if (isJoined) {
        return prev.filter((id) => id !== communityId);
      } else {
        return [...prev, communityId];
      }
    });
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch = community.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "10,000+",
      label: "Active Members",
    },
    {
      icon: <Sprout className="w-6 h-6" />,
      value: "500+",
      label: "Communities",
    },
    { icon: <Sun className="w-6 h-6" />, value: "24/7", label: "Support" },
  ];

  function CommunityCard({ community }) {
    const isJoined = joinedCommunities.includes(community.id);

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={community.image}
            alt={community.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {community.name}
            </h3>
            <div className="flex gap-2">
              {community.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">{community.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{community.members} members</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{community.discussions || 0} discussions</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleJoinCommunity(community.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 ${
                isJoined
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}>
              {isJoined ? (
                <>
                  <UserMinus className="w-5 h-5" />
                  Leave Community
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Join Community
                </>
              )}
            </button>
            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Agricultural Communities
          </h1>
          <p className="text-xl text-center text-green-100 max-w-2xl mx-auto mb-8">
            Connect with farmers, experts, and enthusiasts from around the world
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                {stat.icon}
                <span className="text-2xl font-bold mt-2">{stat.value}</span>
                <span className="text-green-100">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Discover Your Agricultural Community
          </h2>

          {/* Search Bar */}
          <div className="relative w-full max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search communities..."
              className="w-full px-4 py-3 pl-12 bg-white border-2 border-green-100 rounded-xl 
                       focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none
                       transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
                  ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 hover:bg-green-50"
                  }`}>
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No communities found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityPage;

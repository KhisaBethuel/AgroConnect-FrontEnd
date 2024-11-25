/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import React from "react";
import { Search, MapPin, UserPlus, UserMinus } from "lucide-react";
import Navbar from "../Components/Navbar";

function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [followedExperts, setFollowedExperts] = useState(() => {
    const saved = localStorage.getItem("followedExperts");
    return saved ? JSON.parse(saved) : [];
  });
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("https://agritech-backend-922n.onrender.com/experts");
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  useEffect(() => {
    localStorage.setItem("followedExperts", JSON.stringify(followedExperts));
  }, [followedExperts]);

  const handleFollow = (expert) => {
    setFollowedExperts((prev) => {
      const isFollowing = prev.some((e) => e.id === expert.id);
      if (isFollowing) {
        return prev.filter((e) => e.id !== expert.id);
      } else {
        return [...prev, expert];
      }
    });
  };

  const filteredExperts = experts.filter(
    (expert) =>
      expert.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise_field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to format username into "John Doe"
  const formatUsername = (username) => {
    const nameParts = username.split(" ");
    if (nameParts.length === 2) {
      return `${nameParts[0]} ${nameParts[1]}`;
    }
    return username; 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-20">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <div className="bg-green-700 text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl font-bold text-center mb-4">
              Agricultural Experts Directory
            </h1>
            <p className="text-4xl text-center font-bold text-green-100 mb-8">
              Connect with leading agricultural specialists across East Africa
            </p>

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
            {filteredExperts.map((expert) => {
              const isFollowing = followedExperts.some(
                (e) => e.id === expert.id
              );
              return (
                <div
                  key={expert.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={expert.profile_image || "/default-image.png"}
                      alt={expert.username}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      ⭐ {expert.rating || "N/A"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-2 items-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {formatUsername(expert.username)} {/* Format username */}
                    </h3>
                    <p className="text-green-700 font-semibold mb-2">
                      <strong>Expertise: </strong>
                      {expert.expertise_field}
                    </p>

                    {/* Render Specialization if available */}
                    {expert.specialization && (
                      <div className="text-sm text-gray-600 mb-2">
                        <p>
                          <strong>Specialization:</strong>{" "}
                          {expert.specialization}
                        </p>
                      </div>
                    )}

                    {/* Render Experience if available */}
                    {expert.experience && (
                      <div className="text-sm text-gray-600 mb-2">
                        <p>
                          <strong>Experience:</strong> {expert.experience}
                        </p>
                      </div>
                    )}

                    {/* Render Location if available */}
                    {expert.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{expert.location}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFollow(expert)}
                        className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 ${
                          isFollowing
                            ? "bg-red-50 text-red-600 border border-red-600 hover:bg-red-100"
                            : "border border-green-600 text-green-600 hover:bg-green-50"
                        }`}>
                        {isFollowing ? (
                          <>
                            <UserMinus className="h-4 w-4" />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            Follow
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpertsPage;

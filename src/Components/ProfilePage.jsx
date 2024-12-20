/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";




function ProfilePage() {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUsername(decoded.username); 
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);

  const fetchFollowers = async () => {
    try {
      setLoadingFollowers(true);
      const response = await fetch("/api/followers");
      const data = await response.json();
      setFollowers(data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    } finally {
      setLoadingFollowers(false);
    }
  };

  const fetchFollowing = async () => {
    try {
      setLoadingFollowing(true);
      const response = await fetch("/api/following");
      const data = await response.json();
      setFollowing(data);
    } catch (error) {
      console.error("Error fetching following:", error);
    } finally {
      setLoadingFollowing(false);
    }
  };

  const handleFollowersClick = () => {
    setShowFollowersModal(true);
    fetchFollowers();
  };

  const handleFollowingClick = () => {
    setShowFollowingModal(true);
    fetchFollowing();
  };

  const handleCommunitiesClick = () => {
    navigate("/communitychat");
  };

  const closeModal = () => {
    setShowFollowersModal(false);
    setShowFollowingModal(false);
  };

  return (
    <div className="flex justify-center items-centerbg-white min-h-screen pt-10">
      {/* Profile Section */}
      <section className="bg-green-200 rounded-lg shadow p-12 w-full md:w-3/4">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="mb-6">
              <img
                src="https://thumbs.dreamstime.com/b/happy-african-farmer-working-countryside-holding-wood-box-fresh-vegetables-215052594.jpg"
                alt="User Profile Image"
                className="w-48 h-48 rounded-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {username ? username : "Loading..."}{" "}
                <button className="bg-green-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Edit Profile
                </button>
              </h2>
              <p className="text-gray-600 mb-10">
                <span
                  onClick={handleFollowersClick}
                  className="cursor-pointer hover:underline">
                  Followers: {followers.length}
                </span>
                <span className="mx-4">|</span>
                <span
                  onClick={handleFollowingClick}
                  className="cursor-pointer hover:underline">
                  Following: {following.length}
                </span>
                <span className="mx-4">|</span>
                <span
                  onClick={handleCommunitiesClick}
                  className="cursor-pointer hover:underline">
                  Communities
                </span>
              </p>
            </div>
          </div>
        </div>

        {showFollowersModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Followers
              </h2>
              {loadingFollowers ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {followers.map((follower, index) => (
                    <li key={index}>{follower.name}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        )}

        {showFollowingModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Following
              </h2>
              {loadingFollowing ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {following.map((person, index) => (
                    <li key={index}>{person.name}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Posts Section */}
        <section className="container mx-auto py-8 px-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-700">Posts</h2>
            <button
              onClick={() => navigate("/publish")}
              className="text-green-700 hover:text-green-900 font-bold">
              Write
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded shadow p-4">
              <img
                src="https://farmsquare.ng/wp-content/uploads/2021/08/IMG_20210312_111515.jpg"
                alt="Post 1 Image"
                className="w-full rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">
                Sustainable Farming Practice
              </h3>
              <p className="text-gray-600 mt-2">
                Likes: 1.3K<span className="mx-4">|</span> Views: 2.1K
                <span className="mx-4">|</span>{" "}
                <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Delete
                </button>
              </p>
            </div>

            <div className="bg-white rounded shadow p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTohw6mrUBl8GTN_eEyqEbjjosh5PaEpvGQ&s"
                alt="Post 2 Image"
                className="w-full rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">
                Pest and Pesticide Management
              </h3>
              <p className="text-gray-600 mt-2">
                Likes: 1.3K <span className="mx-4">|</span> Views: 2.1K
                <span className="mx-4">|</span>{" "}
                <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Delete
                </button>
              </p>
            </div>

            <div className="bg-white rounded shadow p-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_UhSa5gzw554t8-CkQ8q9exLeFkVnvnnxQ&s"
                alt="Post 3 Image"
                className="w-full rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">
                Environmental Impact and Agriculture
              </h3>
              <p className="text-gray-600 mt-2">
                Likes: 1.3K <span className="mx-4">|</span> Views: 2.1K
                <span className="mx-4">|</span>{" "}
                <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Delete
                </button>
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProfilePage;

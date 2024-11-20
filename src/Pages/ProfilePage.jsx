import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const navigate = useNavigate()

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
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-24">
        {/* Profile Section */}

        <section className="bg-green-200 rounded-lg shadow p-12 w-4/4 md:w-3/3">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="mb-6">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661900503280-36c1b4be3a66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWN1bHR1cmUlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D"
                  alt="User Profile Image"
                  className="w-48 h-48 rounded-full object-cover"
                />
              </div>

              <div className="ml-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Eng Terry Otieno{" "}
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

                {/* ... other profile information ... */}
              </div>
            </div>
          </div>
        </section>

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
                src="https://media.istockphoto.com/id/974643844/photo/teach-kids-how-far-a-little-care-can-go.webp?a=1&b=1&s=612x612&w=0&k=20&c=ias6jc5l8YJZtG3qt6dgvWuew-dTJffy9uiysdvk-zI="
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
            {/* ... other posts ... */}
            <div className="bg-white rounded shadow p-4">
              <img
                src="https://media.istockphoto.com/id/1141422847/photo/close-up-of-calves-on-animal-farm-eating-food-meat-industry-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=3EWXcq43zuOLx5loTVcEd9MujigB46PTaHKAAr2u9uc="
                alt="Post 1 Image"
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
                src="https://media.istockphoto.com/id/1401722160/photo/sunny-plantation-with-growing-soya.webp?a=1&b=1&s=612x612&w=0&k=20&c=u_eHB-h5MUuJjNEnr2FO0bI5-se70xXWNEwma0_kWQI="
                alt="Post 1 Image"
                className="w-full rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">Plant distribution</h3>
              <p className="text-gray-600 mt-2">
                Likes: 1.3K <span className="mx-4">|</span> Views: 2.1K
                <span className="mx-4">|</span>
                <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Delete
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProfilePage;
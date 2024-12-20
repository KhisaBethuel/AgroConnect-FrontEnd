/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { Menu, X } from "lucide-react";


export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed w-full bg-white shadow-md top-0 z-50 flex items-center">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            src="https://png.pngtree.com/element_our/sm/20180411/sm_5ace0628840fa.png"
            alt="Logo"
            className="logo h-12"
          />
          <span className=" text-xl font-semibold text-primary-green hidden md:block">AgroConnect</span>
        </div>
        <button
          className="block lg:hidden p-2 rounded-md"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={24} className="text-primary-green" />
          ) : (
            <Menu size={24} className="text-primary-green" />
          )}
        </button>
        <div
          className={`lg:flex ${isMenuOpen ? "block" : "hidden"} lg:items-center lg:gap-8 absolute lg:static top-16 left-0 w-full bg-white lg:bg-transparent lg:w-auto px-4 py-2 lg:p-0 shadow-lg lg:shadow-none`}
          onClick={toggleMenu}
        >
          {!isLoggedIn && (
            <NavLink to="/" className="text-lg py-2 px-4 block lg:inline-block text-gray-700 hover:text-primary-green">
              Home
            </NavLink>
          )}
          <NavLink to="/experts" className=" text-lg py-2 px-4 block lg:inline-block text-gray-700 hover:text-primary-green">
            Experts
          </NavLink>
          <NavLink to="/communities" className="text-lg py-2 px-4 block lg:inline-block text-gray-700 hover:text-primary-green">
            Communities
          </NavLink>
          <NavLink to="/blogs" className="text-lg py-2 px-4 block lg:inline-block text-gray-700 hover:text-primary-green">
            Blogs
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/profile" className="text-lg py-2 px-4 block lg:inline-block text-gray-700 hover:text-primary-green">
              Profile
            </NavLink>
          )}
          <button
            className="join-button bg-primary-green text-white py-2 px-4 rounded-md block lg:inline-block"
            onClick={handleAuthClick}
          >
            {isLoggedIn ? "Logout" : "Join Network"}
          </button>
        </div>
      </div>
    </nav>
  );
}

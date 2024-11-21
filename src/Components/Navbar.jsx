/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";


export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img
            src="https://png.pngtree.com/element_our/sm/20180411/sm_5ace0628840fa.png"
            alt=""
            className="logo"
          />
          <span className="logo-text">AgroConnect</span>
        </div>

        <div className="nav-links">
          {!isLoggedIn && (
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          )}
          <NavLink to="/experts" className="nav-link">
            Experts
          </NavLink>
          <NavLink to="/communities" className="nav-link">
            Communities
          </NavLink>
          <NavLink to="/blogs" className="nav-link">
            Blogs
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
          <button className="join-button" onClick={handleAuthClick}>
            {isLoggedIn ? "Logout" : "Join Network"}
          </button>
        </div>
      </div>
    </nav>
  );
}

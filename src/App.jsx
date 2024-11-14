import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";
import BlogCard from "./Components/BlogCard";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
import './index.css';
import ProfilePage from "./Pages/ProfilePage";
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'





const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <Features />
        </main>
      </div>

      <div className="App">
        <Blog />
        <BlogCard />
        <ProfilePage />
      </div>

      <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Footer />} />
      </Routes>
    </Router>

    </>
   
  )
  
}

export default App;
import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";
import BlogPublishForm from "./Components/BlogPublishForm.jsx";
import BlogCard from "./Components/BlogCard";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
import './index.css';
import ProfilePage from "./Pages/ProfilePage";

import ExpertsCard from "./Components/ExpertsCard";
import CommunityCard from "./Components/CommunityCard";

import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import ChatApp from "./Pages/ChatInterface";


import './index.css';
import { ExpertsSection } from "./Components/ExpertSection";
import { BlogsSection } from './Components/BlogsSection';
import ReadingPage from "./Pages/ReadingPage.jsx";
import CommentSection from "./Components/CommentSection.jsx";



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
        <ChatApp />
        <BlogPublishForm />
        <BlogsSection />
        <ExpertsSection />
        <ExpertsCard />
        <CommunityCard />
        <ReadingPage />
        <CommentSection />
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
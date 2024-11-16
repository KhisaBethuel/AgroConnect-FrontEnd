import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";
import BlogPublishForm from "./Components/BlogPublishForm.jsx";
import BlogCard from "./Components/BlogCard";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
<<<<<<< HEAD
=======
import './index.css';
import ProfilePage from "./Pages/ProfilePage";

import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import ChatApp from "./Pages/ChatInterface";

>>>>>>> 41fba15111dc6ab89b7eefa04e172231961fc2e1

import './index.css';
import { ExpertsSection } from "./Components/ExpertSection";
import { BlogsSection } from './Components/BlogsSection';



const App = () => {
  return (
    <>
<<<<<<< HEAD
       <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <ExpertsSection/>
      <BlogsSection/>
    </div>
    <div className="App">
    <Blog />
    <BlogCard />
    <SignupPage />

  </div>
=======
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

      </div>

      <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Footer />} />
      </Routes>
    </Router>

>>>>>>> 41fba15111dc6ab89b7eefa04e172231961fc2e1
    </>
   
  )
  
}

export default App;
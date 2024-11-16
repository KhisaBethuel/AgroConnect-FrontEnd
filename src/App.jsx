import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";
import BlogCard from "./Components/BlogCard";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';

import './index.css';
import { ExpertsSection } from "./Components/ExpertSection";
import { BlogsSection } from './Components/BlogsSection';



const App = () => {
  return (
    <>
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
    </>
   
  )
  
}

export default App;
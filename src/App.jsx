import { Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Footer from "./Components/Footer";
import { ExpertsSection } from "./Components/ExpertSection";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Blog from "./Pages/Blog";
import { useState } from "react";
import ChatInterface from "./Pages/ChatInterface"
import ProfilePage from "./Pages/ProfilePage";
import ReadingPage from "./Pages/ReadingPage";
import BlogPublish from "./Pages/BlogPublishForm"
import ExpertsPage from "./Pages/ExpertsPage";
import CommunityPage from "./Pages/CommunityPage";
import { BlogsSection } from "./Components/BlogsSection";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/communitychat" element={<ChatInterface />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog/:id" element={<ReadingPage />} />
          <Route path="/publish" element={<BlogPublish />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/communities" element={<CommunityPage />} />
        </Routes>
      </main>
      {isHomePage && (
        <>
          <Features />
          <ExpertsSection />
          <BlogsSection />
          
          <Footer />

        </>
      )}
    </div>
  );
};

export default App;

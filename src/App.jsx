import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";
import BlogPublishForm from "./Components/BlogPublishForm.jsx";
import BlogCard from "./Components/BlogCard";

function App() {
  

  return (
    <div className="App">
      <Blog />
      <BlogCard />
      <SignupPage />
      <BlogPublishForm />
    </div>
  );
}

export default App;
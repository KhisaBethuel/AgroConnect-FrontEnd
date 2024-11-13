import SignupPage from "./Pages/SignUp"
import React, { useState } from "react";
import Blog from "./Pages/Blog";

import BlogCard from "./Components/BlogCard";

function App() {
  

  return (
    <div className="App">
      <Blog />
      <BlogCard />
      <SignupPage />
    </div>
  );
}

export default App;
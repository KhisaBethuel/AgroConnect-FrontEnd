// eslint-disable-next-line no-unused-vars
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

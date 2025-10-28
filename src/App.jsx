import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigationbar from "./components/Navbar";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RecipeGenerator from "./pages/RecipeGenerator";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

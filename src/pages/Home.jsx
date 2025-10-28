import { div } from "framer-motion/client";
import React from "react";

const Home = () => {
  return (
    <div className="body">
      <div>
        <h1 className="top-header">Welcome to ChompList</h1>
        <p>Enter in ingredients and recieve recipes now!</p>
        <img src="./ChompGator.png" alt="Alligator holding food" />
      </div>
    </div>
  );
};

export default Home;

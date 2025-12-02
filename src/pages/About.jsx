import React from "react";

export default function About() {
  return (
    <div
      style={{
        maxWidth: 860,
        margin: "32px auto",
        padding: "0 16px",
      }}
    >
      <h1 className="top-header">About ChompList</h1>
      <p className="small-text">
        ChompList empowers students to create quick, budget-friendly meals using ingredients they already have. 
        Our platform features an intuitive ingredient input system, smart recipe matching, and personalized meal suggestions.
      </p>

      <img
        src="ChompGator.png"
        alt="picture of ChompGator logo"
        style={{ display: "block", margin: "24px auto" }}
      />

      <h1 className="top-header" style={{ marginTop: 24 }}>
        Development Stages
      </h1>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 0 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>• Conceptualized core product vision</li>
        <li>• Designed system architecture</li>
        <li>• Established sprint goals and task allocation</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 1 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>• Built navigation structure and page frameworks</li>
        <li>• Implemented ingredient input with mock recipe suggestions</li>
        <li>• Developed user authentication interface</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 2 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>• Integrated real recipe dataset with intelligent matching</li>
        <li>• Added recipe save functionality and dashboard</li>
        <li>• Implemented form validation and API integration</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Roadmap</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>• Smart recipe ranking based on ingredient match quality</li>
        <li>• Advanced filtering by dietary preferences and restrictions</li>
        <li>• Nutritional information display for each recipe</li>
        <li>• Native mobile application development</li>
        <li>• Two-factor authentication for enhanced security</li>
      </ul>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="body">
      <div style={heroSection}>
        <h1 className="top-header" style={{ marginTop: 40, marginBottom: 8 }}>
          Welcome to ChompList
        </h1>
        <p className="small-text" style={{ maxWidth: 600, margin: "0 auto 40px" }}>
          Transform your ingredients into delicious meals in seconds.
        </p>

        <div style={cardGrid}>
          
          <div style={card}>
            <div style={iconCircle}>🍳</div>
            <h3 style={cardTitle}>Recipe Generator</h3>
            <p style={cardText}>
              Enter your available ingredients and discover recipes you can make right now.
            </p>
            <NavLink className="nav-pill" to="/recipe-generator" style={buttonStyle}>
              Try it →
            </NavLink>
          </div>

          <div style={card}>
            <div style={iconCircle}>📊</div>
            <h3 style={cardTitle}>Dashboard</h3>
            <p style={cardText}>
              Access your saved recipes and personalized collection anytime.
            </p>
            <NavLink className="nav-pill" to="/dashboard" style={buttonStyle}>
              Open →
            </NavLink>
          </div>

          <div style={card}>
            <div style={iconCircle}>💡</div>
            <h3 style={cardTitle}>About</h3>
            <p style={cardText}>
              Learn about our mission and development journey.
            </p>
            <NavLink className="nav-pill" to="/about" style={buttonStyle}>
              Learn more →
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

const heroSection = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 20px",
};

const cardGrid = {
  display: "grid",
  gap: 24,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  marginTop: 32,
  maxWidth: 1000,
  margin: "0 auto",
};

const card = {
  border: "none",
  borderRadius: 16,
  padding: 32,
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  minHeight: 280,
  cursor: "pointer",
};

const iconCircle = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ff7700 0%, #ff9933 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 32,
  marginBottom: 16,
  boxShadow: "0 4px 16px rgba(255, 119, 0, 0.3)",
};

const cardTitle = {
  margin: "0 0 12px",
  fontSize: 24,
  fontWeight: 600,
  color: "#23272b",
};

const cardText = {
  margin: "0 0 24px",
  color: "#607d8b",
  fontSize: 16,
  lineHeight: 1.6,
  flexGrow: 1,
};

const buttonStyle = {
  textDecoration: "none",
  marginTop: "auto",
  transition: "all 0.3s ease",
};

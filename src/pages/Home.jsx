import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 960, margin: "32px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Welcome to ChompList</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Give us the ingredients you already have, and we’ll suggest quick meals.
      </p>

      <div style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        marginTop: 24
      }}>
        <div style={card}>
          <h3 style={h3}>Recipe Generator</h3>
          <p style={p}>Type ingredients and get simple ideas to cook tonight.</p>
          <NavLink className="nav-pill" to="/recipe-generator">Try it</NavLink>
        </div>
        <div style={card}>
          <h3 style={h3}>Dashboard</h3>
          <p style={p}>Your saved recipes and recents (coming soon).</p>
          <NavLink className="nav-link" to="/dashboard">Open</NavLink>
        </div>
        <div style={card}>
          <h3 style={h3}>About</h3>
          <p style={p}>What we’re building and the plan for Sprint 2.</p>
          <NavLink className="nav-link" to="/about">Learn more</NavLink>
        </div>
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 16,
  background: "#fff"
};
const h3 = { margin: "0 0 6px" };
const p = { margin: "0 0 12px", color: "#607d8b" };

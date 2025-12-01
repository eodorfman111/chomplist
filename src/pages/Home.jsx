import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="body">
      <div>
        <h1 className="top-header" style={{ marginTop: 40 }}>
          Welcome to ChompList
        </h1>
        <p>Enter in ingredients and recieve recipes now!</p>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginTop: 24,
            maxWidth: 1000,
            margin: "24px auto 0",
          }}
        >
          <div style={card}>
            <h3 style={h3}>Recipe Generator</h3>
            <p style={p}>
              Type ingredients and get simple ideas to cook tonight.
            </p>
            <NavLink className="nav-pill" to="/recipe-generator">
              Try it
            </NavLink>
          </div>
          <div style={card}>
            <h3 style={h3}>Dashboard</h3>
            <p style={p}>Your saved recipes and recents (coming soon).</p>
            <NavLink className="nav-pill" to="/dashboard">
              Open
            </NavLink>
          </div>
          <div style={card}>
            <h3 style={h3}>About</h3>
            <p style={p}>What we’re building and the plan for Sprint 2.</p>
            <NavLink className="nav-pill" to="/about">
              Learn more
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
};
const h3 = { margin: "0 0 6px" };
const p = { margin: "0 0 12px", color: "#607d8b" };

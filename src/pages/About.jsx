import React from "react";

export default function About() {
  return (
    <div style={{ maxWidth: 860, margin: "32px auto", padding: "0 16px" }}>
      <h1>About ChompList</h1>
      <p style={{ color: "#555" }}>
        ChompList helps students turn pantry ingredients into quick, budget-friendly meals.
        The MVP is a clean ingredient input, basic matching, and a results list.
      </p>

      <h2 style={{ marginTop: 24 }}>Current Scope (Sprint 1)</h2>
      <ul>
        <li>Navigation + page shells</li>
        <li>Ingredient entry & simple mock suggestions</li>
        <li>Login/Registration UI (no real auth yet)</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>Next Up (Sprint 2)</h2>
      <ul>
        <li>Real dataset ingestion & basic match scoring</li>
        <li>Save recipe flow → Dashboard</li>
        <li>Form validation + API wiring</li>
      </ul>
    </div>
  );
}

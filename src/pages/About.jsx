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
        ChompList helps students turn pantry ingredients into quick,
        budget-friendly meals. The MVP is a clean ingredient input, basic
        matching, and a results list.
      </p>

      <img
        src="ChompGator.png"
        alt="picture of ChompGator logo"
        style={{ display: "block", margin: "24px auto" }}
      />

      <h1 className="top-header" style={{ marginTop: 24 }}>
        Stages
      </h1>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 0 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>Developed project idea</li>
        <li>Created the architectural design</li>
        <li>Assigned tasks and goals to be completed for future sprints</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 1 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>Navigation + page shells</li>
        <li>Ingredient entry & simple mock suggestions</li>
        <li>Login/Registration UI (no real auth yet)</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Sprint 2 ✅</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>Real dataset ingestion & basic match scoring</li>
        <li>Save recipe flow → Dashboard</li>
        <li>Form validation + API wiring</li>
      </ul>

      <h2 style={{ marginTop: 24, color: "white" }}>Coming Soon...</h2>
      <ul style={{ listStyleType: "none" }} className="small-text">
        <li>
          Develop more features such as: Ranking receipe results by relevance,
          Filtering recipes based on users' preferences, Providing nutritional
          facts on each of the recipes
        </li>
        <li>Potentially create an app version</li>
        <li>Implement 2-Factor Authentication </li>
      </ul>
    </div>
  );
}

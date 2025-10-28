import React from "react";
import EmptyState from "../components/EmptyState";

export default function About() {
  return (
    <div style={{ maxWidth:800, margin:"32px auto", padding:"0 16px" }}>
      <h1>About ChompList</h1>
      <p style={{ color:"#555" }}>
        ChompList helps students turn pantry ingredients into quick meal ideas.
        We’re building a simple, friendly UI and will later connect to a real dataset.
      </p>
      <EmptyState title="Roadmap" hint="Sprint 2: dataset ingestion, match scoring, saved recipes." />
    </div>
  );
}

import React from "react";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  return (
    <div style={{ maxWidth:900, margin:"32px auto", padding:"0 16px" }}>
      <h1>Your Dashboard</h1>
      <EmptyState title="No saved recipes yet" hint="They’ll appear here once saving is wired up." />
    </div>
  );
}

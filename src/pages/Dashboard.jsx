import React from "react";

export default function Dashboard() {
  const mockSaved = [
    { id: 1, title: "Egg Fried Rice", lastUsed: "Oct 20" },
    { id: 2, title: "Tomato Pasta", lastUsed: "Oct 18" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
      <h1>Your Dashboard</h1>
      <p style={{ color: "#555" }}>
        Saved recipes will appear here once that flow is wired up. For now this shows placeholders.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {mockSaved.map(r => (
          <div key={r.id} style={card}>
            <strong>{r.title}</strong>
            <div style={{ color: "#607d8b" }}>Last used: {r.lastUsed}</div>
          </div>
        ))}
        {mockSaved.length === 0 && (
          <div style={empty}>No saved recipes yet.</div>
        )}
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 14,
  background: "#fff"
};

const empty = {
  border: "1px dashed #cfd8dc",
  borderRadius: 12,
  padding: 24,
  textAlign: "center",
  color: "#607d8b",
  background: "#fafbfd"
};

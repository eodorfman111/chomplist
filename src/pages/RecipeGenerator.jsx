import React, { useMemo, useState } from "react";

const SUGGESTIONS = ["egg", "chicken", "tomato", "onion", "spinach", "rice", "pasta"];

export default function RecipeGenerator() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function addIngredient(name) {
    const v = name.trim().toLowerCase();
    if (!v || ingredients.includes(v)) return;
    setIngredients(prev => [...prev, v]);
    setInput("");
  }

  function removeIngredient(name) {
    setIngredients(prev => prev.filter(x => x !== name));
  }

  const mockRecipes = useMemo(() => {
    if (ingredients.length === 0) return [];
    return [
      { id: 1, title: "Quick Bowl", uses: ingredients.slice(0, 2).join(", ") || "your pantry" },
      { id: 2, title: "Simple Skillet", uses: ingredients.slice(-2).join(", ") || "basics" },
    ];
  }, [ingredients]);

  return (
    <div style={{ maxWidth: 820, margin: "32px auto", padding: "0 16px" }}>
      <h1>Recipe Generator</h1>
      <p style={{ color: "#555" }}>
        Type an ingredient and press Enter. Add a few, then see simple suggestions.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addIngredient(input)}
          placeholder="e.g., chicken"
          style={{ flex: 1, padding: "12px 14px", border: "1px solid #cfd8dc", borderRadius: 8 }}
        />
        <button onClick={() => addIngredient(input)} className="nav-pill">Add</button>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => addIngredient(s)} style={chipBtn}>{s}</button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ingredients.map(x => (
          <span key={x} style={chip}>
            {x}
            <button aria-label={`remove ${x}`} onClick={() => removeIngredient(x)} style={chipX}>×</button>
          </span>
        ))}
        {ingredients.length === 0 && (
          <div style={empty}>No ingredients yet. Add a few to see ideas.</div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ margin: "0 0 12px" }}>Suggestions</h2>
        {mockRecipes.length === 0 ? (
          <div style={empty}>No suggestions. Add ingredients above.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
            {mockRecipes.map(r => (
              <li key={r.id} style={card}>
                <strong>{r.title}</strong>
                <div style={{ color: "#607d8b" }}>Uses: {r.uses}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const chip = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px",
  background: "#f1f8fb", border: "1px solid #cfe8f3", color: "#0b556a", borderRadius: 999
};
const chipBtn = { ...chip, cursor: "pointer" };
const chipX = { background: "transparent", border: "none", color: "#0b556a", cursor: "pointer", fontSize: 16, lineHeight: 1 };
const card = { border: "1px solid #e0e0e0", borderRadius: 12, padding: 12, background: "#fff" };
const empty = { border: "1px dashed #cfd8dc", borderRadius: 12, padding: 24, textAlign: "center", color: "#607d8b", background: "#fafbfd" };

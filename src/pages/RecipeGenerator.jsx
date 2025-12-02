import React, { useMemo, useState, useEffect } from "react";

const SUGGESTIONS = [
  "egg",
  "chicken",
  "tomato",
  "onion",
  "spinach",
  "rice",
  "pasta",
];

const API_BASE_URL = "http://localhost:5001/api";

export default function RecipeGenerator() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  // Fetch suggestions whenever ingredients change
  useEffect(() => {
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients,
            limit: 10,
            offset: 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        setRecipes(data.results || []);
      } catch (err) {
        setError(err.message);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [ingredients]);

  async function addIngredient(name) {
    const v = name.trim().toLowerCase();
    if (!v || ingredients.includes(v)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/ingredients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: v }),
      });

      if (response.ok) {
        setIngredients((prev) => [...prev, v]);
        setInput("");
      }
    } catch (err) {
      console.error("Failed to add ingredient:", err);
      setIngredients((prev) => [...prev, v]);
      setInput("");
    }
  }

  async function removeIngredient(name) {
    try {
      await fetch(`${API_BASE_URL}/ingredients/${encodeURIComponent(name)}`, {
        method: "DELETE",
      });

      setIngredients((prev) => prev.filter((x) => x !== name));
    } catch (err) {
      console.error("Failed to remove ingredient:", err);
      setIngredients((prev) => prev.filter((x) => x !== name));
    }
  }

  async function toggleFavorite(recipeId) {
    const userData = localStorage.getItem("chomplist_user");
    if (!userData) {
      alert("Please log in to save favorites");
      return;
    }

    const user = JSON.parse(userData);
    const username = user.username || user.email;

    try {
      if (favoriteStatus[recipeId]) {
        // Remove favorite
        const response = await fetch(
          `${API_BASE_URL}/favorites?username=${encodeURIComponent(
            username
          )}&recipe_id=${recipeId}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setFavoriteStatus((prev) => ({ ...prev, [recipeId]: false }));
        }
      } else {
        // Add favorite
        const response = await fetch(`${API_BASE_URL}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, recipe_id: recipeId }),
        });

        if (response.ok) {
          setFavoriteStatus((prev) => ({ ...prev, [recipeId]: true }));
        }
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      alert("Failed to save favorite. Please try again.");
    }
  }

  return (
    <div
      style={{
        padding: "32px 16px",
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #002efd 0%, #ff7700 100%)",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <h1 className="top-header">Recipe Generator</h1>
        <p className="small-text" style={{ marginBottom: 24 }}>
          Type an ingredient and press Enter. Add a few, then see simple
          suggestions.
        </p>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient(input)}
            placeholder="e.g., chicken"
            style={{
              flex: 1,
              padding: "12px 14px",
              border: "1px solid #cfd8dc",
              borderRadius: 8,
            }}
          />
          <button
            onClick={() => addIngredient(input)}
            style={{
              padding: "12px 24px",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <div
          style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => addIngredient(s)} style={chipBtn}>
              {s}
            </button>
          ))}
        </div>

        <div
          style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {ingredients.map((x) => (
            <span key={x} style={chip}>
              {x}
              <button
                aria-label={`remove ${x}`}
                onClick={() => removeIngredient(x)}
                style={chipX}
              >
                ×
              </button>
            </span>
          ))}
          {ingredients.length === 0 && (
            <div style={empty}>No ingredients yet. Add a few to see ideas.</div>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          <h2 style={{ color: "white", fontSize: "36px" }}>Suggestions</h2>

          {error && (
            <div style={{ ...empty, borderColor: "#f44336", color: "#c62828" }}>
              Error: {error}
            </div>
          )}

          {loading && <div style={empty}>Loading recipes...</div>}

          {!loading &&
            !error &&
            recipes.length === 0 &&
            ingredients.length > 0 && (
              <div style={empty}>No recipes found with these ingredients.</div>
            )}

          {!loading &&
            !error &&
            recipes.length === 0 &&
            ingredients.length === 0 && (
              <div style={empty}>No suggestions. Add ingredients above.</div>
            )}

          {!loading && !error && recipes.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 12,
              }}
            >
              {recipes.map((r) => (
                <li key={r.id} style={card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: 18,
                        display: "block",
                        marginBottom: 8,
                        flex: 1,
                      }}
                    >
                      {r.title}
                    </strong>
                    <button
                      onClick={() => toggleFavorite(r.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: 24,
                        cursor: "pointer",
                        padding: "0 8px",
                        color: favoriteStatus[r.id] ? "#ff6b6b" : "#ccc",
                      }}
                      title={
                        favoriteStatus[r.id]
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {favoriteStatus[r.id] ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <div
                    style={{ color: "#607d8b", fontSize: 14, marginBottom: 8 }}
                  >
                    <strong>Ingredients:</strong> {r.ingredients}
                  </div>
                  <div style={{ color: "#455a64", fontSize: 14 }}>
                    <strong>Instructions:</strong>
                    <p style={{ marginTop: 4 }}>{r.instructions}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const chip = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 10px",
  background: "#f1f8fb",
  border: "1px solid #cfe8f3",
  color: "#0b556a",
  borderRadius: 999,
};
const chipBtn = { ...chip, cursor: "pointer" };
const chipX = {
  background: "transparent",
  border: "none",
  color: "#0b556a",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: 1,
};
const card = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
};
const empty = {
  border: "1px dashed #cfd8dc",
  borderRadius: 12,
  padding: 24,
  textAlign: "center",
  color: "#607d8b",
  background: "#fafbfd",
};

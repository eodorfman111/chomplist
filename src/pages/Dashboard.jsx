import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5001/api";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("chomplist_user");
    if (userData) {
      const parsed = JSON.parse(userData);
      const user = parsed.username || parsed.email || "User";
      setUsername(user);
      fetchFavorites(user);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchFavorites(username) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/favorites?username=${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await response.json();
      setFavorites(data.favorites || []);
    } catch (err) {
      setError(err.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(favoriteId) {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${favoriteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites((prev) =>
          prev.filter((f) => f.favorite_id !== favoriteId)
        );
      } else {
        alert("Failed to remove favorite");
      }
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Failed to remove favorite. Please try again.");
    }
  }

  if (!username) {
    return (
      <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
        <div style={emptyState}>
          <h2 style={{ color: "#fff", marginBottom: 12 }}>Please Log In</h2>
          <p style={{ color: "#fff" }}>
            You need to be logged in to view your saved recipes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
      <h1 style={{ color: "#fff" }}>Welcome, {username}!</h1>
      <p style={{ color: "#fff", marginBottom: 24 }}>
        Your saved recipes appear below.
      </p>

      {loading && (
        <div style={emptyState}>
          <p style={{ color: "#fff" }}>Loading your favorites...</p>
        </div>
      )}

      {error && (
        <div style={{ ...emptyState, borderColor: "#f44336" }}>
          <p style={{ color: "#fff" }}>Error: {error}</p>
        </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div style={emptyState}>
          <p style={{ color: "#fff", fontSize: 18 }}>No saved recipes yet.</p>
          <p style={{ color: "#fff" }}>
            Go to the Recipe Generator to find and save recipes!
          </p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          {favorites.map((fav) => (
            <div key={fav.favorite_id} style={card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong
                    style={{ fontSize: 18, display: "block", marginBottom: 8 }}
                  >
                    {fav.title}
                  </strong>
                  <div
                    style={{ color: "#607d8b", fontSize: 14, marginBottom: 8 }}
                  >
                    <strong>Ingredients:</strong> {fav.ingredients}
                  </div>
                  <div style={{ color: "#455a64", fontSize: 14 }}>
                    <strong>Instructions:</strong>
                    <p style={{ marginTop: 4 }}>{fav.instructions}</p>
                  </div>
                  <div style={{ color: "#90a4ae", fontSize: 12, marginTop: 8 }}>
                    Saved: {new Date(fav.created_at).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => removeFavorite(fav.favorite_id)}
                  style={removeBtn}
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const card = {
  border: "1px solid #e0e0e0",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const emptyState = {
  border: "1px dashed rgba(255,255,255,0.3)",
  borderRadius: 12,
  padding: 40,
  textAlign: "center",
  background: "rgba(255,255,255,0.1)",
};

const removeBtn = {
  background: "#f44336",
  color: "white",
  border: "none",
  borderRadius: 6,
  width: 32,
  height: 32,
  cursor: "pointer",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginLeft: 12,
};

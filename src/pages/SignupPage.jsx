import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const SignupPage = () => {
  const [action, setAction] = useState("Signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || data.message || "Signup failed. Please try again."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "chomplist_user",
        JSON.stringify({ username, email })
      );
      window.dispatchEvent(new Event("chomplist_user_changed"));
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                aria-label="Username"
                required
              />
            </div>
            <div className="input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-label="Email"
                required
              />
            </div>
            <div className="input">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                aria-label="Password"
                required
              />
            </div>
          </div>
          <div className="button">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="switch-link">
                Login here
              </Link>
            </p>
          </div>
          <div className="submit-container">
            <div>{error && <div className="error-message">{error}</div>}</div>
            <button
              type="submit"
              className="Signup"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

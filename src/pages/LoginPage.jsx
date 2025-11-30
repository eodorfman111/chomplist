import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          data.error || data.message || "Login failed. Please try again."
        );
        setLoading(false);
        return;
      }

      const userToStore = data.user ?? email;
      localStorage.setItem(
        "chomplist_user",
        JSON.stringify({ username: username, email: email })
      );
      window.dispatchEvent(new Event("chomplist_user_changed"));
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="button">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="switch-link">
                Signup here
              </Link>
            </p>
          </div>
          <div className="forgot-password">
            <Link to="/forgot">Forgot your password?</Link>
          </div>
          <div className="submit-container">
            <div>{error && <div className="error-message">{error}</div>}</div>
            <div>
              <button
                type="submit"
                className="Login"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

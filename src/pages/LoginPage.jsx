import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [mode, setMode] = useState("Login"); // "Login" | "Signup"
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  function submit() {
    if (!email.trim() || !pwd.trim()) {
      alert("Please enter email and password.");
      return;
    }
    // fake auth token for now
    localStorage.setItem("chomplist_token", JSON.stringify({ email, t: Date.now() }));
    navigate("/dashboard");
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{mode}</div>
        <div className="underline" />
      </div>

      <div className="inputs" style={{ alignItems: "center" }}>
        {mode === "Signup" && (
          <div className="input">
            <input type="text" placeholder="Name / Username" />
          </div>
        )}
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
        </div>
      </div>

      {mode === "Login" && (
        <div className="forgot-password">
          <span role="button" onClick={() => alert("Password reset coming soon.")}>
            Forgot password?
          </span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={mode === "Login" ? "submit gray" : "submit"}
          onClick={() => setMode("Signup")}
        >
          Sign Up
        </div>
        <div
          className={mode === "Signup" ? "submit gray" : "submit"}
          onClick={() => setMode("Login")}
        >
          Login
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="nav-pill" onClick={submit}>
          {mode === "Login" ? "Continue" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

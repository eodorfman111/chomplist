import React, { useState } from "react";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  function submit() {
    if (!name.trim() || !email.trim() || !pwd.trim() || !confirm.trim()) {
      alert("Please fill out all fields.");
      return;
    }
    if (pwd !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    // stub “account”
    const account = { name, email, createdAt: Date.now() };
    localStorage.setItem("chomplist_account", JSON.stringify(account));
    alert("Account created (stub). You can now log in.");
  }

  return (
    <div style={{ maxWidth: 520, margin: "32px auto", padding: "0 16px" }}>
      <h1>Create Account</h1>
      <div className="inputs" style={{ alignItems: "center", marginTop: 16 }}>
        <div className="input">
          <input type="text" placeholder="Name / Username" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
        </div>
        <div className="input">
          <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={submit}>Sign Up</div>
      </div>
    </div>
  );
}

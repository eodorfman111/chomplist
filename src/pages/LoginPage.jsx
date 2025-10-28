import React from "react";
import { useState } from "react";

const LoginPage = () => {
  const [action, setAction] = useState("Signup");

  return (
    <div className="container" extend="React.components">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <input type="name" placeholder="Name/Username" />
          </div>
        )}
        <div className="input">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="button">
        <button>SignUp</button>
      </div>
      {action === "Signup" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          <a href="#">Lost Password?</a>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Signup");
          }}
        >
          SignUp
        </div>
        <div
          className={action === "Signup" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

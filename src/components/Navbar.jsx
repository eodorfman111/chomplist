import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";

export default function Navigationbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const readUserFromStorage = () => {
    try {
      const raw = localStorage.getItem("chomplist_user");
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        return { email: parsed };
      }
      return parsed;
    } catch (err) {
      console.warn("Failed to parse chomplist_user:", err);
      return null;
    }
  };

  useEffect(() => {
    setUser(readUserFromStorage());

    const onStorage = (e) => {
      if (e.key === "chomplist_user") {
        setUser(readUserFromStorage());
      }
    };

    window.addEventListener("storage", onStorage);
    const onUserChange = () => {
      setUser(readUserFromStorage());
    };
    window.addEventListener("chomplist_user_changed", onUserChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("chomplist_user_changed", onUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("chomplist_user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar-shell">
      <Navbar expand="lg" variant="dark" className="app-navbar">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img
              src="./ChompGator.png"
              alt="chompgator logo"
              className="logo-img"
            />
            <span>ChompList</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-center gap-4">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
              <NavLink className="nav-link" to="/recipe-generator">
                Recipe Generator
              </NavLink>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>

              {user ? (
                <NavDropdown
                  title={user.username ?? user.email ?? "Account"}
                  id="nav-dropdown-account"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => navigate("/account")}>
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/settings")}>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink className="nav-pill" to="/login">
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

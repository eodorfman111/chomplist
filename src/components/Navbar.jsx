import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigationbar() {
  return (
    <div className="navbar-shell">
      <Navbar expand="lg" variant="dark" className="app-navbar">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            CHOMPLIST
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-center gap-4">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/recipe-generator">
                Recipe Generator
              </NavLink>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>

              <NavLink className="nav-pill" to="/login">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

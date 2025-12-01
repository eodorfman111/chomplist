import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">ChompList</h3>
          <p className="footer-text">Section 10792 - Group 5</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/recipe-generator">Recipe Generator</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">
            <a href="mailto:ChompGator@gmail.com">Email</a>
          </p>
          <p className="footer-text">
            <a href="#">Phone</a>
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">GitHub</h3>
          <div className="github-link">
            <a
              href="https://github.com/eodorfman111/chomplist"
              target="_blank"
              rel="noopener noreferrer"
            >
              View our project on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

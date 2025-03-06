import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import "../Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Bovi Analytics. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="footer-link">
            <FaGithub size={24} />
          </a>
          <a href="mailto:your-email@example.com" className="footer-link">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
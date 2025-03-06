import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Header.css";
import logo from '../logo.png'; // Adjust the path to your logo.png

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="header">
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="Bovi Analytics Logo" className="logo-img" />
        {/* <img 
    src={logo} 
    alt="Bovi Analytics Logo" 
    className="logo-img" 
    style={{ width: '50px', height: '50px' }} 
/> */}
          Bovi Analytics
        </Link>
      </div>

      {/* Nav Links */}
      <ul className={isMobile ? "nav-links nav-active" : "nav-links"}>
        <li>
          <Link to="/upload" onClick={() => setIsMobile(false)}>Upload</Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={() => setIsMobile(false)}>Dashboard</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsMobile(false)}>Contact</Link>
        </li>
        <li>
          <Link to="/signup" className="nav-btn signup" onClick={() => setIsMobile(false)}>Sign Up</Link>
        </li>
        <li>
          <Link to="/signin" className="nav-btn signin" onClick={() => setIsMobile(false)}>Sign In</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={() => alert("Logging Out...")}>Logout</button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>
    </nav>
  );
};

export default Header;
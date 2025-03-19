import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage.css";
import logo from '../logo.png'; // Adjust the path to your logo.png

const LandingPage = () => {
  return (
    <div className="landing-page">
      
      <div className="landing-content">
      <img src={logo} alt="Bovi Analytics Logo" className="logo-img" />
        <h1>Welcome to Bovi-Analytics Lab</h1>
        <p>
          Bovi Analytics is dedicated to providing advanced methane analysis solutions. Our platform allows you to upload and analyze methane data efficiently, helping you make informed decisions to reduce emissions and improve environmental sustainability.
        </p>
        <div className="landing-buttons">
          <Link to="/upload" className="btn upload-btn">Upload Data</Link>
          <Link to="/dashboard" className="btn dashboard-btn">View Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
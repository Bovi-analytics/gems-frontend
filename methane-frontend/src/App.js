import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Dashboard from "./components/DashBoard";
import Chatbot from './components/Chatbot';
import ApiDocs from "./components/ApiDocs";
// import { useAuth0 } from "@auth0/auth0-react";
// import { jwtDecode } from 'jwt-decode';
// import { useEffect, useState } from "react";

function App() {

  return (
    <Router>
      <div className="App">
        {/* pass in UserRoles to Header component */}
        <Header />
        <Chatbot />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
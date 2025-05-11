import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<FileUpload />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
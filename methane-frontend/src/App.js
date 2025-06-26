import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Dashboard from "./components/DashBoard";
import Chatbot from './components/Chatbot';
import ApiDocs from "./components/ApiDocs";
import ChatVisualPage from "./pages/ChatVisualPage";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/chat-visual";

  return (
    <div className="App">
      <Header />
      {!hideLayout && <Chatbot />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/chat-visual" element={<ChatVisualPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import FileUpload from "./components/FileUpload";
// import Header from "./components/Header";
// import LandingPage from "./components/LandingPage";
// import Footer from "./components/Footer";
// import Dashboard from "./components/DashBoard";
// import Chatbot from './components/Chatbot';
// import ApiDocs from "./components/ApiDocs";
// // import ChatVisual from "./components/ChatVisual";
// import ChatVisualPage from "./pages/ChatVisualPage";
// // import { useAuth0 } from "@auth0/auth0-react";
// // import { jwtDecode } from 'jwt-decode';
// // import { useEffect, useState } from "react";

// function App() {

//   return (
//     <Router>
//       <div className="App">
//         {/* pass in UserRoles to Header component */}
//         <Header />
//         <Chatbot />
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/upload" element={<FileUpload />} />
//           <Route path="/api-docs" element={<ApiDocs />} />
//           <Route path="/chat-visual" element={<ChatVisualPage />} />

//           {/* Add other routes as needed */}
//         </Routes>
//         {<Footer />}
//       </div>
//     </Router>
//   );
// }

// export default App;
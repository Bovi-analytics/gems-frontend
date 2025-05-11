import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCow } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { useEffect } from "react";
import "../Header.css";
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  // ✅ Moved inside the component
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    // console.log("getAccessTokenSilently:", getAccessTokenSilently);
  }, [isLoading, isAuthenticated, user]);

  if (isLoading) return null;
  return (
    <nav className="header">
      <div className="logo">
        {/* {isAuthenticated && user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="profile-pic"
            title={user.name}
          />
        )} */}
        <Link to="/">Bovi-Analytics</Link>
      </div>

      {/* Nav Links */}
      <ul className={isMobile ? "nav-links nav-active" : "nav-links"}>
      <li>
        <a 
          href="http://localhost:5000/api/v1/swagger"
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => setIsMobile(false)}
        >
          API
        </a>
      </li>
        <li>
          <Link to="/upload" onClick={() => setIsMobile(false)}>Upload</Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={() => setIsMobile(false)}>Dashboard</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsMobile(false)}>Contact</Link>
        </li>

        {!isAuthenticated ? (
          <>
            <li>
              <Link className="nav-btn signup" onClick={() => loginWithRedirect({screen_hint: 'signup'})}>Sign Up</Link>
            </li>
            <li>
              <Link className="nav-btn signin" onClick={() => loginWithRedirect()}>Sign In</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="welcome-text">Hi, {titleCase(user.name)}</span>
            </li>
            <li>
              <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </li>
                {/* {isAuthenticated && user.picture && (
              <img
                src={user.picture}
                // use the intial of the user's name as alt text and make sure it's capitalized(user.name.charAt(0).toUpperCase())
                alt={user.name}
                className="profile-pic"
                title={user.name}
              />
            )} */}
              {isAuthenticated && (
              user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="profile-pic"
                  title={user.name}
                />
              ) : (
                <div className="profile-fallback" title={user.name}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )
            )}

          </>
        )}
      </ul>
      {/* Mobile Menu Button */}
      <div className="menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaCow size={28} /> : <TfiMenuAlt size={28} />}
      </div>
    </nav>
  );
};

export default Header;

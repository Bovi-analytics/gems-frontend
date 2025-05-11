import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../DashBoard.css';

const DashBoard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="dashboard">Loading...</div>;

  return (
    isAuthenticated && (
      <div className="dashboard">
        <div className="dashboard-card">
          <img src={user.picture} alt="User Profile" className="profile-pic-dashboard" />
          <h2>Welcome, {user.name}</h2>
          <p className="email">{user.email}</p>
          <div className="details">
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Updated at:</strong> {new Date(user.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default DashBoard;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mvz0o2d83zbkctso.us.auth0.com"
      clientId="2Dw9hUo57yGRYx6F2Lyq6DjC6KQFhtyW"
      clientSecret="HQJ9wu3WbW6HMqX_EzfK0VlNblPWsmILGl_uh_mGCs9MY6REazpSm7UlGh6MfLp9"
      redirectUri={window.location.origin}
      audience={`https://gems-backend.bovi-analytics.com`}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
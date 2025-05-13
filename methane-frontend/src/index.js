import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1bd3bttgj2px61zz.us.auth0.com"
      clientId="1PbIi3DXSCR0xRPgXGXaA9cyuPCZSlrF"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://gems.bovi-analytics.com/',
        scope: 'openid profile email',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      onRedirectCallback={(appState) => {
        window.history.replaceState({}, document.title, appState?.returnTo || window.location.pathname);
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
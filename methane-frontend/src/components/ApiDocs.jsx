import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../ApiDocs.css';

const ApiDocs = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [token, setToken] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      setCopied(false);
    } catch (err) {
      console.error('Error fetching token:', err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Bearer ${token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="api-docs-container">
      <h1>🔌 Bovi-Analytics API Documentation</h1>
      <p>This page provides a summary of how to use our REST and GraphQL APIs. You must be authenticated to test them.</p>

      <section>
        <h2>🔐 Authentication</h2>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()} className="btn">Log in to Generate Token</button>
        ) : (
          <>
            <button onClick={fetchToken} className="btn">Generate Access Token</button>
            {token && (
              <div className="token-section">
                <textarea value={`Bearer ${token}`} readOnly rows={4} />
                <button className="copy-btn" onClick={copyToClipboard}>
                  {copied ? '✔ Copied!' : '📋 Copy'}
                </button>
              </div>
            )}
          </>
        )}
        <p>Paste this token into the Swagger UI "Authorize" popup to test secured endpoints.</p>
      </section>

      <section>
        <h2>📘 REST API (Swagger)</h2>
        <p>Use the Swagger UI to explore and test API endpoints:</p>
        <a href="http://localhost:5000/api/v1/swagger" target="_blank" rel="noopener noreferrer">
          Open Swagger Documentation
        </a>
        <div className="dev-tip">
          <strong>Usage Tip:</strong><br />
          For any protected request, add this header:
          <pre>{`Authorization: Bearer YOUR_TOKEN_HERE`}</pre>
        </div>
        <div className="dev-tip">
          <strong>Request Format (Upload):</strong><br />
          <code>Content-Type: multipart/form-data</code><br />
          Fields: <code>file</code> (Excel file), <code>emails</code> (comma-separated string)
        </div>
      </section>

      <section>
        <h2>🚀 GraphQL API</h2>
        <p>Query structured data using our GraphQL endpoint:</p>
        <a href="http://localhost:5000/graphql" target="_blank" rel="noopener noreferrer">
          Go to GraphQL Endpoint
        </a>
        <div className="dev-tip">
          <strong>Example GraphQL Query:</strong>
          <pre>{`query {
  getAnimals {
    name
    methane_emission
    milk_production
  }
}`}</pre>
        </div>
      </section>

      <section>
        <h2>📂 Key Endpoints</h2>

        <h3>1. File Upload</h3>
        <p><code>POST /api/v1/gems/upload</code><br />Upload Excel files to be validated and processed.</p>

        <h3>2. Report Access</h3>
        <p><code>GET /animal.json</code><br />Get a JSON sample of animal methane data.</p>

        <h3>3. Public Data Formats</h3>
        <p>Available formats:</p>
        <ul>
          <li><code>/animal.csv</code></li>
          <li><code>/animal.xml</code></li>
          <li><code>/animal.html</code></li>
        </ul>

        <h3>4. Swagger Spec</h3>
        <p><code>GET /static/swagger.json</code><br />Fetch the raw OpenAPI spec.</p>
      </section>
    </div>
  );
};

export default ApiDocs;

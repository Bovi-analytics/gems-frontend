// import React, { useState } from 'react';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
// import '../FileUpload.css'; // Import the CSS file for styling
// import { BiLoaderCircle } from "react-icons/bi";
// import { ImUpload3 } from "react-icons/im";
// import { FiDelete } from "react-icons/fi";
// import { useAuth0 } from '@auth0/auth0-react';


// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [emails, setEmails] = useState([]); // Store multiple emails
//   const [newEmail, setNewEmail] = useState(''); // Temporary email input
//   const { loginWithRedirect, isAuthenticated } = useAuth0();
//   const { getAccessTokenSilently } = useAuth0();

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // Add new email to the list
//   const addEmail = () => {
//     if (newEmail.trim() === '') {
//       alert("Email cannot be empty!");
//       return;
//     }
//     if (!validateEmail(newEmail)) {
//       alert("Invalid email format!");
//       return;
//     }
//     setEmails([...emails, newEmail.trim()]); // Add email to the array
//     setNewEmail(''); // Clear input field
//   };

//   // Remove an email from the list
//   const removeEmail = (index) => {
//     const updatedEmails = emails.filter((_, i) => i !== index);
//     setEmails(updatedEmails);
//   };

//   // Email validation function
//   const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file!');
//       return;
//     }
//     if (emails.length === 0) {
//       alert('Please add at least one email!');
//       return;
//     }
  
//     if (!isAuthenticated) {
//       // Redirect to login
//       alert("You need to be signed in to upload.");
//       loginWithRedirect();
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('emails', emails.join(','));
  
//     setLoading(true);
    
//     try {
//       const token = await getAccessTokenSilently();
//       console.log("token: ", token);
//       const response = await axios.post(
//         // `https://gems-backend.bovi-analytics.com/upload`,
//         `http://localhost:5000/api/v1/gems/upload`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}` // Replace with real token later
//           },
//         }
//       );
      
//       console.log(response.data);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       alert("Upload failed!");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="upload-container">
//       <img src="./logo.png" alt="Bovi-Analytics Logo" className="logo" />
//       <h1>Bovi-Analytics Lab File Upload</h1>
      
//       <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />

//       {/* Email Input & Add Button */}
//       <div className="email-input-container">
//         <input 
//           type="email"
//           placeholder="Enter email"
//           value={newEmail}
//           onChange={(e) => setNewEmail(e.target.value)}
//         />
//         <button onClick={addEmail} className="add-email-button">➕ Add</button>
//       </div>

//       {/* Display added emails with delete option */}
//       <div className="email-list">
//         {emails.map((email, index) => (
//           <div key={index} className="email-item">
//             <span>{email}</span>
//             <button onClick={() => removeEmail(index)} className="remove-email-button"><FiDelete size="1em"/></button>
//           </div>
//         ))}
//       </div>

//       <button onClick={handleUpload} disabled={loading} className='upload-button'>
//         {loading && <BiLoaderCircle />}
//         {!loading && <ImUpload3 />}
//         {loading ? 'Uploading...' : 'Upload'}
//       </button>
//     </div>
//   );
// };

// export default FileUpload;
import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../FileUpload.css';
import { BiLoaderCircle } from 'react-icons/bi';
import { ImUpload3 } from 'react-icons/im';
import { FiDelete } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from "jwt-decode"; // install if needed: npm install jwt-decode


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [userRoles, setUserRoles] = useState([]);
  // const { getAccessTokenSilently } = useAuth0();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const addEmail = () => {
    if (newEmail.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      alert('Invalid email!');
      return;
    }
    setEmails([...emails, newEmail.trim()]);
    setNewEmail('');
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const getAuthToken = async () => {
    if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
      // Token is still valid, reuse it
      // const decoded = JSON.parse(atob(authToken.split('.')[1]));
      // console.log("✅ Roles:", decoded);
      const decoded = jwtDecode(authToken);
      const userRoles = decoded['https://gems-backend.bovi-analytics.com/roles'] || [];
      // setRoles(userRoles);
      console.log("🔑 Roles from token:", userRoles);
      return authToken;
    }
    

    try {
      const response = await axios.post("http://localhost:5000/api/v1/token");
      const { access_token, expires_in } = response.data;
      console.log('getAuthToken response: ');
      
      
      const decoded = jwtDecode(access_token);
      const roles = decoded["https://gems-backend.bovi-analytics.com/roles"] || [];
      console.log("🔑 Roles from token:", roles);
      setUserRoles(roles);


      // Calculate expiration time (current time + token lifetime)
      const expiryTime = Date.now() + expires_in * 1000;

      setAuthToken(access_token);
      setTokenExpiry(expiryTime);

      return access_token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }
    if (emails.length === 0) {
      alert('Please add at least one email!');
      return;
    }

    setLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        alert('Failed to authenticate.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('emails', emails.join(','));

      const response = await axios.post(
        'http://localhost:5000/api/v1/gems/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <img src="./logo.png" alt="Bovi-Analytics Logo" className="logo" />
      <h1>Bovi-Analytics Lab File Upload</h1>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />

      <div className="email-input-container">
        <input type="email" placeholder="Enter email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <button onClick={addEmail} className="add-email-button">➕ Add</button>
      </div>

      <div className="email-list">
        {emails.map((email, index) => (
          <div key={index} className="email-item">
            <span>{email}</span>
            <button onClick={() => removeEmail(index)} className="remove-email-button"><FiDelete size="1em"/></button>
          </div>
        ))}
      </div>
      {!isAuthenticated && (<button onClick={loginWithRedirect()} disabled={true} className='upload-button'>
        {loading ? <BiLoaderCircle /> : <ImUpload3 />}
        {loading ? 'Uploading...' : 'Upload'}
      </button>)}
      
      
      {isAuthenticated && (<button onClick={handleUpload} disabled={loading} className='upload-button'>
        {loading ? <BiLoaderCircle /> : <ImUpload3 />}
        {loading ? 'Uploading...' : 'Upload'}
      </button>)}
    </div>
  );
};

export default FileUpload;

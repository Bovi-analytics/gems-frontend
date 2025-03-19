import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../FileUpload.css'; // Import the CSS file for styling
import { BiLoaderCircle } from "react-icons/bi";
import { ImUpload3 } from "react-icons/im";
import { FiDelete } from "react-icons/fi";


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]); // Store multiple emails
  const [newEmail, setNewEmail] = useState(''); // Temporary email input

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Add new email to the list
  const addEmail = () => {
    if (newEmail.trim() === '') {
      alert("Email cannot be empty!");
      return;
    }
    if (!validateEmail(newEmail)) {
      alert("Invalid email format!");
      return;
    }
    setEmails([...emails, newEmail.trim()]); // Add email to the array
    setNewEmail(''); // Clear input field
  };

  // Remove an email from the list
  const removeEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('emails', emails.join(',')); // Send as comma-separated string

    setLoading(true);
    try {
	    console.log(`Here is the backend url----${process.env.REACT_APP_BASE_API_URL}`)
      const response = await axios.post(
        `https://gems-backend.bovi-analytics.com/upload`, // Replace with actual API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer YOUR_API_KEY', // Replace with actual API key
          },
        }
      );
      console.log(response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <img src="./logo.png" alt="Bovi-Analytics Logo" className="logo" />
      <h1>Bovi-Analytics Lab File Upload</h1>
      
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />

      {/* Email Input & Add Button */}
      <div className="email-input-container">
        <input 
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={addEmail} className="add-email-button">➕ Add</button>
      </div>

      {/* Display added emails with delete option */}
      <div className="email-list">
        {emails.map((email, index) => (
          <div key={index} className="email-item">
            <span>{email}</span>
            <button onClick={() => removeEmail(index)} className="remove-email-button"><FiDelete size="1em"/></button>
          </div>
        ))}
      </div>

      <button onClick={handleUpload} disabled={loading} className='upload-button'>
        {loading && <BiLoaderCircle />}
        {!loading && <ImUpload3 />}
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUpload;

// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextRecognition from './textrecognition';
import History from './History';

function App() {
  // State variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [networkError, setNetworkError] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Caution: Please upload a file less than 2MB');
      } else {
        setSelectedFile(file);
        setUploadError(''); // Clear any previous error messages
      }
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('idCardImage', selectedFile);

      try {
        // Upload file using Axios
        await axios.post('http://localhost:3001/api/Cluster0', formData);
        setOcrResult('OCR data saved successfully');
        setNetworkError(''); // Clear any previous network error
      } catch (error) {
        console.error(error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setNetworkError(`Server error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          setNetworkError('No response from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          setNetworkError('Error setting up the request');
        }

        setOcrResult('OCR failed');
      }
    } else {
      setUploadError('Please select a file before uploading');
    }
  };

  // Render the component
  return (
    <div className="app-container">
      <div className="center-content">
        <h1>OCR Application</h1>
        <div className="upload-section">
          {/* File input for selecting images */}
          <input type="file" onChange={handleFileChange} />
          {/* Button to trigger file upload */}
          <button onClick={handleUpload}>Upload</button>
          {/* Caution message for file size */}
          {uploadError && <div className="caution-container"><p className="caution-message">{uploadError}</p></div>}
          {/* Network error message */}
          {networkError && <div className="error-container"><p className="error-message">{networkError}</p></div>}
        </div>
        {/* Component for text recognition */}
        <TextRecognition selectedImage={selectedFile} ocrResult={ocrResult} />
        {/* Component displaying upload history */}
        <History />
      </div>
    </div>
  );
}

export default App;

// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextRecognition from './textrecognition';
import History from './History';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Caution: Please upload a file less than 2MB');
      } else {
        setSelectedFile(file);
        setUploadError(''); // Clear any previous error messages
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('idCardImage', selectedFile);

      try {
        await axios.post('http://localhost:3001/api/Cluster0', formData);
        setOcrResult('OCR data saved successfully');
      } catch (error) {
        console.error(error);
        setOcrResult('OCR failed');
      }
    } else {
      setUploadError('Please select a file before uploading');
    }
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <h1>OCR Application</h1>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {uploadError && <div className="caution-container"><p className="caution-message">{uploadError}</p></div>}
        </div>
        <TextRecognition selectedImage={selectedFile} ocrResult={ocrResult} />
        <History />
      </div>
    </div>
  );
}

export default App;

// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextRecognition from './textrecognition.js';
import History from './History';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('idCardImage', selectedFile);

      try {
        await axios.post('http://localhost:3001/api/ocr', formData);
        setOcrResult('OCR data saved successfully');
      } catch (error) {
        console.error(error);
        setOcrResult('OCR failed');
      }
    } else {
      setUploadError('Please select a file before uploading');
    }
  };

  // Display a caution message if the file size exceeds 2MB
  const cautionMessage = selectedFile && selectedFile.size > 2 * 1024 * 1024
    ? 'Caution: Please upload a picture less than 2MB'
    : '';

  return (
    <div className="app-container">
      <div className="center-content">
        <h1>OCR Application</h1>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {uploadError && <p className="error-message">{uploadError}</p>}
          {cautionMessage && <p className="caution-message">{cautionMessage}</p>}
        </div>
        <TextRecognition selectedImage={selectedFile} ocrResult={ocrResult} />
        <History />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextRecognition from './textrecognition'; // Assuming correct import path

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('idCardImage', selectedFile);

    try {
      // Send the selected file to the Express backend
      await axios.post('http://localhost:3001/api/ocr', formData);

      // Assuming you want to display a success message or update the UI in some way
      setOcrResult('OCR data sent to the server');
    } catch (error) {
      console.error(error);
      setOcrResult('OCR failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <TextRecognition selectedImage={selectedFile} ocrResult={ocrResult} />
    </div>
  );
}

export default App;

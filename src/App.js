import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextRecognition from './textrecognition'; // Import TextRecognition component

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
      const response = await axios.post('http://localhost:3001/api/ocr', formData);
      setOcrResult(response.data.ocrResult);
    } catch (error) {
      console.error(error);
      setOcrResult('OCR failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <TextRecognition selectedImage={selectedFile} /> {/* Render TextRecognition with selectedImage prop */}
      
    </div>
  );
}

export default App;

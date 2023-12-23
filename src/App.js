// App.js

import React from 'react';
import UploadForm from './Uploadform';
import './uploadform.css';

const App = () => {
  const handleUploadSuccess = (data) => {
    console.log('Upload successful:', data);
    // Handle the successful upload, e.g., display results on the UI
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    // Handle the upload error, e.g., display an error message
  };

  return (
    <div>
      <h1>Thai ID Card OCR App</h1>
      <UploadForm onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
      {/* Include other components as needed */}
    </div>
  );
};

export default App;

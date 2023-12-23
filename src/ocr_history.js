// UploadForm.js

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess, onUploadError }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png', 'image/jpg'],
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB limit
  });

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await axios.post('/api/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUploadSuccess(response.data);
    } catch (error) {
      onUploadError(error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop a Thai ID card image here, or click to select one.</p>
      </div>
      {uploadedFile && (
        <div>
          <p>Selected File: {uploadedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default UploadForm;

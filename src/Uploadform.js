// thai-id-ocr-frontend/src/components/OCRForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const OCRForm = () => {
  const [ocrResult, setOcrResult] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);

      try {
        const response = await axios.post('/api/ocr', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setOcrResult(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select a file</p>
      </div>
      {ocrResult && (
        <div>
          <h2>OCR Result:</h2>
          <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OCRForm;

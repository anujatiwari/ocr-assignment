import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

const TextRecognition = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        try {
          setLoading(true);
          const result = await Tesseract.recognize(selectedImage, 'eng');
          console.log(result);
          setRecognizedText(result.data.text);
        } catch (err) {
          console.error(err);
          setError('Error during text recognition');
        } finally {
          setLoading(false);
        }
      }
    };

    recognizeText();
  }, [selectedImage]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};

export default TextRecognition;

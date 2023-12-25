// TextRecognition.js
import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';

const TextRecognition = ({ selectedImage }) => {
  // State variables
  const [recognizedText, setRecognizedText] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        try {
          setLoading(true);

          // Use Tesseract.js to recognize text from the selected image
          const result = await Tesseract.recognize(selectedImage, 'eng');
          console.log(result);

          // Extract lines from the recognized text
          const lines = result.data.text.split('\n');

          // Extract information from the lines
          const identificationNumberLine = lines[1];
          const identificationNumber = identificationNumberLine.slice(-13);

          const nameLine = lines.find((line) => line.toLowerCase().includes('name'));
          const name = nameLine ? nameLine.split(' ').pop() : '';

          const lastNameLine = lines.find((line) => line.toLowerCase().includes('last name'));
          const lastName = lastNameLine ? lastNameLine.split(' ').pop() : '';

          const dobLine = lines.find((line) => line.toLowerCase().includes('date of birth'));
          const dobMatch = dobLine.match(/(\d{2}) (\w{3})\. (\d{4})/);
          const dateOfBirth = dobMatch ? `${dobMatch[1]} ${dobMatch[2]} ${dobMatch[3]}` : '';

          // Set the recognized text state
          setRecognizedText({
            identification_number: identificationNumber,
            name: name,
            last_name: lastName,
            date_of_birth: dateOfBirth,
          });

          // Send OCR data to the backend API
          await axios.post('http://localhost:3001/api/Cluster0', {
            identification_number: identificationNumber,
            name: name,
            last_name: lastName,
            date_of_birth: dateOfBirth,
          });
        } catch (err) {
          console.error(err);
          //setError('Error during text recognition');
        } finally {
          setLoading(false);
        }
      }
    };

    // Invoke the text recognition function
    recognizeText();
  }, [selectedImage]);

  // Render the component
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Object.keys(recognizedText).length > 0 && (
        <>
          <h2>Extracted Information:</h2>
          {recognizedText.identification_number && (
            <p>{`Identification Number: ${recognizedText.identification_number}`}</p>
          )}
          {recognizedText.name && <p>{`Name: ${recognizedText.name}`}</p>}
          {recognizedText.last_name && <p>{`Last Name: ${recognizedText.last_name}`}</p>}
          {recognizedText.date_of_birth && (
            <p>{`Date of Birth: ${recognizedText.date_of_birth}`}</p>
          )}
        </>
      )}
    </div>
  );
};

export default TextRecognition;

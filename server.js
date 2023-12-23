// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const OCR = require('./models/ocrModel');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/thai-id-ocr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/ocr', upload.single('file'), async (req, res) => {
  try {
    // Use Tesseract.js to perform OCR on the uploaded image
    const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng', {
      logger: (info) => console.log(info),
    });

    // Extract relevant information from OCR results (you may need to customize this based on actual results)
    const extractedData = {
      identification_number: '...',
      name: '...',
      last_name: '...',
      date_of_birth: '...',
      date_of_issue: '...',
      date_of_expiry: '...',
    };

    // Save the OCR record to the database
    const ocrRecord = new OCR({
      ...extractedData,
      status: 'success',
    });
    await ocrRecord.save();

    res.status(200).json(extractedData);
  } catch (error) {
    console.error('OCR error:', error);

    // Save the OCR error to the database
    const ocrErrorRecord = new OCR({
      status: 'failure',
      error_message: error.message,
    });
    await ocrErrorRecord.save();

    res.status(500).json({ error: 'OCR failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

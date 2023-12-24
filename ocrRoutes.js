// ocrRoutes.js

const express = require('express');
const router = express.Router();
const OCRModel = require('.ocrModel.js'); // Adjust the path accordingly

router.post('/api/ocr', async (req, res) => {
  try {
    const { identification_number, name, last_name, date_of_birth } = req.body;

    const ocrData = new OCRModel({
      identification_number,
      name,
      last_name,
      date_of_birth,
    });

    await ocrData.save();

    res.status(200).json({ message: 'OCR data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

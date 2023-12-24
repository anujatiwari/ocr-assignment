// routes/ocrRoutes.js
const express = require('express');
const router = express.Router();
const OCRModel = require('../models/ocrModel');

router.post('/ocr', async (req, res) => {
  try {
    const ocrData = req.body;
    const ocrEntry = new OCRModel(ocrData);
    await ocrEntry.save();
    res.status(200).json({ message: 'OCR data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

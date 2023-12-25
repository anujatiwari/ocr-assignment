// ocrRouter.js
const express = require('express');
const router = express.Router();
const OCRModel = require('./ocrRoutes.js'); // Adjust the path accordingly

// Route to handle OCR data upload
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

// Route to fetch the history of OCR data
router.get('/api/ocr/history', async (req, res) => {
  try {
    const history = await OCRModel.find().sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.delete('/api/ocr/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await OCRModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'OCR data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

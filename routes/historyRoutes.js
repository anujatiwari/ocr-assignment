// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const OCRModel = require('../models/ocrModel');

router.get('/history', async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const history = await OCRModel.find(filter).sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

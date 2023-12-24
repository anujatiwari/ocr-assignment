// models/ocrModel.js
const mongoose = require('mongoose');

const ocrSchema = new mongoose.Schema({
  identification_number: String,
  name: String,
  last_name: String,
  date_of_birth: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
});

const OCRModel = mongoose.model('OCR', ocrSchema);

module.exports = OCRModel;
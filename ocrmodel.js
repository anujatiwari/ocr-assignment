// ocrModel.js

const mongoose = require('mongoose');

// Define the schema for OCR data
const ocrSchema = new mongoose.Schema({
  identification_number: String,
  name: String,
  last_name: String,
  date_of_birth: String,
  timestamp: { type: Date, default: Date.now }, // Default timestamp for when the OCR data is saved
});

// Create the OCR model using the schema
const OCRModel = mongoose.model('OCR', ocrSchema);

// Export the OCR model for use in other files
module.exports = OCRModel;


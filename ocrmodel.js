// models/ocrModel.js

const mongoose = require('mongoose');

const ocrSchema = new mongoose.Schema({
  identification_number: String,
  name: String,
  last_name: String,
  date_of_birth: String,
  date_of_issue: String,
  date_of_expiry: String,
  timestamp: { type: Date, default: Date.now },
  status: String,
  error_message: String,
});

module.exports = mongoose.model('OCR', ocrSchema);

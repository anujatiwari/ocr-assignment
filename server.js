const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://anujatiwari13:Anuja1234@cluster0.mongodb.net/Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

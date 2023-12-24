// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const ocrRoutes = require('./routes/ocrRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

connectDB();

app.use('/api', ocrRoutes);
app.use('/api', historyRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

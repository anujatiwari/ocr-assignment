const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

mongoose.connect(
  'mongodb+srv://anujatiwari13:Anuja1234@cluster0.mongodb.net/orc',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

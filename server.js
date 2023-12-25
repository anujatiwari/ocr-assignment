const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;


app.use(cors());


mongoose.connect(
  'mongodb+srv://anujatiwari13:Anuja1234@cluster0.mongodb.net/Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

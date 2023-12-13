const express = require("express");
const cors = require("cors");
require('dotenv').config(); 

const app = express()

app.use(cors())
app.use(express.json())

const routes = require('./routes/index');

app.use('/', routes);
  

const port = process.env.PORT || 8800; // Use the PORT environment variable or default to 8800
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import the router file
const router = require('./routes/router.js');

// Set up middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the MongoDB connection
const mongoURL = 'your_mongodb_connection_string';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Mount the router at a specific path
app.use(router);
module.exports = app;
//app.use('/api', router);

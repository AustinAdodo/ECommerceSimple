const mongoose = require('mongoose');
const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Import the Swagger configuration
const app = express();
const bodyParser = require('body-parser');

// Import the router file
const router = require('./routes/router.js');

// Set up middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
//Mount on AWS : https://engineering.99x.io/deploying-net-core-application-to-aws-app-runner-with-cdk-d271744c8a6c

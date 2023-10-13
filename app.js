const mongoose = require('mongoose');
const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Import the Swagger configuration
const app = express();
const bodyParser = require('body-parser');
//Implement Caching and Pagination.

// Import the router file
const router = require('./routes/router.js');

// Set up middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set up the MongoDB connection NB://useFindAndModify: false & useCreateIndex: true <-- Deprecated.,
const mongoURL = 'mongodb://localhost:27017/music';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
 console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Mount the router at a specific path
app.use(router); //app.use('/api', router);
module.exports = app;

//Exempt.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
if (process.env.NODE_ENV === 'development') {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}
else if (process.env.NODE_ENV === 'staging') {
} else if (process.env.NODE_ENV === 'production') {
} 
//Mount on AWS : https://engineering.99x.io/deploying-net-core-application-to-aws-app-runner-with-cdk-d271744c8a6c
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true, // Add this line
//   useFindAndModify: false,
// })
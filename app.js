const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router.js');

// Import the Swagger configuration
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

// Set up middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection NB://useFindAndModify: false & useCreateIndex: true <-- Deprecated.,
const mongoURLMusic = 'mongodb://127.0.0.1:27017/Music';
const mongoURLTest = 'mongodb://127.0.0.1:27017/Test';
app.use((req, res, next) => {
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
    mongoose.connect(mongoURLMusic, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Connected to MongoDB');
     })
     .catch((err) => {
       console.error('Error connecting to MongoDB:', err);
     });
  } else {
    mongoose.connect(mongoURLTest, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Connected to MongoDB');
     })
     .catch((err) => {
       console.error('Error connecting to MongoDB:', err);
     });
  }
  next();
});

// Mount the router at a specific path
app.use(router); //app.use('/api', router);
module.exports = app;

//Exempt.
// netstat -ano | findstr :3000
// taskkill /F /PID <PID> e.g taskkill /F /PID 9112
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
if (process.env.NODE_ENV === 'development') {
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
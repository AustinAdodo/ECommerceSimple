const swaggerJSDoc = require("swagger-jsdoc");

/**
 * npm install swagger-jsdoc swagger-ui-express --save
 */

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Use the appropriate version
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Define the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

const swaggerJSDoc = require("swagger-jsdoc");

/**
 * npm install swagger-jsdoc swagger-ui-express --save
 * npm install -g swagger-cli
 * swagger-cli validate swagger.json
 */

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Use the appropriate version
    info: {
      title: "Album API Dcumentation.",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Define the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

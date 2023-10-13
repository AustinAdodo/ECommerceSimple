const swaggerJSDoc = require("swagger-jsdoc");

/**
 * Swagger Configurations.
 * 
 * npm install swagger-jsdoc swagger-ui-express --save
 * npm install -g swagger-jsdoc
 * npm install -g swagger-cli
 * swagger-cli validate swagger.json
 * http://localhost:3000/api-docs
 * NB: Ensure Swagger.json file is generated before using swagger.
 * Geneate using : npx swagger-jsdoc -d swagger.js -o swagger.json
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

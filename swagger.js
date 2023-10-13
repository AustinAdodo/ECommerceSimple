const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const filePath = "routes/*.js";
const absolutePath = path.resolve(filePath);

/**
 * Swagger Configurations.
 *
 * npm install swagger-jsdoc swagger-ui-express --save
 * npm install -g swagger-jsdoc
 * npm install -g swagger-cli
 * swagger-cli validate swagger.json
 * http://localhost:3000/api-docs
 * NB: Ensure Swagger.json file is generated before using swagger.
 * Geneate Swagger.json file using : npx swagger-jsdoc -d ./swagger.js -o swagger.json
 */
console.log("inside swagger.js");
console.log(absolutePath);
const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Use the appropriate version
    info: {
      title: "Album API Dcumentation.",
      version: "1.0.0",
      description: "Album API",
    },
  },
  apis: [absolutePath], // path to route files i.e files with annotations @openapi or @swagger.
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

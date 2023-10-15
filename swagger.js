const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const filePaths = [
  path.resolve(__dirname, "routes/router.js")
];

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
console.log(filePaths[0]);
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Album API Documentation.",
      version: "1.0.0",
      description: "Album API",
      debug: true
    },
  },
  apis: filePaths // path to route files with annotations @openapi or @swagger.
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

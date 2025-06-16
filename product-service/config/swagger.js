const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Cấu hình swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Service API port 4001',
      version: '1.0.0',
      description: 'Documentation for User Microservice',
    },
    servers: [
      {
        url: 'http://localhost:4001',
      },
    ],
  },
  apis: ['./routers/*.js', './controllers/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};

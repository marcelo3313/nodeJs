const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'NodeJs Test API',
      description: 'homework 6 for nodeJs mentorship',
      contact: {
        name: 'Maliuk Marko'
      },
      servers: ['http://localhost:3000']
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: {
      bearerAuth: [],
    }
  },
  apis: ['index.js'],
};

module.exports = {
  swaggerOptions,
};

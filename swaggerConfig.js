import  swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flower API',
      version: '1.6.9',
      description: 'Floweeer',
    },
  },
  apis: ['${__dirname}/Routes/*.js'], // Replace with the path to your route files
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;


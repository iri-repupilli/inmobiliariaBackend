import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inmobiliaria API',
      version: '1.0.0',
      description:
        'API for managing real estate properties, consultations, visits, and images.',
      contact: {
        name: 'Irina Repupilli',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./**/*.routes.ts'],
};

const specs = swaggerJsdoc(options);
export default specs;

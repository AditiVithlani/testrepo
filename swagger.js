const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.routes.js', './routes/company.routes.js', './routes/complaint.routes.js', './routes/common.routes.js'];

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Automatically generated API documentation',
    version: '1.0.0',
  },
  host: 'localhost:3000', // Change this for your deployment environment
  schemes: ['http'], // Use 'https' in production
  basePath: '/api', // Add the base path defined in app.js
  tags: [
    {
      name: 'Company',
      description: 'Endpoints related to company management',
    },
    // Add more tags for future routes
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Start your app after generating the documentation
});

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phonebook REST API',
      version: '1.0.0',

      description: 'The Phonebook API is organized around REST. It has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. It uses built-in HTTP features, like HTTP headers and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web applications. To secure API user accounts we\'re relying on secret tokens, those tokens should be passed with each API request. JSON is returned by all API responses, including errors.',
      contact: {
        name: 'DmytroVasylenko',
        email: 'tredstoun651@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3020/api/'
      },
      {
        url: 'https://phonebook-back-node-js.vercel.app/api/'
      }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'Users'
      },
      {
        name: 'Contacts'
      },
      {
        name: 'Files'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: [
    '**/*swagger.js',
    './routes/api/auth.js',
    './routes/api/contacts.js',
    './routes/api/files.js'
  ]
}

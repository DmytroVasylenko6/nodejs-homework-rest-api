/* istanbul ignore file */
module.exports = {
  paths: {
    '/contacts': {
      get: {
        summary: 'Get contacts list',
        tags: ['Contacts'],
        consumes: ['application/json'],
        parameters: [{
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <token>' }
        }],
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['success', 'error'],
                      example: 'success'
                    },
                    contacts: [
                      {
                        favorite: false,
                        _id: '64a454344b47560008d97551',
                        name: 'Dimas1',
                        phone: '+3809999999999',
                        email: 'test1@gmail.com',
                        owner: '64a31a9b6d9875000865a0c0',
                      },
                      {
                        favorite: false,
                        _id: '64a866193cc5914c1d0ed0fb',
                        name: 'Dimas2',
                        phone: '+380999999999',
                        email: 'test2@gmail.com',
                        owner: '64a31a9b6d9875000865a0c0',
                      },
                      {
                        favorite: false,
                        _id: '64a87df660ac785d29bbe39e',
                        name: 'Dimas3',
                        phone: '+380999999999',
                        email: 'test3@gmail.com',
                        owner: '64a31a9b6d9875000865a0c0',
                      }
                    ],
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

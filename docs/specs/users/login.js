/* istanbul ignore file */
module.exports = {
  paths: {
    '/users/login': {
      post: {
        summary: 'Login user',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        consumes: ['application/json'],
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'dmytro.vasylenko@gmail.com',
                  },
                  password: {
                    type: 'string',
                    example: '***********',
                  },
                }
              }
            }
          }
        },
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
                    token: {
                      type: 'string',
                      example: '***************JWT-TOKEN*************'
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
}

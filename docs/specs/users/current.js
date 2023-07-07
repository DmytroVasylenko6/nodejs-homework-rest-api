/* istanbul ignore file */
module.exports = {
  paths: {
    '/users/current': {
      get: {
        summary: 'Get current user',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
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
                    currentUser: {
                      type: 'object',
                      properties: {
                        email: {
                          type: 'string',
                          example: 'dmytro.vasylenko@gmail.com',
                        },
                        subscription: {
                          type: 'string',
                          enum: ['starter', 'pro', 'business'],
                          example: 'starter'
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
  }
}

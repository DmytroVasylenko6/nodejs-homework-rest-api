/* istanbul ignore file */
module.exports = {
  paths: {
    '/users/verify': {
      post: {
        summary: 'User email second verification',
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
                    example: 'test@gmail.com',
                  }
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
                      example: 'Verification email sent'
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

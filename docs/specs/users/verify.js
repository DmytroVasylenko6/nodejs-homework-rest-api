/* istanbul ignore file */
module.exports = {
  paths: {
    '/users/verify/{verificationToken}': {
      get: {
        summary: 'User email verification',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        consumes: ['application/json'],
        parameters: [{
          in: 'path',
          name: 'verificationToken',
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
                      example: 'Verification successful'
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

/* istanbul ignore file */
module.exports = {
  paths: {
    '/users/logout': {
      post: {
        summary: 'Logout user',
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
                      example: '204 No Content'
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

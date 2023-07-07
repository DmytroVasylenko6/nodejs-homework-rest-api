/* istanbul ignore file */
module.exports = {
  paths: {
    '/contacts/{contactId}': {
      delete: {
        summary: 'Delete contact',
        tags: ['Contacts'],
        security: [{ bearerAuth: [] }],
        consumes: ['application/json'],
        parameters: [{
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <token>' }
        },
        {
          name: 'contactId',
          in: 'path',
          required: true,
          schema: { type: 'string', example: 'sn13n13234jkncx2j2x' }
        }
        ],
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
                    message: {
                      type: 'string',
                      example: 'contact "Dima" is deleted'
                    },

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

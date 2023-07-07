/* istanbul ignore file */
module.exports = {
  paths: {
    '/contacts/{contactId}': {
      patch: {
        summary: 'Update contact favorite status',
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
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Dimas',
                  },
                  phone: {
                    type: 'string',
                    example: '+380999999999',
                  },
                  email: {
                    type: 'string',
                    example: 'test@gmail.com'
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
                      enum: ['success', 'error'],
                      example: 'success'
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

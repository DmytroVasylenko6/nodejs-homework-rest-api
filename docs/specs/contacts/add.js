/* istanbul ignore file */
module.exports = {
  paths: {
    '/contacts': {
      post: {
        summary: 'Add contact',
        tags: ['Contacts'],
        security: [{ bearerAuth: [] }],
        consumes: ['application/json'],
        parameters: [{
          in: 'header',
          name: 'Authorization',
          required: true,
          schema: { type: 'string', example: 'Bearer <token>' }
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    required: true,
                    example: 'Dimas',
                  },
                  phone: {
                    type: 'string',
                    required: true,
                    example: '+380999999999',
                  },
                  email: {
                    type: 'string',
                    required: true,
                    example: 'test@gmail.com'
                  },
                  favorite: {
                    type: 'boolean',
                    example: false
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
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
                    contact: {
                      type: 'object',
                      properties: {
                        favorite: {
                          type: 'boolean',
                          example: false
                        },
                        _id: {
                          type: 'string',
                          example: '64a866193cc5914c1d0ed0fb'
                        },
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
                          example: 'test@gmail.com',

                        },
                        owner: {
                          type: 'string',
                          example: '64a31a9b6d9875000865a0c0',
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

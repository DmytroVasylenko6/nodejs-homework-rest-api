const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

const addAndUpdateContactMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required(),

    phone: Joi.number()
      .required(),

    email: Joi.string()
      .email()
      .required(),

    favorite: Joi.boolean()

  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    next(new ValidationError(validationResult.error))
  };
  next()
}

const updateFavoriteMiddleware = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean()
      .required(),
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    next(new ValidationError(validationResult.error))
  };
  next()
}

const secondConfirmEmailMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required(),
  })
  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    next(new ValidationError(validationResult.error))
  };
  next()
}

module.exports = {
  addAndUpdateContactMiddleware,
  updateFavoriteMiddleware,
  secondConfirmEmailMiddleware

}

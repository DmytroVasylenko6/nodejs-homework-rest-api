const Joi = require('joi')

module.exports = {
  addAndUpdateContactMiddleware: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .required(),

      phone: Joi.number()
        .required(),

      email: Joi.string()
        .email()
        .required()

    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    };
    next()
  }
}

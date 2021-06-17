const Joi = require("joi");

const schemaCreateUser = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: `missing ${err.message.replace(/"/g, "")} field`,
    });
  }
};

module.exports = {
  schemaCreateUser: (req, res, next) => {
    return validate(schemaCreateUser, req.body, next);
  },
};

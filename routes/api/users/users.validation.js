const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");
const schemaCreateUser = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.any().valid("starter", "pro", "business").optional(),
});

const shemaUpdateSubscription = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `missing ${err.message.replace(/"/g, "")} field`,
    });
  }
};

module.exports = {
  schemaCreateUser: (req, res, next) => {
    return validate(schemaCreateUser, req.body, next);
  },
  shemaUpdateSubscription: (req, res, next) => {
    return validate(shemaUpdateSubscription, req.body, next);
  },
};

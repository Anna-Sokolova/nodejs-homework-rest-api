const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().pattern("/^(+4|7|8)?[s-]?(?[489][0-9]{2})?[s-]?[0-9]{3}[s-]?[0-9]{2}[s-]?[0-9]{2}$/").required(),

  isFavorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().pattern("/^(+4|7|8)?[s-]?(?[489][0-9]{2})?[s-]?[0-9]{3}[s-]?[0-9]{2}[s-]?[0-9]{2}$/").optional(),
  isFavorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const schemaUpdateStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, req.body, next);
  },
};

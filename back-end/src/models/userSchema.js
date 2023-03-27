import Joi from "joi";

export const userSchema = Joi.object({
  age: Joi.number().required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().required(),
  eventName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

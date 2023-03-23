import joi from "joi";

export const adminSchema = joi.object({
  firstName: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(2).max(20).required(),
  pasword: joi.string().min(8).max(20).required(),
});

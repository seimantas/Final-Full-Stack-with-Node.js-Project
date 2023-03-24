import Joic from "joi";

export const userSchema = {
  age: Joic.number().integer().min(18).max(100).required(),
  dateOfBirth: Joic.date().required(),
  email: Joic.string().email().required(),
  eventNames: Joic.array().items(Joic.string()),
  firstName: Joic.string().required(),
  lastName: Joic.string().required(),
};

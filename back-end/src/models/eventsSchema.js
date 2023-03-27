import Joi from "joi";

export const eventSchema = Joi.object({
  eventName: Joi.string().required(),
});

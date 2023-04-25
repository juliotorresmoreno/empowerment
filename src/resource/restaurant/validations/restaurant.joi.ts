import * as Joi from 'joi';

export const CreateRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()).required(),
  email: Joi.string().required(),
});

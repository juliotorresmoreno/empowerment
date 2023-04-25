import * as Joi from 'joi';

export const CreateFoodSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()).required(),
});

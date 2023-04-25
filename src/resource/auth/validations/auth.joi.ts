import * as Joi from 'joi';

export const CreateAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

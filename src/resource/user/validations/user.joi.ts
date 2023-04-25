import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  first_name: Joi.string()
    .required()
    .error(new Error('¡El username no es valido!.')),
  last_name: Joi.string()
    .required()
    .error(new Error('¡El lastname no es valido!.')),
  phone: Joi.string().required().error(new Error('¡El phone no es valido!.')),
  email: Joi.string()
    .email()
    .required()
    .error(new Error('¡El email no es valido!.')),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-@$!%*#?&])[A-Za-z\d\-@$!%*#?&]{8,}$/,
    )
    .error(
      new Error(
        'El password debe tener al menos 8 caracteres incluyendo 1 numero, 1 simbolo, una minuscula y una mayuscula',
      ),
    ),
});

export const UpdateUserSchema = Joi.object({
  name: Joi.string().required(),
});
